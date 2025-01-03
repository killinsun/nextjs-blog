import Image from "next/image";
import Link from "next/link";
export const GlobalFooter = () => {
	return (
		<footer className="flex flex-col items-center justify-center w-full gap-8 pt-8 pb-8 bg-background text-text">
			<div className="flex flex-col items-center gap-4">
				<Image
					src="/killinsun_logo_w.png"
					alt="Killinsun_logo"
					width={200}
					height={100}
				/>

				<p>© 2024 Killinsun</p>
				<div className="flex gap-8 items-center">
					<a href="https://x.com/Kill_In_Sun" target="_blank" rel="noreferrer">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="32px"
							height="32px"
							viewBox="0 0 256 209"
						>
							<title>Twitter icon</title>
							<path
								fill="#55acee"
								d="M256 25.45a105 105 0 0 1-30.166 8.27c10.845-6.5 19.172-16.793 23.093-29.057a105.2 105.2 0 0 1-33.351 12.745C205.995 7.201 192.346.822 177.239.822c-29.006 0-52.523 23.516-52.523 52.52c0 4.117.465 8.125 1.36 11.97c-43.65-2.191-82.35-23.1-108.255-54.876c-4.52 7.757-7.11 16.78-7.11 26.404c0 18.222 9.273 34.297 23.365 43.716a52.3 52.3 0 0 1-23.79-6.57q-.004.33-.003.661c0 25.447 18.104 46.675 42.13 51.5a52.6 52.6 0 0 1-23.718.9c6.683 20.866 26.08 36.05 49.062 36.475c-17.975 14.086-40.622 22.483-65.228 22.483c-4.24 0-8.42-.249-12.529-.734c23.243 14.902 50.85 23.597 80.51 23.597c96.607 0 149.434-80.031 149.434-149.435q0-3.417-.152-6.795A106.8 106.8 0 0 0 256 25.45"
							/>
						</svg>
					</a>
					<a
						href="https://github.com/killinsun"
						target="_blank"
						rel="noreferrer"
					>
						<Image
							src="/github_logo.png"
							alt="Github_logo"
							width={32}
							height={32}
						/>
					</a>
				</div>
				<div className="flex gap-4">
					<Link href="/posts/fixed-articles/privacy_policy">
						<p className="text-xs text-gray-300 cursor-pointer">
							プライバシーポリシー
						</p>
					</Link>
					<a
						href="https://docs.google.com/forms/d/e/1FAIpQLSeCe4dcnuqxWgjyKD7e9yyVGTAqLwXdh5RVigwrioElY0mM3w/viewform?usp=sf_link"
						target="_blank"
						rel="noreferrer"
					>
						<p className="text-xs text-gray-300 cursor-pointer">お問い合わせ</p>
					</a>
				</div>
			</div>
		</footer>
	);
};
