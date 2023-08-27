import { useEffect, useState } from "react";
import styles from "../../styles/Home.module.css";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export default function Page() {
	const [teachers, setTeachers] = useState([]);

	useEffect(() => {
		loadData();
	}, []);

	async function loadData() {
		const res = await fetch(
			`${process.env.NEXT_PUBLIC_SITE_URL}/api/teachers`,
			{ credentials: "include" }
		);
		const data = await res.json();
		console.log("TEACHER data", data);
		if (data && Array.isArray(data)) {
			setTeachers(data);
		}
	}

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

// // This gets called on every request
// export async function getServerSideProps() {
// 	// Fetch data from external API
// 	try {
// 		const res = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/teachers`);
// 		const data = await res.json();
// 		console.log("server side", data);

// 		// Pass data to the page via props
// 		return { props: { teachers: data?.teachers || [] } };
// 	} catch (error) {
// 		console.log("server side error", error);
// 		return { props: { teachers: [] } };
// 	}
// }
