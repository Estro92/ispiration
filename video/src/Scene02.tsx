import {
	AbsoluteFill,
	Img,
	interpolate,
	random,
	staticFile,
	useCurrentFrame,
	useVideoConfig,
} from "remotion";
import { Particles } from "./Particles";

// Position of the Rayquaza artwork crop relative to the full box background,
// expressed as a fraction of the frame — matches where it sits on the real box art.
const ORIGIN = { left: "44%", top: "27%", width: "40%" };

const CrackLines: React.FC<{ progress: number }> = ({ progress }) => {
	const paths = [
		"M 420 520 L 460 470 L 440 410 L 490 360",
		"M 500 560 L 520 500 L 560 480 L 540 420",
		"M 460 470 L 400 440 L 410 390",
	];

	return (
		<svg
			viewBox="0 0 1080 1920"
			width="100%"
			height="100%"
			style={{ position: "absolute", top: 0, left: 0 }}
		>
			{paths.map((d, i) => {
				const delay = i * 0.15;
				const local = interpolate(progress, [delay, delay + 0.4], [0, 1], {
					extrapolateLeft: "clamp",
					extrapolateRight: "clamp",
				});
				return (
					<path
						key={i}
						d={d}
						fill="none"
						stroke="#8dffc9"
						strokeWidth={3}
						strokeLinecap="round"
						style={{
							filter: "drop-shadow(0 0 6px #6dffb8)",
							opacity: local,
							strokeDasharray: 200,
							strokeDashoffset: 200 * (1 - local),
						}}
					/>
				);
			})}
		</svg>
	);
};

export const Scene02: React.FC = () => {
	const frame = useCurrentFrame();
	const { durationInFrames } = useVideoConfig();

	// Slow establishing push-in, consistent with Scene 01.
	const scale = interpolate(frame, [0, durationInFrames], [1, 1.1], {
		extrapolateRight: "clamp",
	});

	// The artwork glows before it cracks open.
	const glowOpacity = interpolate(frame, [0, 25, 45], [0, 0.9, 0.6], {
		extrapolateRight: "clamp",
	});

	const crackProgress = interpolate(frame, [20, 60], [0, 1], {
		extrapolateLeft: "clamp",
		extrapolateRight: "clamp",
	});

	// Rayquaza emerges: grows out of the box artwork and drifts toward camera.
	const emergeStart = 45;
	const emergeEnd = 100;
	const emergeProgress = interpolate(frame, [emergeStart, emergeEnd], [0, 1], {
		extrapolateLeft: "clamp",
		extrapolateRight: "clamp",
	});
	const emergeScale = interpolate(emergeProgress, [0, 1], [1, 2.6]);
	const emergeY = interpolate(emergeProgress, [0, 1], [0, -220]);
	const emergeOpacity = interpolate(frame, [emergeStart, emergeStart + 10], [0, 1], {
		extrapolateLeft: "clamp",
		extrapolateRight: "clamp",
	});

	// "Made of emerald energy" -> crystallizes into full, realistic color.
	const materialize = interpolate(frame, [emergeStart, emergeEnd + 15], [0, 1], {
		extrapolateLeft: "clamp",
		extrapolateRight: "clamp",
	});
	const saturate = interpolate(materialize, [0, 1], [0, 1.3]);
	const brightness = interpolate(materialize, [0, 1], [2.2, 1]);
	const glowStrength = interpolate(materialize, [0, 1], [40, 6]);

	// Roar: a quick, deterministic camera shake plus a flash.
	const roarStart = 100;
	const roarEnd = 118;
	const inRoar = frame >= roarStart && frame <= roarEnd;
	const shakeX = inRoar
		? (random(`shake-x-${frame}`) - 0.5) * 18
		: 0;
	const shakeY = inRoar
		? (random(`shake-y-${frame}`) - 0.5) * 18
		: 0;
	const roarFlash = interpolate(
		frame,
		[roarStart, roarStart + 4, roarEnd],
		[0, 0.5, 0],
		{ extrapolateLeft: "clamp", extrapolateRight: "clamp" },
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
					transform: `scale(${scale}) translate(${shakeX}px, ${shakeY}px)`,
				}}
			>
				<Img
					src={staticFile("scene-01-bg.jpg")}
					style={{ width: "100%", height: "100%", objectFit: "cover" }}
				/>

				{/* Emerald glow pulsing on the artwork right before it cracks open. */}
				<AbsoluteFill
					style={{
						background: `radial-gradient(circle at 62% 38%, rgba(109,255,184,${glowOpacity}) 0%, rgba(109,255,184,0) 35%)`,
						mixBlendMode: "screen",
					}}
				/>

				<CrackLines progress={crackProgress} />

				{/* Rayquaza emerging from the printed artwork. */}
				<div
					style={{
						position: "absolute",
						left: ORIGIN.left,
						top: ORIGIN.top,
						width: ORIGIN.width,
						transform: `translate(-50%, -50%) translateY(${emergeY}px) scale(${emergeScale})`,
						opacity: emergeOpacity,
					}}
				>
					<img
						src={staticFile("rayquaza-emerge.png")}
						style={{
							width: "100%",
							display: "block",
							filter: `saturate(${saturate}) brightness(${brightness}) drop-shadow(0 0 ${glowStrength}px #6dffb8)`,
						}}
					/>
				</div>

				<Particles opacity={interpolate(frame, [20, 60], [0.3, 0.9], { extrapolateRight: "clamp" })} />

				{/* Roar flash. */}
				<AbsoluteFill
					style={{ backgroundColor: "#eafff2", opacity: roarFlash }}
				/>
			</AbsoluteFill>
		</AbsoluteFill>
	);
};
