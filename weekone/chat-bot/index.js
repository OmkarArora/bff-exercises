const readline = require("readline");
const { Configuration, OpenAIApi } = require("openai");
require("dotenv").config();

const rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout,
});

const configuration = new Configuration({
	apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

async function getChatGptResponse(prompt) {
	// console.log("PROMP", prompt);
	try {
		const chatCompletion = await openai.createChatCompletion({
			model: "gpt-3.5-turbo",
			messages: [{ role: "user", content: prompt }],
		});

		// console.log(chatCompletion);
		return chatCompletion.data.choices[0].message;
	} catch (error) {
		console.error(error);
		process.exit(1);
		// return "<<something went wrong>>";
	}
}

async function chat() {
	rl.question("You: ", async (message) => {
		const chatgptResponse = await getChatGptResponse(message);
		console.log("ChatGPT:", chatgptResponse);
		chat();
	});
}

chat();
