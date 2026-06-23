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

  const minutesDiff = Math.abs(targetOffset - viewerOffset);
  const hours = Math.floor(minutesDiff / 60);
  const minutes = minutesDiff % 60;
  const direction = targetOffset > viewerOffset ? "ahead" : "behind";
  const diff =
    minutesDiff < 60
      ? "same time"
      : `${hours}h${minutes > 0 ? ` ${minutes}m` : ""} ${direction}`;

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
