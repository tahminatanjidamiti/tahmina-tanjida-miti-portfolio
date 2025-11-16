/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState, useEffect, useRef, useMemo } from "react";
import dynamic from "next/dynamic";
import "react-quill-new/dist/quill.snow.css";

const ReactQuill = dynamic(() => import("react-quill-new"), { ssr: false }) as any;

type QuillEditorProps = {
  value?: string;
  onChange?: (html: string) => void;
  type?: "blog" | "project";
};

export default function QuillEditor({
  value = "",
  onChange,
  type = "blog",
}: QuillEditorProps) {
  // internal state so editor works smoothly, but sync with incoming prop
  const [content, setContent] = useState<string>(value);
  const quillRef = useRef<any>(null);

  // Sync internal state when parent provides a different value (important for Edit)
  useEffect(() => {
    if (value !== content) {
      setContent(value);
      // also update editor contents if already mounted
      const quill = quillRef.current?.editor;
      if (quill && typeof value === "string") {
        const current = quill.root.innerHTML;
        if (current !== value) {
          quill.root.innerHTML = value;
        }
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  const modules = useMemo(
    () => ({
      toolbar: {
        container: [
          [{ header: [1, 2, 3, false] }],
          ["bold", "italic", "underline", "strike"],
          [{ list: "ordered" }, { list: "bullet" }],
          ["blockquote", "code-block"],
          ["link", "image"],
          [{ align: [] }],
          ["clean"],
        ],
        handlers: {
          image: async () => {
            if (typeof document === "undefined") return;
            const input = document.createElement("input");
            input.type = "file";
            input.accept = "image/*";
            input.click();

            input.onchange = async () => {
              const file = input.files?.[0];
              if (!file) return;

              const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
              const preset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;
              const folder = type === "blog" ? "blogs" : "projects";

              if (!cloudName || !preset) {
                console.error("Cloudinary env variables missing");
                return;
              }

              const url = `https://api.cloudinary.com/v1_1/${cloudName}/upload`;
              const formData = new FormData();
              formData.append("file", file);
              formData.append("upload_preset", preset);
              formData.append("folder", folder);

              const res = await fetch(url, { method: "POST", body: formData });
              if (!res.ok) return console.error(await res.text());

              const data = await res.json();
              const quill = quillRef.current?.editor;
              const range = quill.getSelection(true);
              quill.insertEmbed(range.index, "image", data.secure_url);
              quill.setSelection(range.index + 1);
            };
          },
        },
      },
    }),
    [type]
  );

  const handleChange = (html: string) => {
    setContent(html);
    onChange?.(html);
  };

  return (
    <ReactQuill
      ref={quillRef}
      theme="snow"
      value={content}
      onChange={handleChange}
      modules={modules}
    />
  );
}
