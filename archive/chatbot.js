import { OpenAI } from "openai";
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

class ToolResponse {
  constructor(id, name, toolResponse) {
    this.id = id;
    this.name = name;
    this.response = toolResponse;
  }
}

class ChatContext {
  constructor(originalQuestion, messageHistory, previousMessage, finishReason) {
    this.originalQuestion = originalQuestion;
    this.messages = messageHistory;
    this.previousMessage = previousMessage;
    this.finishReason = finishReason;
    if (this.shoulInvokeToolsNext()) {
      this.messages.push(this.previousMessage);
    }
  }

  shoulInvokeToolsNext() {
    return this.finishReason === "tool_calls";
  }

  isDone() {
    return this.finishReason === "stop";
  }
}

export class ChatBot {
  constructor(prompt, tools) {
    this.systemPrompt = prompt;
    this.tools = tools;
  }

  async converse(question) {
    let { message, finishReason } = await this.firstInteraction(question);
    return await this.loop(
      new ChatContext(question, [], message, finishReason)
    );
  }

  async firstInteraction(question) {
    // set up prompt from system
    let messages = [];
    messages.push({ role: "system", content: this.systemPrompt });
    // set up user question
    messages.push({ role: "user", content: question });

    // get first answer
    const { message, finish_reason } = await this.getAnswers(
      messages,
      this.tools.config()
    );
    return { message: message, finishReason: finish_reason };
  }

  async loop(context) {
    console.log(JSON.stringify(context));

    // If finish_reason is too_calls,then we need to get tool responses and pass it to openai again
    if (context.shoulInvokeToolsNext()) {
      let toolResponses = await this.invokeTools(context.previousMessage);

      for (let tr of toolResponses) {
        context.messages.push({
          role: "tool",
          tool_call_id: tr.id,
          name: tr.name,
          content: tr.response,
        });
      }

      const { message, finish_reason } = this.getAnswers(
        context.messages,
        this.tools.config()
      );
      return await this.loop(
        new ChatContext(
          context.question,
          context.messages,
          message,
          finish_reason
        )
      );
    }
    // If finish_reason is "stop", then we have got our answer
    if (context.isDone()) {
      return [context.previousMessage.content, context.finishReason];
    }
  }

  async invokeTools(choiceMessage) {
    let tool_calls = choiceMessage.tool_calls;
    let toolResponses = [];
    for (let tool of tool_calls) {
      let func = tool.function;
      let name = func.name;
      let args = func.arguments;
      let funcArgsObj = JSON.parse(args);
      // console.log(funcArgsObj);
      let toolResponse = this.tools[name](funcArgsObj);
      toolResponses.push(new ToolResponse(tool.id, name, toolResponse));
    }

    return toolResponses;
  }

  async getAnswers(messages, tools) {
    let tools_choice = tools.length > 0 ? "auto" : undefined;
    let toolsParam = tools.length > 0 ? tools : undefined;
    let request = {
      model: "gpt-3.5-turbo",
      messages: messages,
      tools: toolsParam,
      tool_choice: tools_choice,
    };

    let llmResponse = await openai.chat.completions.create(request);
    // console.log(JSON.stringify(llmResponse))
    let choice = llmResponse.choices[0];
    return choice;
  }
}
