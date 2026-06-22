import { TECH_STACK } from "../data/tech-stack";
import type { TechStack as TechStackType } from "../types/tech-stack";
import { Panel, PanelHeader, PanelTitle } from "./panel";
import { PanelTitleCopy } from "./panel-title-copy";

const ID = "stack";

export function TechStack() {
  const groups = groupByCategory(TECH_STACK);

  return (
    <Panel id={ID}>
      <PanelHeader>
        <PanelTitle>
          <a href={`#${ID}`}>Stack</a>
          <PanelTitleCopy id={ID} />
        </PanelTitle>
      </PanelHeader>

      <div className="relative [--badge-height:--spacing(6)] [--col-left-width:--spacing(44)]">
        {/* Dotted rule separating the category labels from the badges */}
        <div
          className="pointer-events-none absolute inset-y-0 left-(--col-left-width) -z-1 w-px bg-[linear-gradient(to_bottom,var(--color-edge)_4px,transparent_2px)] bg-size-[1px_6px] bg-repeat-y max-sm:hidden"
          aria-hidden
        />

        {groups.map(([category, items], index) => {
          const categoryId = `${ID}-${slugify(category)}`;

          return (
            <div
              key={category}
              className="grid items-start gap-y-2 border-b border-edge py-4 last:border-none sm:grid-cols-[var(--col-left-width)_1fr]"
            >
              <div
                id={categoryId}
                className="pl-4 text-sm/(--badge-height) text-muted-foreground"
              >
                <span
                  className="mr-1.5 font-mono text-muted-foreground/50 select-none"
                  aria-hidden
                >
                  {(index + 1).toString().padStart(2, "0")}
                </span>
                {category}
              </div>

              <ul
                aria-labelledby={categoryId}
                className="flex flex-wrap gap-1.5 px-4"
              >
                {items.map((item) => (
                  <li key={item.title} className="flex">
                    <a
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex h-(--badge-height) items-center justify-center gap-1.5 rounded-md bg-zinc-50/80 px-1.75 font-mono text-xs text-foreground inset-ring-1 inset-ring-border transition-colors hover:bg-muted dark:bg-zinc-900/80"
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={item.icon}
                        alt=""
                        className="pointer-events-none size-3.5 shrink-0 object-contain"
                        loading="lazy"
                        aria-hidden
                      />
                      {item.title}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>
    </Panel>
  );
}

/** Group items by their `category`, preserving first-appearance order. */
function groupByCategory(items: TechStackType[]): [string, TechStackType[]][] {
  const map = new Map<string, TechStackType[]>();

  for (const item of items) {
    const category = item.category ?? "Other";
    const bucket = map.get(category);
    if (bucket) {
      bucket.push(item);
    } else {
      map.set(category, [item]);
    }
  }

  return [...map.entries()];
}

function slugify(value: string) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}
