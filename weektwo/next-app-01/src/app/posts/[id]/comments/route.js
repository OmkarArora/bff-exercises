import { NextResponse } from "next/server";
import { comments } from "@/data/comments";

export async function GET(request, { params }) {
	console.log(params);
	const commentsResult = comments.filter(
		(item) => item.postId === Number(params.id)
	);

	return NextResponse.json(commentsResult);
}
