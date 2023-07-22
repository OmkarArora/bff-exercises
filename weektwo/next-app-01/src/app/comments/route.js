import { NextResponse } from "next/server";
import { comments } from "../../data/comments";

export async function GET(request) {
	const { searchParams } = new URL(request.url);
	const postId = searchParams.get("postId");

	if (!postId) return NextResponse.json(comments);

	const commentsResult = comments.filter(
		(item) => item.postId === Number(postId)
	);

	return NextResponse.json(commentsResult);
}
