import { cn } from "@/lib/utils";

interface RichTextRendererProps {
  content: string;
  className?: string;
}

/**
 * Safely renders TipTap/HTML content with proper prose styling.
 * Content is rendered via dangerouslySetInnerHTML — ensure server-side
 * sanitization before passing untrusted user content.
 */
export function RichTextRenderer({
  content,
  className,
}: RichTextRendererProps) {
  if (!content) return null;

  return (
    <div
      className={cn(
        // Prose base
        "prose prose-slate dark:prose-invert max-w-none",
        // Headings
        "prose-headings:font-semibold prose-headings:tracking-tight",
        "prose-h1:text-3xl prose-h2:text-2xl prose-h3:text-xl prose-h4:text-lg",
        // Paragraphs
        "prose-p:text-base prose-p:leading-relaxed",
        // Links
        "prose-a:text-primary prose-a:no-underline prose-a:font-medium hover:prose-a:underline",
        // Code
        "prose-code:text-primary prose-code:bg-primary/10 prose-code:rounded prose-code:px-1 prose-code:py-0.5 prose-code:text-sm prose-code:font-mono prose-code:before:content-none prose-code:after:content-none",
        "prose-pre:bg-muted prose-pre:border prose-pre:rounded-lg prose-pre:overflow-x-auto",
        // Blockquote
        "prose-blockquote:border-l-primary prose-blockquote:text-muted-foreground",
        // Lists
        "prose-ul:my-4 prose-ol:my-4 prose-li:my-1",
        // Images
        "prose-img:rounded-lg prose-img:shadow-sm",
        // Horizontal rule
        "prose-hr:border-border",
        // Strong / em
        "prose-strong:font-semibold prose-em:italic",
        // Tables
        "prose-table:w-full prose-th:text-left prose-th:font-semibold",
        className
      )}
      dangerouslySetInnerHTML={{ __html: content }}
    />
  );
}
