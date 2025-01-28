import { RecommendedTool } from "./tool.js";

export class OpenAIResponse {
  constructor(message, finishReason) {
    this.message = message;
    this.finishReason = finishReason;
  }

  isComplete() {
    return "stop" === this.finishReason;
  }

  needsTools() {
    return "tool_calls" === this.finishReason;
  }

  recommendedTools() {
    let tools = this.message.tool_calls;
    console.log(JSON.stringify(tools));
    let toolList = tools.map(function (t) {
      let id = t.id;
      let type = t.type;
      let name = t.function.name;
      let input = JSON.parse(t.function.arguments);
      return new RecommendedTool(id, type, name, input);
    });
    return toolList;
  }
}
