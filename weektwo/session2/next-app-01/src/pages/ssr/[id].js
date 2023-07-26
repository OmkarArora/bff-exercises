export default function Post({ post, comments }) {
	return (
		<div>
			<div>Post ID - {post.id}</div>
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

export async function getServerSideProps(context) {
	const { id } = context.query;

	const postResponse = await fetch(`http://localhost:3000/posts/${id}`);

	const post = await postResponse.json();

	const commentsResponse = await fetch(
		`http://localhost:3000/comments?postId=${id}`
	);
	const comments = await commentsResponse.json();

	return { props: { post, comments } };
}
