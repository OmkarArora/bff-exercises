import { useEffect, useState } from "react";
import Link from "next/link";
const CSRHome = () => {
	const [posts, setPosts] = useState([]);

	useEffect(() => {
		fetch("http://localhost:3000/posts")
			.then((res) => res.json())
			.then((data) => {
				setPosts(data);
			})
			.catch((error) => {
				console.error(error);
			});
	}, []);

	return (
		<div>
			<h1>CSR Blog App</h1>
			<p>Welcome Home!</p>
			{posts.map((item, index) => (
				<div key={item.id}>
					<h2>
						{index + 1}. {item.title}
					</h2>
					<p>{item.body}</p>
					<Link href={`/csr/${item.id}`}>Read More</Link>
				</div>
			))}
		</div>
	);
};

export default CSRHome;
