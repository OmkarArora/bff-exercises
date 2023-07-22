import { NextResponse } from "next/server";
import { posts } from "../../../data/posts";

export async function GET(request, { params }) {
	const post = posts.find((item) => item.id === Number(params.id));

	if (post) return NextResponse.json(post);

	return NextResponse.json({ error: "Post not found" }, { status: 404 });
}

export async function PUT(request, { params }) {
	const requestBody = await request.json();

	const post = posts.find((item) => item.id === Number(params.id));
	const postIndex = posts.findIndex((item) => Number(item.id === params.id));

	if (post) {
		const updatedPost = {
			...post,
			...requestBody,
		};

		posts[postIndex] = updatedPost;

		return NextResponse.json(updatedPost);
	}

	return NextResponse.json({ error: "Post not found" }, { status: 404 });
}
