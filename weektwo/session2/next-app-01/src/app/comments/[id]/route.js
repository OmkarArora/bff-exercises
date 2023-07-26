import { comments } from "@/data/comments";
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
	const comment = comments.find((item) => item.id === Number(params.id));

	if (comment) return NextResponse.json(comment);

	return NextResponse.json({ error: "Comment not found" }, { status: 404 });
}
