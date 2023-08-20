export const revalidate = 0;

export default async function Page() {
	let dataToShow = "";
	try {
		const res = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/users`);
		const data = await res.json();
		dataToShow = JSON.stringify(data);
	} catch (error) {
		dataToShow = JSON.stringify(error);
	}

	return <div>PAGe loaded ! Api response - {dataToShow}</div>;
}
