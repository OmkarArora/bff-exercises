function later(delay) {
	return new Promise(function (resolve) {
		setTimeout(resolve, delay);
	});
}

export default async function Page() {
	await later(5000);
	return <div>PAGe loaded !</div>;
}
