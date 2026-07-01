import {
	AbsoluteFill,
	Img,
	interpolate,
	staticFile,
	useCurrentFrame,
	useVideoConfig,
} from "remotion";
import { Particles } from "./Particles";

export const MyComposition: React.FC<{ durationInFrames?: number }> = ({
	durationInFrames: durationProp,
}) => {
	const frame = useCurrentFrame();
	const { durationInFrames: compositionDuration } = useVideoConfig();
	const durationInFrames = durationProp ?? compositionDuration;

	// Darkness holds, then the box slowly reveals under emerald light.
	const revealOpacity = interpolate(frame, [20, 70], [0, 1], {
		extrapolateLeft: "clamp",
		extrapolateRight: "clamp",
	});

	// Slow camera push-in across the whole scene.
	const scale = interpolate(frame, [0, durationInFrames], [1, 1.12], {
		extrapolateRight: "clamp",
	});

	// Particles are visible from the start, growing slightly stronger as the light reveals the box.
	const particlesOpacity = interpolate(frame, [0, 20], [0.5, 0.85], {
		extrapolateRight: "clamp",
	});

	// Final fade to black at the very end of the scene, for a clean cut into the next one.
	const outroFade = interpolate(
		frame,
		[durationInFrames - 12, durationInFrames],
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
				<AbsoluteFill style={{ opacity: revealOpacity }}>
					<Img
						src={staticFile("scene-01-bg.jpg")}
						style={{
							width: "100%",
							height: "100%",
							objectFit: "cover",
						}}
					/>
				</AbsoluteFill>
				<Particles opacity={particlesOpacity} />
			</AbsoluteFill>
		</AbsoluteFill>
	);
};
