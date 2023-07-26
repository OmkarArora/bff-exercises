import { useEffect, useState } from "react";
import Link from "next/link";

export default function SSRHome({ posts }) {
	return (
		<div>
			<h1>SSR Blog App</h1>
			<p>Welcome Home!</p>
			{posts.map((item, index) => (
				<div key={item.id}>
					<h2>
						{index + 1}. {item.title}
					</h2>
					<p>{item.body}</p>
					<Link href={`/ssr/${item.id}`}>Read More</Link>
				</div>
			))}
		</div>
	);
}

// This gets called on every request
export async function getServerSideProps() {
	// Fetch data from external API
	const res = await fetch("http://localhost:3000/posts");
	const data = await res.json();

	// Pass data to the page via props
	return { props: { posts: data } };
}
