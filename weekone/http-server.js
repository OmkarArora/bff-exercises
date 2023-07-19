const http = require("http");

const server = http.createServer((req, res) => {
	const baseURL = req.protocol + "://" + req.headers.host + req.url;
	const urlObject = new URL(baseURL);
	console.log(urlObject);
	const userName = urlObject.searchParams.get("name");
	if (urlObject.pathname === "/") {
		res.writeHead(200, { "Content-Type": "text/html" });
		res.end(`<h1>Hello ${userName || "World"}</h1><p>Welcome</p>`);
		return;
	}

	if (urlObject.pathname === "/about") {
		res.writeHead(200, { "Content-Type": "text/plain" });
		res.end("About page!\n");
		return;
	}

	res.writeHead(404, { "Content-Type": "text/plain" });
	res.end("Page not found\n");
	return;
});

server.listen(4000, () => {
	console.log("server is running...");
});
