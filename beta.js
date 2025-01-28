import { OpenAI } from "openai"
import { Tools } from "./tools.js";
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });


async function main() {
    let userMessage = 'What should I be having for dinner ? I prefer light food if it is hot, soup if it is cold'


    let messages = [
      {
        role: "system",
        content:
          "Use one of the tools provided to get all the required information to answer user's question.",
      },
      {
        role: "system",
        content:
          "Tools can be used to get current user's location , weather and day of the week.First get current location using the right tool.Then use the location to find current weather",
      },
      { role: "user", content: userMessage },
    ];

    let runner = openai.beta.chat.completions
      .runTools({
        model: "gpt-3.5-turbo",
        messages: messages,
        tools: Tools.config(),
      })
      .on("message", (message) => console.log(JSON.stringify(message)));

      let finalContent = await runner.finalContent();

      console.log();
      console.log(finalContent);
}



main()