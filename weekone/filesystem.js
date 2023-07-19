const fs = require("fs");

const data = "hello world2";

// CREATE
fs.writeFile("test.txt", data, (err) => {
	if (err) throw err;

	console.log("File created sucessfully");

	// READ
	fs.readFile("test.txt", "utf8", (err, data) => {
		if (err) throw err;

		console.log("Read file success file data -", data);

		// UPDATE
		const newData = "\nNew Line";
		fs.appendFile("test.txt", newData, (err) => {
			if (err) throw err;

			console.log("File appended successfully");
		});
	});
});

// DELETE
fs.unlink("deleteThis.txt", (err) => {
	if (err) throw err;

	console.log("File deleted successfully");
});
