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

export async function getStaticProps({ params }) {
	const { id } = params;

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

// This function gets called at build time
export async function getStaticPaths() {
	// Call an external API endpoint to get posts
	const res = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/posts`);
	const posts = await res.json();

	// Get the paths we want to pre-render based on posts
	const paths = posts.map((post) => ({
		params: { id: post.id.toString() },
	}));
	console.log("PATHS", paths);
	// We'll pre-render only these paths at build time.
	// { fallback: false } means other routes should 404.
	return { paths, fallback: false };
}
