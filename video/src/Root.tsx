import "./index.css";
import { Composition } from "remotion";
import { MyComposition } from "./Composition";
import { Scene02 } from "./Scene02";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="StormEmeraldScene01"
        component={MyComposition}
        durationInFrames={150}
        fps={30}
        width={1080}
        height={1920}
      />
      <Composition
        id="StormEmeraldScene02"
        component={Scene02}
        durationInFrames={150}
        fps={30}
        width={1080}
        height={1920}
      />
    </>
  );
};
