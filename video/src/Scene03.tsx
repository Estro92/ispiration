import {
	AbsoluteFill,
	interpolate,
	staticFile,
	useCurrentFrame,
	useVideoConfig,
} from "remotion";
import { Particles } from "./Particles";

export const Scene03: React.FC<{ durationInFrames?: number }> = ({
	durationInFrames: durationProp,
}) => {
	const frame = useCurrentFrame();
	const { durationInFrames: compositionDuration } = useVideoConfig();
	const durationInFrames = durationProp ?? compositionDuration;

	const glowPulse = interpolate(Math.sin(frame / 20), [-1, 1], [0.35, 0.75]);

	const logoOpacity = interpolate(frame, [10, 40], [0, 1], {
		extrapolateLeft: "clamp",
		extrapolateRight: "clamp",
	});
	const logoScale = interpolate(frame, [10, 45], [0.7, 1], {
		extrapolateLeft: "clamp",
		extrapolateRight: "clamp",
	});

	const titleOpacity = interpolate(frame, [45, 70], [0, 1], {
		extrapolateLeft: "clamp",
		extrapolateRight: "clamp",
	});

	const ctaOpacity = interpolate(frame, [70, 95], [0, 1], {
		extrapolateLeft: "clamp",
		extrapolateRight: "clamp",
	});
	const ctaPulse = interpolate(Math.sin(frame / 10), [-1, 1], [16, 34]);

	const outroFade = interpolate(
		frame,
		[durationInFrames - 20, durationInFrames],
		[1, 0],
		{ extrapolateLeft: "clamp" },
	);

	return (
		<AbsoluteFill style={{ backgroundColor: "black" }}>
			<AbsoluteFill style={{ opacity: outroFade }}>
				{/* Soft green ambient glow. */}
				<AbsoluteFill
					style={{
						background: `radial-gradient(circle at 50% 45%, rgba(109,255,184,${glowPulse * 0.4}) 0%, rgba(0,0,0,0) 60%)`,
						mixBlendMode: "screen",
					}}
				/>

				<Particles opacity={0.7} />

				<AbsoluteFill
					style={{
						alignItems: "center",
						justifyContent: "center",
						textAlign: "center",
					}}
				>
					<div
						style={{
							opacity: logoOpacity,
							transform: `scale(${logoScale})`,
							marginBottom: 36,
						}}
					>
						<img
							src={staticFile("mondoestro-logo.png")}
							style={{
								width: 460,
								height: 460,
								objectFit: "contain",
								display: "block",
								margin: "0 auto",
								filter: `drop-shadow(0 0 ${glowPulse * 40}px #6dffb8)`,
							}}
						/>
					</div>

					<div
						style={{
							opacity: titleOpacity,
							fontFamily: "Arial, Helvetica, sans-serif",
							fontWeight: 900,
							textTransform: "uppercase",
							color: "#eafff4",
							fontSize: 64,
							letterSpacing: 2,
							textShadow: "0 0 24px #6dffb8, 0 0 60px #2fae76",
							marginBottom: 22,
						}}
					>
						Storm Emerald
					</div>

					<div
						style={{
							opacity: ctaOpacity,
							fontFamily: "Arial, Helvetica, sans-serif",
							fontWeight: 800,
							textTransform: "uppercase",
							color: "#c8ffe4",
							fontSize: 40,
							letterSpacing: 3,
							textShadow: `0 0 ${ctaPulse}px #6dffb8`,
						}}
					>
						Contattami in DM
					</div>
				</AbsoluteFill>
			</AbsoluteFill>
		</AbsoluteFill>
	);
};
