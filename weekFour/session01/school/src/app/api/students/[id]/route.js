import { prisma } from "@/db/prisma";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
	const { id } = params;
	const { searchParams } = new URL(req.url);
	const getTeacher = searchParams.get("getTeacher");

	const student = await prisma.student.findFirst({
		where: {
			id: {
				equals: Number(id),
			},
		},
		include: {
			teacher: getTeacher === "true",
		},
	});
	console.log(student);
	return NextResponse.json(student);
}
