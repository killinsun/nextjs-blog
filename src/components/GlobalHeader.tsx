import Link from "next/link";

export const GlobalHeader = () => {
	const slug= "/fixed-articles/who_am_i"
	return (
		<header className="flex justify-between bg-background text-text p-8">
			<Link href="/">
				<p className="text-2xl mx-8 font-bold">お首が長いのよ</p>
			</Link>
			<div className="mr-16">
				<Link href={`/posts${slug}`}>
					私について
				</Link>
			</div>
		</header>
	)
}