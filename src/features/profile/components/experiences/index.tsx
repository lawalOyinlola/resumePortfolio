import React from "react";

import { EXPERIENCES } from "../../data/experiences";
import { Panel, PanelHeader, PanelTitle } from "../panel";
import { PanelTitleCopy } from "../panel-title-copy";
import { ExperienceItem } from "./experience-item";

export function Experiences() {
  return (
    <Panel id="experience">
      <PanelHeader>
        <PanelTitle>
          <a href="#experience">Experience</a>
          <PanelTitleCopy id="experience" />
        </PanelTitle>
      </PanelHeader>

      <div className="pr-2 pl-4">
        {EXPERIENCES.map((experience) => (
          <ExperienceItem key={experience.id} experience={experience} />
        ))}
      </div>
    </Panel>
  );
}
