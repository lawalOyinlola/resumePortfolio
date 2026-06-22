"use client";

import { ClockIcon } from "lucide-react";
import { useEffect, useState } from "react";

import { IntroItem } from "./intro-item";

function computeClock(timeZone: string) {
  const now = new Date();

  const time = new Intl.DateTimeFormat("en-US", {
    timeZone,
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  }).format(now);

  // tz offset = (tz wall clock) − (UTC wall clock), each read back as a local
  // Date. In minutes, positive = east of UTC.
  const viewerOffset = -now.getTimezoneOffset();
  const targetOffset =
    (new Date(now.toLocaleString("en-US", { timeZone })).getTime() -
      new Date(now.toLocaleString("en-US", { timeZone: "UTC" })).getTime()) /
    60000;

  const hoursDiff = Math.abs(targetOffset - viewerOffset) / 60;
  const diff =
    hoursDiff < 1
      ? "same time"
      : `${Math.floor(hoursDiff)}h ${targetOffset > viewerOffset ? "ahead" : "behind"}`;

  return { time, diff };
}

export function CurrentLocalTimeItem({ timeZone }: { timeZone: string }) {
  const [clock, setClock] = useState<{ time: string; diff: string } | null>(
    null
  );

  useEffect(() => {
    const update = () => setClock(computeClock(timeZone));
    update();
    const interval = setInterval(update, 60_000);
    return () => clearInterval(interval);
  }, [timeZone]);

  return (
    <IntroItem
      icon={ClockIcon}
      content={
        clock ? (
          <>
            {clock.time}
            <span className="ml-1 text-muted-foreground">// {clock.diff}</span>
          </>
        ) : (
          "--:-- --"
        )
      }
    />
  );
}
