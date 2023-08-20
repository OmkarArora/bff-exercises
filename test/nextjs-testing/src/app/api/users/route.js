import { NextResponse } from "next/server";
function later(delay) {
	return new Promise(function (resolve) {
		setTimeout(resolve, delay);
	});
}
export async function GET(request) {
	console.log("REQ GOT");
	await later(10000);
	return NextResponse.json({ message: "success" });
}
