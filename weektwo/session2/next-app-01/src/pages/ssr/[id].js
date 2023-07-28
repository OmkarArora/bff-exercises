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
	console.log("URL----", context.req.headers.host);
	const { id } = context.query;

	const postResponse = await fetch(
		`${process.env.NEXT_PUBLIC_SITE_URL}/posts/${id}`
	);

	const post = await postResponse.json();

	const commentsResponse = await fetch(
		`${process.env.NEXT_PUBLIC_SITE_URL}/comments?postId=${id}`
	);
	const comments = await commentsResponse.json();

	return { props: { post, comments } };
}
