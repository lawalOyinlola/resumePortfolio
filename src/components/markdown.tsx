import ReactMarkdown, { type Components } from "react-markdown";
import rehypeExternalLinks from "rehype-external-links";
import rehypeRaw from "rehype-raw";
import remarkGfm from "remark-gfm";

import { LinkPreview } from "@/components/ui/link-preview";
import { UTM_PARAMS } from "@/config/site";
import { rehypeAddQueryParams } from "@/lib/rehype-add-query-params";

// External links get a hover link-preview; internal / anchor / mailto / tel
// links stay plain. (rehypeAddQueryParams already appended UTM params to the
// href, so LinkPreview previews the same URL the user clicks.)
const components: Components = {
  a({ node, href, children, ...props }) {
    if (href && /^https?:\/\//i.test(href)) {
      return (
        <LinkPreview url={href} className="link text-link">
          {children}
        </LinkPreview>
      );
    }
    return (
      <a href={href} {...props}>
        {children}
      </a>
    );
  },
};

// Use the synchronous Markdown component (not MarkdownAsync): all of our
// plugins run synchronously, and the async variant is an async component that
// can only render on the server — rendering it inside a Client Component
// (e.g. a collapsible experience/project item) throws React error #482.
export function Markdown(props: React.ComponentProps<typeof ReactMarkdown>) {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      rehypePlugins={[
        rehypeRaw,
        [
          rehypeExternalLinks,
          { target: "_blank", rel: "nofollow noopener noreferrer" },
        ],
        [rehypeAddQueryParams, UTM_PARAMS],
      ]}
      components={components}
      {...props}
    />
  );
}
