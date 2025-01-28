import { OpenAIAgent } from "./agent.js";
import { OpenAIClient } from "./openai/client.js";
import { Tools } from "./tools/travel_tools.js";
import { Logger } from "./logger.js";
import { PromptDictionary } from "./prompts.js";

async function chat() {
  let client = new OpenAIClient(process.env.OPENAI_API_KEY, new Logger());
  let agent = new OpenAIAgent(PromptDictionary["travel"], client, Tools);
  let answer = await agent.start("Where can I stay in Kolkata today");
  console.log(answer);
}

chat();
