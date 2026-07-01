import "./index.css";
import { Composition } from "remotion";
import { MyComposition } from "./Composition";
import { Scene02 } from "./Scene02";
import { Scene03 } from "./Scene03";
import { FullTrailer } from "./FullTrailer";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="StormEmeraldFull"
        component={FullTrailer}
        durationInFrames={450}
        fps={30}
        width={1080}
        height={1920}
      />
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
      <Composition
        id="StormEmeraldScene03"
        component={Scene03}
        durationInFrames={150}
        fps={30}
        width={1080}
        height={1920}
      />
    </>
  );
};
