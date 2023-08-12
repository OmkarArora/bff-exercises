import { prisma } from "@/db/prisma";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
	const { id } = params;

	const student = await prisma.student.findFirst({
		where: {
			id: {
				equals: id,
			},
		},
	});
	console.log(student);
	return NextResponse.json(student);
}
