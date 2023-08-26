import styles from "../../styles/Home.module.css";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export default function Page({ teachers }) {
	return (
		<main className={`${styles.main} ${inter.className}`}>
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

// This gets called on every request
export async function getServerSideProps() {
	// Fetch data from external API
	const res = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/teachers`, {
		credentials: "same-origin",
	});
	const data = await res.json();

	// Pass data to the page via props
	return { props: { teachers: data?.teachers || [] } };
}
