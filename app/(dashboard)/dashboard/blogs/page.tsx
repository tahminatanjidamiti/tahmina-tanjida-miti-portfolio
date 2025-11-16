"use client";

import { useEffect, useState } from "react";
import { getAllBlogs, deleteBlog } from "@/services/PostServices";
import { useRouter } from "next/navigation";
import EntityTable from "@/components/modules/Admin/EntityTable";


export default function BlogsDashboard() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [blogs, setBlogs] = useState<any[]>([]);
  const router = useRouter();

  useEffect(() => {
    getAllBlogs().then(setBlogs).catch(console.error);
  }, []);

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this blog?")) return;
    await deleteBlog(String(id));
    setBlogs(blogs.filter((b) => b.id !== id));
  };
   if (!blogs) {
    return <p className="text-center text-gray-500">Loading</p>;
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Blogs</h1>
      <button
        className="mb-4 bg-yellow-700 py-2 px-4 rounded-md border border-amber-500"
        onClick={() => router.push("/dashboard/blogs/create-blog")}
      >
        Create Blog
      </button>
      <EntityTable
        data={blogs}
        columns={[
          { key: "title", label: "Title" },
          { key: "tags", label: "Tags" },
          { key: "isFeatured", label: "Featured" },
        ]}
        onEdit={(item) => router.push(`/dashboard/blogs/${item.id}`)}
        onDelete={handleDelete}
      />
    </div>
  );
}
