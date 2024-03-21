const { GoogleGenerativeAI } = require("@google/generative-ai");
const dotenv = require("dotenv");
const readline = require("readline");

dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.API_KEY);

const userInterface = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

userInterface.prompt();

userInterface.on("line", async input => {
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    const prompt = input + " Türkçe cevap verir misin?";

    const result = await model.generateContentStream(prompt);

    for await (const chunk of result.stream) {
        const chunkText = chunk.text();
        console.log(chunkText);
    }
});
