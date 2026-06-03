import dynamic from "next/dynamic";

import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { ResumeDownload } from "@/features/profile/components/resume-download";

const ScrollTop = dynamic(() =>
  import("@/components/scroll-top").then((mod) => mod.ScrollTop)
);

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <SiteHeader />
      <main className="max-w-screen overflow-x-hidden px-2">{children}</main>
      <SiteFooter />
      <ScrollTop />
      <ResumeDownload />
    </>
  );
}
