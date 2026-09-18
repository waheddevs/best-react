import AutoStoriesRounded from "@mui/icons-material/AutoStoriesRounded";
import GroupsRounded from "@mui/icons-material/GroupsRounded";
import LightbulbRounded from "@mui/icons-material/LightbulbRounded";
import Image from "next/image";

import { HeroVisualFrame } from "@/components/motion/HeroVisualFrame";
import { LiveIllustration } from "@/components/motion/LiveIllustration";
import type { PageCopy } from "@/dictionaries/public/PageCopy";

type AboutHeroVisualProps = {
  copy: PageCopy["about"];
};

export function AboutHeroVisual({ copy }: AboutHeroVisualProps) {
  return (
    <HeroVisualFrame className="about__heroVisual">
      <span className="about__heroOrbit" />
      <LiveIllustration className="about__heroLogo" variant="pulse">
        <Image alt="" height={82} src="/icons/logo.svg" width={82} />
      </LiveIllustration>
      <LiveIllustration
        className="about__heroValue about__heroValuePeople"
        delay={0.3}
        variant="drift"
      >
        <GroupsRounded />
      </LiveIllustration>
      <LiveIllustration className="about__heroValue about__heroValueLearning" delay={0.7}>
        <AutoStoriesRounded />
      </LiveIllustration>
      <LiveIllustration
        className="about__heroValue about__heroValueIdea"
        delay={1.1}
        variant="pulse"
      >
        <LightbulbRounded />
      </LiveIllustration>
      <LiveIllustration className="about__heroCaption" delay={0.5} variant="tilt">
        {copy.approachTitle}
      </LiveIllustration>
      <span className="about__heroAccent" />
    </HeroVisualFrame>
  );
}
