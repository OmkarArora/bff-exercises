import { NextResponse } from "next/server";
import { posts } from "../../data/posts";

export async function GET(req, res) {
	return NextResponse.json(posts);
}

export async function POST(request) {
	const requestBody = await request.json();

	const newPost = {
		...requestBody,
		id: posts.length,
	};

	return NextResponse.json(newPost);
}
