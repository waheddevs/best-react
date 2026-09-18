import CelebrationRounded from "@mui/icons-material/CelebrationRounded";
import ConfirmationNumberRounded from "@mui/icons-material/ConfirmationNumberRounded";
import LocationOnRounded from "@mui/icons-material/LocationOnRounded";

import { HeroVisualFrame } from "@/components/motion/HeroVisualFrame";
import { LiveIllustration } from "@/components/motion/LiveIllustration";
import type { PageCopy } from "@/dictionaries/public/PageCopy";

import { EventCalendar } from "./EventCalendar";

type EventsHeroVisualProps = {
  copy: PageCopy["events"];
};

export function EventsHeroVisual({ copy }: EventsHeroVisualProps) {
  return (
    <HeroVisualFrame className="events__heroVisual">
      <span className="events__heroOrbit" />
      <div className="events__heroCalendar">
        <span className="events__heroCalendarTop">
          <i />
          <i />
        </span>
        <div className="events__heroCalendarContent">
          <span className="events__heroCalendarCopy">
            <strong className="events__heroCalendarTitle">{copy.upcoming}</strong>
            <span className="events__heroCalendarMeta">
              {copy.format} · {copy.location}
            </span>
          </span>
          <EventCalendar />
        </div>
      </div>
      <LiveIllustration
        className="events__heroDetail events__heroDetailTicket"
        delay={0.4}
        variant="drift"
      >
        <ConfirmationNumberRounded />
      </LiveIllustration>
      <LiveIllustration
        className="events__heroDetail events__heroDetailLocation"
        delay={0.8}
        variant="pulse"
      >
        <LocationOnRounded />
      </LiveIllustration>
      <LiveIllustration className="events__heroCelebration" delay={1.2}>
        <CelebrationRounded />
      </LiveIllustration>
      <span className="events__heroAccent" />
    </HeroVisualFrame>
  );
}
