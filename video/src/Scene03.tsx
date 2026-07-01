import {
	AbsoluteFill,
	Img,
	interpolate,
	staticFile,
	useCurrentFrame,
	useVideoConfig,
} from "remotion";
import { Particles } from "./Particles";

export const Scene03: React.FC = () => {
	const frame = useCurrentFrame();
	const { durationInFrames } = useVideoConfig();

	// Darkness holds briefly, then the box fades back in, perfectly still (no push-in this time).
	const boxOpacity = interpolate(frame, [10, 40], [0, 1], {
		extrapolateLeft: "clamp",
		extrapolateRight: "clamp",
	});

	const glowPulse = interpolate(Math.sin(frame / 20), [-1, 1], [0.35, 0.7]);

	// Mask Scene 01's baked-in text, same technique as Scene 02.
	const maskOpacity = interpolate(frame, [10, 35], [0, 1], {
		extrapolateLeft: "clamp",
		extrapolateRight: "clamp",
	});

	const titleOpacity = interpolate(frame, [45, 75], [0, 1], {
		extrapolateLeft: "clamp",
		extrapolateRight: "clamp",
	});
	const titleScale = interpolate(frame, [45, 75], [0.9, 1], {
		extrapolateLeft: "clamp",
		extrapolateRight: "clamp",
	});

	const subtitleOpacity = interpolate(frame, [70, 95], [0, 1], {
		extrapolateLeft: "clamp",
		extrapolateRight: "clamp",
	});

	const logoOpacity = interpolate(frame, [90, 115], [0, 1], {
		extrapolateLeft: "clamp",
		extrapolateRight: "clamp",
	});

	const titleGlow = interpolate(Math.sin(frame / 14), [-1, 1], [16, 30]);

	const outroFade = interpolate(
		frame,
		[durationInFrames - 20, durationInFrames],
		[1, 0],
		{ extrapolateLeft: "clamp" },
	);

	return (
		<AbsoluteFill style={{ backgroundColor: "black" }}>
			<AbsoluteFill style={{ opacity: outroFade }}>
				<AbsoluteFill style={{ opacity: boxOpacity }}>
					<Img
						src={staticFile("scene-01-bg.jpg")}
						style={{ width: "100%", height: "100%", objectFit: "cover" }}
					/>
				</AbsoluteFill>

				{/* Soft green ambient glow, independent of the particle field. */}
				<AbsoluteFill
					style={{
						background: `radial-gradient(circle at 50% 45%, rgba(109,255,184,${glowPulse * 0.35}) 0%, rgba(0,0,0,0) 60%)`,
						mixBlendMode: "screen",
					}}
				/>

				<Particles opacity={0.6} />

				{/* Mask out Scene 01's baked-in "STA ARRIVANDO..." text. */}
				<AbsoluteFill
					style={{
						background:
							"linear-gradient(to bottom, rgba(0,0,0,0) 66%, rgba(0,0,0,1) 76%, rgba(0,0,0,1) 100%)",
						opacity: maskOpacity,
					}}
				/>

				<AbsoluteFill
					style={{ alignItems: "center", textAlign: "center" }}
				>
					<div
						style={{
							position: "absolute",
							bottom: 420,
							width: "100%",
							opacity: logoOpacity,
						}}
					>
						<img
							src={staticFile("mondoestro-logo.png")}
							style={{
								width: 130,
								height: 130,
								objectFit: "contain",
								display: "block",
								margin: "0 auto",
							}}
						/>
					</div>

					<div
						style={{
							position: "absolute",
							bottom: 260,
							width: "100%",
							opacity: titleOpacity,
							transform: `scale(${titleScale})`,
						}}
					>
						<div
							style={{
								fontFamily: "Arial, Helvetica, sans-serif",
								fontWeight: 900,
								textTransform: "uppercase",
								color: "#eafff4",
								fontSize: 88,
								letterSpacing: 2,
								textShadow: `0 0 ${titleGlow}px #6dffb8, 0 0 60px #2fae76`,
							}}
						>
							Storm Emerald
						</div>
					</div>

					<div
						style={{
							position: "absolute",
							bottom: 190,
							width: "100%",
							opacity: subtitleOpacity,
						}}
					>
						<div
							style={{
								fontFamily: "Arial, Helvetica, sans-serif",
								fontWeight: 700,
								textTransform: "uppercase",
								color: "#c8ffe4",
								fontSize: 34,
								letterSpacing: 3,
								textShadow: "0 0 18px #6dffb8",
							}}
						>
							Disponibile in pre-order
						</div>
					</div>
				</AbsoluteFill>
			</AbsoluteFill>
		</AbsoluteFill>
	);
};
