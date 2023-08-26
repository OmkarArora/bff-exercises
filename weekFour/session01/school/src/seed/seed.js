const { prisma } = require("@/db/prisma");
const { hash } = require("@/utils/hash");

export const createAdminUser = async () => {
	const adminPassword = "124567890";
	const passwordHash = await hash(adminPassword);

	const email = "admin@test.com";

	const admin = await prisma.admin.findFirst({
		where: {
			email: {
				equals: email,
			},
		},
	});

	if (admin) {
		return "Admin already exists";
	}

	await prisma.admin.create({
		data: {
			email: email,
			password: passwordHash,
		},
	});

	return "Created admin user";
};
