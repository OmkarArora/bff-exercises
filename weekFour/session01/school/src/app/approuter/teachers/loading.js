import styles from "@/styles/Home.module.css";

export default function Loading() {
	return (
		<main className={`${styles.main}`}>
			<h1 className={styles.heading}>All teachers</h1>

			<div className={styles.peopleContainer}>
				<div>Loading...</div>
			</div>
		</main>
	);
}
