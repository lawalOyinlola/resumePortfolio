import { GlobeIcon, MapPinIcon, MarsIcon, VenusIcon } from "lucide-react";

import { USER } from "@/features/profile/data/user";
import { urlToName } from "@/utils/url";

import { Panel, PanelContent } from "../panel";
import { CurrentLocalTimeItem } from "./current-local-time-item";
import { EmailItem } from "./email-item";
import { IntroItem } from "./intro-item";
import { JobItem } from "./job-item";
import { PhoneItem } from "./phone-item";

export function Overview() {
  return (
    <Panel className="after:hidden">
      <h2 className="sr-only">Overview</h2>

      <PanelContent className="relative grid gap-x-4 gap-y-2.5 sm:grid-cols-2">
        {USER.jobs.map((job, index) => {
          return (
            <JobItem
              key={index}
              className="sm:col-span-2"
              title={job.title}
              company={job.company}
              website={job.website}
            />
          );
        })}

        <IntroItem icon={MapPinIcon} content={USER.address} />

        <CurrentLocalTimeItem timeZone={USER.timeZone} />

        <PhoneItem phoneNumber={USER.phoneNumber} />

        <EmailItem email={USER.email} />

        <IntroItem
          icon={GlobeIcon}
          content={`${urlToName(USER.website)} [View Portfolio]`}
          href={USER.website}
        />

        <IntroItem
          icon={USER.gender === "male" ? MarsIcon : VenusIcon}
          content={USER.pronouns}
        />

        {/* Dotted divider between the two columns (desktop only) */}
        <div
          className="pointer-events-none absolute inset-y-4 left-1/2 -z-1 w-px -translate-x-2 bg-[linear-gradient(to_bottom,var(--color-edge)_4px,transparent_2px)] bg-size-[1px_6px] bg-repeat-y max-sm:hidden"
          aria-hidden
        />
      </PanelContent>
    </Panel>
  );
}
