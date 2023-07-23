const express = require("express");
const app = express();
const port = 3000;

// respond with "hello world" when a GET request is made to the homepage
app.get("/", (req, res) => {
	res.send("hello world");
});

app.all("/hello", (req, res, next) => {
	console.log("Middleware ...");
	next(); // pass control to the next handler
});

app.get("/hello", (req, res) => {
	res.send("hello get");
});

app.get("/users/:userId/books/:bookId", (req, res) => {
	res.send(req.params);
});

app.listen(port, () => {
	console.log(`Example app listening on port ${port}`);
});
