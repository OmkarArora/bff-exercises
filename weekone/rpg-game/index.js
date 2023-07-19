const inquirer = require("inquirer");
const demoStoryData = require("./demo-game-story.json");

// while(true){

// }

async function runGame(sceneName) {
	const scenes = demoStoryData.scenes;

	const currentScene = scenes[sceneName];

	if (currentScene.choices.length === 0) {
		console.log("YOU WIN");
		process.exit(0);
		// return;
	}

	const answer = await inquirer.prompt([
		{
			name: "pickedChoice",
			message: currentScene.description,
			type: "list",
			choices: currentScene.choices.map((item) => item.option),
		},
	]);

	let choiceIndex = currentScene.choices.findIndex(
		(item) => item.option === answer.pickedChoice
	);
	return await runGame(currentScene.choices[choiceIndex].nextScene);
}

runGame("start");
