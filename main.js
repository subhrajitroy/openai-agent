import { OpenAIAgent } from "./agent.js";
import { OpenAIClient } from "./openai/client.js";
import { Tools } from "./tools.js";
import { Logger } from "./logger.js";

async function chat() {
  let client = new OpenAIClient(process.env.OPENAI_API_KEY, new Logger());
  let prompt = `You are an agent.
  Your job is to answer questions.
  When user asks a question you will need to use one or more tools to get information.
  You will need user's location, use a tool to get location.
  Then use the location to get weather information using the right tool.
  Answer user's question using the weather.
  
  Example: User question : What can I do today.
  You answer : Give weather is sunny, you can do the following activities`;
  let agent = new OpenAIAgent(prompt, client, Tools);
  let answer = await agent.start("What should I be eating today");
  console.log(answer);
}

chat();
