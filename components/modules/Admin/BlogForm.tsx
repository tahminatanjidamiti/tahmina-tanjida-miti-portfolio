/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useEffect } from "react";
import Form from "next/form";
import QuillEditor from "./QuillEditor";
import CloudinaryUpload from "@/components/ui/CloudinaryUpload";


interface BlogFormProps {
  action: (formData: FormData) => Promise<void>;
  defaultValues?: {
    title?: string;
    content?: string;
    thumbnail?: string;
    tags?: string;
    isFeatured?: string;
  };
  buttonLabel?: string;
  title?: string;
}

type BlogFormState = {
  title: string;
  content: string;
  thumbnail: string;
  tags: string;
  isFeatured: string;
};

export default function BlogForm({
  action,
  defaultValues,
  buttonLabel = "Submit",
  title = "Blog Form",
}: BlogFormProps) {
  const [form, setForm] = useState<BlogFormState>({
    title: defaultValues?.title || "",
    content: defaultValues?.content || "",
    thumbnail: defaultValues?.thumbnail || "",
    tags: defaultValues?.tags || "",
    isFeatured: defaultValues?.isFeatured || "false",
  });

  // ✅ Update state when defaultValues change
  useEffect(() => {
    if (!defaultValues) return;

    const newState: BlogFormState = {
      title: defaultValues.title || "",
      content: defaultValues.content || "",
      thumbnail: defaultValues.thumbnail || "",
      tags: defaultValues.tags || "",
      isFeatured: defaultValues.isFeatured || "false",
    };

    // eslint-disable-next-line react-hooks/set-state-in-effect
    setForm((prev) => {
      const changed = Object.keys(newState).some(
        (key) => (newState as any)[key] !== (prev as any)[key]
      );
      return changed ? newState : prev;
    });
  }, [defaultValues]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <Form
      action={action}
      className="max-w-4xl mx-auto p-6 shadow-md rounded-lg space-y-4 w-full"
    >
      <h2 className="text-xl font-semibold mb-4">{title}</h2>

      {/* Title */}
      <div>
        <label className="block text-sm font-medium mb-1" htmlFor="title">
          Title
        </label>
        <input
          type="text"
          id="title"
          name="title"
          value={form.title}
          onChange={handleChange}
          className="w-full rounded-md border px-3 py-2 focus:ring focus:ring-yellow-200"
          required
        />
      </div>

      {/* Content */}
      <div>
        <label className="block text-sm font-medium mb-1">Content</label>
        <QuillEditor
          value={form.content}
          onChange={(val) => setForm((prev) => ({ ...prev, content: val }))}
        />
        <input type="hidden" name="content" value={form.content} />
      </div>

      {/* Thumbnail */}
      <div>
        <label className="block text-sm font-medium mb-1">Thumbnail</label>
        <CloudinaryUpload
          value={form.thumbnail}
          onChange={(url) => setForm((prev) => ({ ...prev, thumbnail: url }))}
          folder="blogs"
        />
        <input type="hidden" name="thumbnail" value={form.thumbnail} />
      </div>

      {/* Tags */}
      <div>
        <label className="block text-sm font-medium mb-1" htmlFor="tags">
          Tags (comma separated)
        </label>
        <input
          type="text"
          id="tags"
          name="tags"
          value={form.tags}
          onChange={handleChange}
          placeholder="Next.js, React, Web Development"
          className="w-full rounded-md border px-3 py-2 focus:ring focus:ring-yellow-200"
        />
      </div>

      {/* Featured */}
      <div>
        <p className="block text-sm font-medium mb-1">Featured</p>
        <div className="flex gap-6">
          <label className="flex items-center gap-2">
            <input
              type="radio"
              name="isFeatured"
              value="true"
              checked={form.isFeatured === "true"}
              onChange={handleChange}
            />
            Yes
          </label>
          <label className="flex items-center gap-2">
            <input
              type="radio"
              name="isFeatured"
              value="false"
              checked={form.isFeatured === "false"}
              onChange={handleChange}
            />
            No
          </label>
        </div>
      </div>

      {/* Submit */}
      <button
        type="submit"
        className="w-full border border-amber-500 bg-yellow-800 font-medium py-2 rounded-md hover:bg-yellow-700 transition"
      >
        {buttonLabel}
      </button>
    </Form>
  );
}