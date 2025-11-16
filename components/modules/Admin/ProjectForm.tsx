"use client";

import { useState, useEffect } from "react";
import Form from "next/form";
import QuillEditor from "./QuillEditor";
import CloudinaryUpload from "@/components/ui/CloudinaryUpload";

interface ProjectFormProps {
  action: (formData: FormData) => Promise<void>;
  defaultValues?: {
    title?: string;
    description?: string;
    thumbnail?: string;
    features?: string;
    liveSite?: string;
    clientSite?: string;
    serverSite?: string;
    isFeatured?: string;
  };
  buttonLabel?: string;
  title?: string;
}

export default function ProjectForm({
  action,
  defaultValues,
  buttonLabel = "Submit",
  title = "Project Form",
}: ProjectFormProps) {
  const [form, setForm] = useState({
    title: defaultValues?.title || "",
    description: defaultValues?.description || "",
    thumbnail: defaultValues?.thumbnail || "",
    features: defaultValues?.features || "",
    liveSite: defaultValues?.liveSite || "",
    clientSite: defaultValues?.clientSite || "",
    serverSite: defaultValues?.serverSite || "",
    isFeatured: defaultValues?.isFeatured || "false",
  });

  useEffect(() => {
    if (!defaultValues) return;
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setForm((prev) => ({ ...prev, ...defaultValues }));
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
        <label className="block text-sm font-medium mb-1">Title</label>
        <input
          type="text"
          name="title"
          value={form.title}
          onChange={handleChange}
          required
          className="w-full rounded-md border px-3 py-2 focus:ring focus:ring-yellow-200"
        />
      </div>

      {/* Description */}
      <div>
        <label className="block text-sm font-medium mb-1">Description</label>
        <QuillEditor
          value={form.description}
          onChange={(val) => setForm((prev) => ({ ...prev, description: val }))}
        />
        <input type="hidden" name="description" value={form.description} />
      </div>

      {/* Thumbnail */}
      <div>
        <label className="block text-sm font-medium mb-1">Thumbnail</label>
        <CloudinaryUpload
          value={form.thumbnail}
          onChange={(url) => setForm((prev) => ({ ...prev, thumbnail: url }))}
          folder="projects"
        />
        <input type="hidden" name="thumbnail" value={form.thumbnail} />
      </div>

      {/* Features */}
      <div>
        <label className="block text-sm font-medium mb-1">
          Features (comma separated)
        </label>
        <input
          type="text"
          name="features"
          value={form.features}
          onChange={handleChange}
          className="w-full rounded-md border px-3 py-2 focus:ring focus:ring-yellow-200"
        />
      </div>

      {/* Links */}
      <div className="space-y-2">
        <label className="block text-sm font-medium mb-1">Links</label>
        <input
          type="url"
          name="liveSite"
          placeholder="Live Site"
          value={form.liveSite}
          onChange={handleChange}
          className="w-full border rounded-md px-3 py-2"
        />
        <input
          type="url"
          name="clientSite"
          placeholder="Client Repo"
          value={form.clientSite}
          onChange={handleChange}
          className="w-full border rounded-md px-3 py-2"
        />
        <input
          type="url"
          name="serverSite"
          placeholder="Server Repo"
          value={form.serverSite}
          onChange={handleChange}
          className="w-full border rounded-md px-3 py-2"
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