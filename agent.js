import { OpenAIRequest } from "./openai/request.js";

export class OpenAIAgent {
  constructor(prompt, client, tools) {
    this.prompt = prompt;
    this.client = client;
    this.tools = tools;
    this.messages = [];
  }

  async start(question) {
    let prompt = this.prompt;
    this.messages.push({ role: "system", content: prompt });
    this.messages.push({ role: "user", content: question });
    let tools =
      this.tools && this.tools["config"] ? this.tools.config() : undefined;
    let response = await this.client.send(
      new OpenAIRequest(this.messages, tools)
    );

    while (response.needsTools()) {
      let tools = response.recommendedTools();
      this.messages.push(response.message);
      console.log(JSON.stringify(tools));
      for (let t of tools) {
        let toolResponse = this.tools[t.name](t.input);
        this.messages.push({
          role: "tool",
          tool_call_id: t.id,
          content: JSON.stringify(toolResponse),
        });
      }
      response = await this.client.send(
        new OpenAIRequest(this.messages, this.tools.config())
      );
    }
    return response.message.content;
  }

  done() {
    if (this.messages) {
      this.messages.splice(0);
    }
  }
}
