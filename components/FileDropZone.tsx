"use client";

import { useEffect, useRef, useState } from "react";

/* Click, drag-and-drop and (optionally) paste target for the file tools. */
export default function FileDropZone({
  accept,
  multiple = false,
  onFiles,
  title,
  hint,
  icon = "📁",
  acceptPaste = false,
  compact = false,
}: {
  accept: string;
  multiple?: boolean;
  onFiles: (files: File[]) => void;
  title: string;
  hint?: string;
  icon?: string;
  /* Also take images pasted with Ctrl/Cmd+V anywhere on the page */
  acceptPaste?: boolean;
  compact?: boolean;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragging, setDragging] = useState(false);
  const onFilesRef = useRef(onFiles);
  useEffect(() => {
    onFilesRef.current = onFiles;
  }, [onFiles]);

  useEffect(() => {
    if (!acceptPaste) return;
    const onPaste = (e: ClipboardEvent) => {
      const target = e.target as HTMLElement | null;
      if (target && (target.tagName === "INPUT" || target.tagName === "TEXTAREA" || target.isContentEditable)) return;
      const files = Array.from(e.clipboardData?.files ?? []).filter((f) => f.type.startsWith("image/"));
      if (files.length) {
        e.preventDefault();
        onFilesRef.current(multiple ? files : files.slice(0, 1));
      }
    };
    document.addEventListener("paste", onPaste);
    return () => document.removeEventListener("paste", onPaste);
  }, [acceptPaste, multiple]);

  const take = (list: FileList | null) => {
    const files = Array.from(list ?? []);
    if (files.length) onFiles(multiple ? files : files.slice(0, 1));
  };

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={() => inputRef.current?.click()}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          inputRef.current?.click();
        }
      }}
      onDragOver={(e) => {
        e.preventDefault();
        setDragging(true);
      }}
      onDragLeave={() => setDragging(false)}
      onDrop={(e) => {
        e.preventDefault();
        setDragging(false);
        take(e.dataTransfer.files);
      }}
      className={`border-2 border-dashed rounded-xl text-center cursor-pointer transition-colors ${
        compact ? "p-5" : "p-10"
      } ${dragging ? "border-[#058554] bg-green-50" : "border-gray-300 bg-white hover:border-[#058554] hover:bg-gray-50"}`}
    >
      <input
        ref={inputRef}
        type="file"
        accept={accept}
        multiple={multiple}
        className="hidden"
        onChange={(e) => {
          take(e.target.files);
          e.target.value = "";
        }}
      />
      {!compact && <div className="text-4xl mb-3" aria-hidden>{icon}</div>}
      <p className="font-semibold text-gray-900">{title}</p>
      {hint && <p className="text-sm text-gray-500 mt-1">{hint}</p>}
    </div>
  );
}
