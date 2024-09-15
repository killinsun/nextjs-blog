import { getPost } from "@/modules/blogPosts";
import { ImageResponse } from "next/og";

export const runtime = "edge";
export const size = {
	width: 1200,
	height: 630,
};
export const contentType = "image/png";

type Params = {
	params: { slug: string };
};

export default async function Image({ params: { slug } }: Params) {
	const article = await getPost(slug.split("/"));

	if (!article) {
		return new ImageResponse(
			<div
				style={{
					height: "100%",
					width: "100%",
					display: "flex",
					backgroundImage: "linear-gradient(135deg, #7dc7f8 10%, #027cd9 100%)",
					color: "#f3f3f3",
					justifyContent: "center",
					alignItems: "center",
					padding: "0 2rem",
				}}
			>
				<div
					style={{
						display: "flex",
						flexDirection: "column",
						padding: "3rem 4rem 2.5rem",
						backgroundColor: "#181b29",
						justifyContent: "space-between",
						borderRadius: "10px",
						width: "100%",
						height: "90%",
					}}
				>
					<p style={{ fontSize: 60, fontWeight: 700 }}>404 Not Found</p>
				</div>
			</div>,
			{ ...size },
		);
	}

	return new ImageResponse(
		<div
			style={{
				height: "100%",
				width: "100%",
				display: "flex",
				backgroundImage: "linear-gradient(135deg, #7dc7f8 10%, #027cd9 100%)",
				color: "#f3f3f3",
				justifyContent: "center",
				alignItems: "center",
				padding: "0 2rem",
			}}
		>
			<div
				style={{
					display: "flex",
					flexDirection: "column",
					padding: "3rem 4rem 2.5rem",
					backgroundColor: "#181b29",
					justifyContent: "space-between",
					borderRadius: "10px",
					width: "100%",
					height: "90%",
				}}
			>
				<p style={{ fontSize: 60, fontWeight: 700 }}>{article.title}</p>
			</div>
		</div>,
		{ ...size },
	);
}
