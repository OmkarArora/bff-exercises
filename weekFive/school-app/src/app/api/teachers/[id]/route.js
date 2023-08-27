import { prisma } from "@/db/prisma";
import { NextResponse } from "next/server";

export async function GET(_, { params }) {
  const { id } = params;

  const teacher = await prisma.teacher.findFirst({
    where: {
      id: {
        equals: Number(id),
      },
    },
  });

  if (teacher) {
    return NextResponse.json(teacher);
  }

  return NextResponse.json({ error: "No teachers found" }, { status: 404 });
}
