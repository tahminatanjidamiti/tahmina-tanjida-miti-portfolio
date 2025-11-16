import BlogForm from "@/components/modules/Admin/BlogForm";
import { createBlog } from "@/actions/blogs";

export default function CreateBlogPage() {
  const handleCreate = async (formData: FormData) => {
    "use server";
    await createBlog(formData);
  };

  return (
    <div className="p-6">
      <BlogForm
        action={handleCreate}
        title="Create New Blog"
        buttonLabel="Create Blog"
      />
    </div>
  );
}