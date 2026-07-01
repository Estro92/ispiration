import {
	AbsoluteFill,
	interpolate,
	staticFile,
	useCurrentFrame,
	useVideoConfig,
} from "remotion";
import { Particles } from "./Particles";

const InstagramIcon: React.FC<{ size: number; glow: number }> = ({
	size,
	glow,
}) => (
	<svg
		width={size}
		height={size}
		viewBox="0 0 24 24"
		fill="none"
		style={{ filter: `drop-shadow(0 0 ${glow}px #6dffb8)` }}
	>
		<rect x={2} y={2} width={20} height={20} rx={6} stroke="#c8ffe4" strokeWidth={1.8} />
		<circle cx={12} cy={12} r={4.6} stroke="#c8ffe4" strokeWidth={1.8} />
		<circle cx={17.2} cy={6.8} r={1.15} fill="#c8ffe4" />
	</svg>
);

const FacebookIcon: React.FC<{ size: number; glow: number }> = ({
	size,
	glow,
}) => (
	<svg
		width={size}
		height={size}
		viewBox="0 0 24 24"
		fill="none"
		style={{ filter: `drop-shadow(0 0 ${glow}px #6dffb8)` }}
	>
		<circle cx={12} cy={12} r={10} stroke="#c8ffe4" strokeWidth={1.8} />
		<path
			d="M13.5 21V13H16L16.4 10H13.5V8.2C13.5 7.35 13.73 6.77 14.95 6.77H16.5V4.07C16.23 4.03 15.32 3.95 14.25 3.95C12.03 3.95 10.5 5.31 10.5 7.8V10H8V13H10.5V21H13.5Z"
			fill="#c8ffe4"
		/>
	</svg>
);

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
								width: 620,
								height: 620,
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
							display: "flex",
							alignItems: "center",
							justifyContent: "center",
							gap: 18,
						}}
					>
						<InstagramIcon size={38} glow={ctaPulse} />
						<div
							style={{
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
						<FacebookIcon size={38} glow={ctaPulse} />
					</div>
				</AbsoluteFill>
			</AbsoluteFill>
		</AbsoluteFill>
	);
};
