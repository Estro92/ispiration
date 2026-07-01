import {
	AbsoluteFill,
	Img,
	interpolate,
	staticFile,
	useCurrentFrame,
	useVideoConfig,
} from "remotion";
import { Particles } from "./Particles";

const CTA_LINE_1 = "PRE-ORDINA DA NOI";
const CTA_LINE_2 = "IL TUO BOX ESCLUSIVO DI RAYQUAZA";

export const Scene02: React.FC = () => {
	const frame = useCurrentFrame();
	const { durationInFrames } = useVideoConfig();

	// Same slow push-in language as Scene 01, so the two scenes read as one shot.
	const scale = interpolate(frame, [0, durationInFrames], [1, 1.1], {
		extrapolateRight: "clamp",
	});

	// Cover Scene 01's baked-in "STA ARRIVANDO..." text with a soft fade to black.
	const maskOpacity = interpolate(frame, [0, 20], [0, 1], {
		extrapolateRight: "clamp",
	});

	const textOpacity = interpolate(frame, [18, 45], [0, 1], {
		extrapolateLeft: "clamp",
		extrapolateRight: "clamp",
	});
	const textY = interpolate(frame, [18, 45], [24, 0], {
		extrapolateLeft: "clamp",
		extrapolateRight: "clamp",
	});
	const glowPulse = interpolate(
		Math.sin(frame / 12),
		[-1, 1],
		[14, 26],
	);

	const outroFade = interpolate(
		frame,
		[durationInFrames - 20, durationInFrames],
		[1, 0],
		{ extrapolateLeft: "clamp" },
	);

	return (
		<AbsoluteFill style={{ backgroundColor: "black" }}>
			<AbsoluteFill
				style={{
					opacity: outroFade,
					transform: `scale(${scale})`,
				}}
			>
				<Img
					src={staticFile("scene-01-bg.jpg")}
					style={{ width: "100%", height: "100%", objectFit: "cover" }}
				/>

				<Particles opacity={0.7} />

				{/* Mask out Scene 01's baked-in text before the new CTA takes its place. */}
				<AbsoluteFill
					style={{
						background:
							"linear-gradient(to bottom, rgba(0,0,0,0) 68%, rgba(0,0,0,1) 78%, rgba(0,0,0,1) 100%)",
						opacity: maskOpacity,
					}}
				/>

				<AbsoluteFill
					style={{
						alignItems: "center",
						justifyContent: "flex-end",
						paddingBottom: "9%",
						textAlign: "center",
					}}
				>
					<div
						style={{
							opacity: textOpacity,
							transform: `translateY(${textY}px)`,
							padding: "0 6%",
						}}
					>
						<div
							style={{
								fontFamily: "Arial, Helvetica, sans-serif",
								fontWeight: 800,
								textTransform: "uppercase",
								color: "#eafff4",
								fontSize: 58,
								lineHeight: 1.15,
								letterSpacing: 1,
								textShadow: `0 0 ${glowPulse}px #6dffb8, 0 0 46px #2fae76`,
							}}
						>
							{CTA_LINE_1}
						</div>
						<div
							style={{
								fontFamily: "Arial, Helvetica, sans-serif",
								fontWeight: 800,
								textTransform: "uppercase",
								color: "#eafff4",
								fontSize: 40,
								lineHeight: 1.2,
								letterSpacing: 0.5,
								marginTop: 10,
								textShadow: `0 0 ${glowPulse}px #6dffb8, 0 0 46px #2fae76`,
							}}
						>
							{CTA_LINE_2}
						</div>
					</div>
				</AbsoluteFill>
			</AbsoluteFill>
		</AbsoluteFill>
	);
};
