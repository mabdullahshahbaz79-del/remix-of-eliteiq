import { Composition } from "remotion";
import { HeroBackground } from "./HeroBackground";

export const RemotionRoot = () => (
  <Composition
    id="hero-bg"
    component={HeroBackground}
    durationInFrames={300}
    fps={30}
    width={1920}
    height={1080}
  />
);
