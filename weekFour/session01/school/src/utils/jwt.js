const jwt = require("jsonwebtoken");

const jwtSecret = "2kANSw0i12##4knsas";

const token = jwt.sign(
	{
		foo: "bar",
		exp: Math.floor(Date.now() / 1000) + 60 * 60,
		accessLevel: "admin",
		user: "admin@test.com",
	},
	jwtSecret
);

console.log({ token });

const isVerified = jwt.verify(token, jwtSecret);
console.log({ isVerified });
