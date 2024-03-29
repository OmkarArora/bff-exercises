import { NextResponse } from "next/server";
import { verify } from "./utils/jwt";

const adminAccessLevel = async (req) => {
	try {
		const token = req.cookies.get("token");
		if (!token) {
			return false;
		}
		const jwt = await verify(token.value);

		if (!jwt || jwt.payload.accessLevel !== "admin") {
			return false;
		}
		return true;
	} catch (err) {
		console.log("jwt error", err);
		return false;
	}
};

export async function middleware(req) {
	if (
		req.nextUrl.pathname.startsWith("/teachers") ||
		req.nextUrl.pathname.startsWith("/api/teachers")
	) {
		if (!(await adminAccessLevel(req)))
			return NextResponse.redirect(new URL("/admin/login", req.url));
	}
}
