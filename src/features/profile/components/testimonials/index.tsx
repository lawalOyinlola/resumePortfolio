import { TESTIMONIALS } from "../../data/testimonials";
import { Panel, PanelHeader, PanelTitle, PanelTitleSup } from "../panel";
import { PanelTitleCopy } from "../panel-title-copy";
import { TestimonialItem } from "./testimonial-item";

const ID = "testimonials";

export function Testimonials() {
  if (TESTIMONIALS.length === 0) {
    return null;
  }

  return (
    <Panel id={ID}>
      <PanelHeader>
        <PanelTitle>
          <a href={`#${ID}`}>Testimonials</a>
          <PanelTitleSup>({TESTIMONIALS.length})</PanelTitleSup>
          <PanelTitleCopy id={ID} />
        </PanelTitle>
      </PanelHeader>

      <ul className="divide-y divide-dashed divide-edge">
        {TESTIMONIALS.map((testimonial, index) => (
          <li key={index}>
            <TestimonialItem testimonial={testimonial} />
          </li>
        ))}
      </ul>
    </Panel>
  );
}
