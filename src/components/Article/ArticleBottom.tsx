"use client";
import type { Post } from "@/modules/blogPosts";
import { type FC, useState } from "react";
import {
	FacebookIcon,
	FacebookShareButton,
	TwitterIcon,
	TwitterShareButton,
} from "react-share";
import { BuyMeACoffeeButton } from "./BuyMeACoffeeButton";

type Props = {
	post: Post;
};

export const ArticleBottom: FC<Props> = (props) => {
	const { post } = props;
	const [isCopied, setIsCopied] = useState(false);

	const url = `https://blog.killinsun.com/posts/${post?.slug}`;
	const quote = `
	
	
	${post?.title}
	`.replace(/\t/g, "");

	const handleClickCopyUrlButton = async () => {
		await navigator.clipboard.writeText(url);

		setIsCopied(true);
	};

	return (
		<div
			className="flex justify-center  border-t-text py-4"
			style={{
				borderTop: "2px solid #f2df98",
			}}
		>
			<div className="flex flex-col gap-8">
				<div className="flex flex-col gap-8">
					<p>このブログには「いいね」機能はあえて実装してないので、
					かわりに・・・よかったらシェアしてください！</p>
				<div className="flex flex-wrap gap-2 md:gap-4 justify-center">
					<div className="relative">
						{isCopied && (
							<span className="text-xs text-gray-500 absolute bottom-10 left-[-5px]">
								\Copied/
							</span>
						)}
						<button
							type="button"
							className="flex items-center justify-center w-9 h-9 rounded-full bg-gray-200 hover:bg-gray-300 active:bg-text focus:outline-none  transition active:scale-110"
							onClick={handleClickCopyUrlButton}
						>
							<span className="i-tabler-link" />
						</button>
					</div>
					<FacebookShareButton url={url} title={quote}>
						<FacebookIcon size={32} round />
					</FacebookShareButton>
					<TwitterShareButton url={url} title={quote}>
						<TwitterIcon size={32} round />
						</TwitterShareButton>
					</div>
				</div>
				<BuyMeACoffeeButton />
			</div>
		</div>
	);
};
