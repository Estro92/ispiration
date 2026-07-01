import { Series } from "remotion";
import { MyComposition } from "./Composition";
import { Scene02 } from "./Scene02";
import { Scene03 } from "./Scene03";

const SCENE_LENGTH = 150;

export const FullTrailer: React.FC = () => {
	return (
		<Series>
			<Series.Sequence durationInFrames={SCENE_LENGTH}>
				<MyComposition durationInFrames={SCENE_LENGTH} />
			</Series.Sequence>
			<Series.Sequence durationInFrames={SCENE_LENGTH}>
				<Scene02 durationInFrames={SCENE_LENGTH} />
			</Series.Sequence>
			<Series.Sequence durationInFrames={SCENE_LENGTH}>
				<Scene03 durationInFrames={SCENE_LENGTH} />
			</Series.Sequence>
		</Series>
	);
};
