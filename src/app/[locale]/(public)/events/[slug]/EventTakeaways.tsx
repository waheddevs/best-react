import CheckCircleRounded from "@mui/icons-material/CheckCircleRounded";
import LightbulbRounded from "@mui/icons-material/LightbulbRounded";

import { StaggerGroup } from "@/components/motion/StaggerGroup";
import { StaggerItem } from "@/components/motion/StaggerItem";
import type { PageCopy } from "@/dictionaries/public/PageCopy";

type EventTakeawaysProps = {
  copy: PageCopy;
  items: string[];
};

export function EventTakeaways({ copy, items }: EventTakeawaysProps) {
  return (
    <article className="events__audienceCard events__takeawaysCard">
      <span className="events__audienceIcon">
        <LightbulbRounded aria-hidden="true" />
      </span>
      <h2 className="events__audienceTitle">{copy.events.takeawaysTitle}</h2>
      <p className="events__audienceDescription">{copy.events.takeawaysDescription}</p>
      <StaggerGroup className="events__audienceList" delay={0.08}>
        {items.map((item) => (
          <StaggerItem key={item}>
            <div className="events__audienceListItem">
              <CheckCircleRounded aria-hidden="true" />
              <span>{item}</span>
            </div>
          </StaggerItem>
        ))}
      </StaggerGroup>
    </article>
  );
}
