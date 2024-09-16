import type React from "react";

type Props = {
	children: string;
	fontSize?: number;
	fontWeight?: string;
	accentColor?: string;
	padding?: number;
};

export const GiraffeGradientText: React.FC<Props> = ({
	children,
	fontWeight = "bold",
	fontSize = 18,
	accentColor = "#2a9d8f", // ティールグリーン（デフォルトのアクセントカラー）
	padding = 10,
}) => {
	// テキストの長さに基づいて概算のサイズを計算
	const estimatedWidth =
		Math.max(children.length * fontSize * 0.9, 100) + padding * 2;
	const estimatedHeight = 32;

	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width={estimatedWidth}
			height={estimatedHeight}
			viewBox={`0 0 ${estimatedWidth} ${estimatedHeight}`}
		>
			<title>{children}</title>
			<defs>
				<linearGradient id="giraffeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
					<stop offset="0%" style={{ stopColor: "#f2df98" }} />
					<stop offset="33%" style={{ stopColor: "#e6c976" }} />
					<stop offset="80%" style={{ stopColor: "#d9b355" }} />
					<stop offset="100%" style={{ stopColor: accentColor }} />
				</linearGradient>
			</defs>

			<text
				x="50%"
				y="50%"
				fontFamily="Arial, sans-serif"
				fontSize={fontSize}
				fontWeight={fontWeight}
				fill="url(#giraffeGradient)"
				textAnchor="middle"
				dominantBaseline="middle"
			>
				{children}
			</text>
		</svg>
	);
};

export default GiraffeGradientText;
