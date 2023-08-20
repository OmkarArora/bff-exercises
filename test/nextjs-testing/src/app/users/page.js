export default async function Page() {
	const res = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/users`);
	const data = await res.json();
	console.log("API data", data);
	return <div>PAGe loaded !</div>;
}
