import Link from "next/link";

export const GlobalHeader = () => {
	const slug = "/fixed-articles/who_am_i";
	return (
		<header className="flex items-center justify-between bg-background text-text p-4 md:p-8">
			<Link href="/">
				<p className="text-2xl font-bold">お首が長いのよ</p>
			</Link>
			<div>
				<Link href={`/posts${slug}`}>私について</Link>
			</div>
		</header>
	);
};
