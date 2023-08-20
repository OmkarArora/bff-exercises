import styles from "../../../styles/Home.module.css";

export const revalidate = 300;

export default async function Page() {
	let students = [];
	try {
		const res = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/students`);
		students = await res.json();
	} catch (error) {
		console.error(error);
	}

	return (
		<main className={`${styles.main}`}>
			<h1 className={styles.heading}>All students</h1>

			<div className={styles.peopleContainer}>
				{students.map((item, index) => (
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
