import { Markdown } from "@/components/markdown";
import { Prose } from "@/components/ui/typography";
import { USER } from "@/features/profile/data/user";

import { Panel, PanelContent, PanelHeader } from "../panel";
import { HelloTitle } from "./hello-title";

export function Hello() {
  return (
    <Panel id="about">
      <PanelHeader>
        <HelloTitle />
      </PanelHeader>

      <PanelContent>
        <Prose>
          <Markdown>{USER.about}</Markdown>
        </Prose>
      </PanelContent>
    </Panel>
  );
}
