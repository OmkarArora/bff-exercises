import { createAdminUser } from "@/seed/seed";
import { NextResponse } from "next/server";

export async function GET() {
	const response = await createAdminUser();

	return NextResponse.json({ message: response }, { status: 200 });
}
