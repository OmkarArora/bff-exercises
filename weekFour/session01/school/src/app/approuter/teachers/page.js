import styles from "../../../styles/Home.module.css";

export const revalidate = 300;

export default async function Page() {
	let teachers = [];
	try {
		const res = await fetch(
			`${process.env.NEXT_PUBLIC_SITE_URL}/api/teachers`,
			{
				credentials: "same-origin",
				headers: {
					Accept: "application/json",
					"Content-Type": "application/json",
				},
			}
		);
		const json = await res.json();
		if (json.teachers) {
			teachers = json.teachers;
		}
	} catch (error) {
		console.error(error);
	}

	return (
		<main className={`${styles.main}`}>
			<h1 className={styles.heading}>All teachers</h1>

			<div className={styles.peopleContainer}>
				{teachers.map((item, index) => (
					<div key={item.id} className={styles.personTab}>
						<div>
							Name: {item.firstName} {item.lastName}
						</div>
						<div>Age: {item.age}</div>
					</div>
				))}
			</div>
		</main>
	);
}
