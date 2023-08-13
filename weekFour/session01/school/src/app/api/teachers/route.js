import { prisma } from "@/db/prisma";
import { NextResponse } from "next/server";

import { z } from "zod";

const teacherSchema = z.object({
	firstName: z.string(),
	lastName: z.string(),
	age: z.number().min(20),
	gender: z.enum(["Male", "Female"]),
	email: z.string().email().min(5),
});

export async function GET() {
	const teachers = await prisma.teacher.findMany({
		include: {
			students: true,
		},
	});
	return NextResponse.json(teachers);
}

export async function POST(request) {
	try {
		const teacher = teacherSchema.parse(await request.json());

		const newTeacher = await prisma.teacher.create({
			data: {
				...teacher,
			},
		});

		return NextResponse.json(newTeacher);
	} catch (error) {
		if (error instanceof z.ZodError) {
			const errorData = error.format();
			return NextResponse.json({ error: errorData }, { status: 400 });
		}
		return NextResponse.json(
			{ error: "Something Went Wrong" },
			{ status: 500 }
		);
	}
}
