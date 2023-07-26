import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function Post() {
	const { query } = useRouter();

	const { id } = query;

	const [post, setPost] = useState(null);
	const [comments, setComments] = useState([]);

	useEffect(() => {
		if (id) {
			fetch(`http://localhost:3000/posts/${id}`)
				.then((res) => res.json())
				.then((data) => {
					setPost(data);
				})
				.catch((error) => {
					console.error(error);
				});

			fetch(`http://localhost:3000/comments?postId=${id}`)
				.then((res) => res.json())
				.then((data) => {
					setComments(data);
				})
				.catch((error) => {
					console.error(error);
				});
		}
	}, [id]);
	return (
		<div>
			<div>Post ID - {id}</div>
			{post && (
				<>
					<h2>{post.title}</h2>
					<p>{post.body}</p>
				</>
			)}
			<div>
				{comments.map((item, index) => (
					<div key={`comment-${item.id}`}>
						<p>
							{index + 1}. User:
							{item.name}, {item.email}
						</p>
						<p>
							{"> "}
							{item.body}
						</p>
					</div>
				))}
			</div>
		</div>
	);
}
