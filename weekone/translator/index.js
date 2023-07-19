#!/usr/local/bin/node

// Or use #!/usr/bin/env node
// console.log(process.argv);

const { program } = require("commander");
const { translate } = require("@vitalets/google-translate-api");

program
	.name("translateme")
	.description("CLI to translate input text to english")
	.version("0.0.1")
	.usage("[text] [options]")
	.option("-f, --from <lang>", "source language code (default: auto)")
	.option("-t, --to <lang>", "target language code (default: en)");

program.parse(process.argv);
const options = program.opts();

const inputText = program.args.join(" ");

/**
 0 - successful exit
 >0 - errored exit
 */
if (!inputText) {
	program.outputHelp();
	process.exit(1);
}

const { from = "auto", to = "en" } = options;

// const from = options.from || "auto";
// const to = options.to || "en";

// console.log(options, program.args, inputText);

translate(inputText, { to, from })
	.then((res) => {
		// console.log(res);
		console.log("Translated Text:", res.text);
	})
	.catch((error) => {
		console.error("Error in translation\n", error);
	});
