import { OpenAIAgent } from "./agent.js";
import { OpenAIClient } from "./openai/client.js";
import { Tools } from "./tools/master.js";
import { Logger } from "./logger.js";
import { PromptDictionary } from "./prompts.js";

const Client = new OpenAIClient(process.env.OPENAI_API_KEY, new Logger());

const Agents = {
  travel: new OpenAIAgent(
    PromptDictionary["travel"],
    Client,
    Tools.get_tool("travel")
  ),
  weather: new OpenAIAgent(
    PromptDictionary["weather"],
    Client,
    Tools.get_tool("weather")
  ),
};
const logger = new Logger();
async function chat() {
  let masterAgent = new OpenAIAgent(PromptDictionary["master"], Client);

  let question = "What can I eat in London today";
  let agentToCall = await masterAgent.start(question);
  logger.info(JSON.stringify(agentToCall));

  let agent = Agents[agentToCall];
  let answer = await agent.start(question);
  console.log(answer);
}

chat();
