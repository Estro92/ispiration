import { useCurrentFrame, useVideoConfig, interpolate } from "remotion";

const PARTICLE_COUNT = 40;

// Deterministic pseudo-random values (no Math.random) so every frame renders identically.
const seededValue = (seed: number) => {
	const x = Math.sin(seed * 12.9898) * 43758.5453;
	return x - Math.floor(x);
};

export const Particles: React.FC<{ opacity: number }> = ({ opacity }) => {
	const frame = useCurrentFrame();
	const { width, height } = useVideoConfig();

	return (
		<svg
			width={width}
			height={height}
			style={{ position: "absolute", top: 0, left: 0, opacity }}
		>
			{Array.from({ length: PARTICLE_COUNT }).map((_, i) => {
				const startX = seededValue(i * 1.7 + 1) * width;
				const driftX = (seededValue(i * 3.1 + 2) - 0.5) * 80;
				const baseY = seededValue(i * 2.3 + 3) * height;
				const speed = 0.15 + seededValue(i * 4.7 + 4) * 0.35;
				const size = 1 + seededValue(i * 5.3 + 5) * 2.5;
				const phase = seededValue(i * 6.1 + 6) * Math.PI * 2;

				const y =
					((baseY - frame * speed) % (height + 40) + (height + 40)) %
						(height + 40) -
					20;
				const x = startX + Math.sin(frame / 40 + phase) * driftX;

				const twinkle = interpolate(
					Math.sin(frame / 15 + phase),
					[-1, 1],
					[0.25, 1],
				);

				return (
					<circle
						key={i}
						cx={x}
						cy={y}
						r={size}
						fill="#6dffb8"
						opacity={twinkle}
						style={{ filter: "blur(0.4px)" }}
					/>
				);
			})}
		</svg>
	);
};
