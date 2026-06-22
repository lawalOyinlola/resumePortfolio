import { CollapsibleList } from "@/components/collapsible-list";

import { CERTIFICATIONS } from "../../data/certifications";
import { Panel, PanelHeader, PanelTitle, PanelTitleSup } from "../panel";
import { PanelTitleCopy } from "../panel-title-copy";
import { CertificationItem } from "./certification-item";

export function Certifications() {
  return (
    <Panel id="certs">
      <PanelHeader>
        <PanelTitle>
          <a href="#certs">Certifications</a>
          <PanelTitleSup>({CERTIFICATIONS.length})</PanelTitleSup>
          <PanelTitleCopy id="certs" />
        </PanelTitle>
      </PanelHeader>

      <CollapsibleList
        items={CERTIFICATIONS}
        max={8}
        renderItem={(item) => <CertificationItem certification={item} />}
      />
    </Panel>
  );
}
