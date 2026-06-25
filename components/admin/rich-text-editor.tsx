"use client";

import * as React from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import Link from "@tiptap/extension-link";
import Image from "@tiptap/extension-image";
import Placeholder from "@tiptap/extension-placeholder";
import Highlight from "@tiptap/extension-highlight";
import {
  Bold,
  Italic,
  UnderlineIcon,
  Strikethrough,
  Heading1,
  Heading2,
  Heading3,
  List,
  ListOrdered,
  Link2,
  ImageIcon,
  Quote,
  Code2,
  Undo2,
  Redo2,
  Minus,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

// ─── Toolbar button ───────────────────────────────────────────────────────────

interface ToolbarButtonProps {
  onClick: () => void;
  isActive?: boolean;
  disabled?: boolean;
  tooltip: string;
  children: React.ReactNode;
}

function ToolbarButton({ onClick, isActive, disabled, tooltip, children }: ToolbarButtonProps) {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          type="button"
          variant="ghost"
          size="icon"
          className={cn(
            "h-7 w-7 rounded",
            isActive && "bg-accent text-accent-foreground"
          )}
          onClick={onClick}
          disabled={disabled}
        >
          {children}
        </Button>
      </TooltipTrigger>
      <TooltipContent side="bottom" className="text-xs">
        {tooltip}
      </TooltipContent>
    </Tooltip>
  );
}

// ─── Props ────────────────────────────────────────────────────────────────────

interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
  minHeight?: number;
}

// ─── Component ────────────────────────────────────────────────────────────────

export function RichTextEditor({
  value,
  onChange,
  placeholder = "Start writing…",
  className,
  minHeight = 300,
}: RichTextEditorProps) {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: { levels: [1, 2, 3] },
      }),
      Underline,
      Link.configure({
        openOnClick: false,
        HTMLAttributes: { rel: "noopener noreferrer", target: "_blank" },
      }),
      Image.configure({ inline: false }),
      Placeholder.configure({ placeholder }),
      Highlight,
    ],
    content: value,
    editorProps: {
      attributes: {
        class: cn(
          "prose prose-sm dark:prose-invert max-w-none focus:outline-none px-4 py-3",
          "prose-headings:font-semibold prose-headings:tracking-tight",
          "prose-a:text-primary prose-a:no-underline hover:prose-a:underline",
          "prose-code:bg-muted prose-code:rounded prose-code:px-1 prose-code:text-sm prose-code:before:content-none prose-code:after:content-none",
          "prose-blockquote:border-l-primary"
        ),
      },
    },
    onUpdate({ editor }) {
      onChange(editor.getHTML());
    },
  });

  // Sync external value changes (e.g. when loading edit form data)
  React.useEffect(() => {
    if (editor && value !== editor.getHTML()) {
      editor.commands.setContent(value, false);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  const setLink = React.useCallback(() => {
    if (!editor) return;
    const prev = editor.getAttributes("link").href as string | undefined;
    const url = window.prompt("Enter URL:", prev ?? "https://");
    if (url === null) return;
    if (url === "") {
      editor.chain().focus().extendMarkRange("link").unsetLink().run();
    } else {
      editor.chain().focus().extendMarkRange("link").setLink({ href: url }).run();
    }
  }, [editor]);

  const addImage = React.useCallback(() => {
    if (!editor) return;
    const url = window.prompt("Enter image URL:");
    if (url) editor.chain().focus().setImage({ src: url }).run();
  }, [editor]);

  if (!editor) return null;

  return (
    <TooltipProvider delayDuration={300}>
      <div className={cn("overflow-hidden rounded-lg border border-input bg-background", className)}>
        {/* Toolbar */}
        <div className="flex flex-wrap items-center gap-0.5 border-b border-border bg-muted/40 px-2 py-1.5">
          {/* Text formatting */}
          <ToolbarButton
            tooltip="Bold (⌘B)"
            onClick={() => editor.chain().focus().toggleBold().run()}
            isActive={editor.isActive("bold")}
          >
            <Bold className="h-3.5 w-3.5" />
          </ToolbarButton>
          <ToolbarButton
            tooltip="Italic (⌘I)"
            onClick={() => editor.chain().focus().toggleItalic().run()}
            isActive={editor.isActive("italic")}
          >
            <Italic className="h-3.5 w-3.5" />
          </ToolbarButton>
          <ToolbarButton
            tooltip="Underline (⌘U)"
            onClick={() => editor.chain().focus().toggleUnderline().run()}
            isActive={editor.isActive("underline")}
          >
            <UnderlineIcon className="h-3.5 w-3.5" />
          </ToolbarButton>
          <ToolbarButton
            tooltip="Strikethrough"
            onClick={() => editor.chain().focus().toggleStrike().run()}
            isActive={editor.isActive("strike")}
          >
            <Strikethrough className="h-3.5 w-3.5" />
          </ToolbarButton>

          <Separator orientation="vertical" className="mx-1 h-4" />

          {/* Headings */}
          <ToolbarButton
            tooltip="Heading 1"
            onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
            isActive={editor.isActive("heading", { level: 1 })}
          >
            <Heading1 className="h-3.5 w-3.5" />
          </ToolbarButton>
          <ToolbarButton
            tooltip="Heading 2"
            onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
            isActive={editor.isActive("heading", { level: 2 })}
          >
            <Heading2 className="h-3.5 w-3.5" />
          </ToolbarButton>
          <ToolbarButton
            tooltip="Heading 3"
            onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
            isActive={editor.isActive("heading", { level: 3 })}
          >
            <Heading3 className="h-3.5 w-3.5" />
          </ToolbarButton>

          <Separator orientation="vertical" className="mx-1 h-4" />

          {/* Lists */}
          <ToolbarButton
            tooltip="Bullet list"
            onClick={() => editor.chain().focus().toggleBulletList().run()}
            isActive={editor.isActive("bulletList")}
          >
            <List className="h-3.5 w-3.5" />
          </ToolbarButton>
          <ToolbarButton
            tooltip="Ordered list"
            onClick={() => editor.chain().focus().toggleOrderedList().run()}
            isActive={editor.isActive("orderedList")}
          >
            <ListOrdered className="h-3.5 w-3.5" />
          </ToolbarButton>

          <Separator orientation="vertical" className="mx-1 h-4" />

          {/* Embeds */}
          <ToolbarButton
            tooltip="Insert link"
            onClick={setLink}
            isActive={editor.isActive("link")}
          >
            <Link2 className="h-3.5 w-3.5" />
          </ToolbarButton>
          <ToolbarButton tooltip="Insert image" onClick={addImage}>
            <ImageIcon className="h-3.5 w-3.5" />
          </ToolbarButton>

          <Separator orientation="vertical" className="mx-1 h-4" />

          {/* Blocks */}
          <ToolbarButton
            tooltip="Blockquote"
            onClick={() => editor.chain().focus().toggleBlockquote().run()}
            isActive={editor.isActive("blockquote")}
          >
            <Quote className="h-3.5 w-3.5" />
          </ToolbarButton>
          <ToolbarButton
            tooltip="Code block"
            onClick={() => editor.chain().focus().toggleCodeBlock().run()}
            isActive={editor.isActive("codeBlock")}
          >
            <Code2 className="h-3.5 w-3.5" />
          </ToolbarButton>
          <ToolbarButton
            tooltip="Horizontal rule"
            onClick={() => editor.chain().focus().setHorizontalRule().run()}
          >
            <Minus className="h-3.5 w-3.5" />
          </ToolbarButton>

          <Separator orientation="vertical" className="mx-1 h-4" />

          {/* History */}
          <ToolbarButton
            tooltip="Undo (⌘Z)"
            onClick={() => editor.chain().focus().undo().run()}
            disabled={!editor.can().undo()}
          >
            <Undo2 className="h-3.5 w-3.5" />
          </ToolbarButton>
          <ToolbarButton
            tooltip="Redo (⌘⇧Z)"
            onClick={() => editor.chain().focus().redo().run()}
            disabled={!editor.can().redo()}
          >
            <Redo2 className="h-3.5 w-3.5" />
          </ToolbarButton>
        </div>

        {/* Editor area */}
        <EditorContent
          editor={editor}
          style={{ minHeight }}
          className="focus-within:ring-0"
        />
      </div>
    </TooltipProvider>
  );
}
