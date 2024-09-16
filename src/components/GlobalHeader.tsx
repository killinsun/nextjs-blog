import Link from "next/link";

export const GlobalHeader = () => {
	const slug = "/fixed-articles/who_am_i";
	return (
		<header className="flex items-center justify-between bg-background text-text p-4 md:p-8">
			<div className="flex flex-col">
				<Link href="/">
					<p className="text-2xl font-bold">お首が長いのよ</p>
				</Link>
				<p className="text-sm">
					チラシの裏よりお届けするソフトウェアエンジニアとして成長したい人のためのブログ
				</p>
			</div>
			<div className="flex gap-4">
				<Link href="/categories/エンジニアリング">エンジニアリング</Link>
				<Link href="/categories/トラブルシューティング">
					トラブルシューティング
				</Link>
				<Link href="/categories/マネジメント">マネジメント</Link>
				<Link href={`/posts${slug}`}>私について</Link>
			</div>
		</header>
	);
};
