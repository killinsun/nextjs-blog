"use client";
import Link from "next/link";
import type React from "react";
import { useEffect, useRef, useState } from "react";

interface MenuItem {
	href: string;
	label: string;
}

export const GlobalHeader = () => {
	const [showPopupMenu, setShowPopupMenu] = useState<boolean>(false);
	const menuRef = useRef<HTMLDivElement>(null);
	const slug = "/fixed-articles/who_am_i";

	const menuItems: MenuItem[] = [
		{ href: "/categories/エンジニアリング", label: "エンジニアリング" },
		{ href: "/categories/マネジメント", label: "マネジメント" },
		{
			href: "/categories/トラブルシューティング",
			label: "トラブルシューティング",
		},
		{ href: `/posts${slug}`, label: "私について" },
	];

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
				setShowPopupMenu(false);
			}
		};

		document.addEventListener("mousedown", handleClickOutside);
		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, []);

	return (
		<header className="relative flex items-center justify-between bg-background text-text p-4 md:p-8">
			<div className="flex flex-col">
				<Link href="/">
					<p className="text-xl md:text-2xl font-bold">お首が長いのよ</p>
				</Link>
				<p className="text-xs md:text-sm">
					チラシの裏よりお届けするソフトウェアエンジニアとして成長したい人のためのブログ
				</p>
			</div>
			<div className="lg:hidden">
				<button
					type="button"
					className="inline-flex h-12 items-center justify-center rounded-md px-6 font-medium text-neutral-50 transition active:scale-110"
					onClick={() => setShowPopupMenu(!showPopupMenu)}
				>
					<span className="i-tabler-menu-2" />
				</button>
			</div>
			<div className="hidden lg:flex gap-4">
				{menuItems.map((item, index) => (
					<Link key={item.href} href={item.href} className="hover:underline">
						{item.label}
					</Link>
				))}
			</div>
			{showPopupMenu && (
				<div
					ref={menuRef}
					className="absolute right-0 top-full mt-2 w-48 bg-white shadow-lg rounded-md overflow-hidden z-10 lg:hidden"
				>
					{menuItems.map((item, index) => (
						<Link
							key={item.href}
							href={item.href}
							className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
							onClick={() => setShowPopupMenu(false)}
						>
							{item.label}
						</Link>
					))}
				</div>
			)}
		</header>
	);
};
