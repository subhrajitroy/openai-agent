import { OpenAI } from "openai"
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function getAnswers(messages) {
    let request = {
      model: "gpt-3.5-turbo",
      messages: [{role:"user",content: 'How are you?'}],
    };


    const answer = []

    openai.chat.completions.create(request).then(function (res) {
      console.log(res.choices);
      answer.push(res.choices)
    });
   
    return new Promise((resolve, reject) => {
        setTimeout(1000, resolve(answer))
    });
}


