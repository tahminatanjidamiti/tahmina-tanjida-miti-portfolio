"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import BlogForm from "@/components/modules/Admin/BlogForm";
import { getBlogById, updateBlog } from "@/services/PostServices";
import { Post } from "@/types";
import { toast } from "sonner";
import { Loader } from "lucide-react";


export default function EditBlogPage() {
  const { id } = useParams() as { id: string };
  // console.log(id)
  const router = useRouter();
  const [blog, setBlog] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const data = await getBlogById(id);
        setBlog(data);
      } catch (error) {
        console.error("❌ Failed to fetch blog:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchBlog();
  }, [id]);

  const handleUpdate = async (formData: FormData) => {
    try {
      const result = await updateBlog(id, formData);
      if (result?.id) {
        toast.success("Blog updated successfully!");
        router.push("/dashboard/blogs");
      }

    } catch (error) {
      console.error("❌ Failed to update blog:", error);
    }
  };

  if (loading) return <div className="flex items-center justify-center gap-2 p-4">
    <Loader className="h-8 w-8 animate-spin text-yellow-700" />
    <span className="text-xl font-medium text-yellow-700">Loading...</span>
  </div>;
  if (!blog) return <p className="text-center text-gray-500">Blog not found.</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Edit Blog</h1>
      <BlogForm
        action={handleUpdate}
        title="Edit Blog"
        buttonLabel="Update Blog"
        defaultValues={{
          title: blog.title ?? "",
          content: blog.content ?? "",
          thumbnail: blog.thumbnail ?? "",
          tags: blog.tags?.join(", ") ?? "",
          isFeatured: blog.isFeatured ? "true" : "false",
        }}
      />
    </div>
  );
}