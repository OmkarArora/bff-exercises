const jwt = require("jsonwebtoken");

const jwtSecret = process.env.JWT_SECRET;

export function sign(payload) {
	// 1 hr expiry
	return jwt.sign(
		{
			exp: Math.floor(Date.now() / 1000) + 60 * 60,
			...payload,
		},
		jwtSecret
	);
}

export function verify(token) {
	try {
		return jwt.verify(token, jwtSecret);
	} catch (err) {
		return false;
	}
}
