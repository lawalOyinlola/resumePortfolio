import { CollapsibleList } from "@/components/collapsible-list";

import { LABS } from "../../data/projects";
import { Panel, PanelHeader, PanelTitle, PanelTitleSup } from "../panel";
import { PanelTitleCopy } from "../panel-title-copy";
import { ProjectItem } from "./project-item";

export function Labs() {
  return (
    <Panel id="labs">
      <PanelHeader>
        <PanelTitle>
          <a href="#labs">Security Labs</a>
          <PanelTitleSup>({LABS.length})</PanelTitleSup>
          <PanelTitleCopy id="labs" />
        </PanelTitle>
      </PanelHeader>

      <CollapsibleList
        items={LABS}
        max={6}
        renderItem={(item) => <ProjectItem project={item} />}
      />
    </Panel>
  );
}
