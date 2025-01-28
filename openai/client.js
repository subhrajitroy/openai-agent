import { OpenAI } from "openai";
import { OpenAIResponse } from "./response.js";

export class OpenAIClient {
  constructor(apiKey, logger) {
    this.client = new OpenAI({ apiKey: apiKey });
    this.logger = logger;
  }

  async send(request, model = "gpt-3.5-turbo") {
    let openaiRequest = {
      model: model,
      messages: request.messages,
      tools: request.tools,
    };
    let response = await this.client.chat.completions.create(openaiRequest);
    let choice = response.choices[0];
    this.logger.info(JSON.stringify(choice));
    return new OpenAIResponse(choice.message, choice.finish_reason);
  }
}
