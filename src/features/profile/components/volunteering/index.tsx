import { VOLUNTEERING } from "../../data/volunteering";
import { ExperienceItem } from "../experiences/experience-item";
import { Panel, PanelHeader, PanelTitle } from "../panel";
import { PanelTitleCopy } from "../panel-title-copy";

const ID = "volunteering";

export function Volunteering() {
  return (
    <Panel id={ID}>
      <PanelHeader>
        <PanelTitle>
          <a href={`#${ID}`}>Volunteering</a>
          <PanelTitleCopy id={ID} />
        </PanelTitle>
      </PanelHeader>

      <div className="pr-2 pl-4">
        {VOLUNTEERING.map((experience) => (
          <ExperienceItem
            key={experience.id}
            experience={experience}
            previewWebsite
          />
        ))}
      </div>
    </Panel>
  );
}
