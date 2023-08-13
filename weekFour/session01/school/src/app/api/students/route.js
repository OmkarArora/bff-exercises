import { prisma } from "@/db/prisma";
import { NextResponse } from "next/server";

import { z } from "zod";

const studentSchema = z.object({
	firstName: z.string(),
	lastName: z.string(),
	age: z.number().min(5).max(16),
	gender: z.enum(["Male", "Female"]),
	email: z.string().email().min(5),
	teacherId: z.number(),
});

export async function GET(req, res) {
	const { searchParams } = new URL(req.url);
	const teacherId = searchParams.get("teacherId");

	const students = teacherId
		? await prisma.student.findMany({
				where: {
					teacherId: {
						equals: Number(teacherId),
					},
				},
		  })
		: await prisma.student.findMany();
	return NextResponse.json(students);
}

export async function POST(request) {
	try {
		const student = studentSchema.parse(await request.json());

		const newStudent = await prisma.student.create({
			data: { ...student },
		});

		return NextResponse.json(newStudent);
	} catch (error) {
		console.log(error);
		return NextResponse.json({ error: "Invalid data" }, { status: 400 });
	}
}
