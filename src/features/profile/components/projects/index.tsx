import { CollapsibleList } from "@/components/collapsible-list";

import { PROJECTS } from "../../data/projects";
import { Panel, PanelHeader, PanelTitle, PanelTitleSup } from "../panel";
import { PanelTitleCopy } from "../panel-title-copy";
import { ProjectItem } from "./project-item";

export function Projects() {
  return (
    <Panel id="projects">
      <PanelHeader>
        <PanelTitle>
          <a href="#projects">Projects</a>
          <PanelTitleSup>({PROJECTS.length})</PanelTitleSup>
          <PanelTitleCopy id="projects" />
        </PanelTitle>
      </PanelHeader>

      <CollapsibleList
        items={PROJECTS}
        max={6}
        renderItem={(item) => <ProjectItem project={item} />}
      />
    </Panel>
  );
}
