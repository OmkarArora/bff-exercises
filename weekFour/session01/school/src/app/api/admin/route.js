import { prisma } from "@/db/prisma";
import { compare } from "@/utils/hash";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { sign } from "@/utils/jwt";

export async function POST(req) {
	const { email, password } = await req.json();

	const requestedAdmin = await prisma.admin.findFirst({
		where: {
			email: {
				equals: email,
			},
		},
	});

	if (requestedAdmin) {
		const isPasswordValid = await compare(requestedAdmin.password, password);

		// to avoid truthy, falsy JS values
		if (isPasswordValid === true) {
			const token = sign({
				accessLevel: "admin",
				email: requestedAdmin.email,
			});
			const cookieStore = cookies();
			const oneHour = 60 * 60 * 1000;
			cookieStore.set({
				name: "token",
				value: token,
				httpOnly: true,
				path: "/",
				expires: Date.now() + oneHour,
			});

			return NextResponse.json(
				{
					message: "User logged in",
				},
				{ status: 200 }
			);
		}
	}

	return NextResponse.json(
		{
			error: "invalid credentials",
		},
		{ status: 400 }
	);
}
