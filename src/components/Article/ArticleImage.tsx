"use client";
import Image from "next/image";
import type React from "react";
import { useEffect, useMemo, useState } from "react";
import type { FC } from "react";

export const ArticleImage: FC<{
	slug: string[];
	className?: string;
	src?: string;
	alt?: string;
}> = (props) => {
	const { slug, className, src, alt } = props;
	const [showModal, setShowModal] = useState(false);
	const [isMdOrSmaller, setIsMdOrSmaller] = useState(false);

	useEffect(() => {
		const checkScreenSize = () => {
			setIsMdOrSmaller(window.matchMedia("(max-width: 768px)").matches);
		};

		checkScreenSize();
		window.addEventListener("resize", checkScreenSize);

		return () => window.removeEventListener("resize", checkScreenSize);
	}, []);

	if (!src) return null;

	let imagePath: string;

	if (src.startsWith("/public")) {
		const splitSrc = src.split("/public");
		imagePath = splitSrc.join("");
	} else {
		const dirPath = slug.slice(0, -1).join("/");
		const cleanSrc = src.startsWith("/") ? src.slice(1) : src;
		imagePath = `/${dirPath}/${cleanSrc}`;
	}

	const handleImageInteraction = () => {
		try {
			if (isMdOrSmaller) {
				openImageAsNewTab();
				return;
			}
			setShowModal(true);
		} catch (error) {
			console.error(error);
		}
	};

	const openImageAsNewTab = () => {
		window.open(imagePath, "_blank");
	};

	const handleCloseModal = () => {
		setShowModal(false);
	};

	const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
		if (event.key === "Enter" || event.key === " ") {
			event.preventDefault();
			handleImageInteraction();
		}
	};

	return (
		<>
			<div
				className={`flex justify-center items-center cursor-pointer ${className} border`}
				onClick={handleImageInteraction}
				onKeyDown={handleKeyDown}
			>
				<Image
					src={imagePath}
					alt={alt || ""}
					className={className}
					width={500}
					height={300}
				/>
			</div>
			{showModal && (
				<div
					className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
					onClick={handleCloseModal}
					onKeyDown={(e) => e.key === "Escape" && handleCloseModal()}
					aria-modal="true"
					tabIndex={-1}
				>
					<div className="relative max-w-4xl max-h-[90vh] overflow-auto">
						<Image
							src={imagePath}
							className={className}
							alt={alt || ""}
							width={1200}
							height={630}
							layout="responsive"
							onClick={(e) => e.stopPropagation()}
						/>
						<button
							type="button"
							className="absolute top-4 right-4 text-white text-2xl"
							onClick={handleCloseModal}
							aria-label="Close modal"
						>
							×
						</button>
					</div>
				</div>
			)}
		</>
	);
};
