"use client";

import {
  AwardIcon,
  BriefcaseBusinessIcon,
  CircleCheckBigIcon,
  CornerDownLeftIcon,
  DownloadIcon,
  FileTextIcon,
  FolderGitIcon,
  LayersIcon,
  MonitorIcon,
  MoonStarIcon,
  QuoteIcon,
  SearchIcon,
  ShapesIcon,
  SunMediumIcon,
  UserIcon,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useMemo, useState } from "react";
import { toast } from "sonner";

import { getMarkSVG, OyinnMark } from "@/components/oyinn-mark";
import { useTheme } from "@/components/theme-provider";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandShortcut,
} from "@/components/ui/command";
import { Kbd, KbdGroup } from "@/components/ui/kbd";
import { RESUME_DOWNLOADS, UTM_PARAMS } from "@/config/site";
import { SOCIAL_LINKS } from "@/features/profile/data/social-links";
import { addQueryParams } from "@/utils/url";

import { Button } from "./ui/button";

type CommandKind = "page" | "link" | "command";

type CommandLinkItem = {
  id: string;
  title: string;
  kind: CommandKind;
  icon?: React.ReactElement;
  iconImage?: string;
  /** Static chord hint, e.g. "GS" (press G then S). */
  shortcut?: string;
  /** Where the chord/keyboard nav goes (hash or path). */
  target?: string;
  keywords?: string[];
  run: () => void;
};

const ENTER_ACTION_LABELS: Record<CommandKind, string> = {
  page: "Go to Section",
  link: "Open Link",
  command: "Run Command",
};

export function CommandMenu() {
  const router = useRouter();
  const { setTheme } = useTheme();

  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");
  const [isMac, setIsMac] = useState(false);

  useEffect(() => {
    setIsMac(/mac/i.test(navigator.userAgent));
  }, []);

  const navigate = useCallback(
    (target: string) => {
      setOpen(false);
      requestAnimationFrame(() => {
        if (target.startsWith("#")) {
          window.location.hash = target;
        } else {
          router.push(target);
        }
      });
    },
    [router]
  );

  const openExternal = useCallback((href: string) => {
    setOpen(false);
    window.open(href, "_blank", "noopener,noreferrer");
  }, []);

  const items = useMemo<Record<string, CommandLinkItem[]>>(() => {
    const menu: CommandLinkItem[] = [
      {
        id: "home",
        title: "Home",
        kind: "page",
        icon: <OyinnMark />,
        shortcut: "GH",
        target: "/",
        run: () => navigate("/"),
      },
    ];

    const sections: {
      id: string;
      title: string;
      icon: React.ReactElement;
      shortcut: string;
    }[] = [
      { id: "about", title: "About", icon: <UserIcon />, shortcut: "GA" },
      { id: "stack", title: "Stack", icon: <LayersIcon />, shortcut: "GS" },
      {
        id: "experience",
        title: "Experience",
        icon: <BriefcaseBusinessIcon />,
        shortcut: "GE",
      },
      {
        id: "projects",
        title: "Projects",
        icon: <FolderGitIcon />,
        shortcut: "GP",
      },
      {
        id: "awards",
        title: "Honors & Awards",
        icon: <AwardIcon />,
        shortcut: "GW",
      },
      {
        id: "certs",
        title: "Certifications",
        icon: <CircleCheckBigIcon />,
        shortcut: "GC",
      },
      {
        id: "testimonials",
        title: "Testimonials",
        icon: <QuoteIcon />,
        shortcut: "GT",
      },
      { id: "brand", title: "Brand", icon: <ShapesIcon />, shortcut: "GB" },
    ];

    const portfolio: CommandLinkItem[] = sections.map((section) => ({
      id: `section-${section.id}`,
      title: section.title,
      kind: "page",
      icon: section.icon,
      shortcut: section.shortcut,
      target: `#${section.id}`,
      run: () => navigate(`#${section.id}`),
    }));

    const connect: CommandLinkItem[] = SOCIAL_LINKS.map((link) => ({
      id: `social-${link.title}`,
      title: link.title,
      kind: "link",
      iconImage: link.icon,
      keywords: [link.description ?? ""],
      run: () => openExternal(addQueryParams(link.href, UTM_PARAMS)),
    }));

    const resume: CommandLinkItem[] = RESUME_DOWNLOADS.map((download) => ({
      id: `resume-${download.label}`,
      title: `Download ${download.label} résumé`,
      kind: "command",
      icon: <DownloadIcon />,
      keywords: ["resume", "cv", "pdf", download.label],
      run: () => {
        setOpen(false);
        const anchor = document.createElement("a");
        anchor.href = download.href;
        anchor.download = download.filename;
        document.body.appendChild(anchor);
        anchor.click();
        anchor.remove();
      },
    }));

    const brand: CommandLinkItem[] = [
      {
        id: "copy-mark",
        title: "Copy Mark as SVG",
        kind: "command",
        icon: <OyinnMark />,
        keywords: ["brand", "logo", "svg"],
        run: () => {
          setOpen(false);
          navigator.clipboard
            .writeText(getMarkSVG("currentColor"))
            .then(() => toast.success("Mark copied as SVG"))
            .catch(() => toast.error("Could not copy mark"));
        },
      },
    ];

    const theme: CommandLinkItem[] = [
      {
        id: "theme-light",
        title: "Light",
        kind: "command",
        icon: <SunMediumIcon />,
        keywords: ["theme", "mode"],
        run: () => {
          setOpen(false);
          setTheme("light");
        },
      },
      {
        id: "theme-dark",
        title: "Dark",
        kind: "command",
        icon: <MoonStarIcon />,
        keywords: ["theme", "mode"],
        run: () => {
          setOpen(false);
          setTheme("dark");
        },
      },
      {
        id: "theme-system",
        title: "System",
        kind: "command",
        icon: <MonitorIcon />,
        keywords: ["theme", "mode"],
        run: () => {
          setOpen(false);
          setTheme("system");
        },
      },
    ];

    const other: CommandLinkItem[] = [
      {
        id: "other-vcard",
        title: "Download vCard",
        kind: "command",
        icon: <DownloadIcon />,
        keywords: ["contact", "vcard"],
        run: () => navigate("/vcard"),
      },
      {
        id: "other-llms",
        title: "llms.txt",
        kind: "link",
        icon: <FileTextIcon />,
        keywords: ["ai", "llm"],
        run: () => openExternal("/llms.txt"),
      },
    ];

    return {
      Menu: menu,
      "Go to": portfolio,
      Connect: connect,
      Résumé: resume,
      "Brand Assets": brand,
      Theme: theme,
      Other: other,
    };
  }, [navigate, openExternal, setTheme]);

  // value → kind, for the footer action label.
  const kindByValue = useMemo(() => {
    const map = new Map<string, CommandKind>();
    Object.values(items)
      .flat()
      .forEach((item) => map.set(item.id, item.kind));
    return map;
  }, [items]);

  // Global ⌘K / Ctrl+K (toggle) and "g + key" chord navigation.
  useEffect(() => {
    const sectionByKey: Record<string, string> = {
      h: "/",
      a: "#about",
      s: "#stack",
      e: "#experience",
      p: "#projects",
      w: "#awards",
      c: "#certs",
      t: "#testimonials",
      b: "#brand",
    };

    let gPressedAt = 0;

    const isTyping = (target: EventTarget | null) => {
      const el = target as HTMLElement | null;
      return (
        !!el &&
        (el.isContentEditable ||
          ["INPUT", "TEXTAREA", "SELECT"].includes(el.tagName))
      );
    };

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key.toLowerCase() === "k" && (event.metaKey || event.ctrlKey)) {
        event.preventDefault();
        setOpen((prev) => !prev);
        return;
      }

      if (open || isTyping(event.target) || event.metaKey || event.ctrlKey) {
        return;
      }

      const key = event.key.toLowerCase();
      if (key === "g") {
        gPressedAt = Date.now();
        return;
      }

      if (Date.now() - gPressedAt < 800 && sectionByKey[key]) {
        gPressedAt = 0;
        navigate(sectionByKey[key]);
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open, navigate]);

  const activeKind = kindByValue.get(value) ?? "page";

  return (
    <>
      <Button
        data-slot="command-menu-trigger"
        variant="outline"
        size="sm"
        onClick={() => setOpen(true)}
        className="gap-1.5 rounded-full pl-2 text-muted-foreground shadow-none select-none hover:text-foreground"
      >
        <SearchIcon className="size-4" />
        <span className="font-sans text-sm/4 font-medium sm:hidden">
          Search…
        </span>
        <KbdGroup className="hidden sm:flex">
          <Kbd className="w-5 min-w-5">{isMac ? "⌘" : "Ctrl"}</Kbd>
          <Kbd className="w-5 min-w-5">K</Kbd>
        </KbdGroup>
      </Button>

      <CommandDialog
        open={open}
        onOpenChange={setOpen}
        value={value}
        onValueChange={setValue}
      >
        <CommandInput placeholder="Type a command or search…" />

        <div className="rounded-xl bg-background ring-1 ring-edge">
          <CommandList className="min-h-72">
            <CommandEmpty>No results found.</CommandEmpty>

            {Object.entries(items).map(([heading, links]) => (
              <CommandGroup key={heading} heading={heading}>
                {links.map((link) => (
                  <CommandItem
                    key={link.id}
                    value={link.id}
                    keywords={[link.title, heading, ...(link.keywords ?? [])]}
                    onSelect={link.run}
                  >
                    {link.iconImage ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={link.iconImage}
                        alt=""
                        className="size-4 rounded-sm"
                        aria-hidden
                      />
                    ) : (
                      link.icon
                    )}

                    <span className="line-clamp-1">{link.title}</span>

                    {link.shortcut && (
                      <CommandShortcut>{link.shortcut}</CommandShortcut>
                    )}
                  </CommandItem>
                ))}
              </CommandGroup>
            ))}
          </CommandList>
        </div>

        {/* Footer bar */}
        <div className="flex h-10 items-center justify-between gap-2 px-3 text-xs font-medium text-muted-foreground">
          <OyinnMark className="h-3 w-auto opacity-70" />

          <div className="flex items-center gap-2 max-sm:hidden">
            <span>{ENTER_ACTION_LABELS[activeKind]}</span>
            <Kbd>
              <CornerDownLeftIcon />
            </Kbd>
          </div>
        </div>
      </CommandDialog>
    </>
  );
}
