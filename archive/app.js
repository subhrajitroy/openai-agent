import { ChatBot } from "./chatbot.js";
import readline from "node:readline";
import { Tools } from "../tools/weather_tools.js";
import { exit } from "node:process";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const prompt = `You are an agent who suggest lifetsyle options like eating, fashion etc to users based on the weather of their location
`;

async function init() {
  let promptToUser = "What can I do for you today\n";
  let bot = new ChatBot(prompt, Tools);
  let input = await readCommandline(promptToUser);
  let [botAnswer, finishReason] = await bot.converse(input);
  console.log(botAnswer);
  console.log(finishReason);
}

async function readCommandline(questionToAsk) {
  return new Promise(function (resolve, reject) {
    rl.question(questionToAsk, (ans) => {
      resolve(ans);
    });
  });
}

(async () => {
  await init();
  exit();
})();
