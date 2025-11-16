export const getAllBlogs = async (options?: RequestInit & { next?: { revalidate?: number; tags?: string[] } }) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/post`, {
    cache: "no-store",
    ...options,
  });

  const { data: blogs } = await res.json();
  return blogs;
};

export const getBlogById = async (blogId: string) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/post/${blogId}`);
  return await res.json();
};


export const updateBlog = async (blogId: string, formData: FormData) => {
  const blogInfo = Object.fromEntries(formData.entries());
  const payload = {
    ...blogInfo,
    tags: blogInfo.tags?.toString().split(",").map((t) => t.trim()) || [],
    isFeatured: Boolean(blogInfo.isFeatured === "true"),
  };


  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/post/${blogId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  const result = await res.json();
  return result;
};

export const deleteBlog = async (blogId: string) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/post/${blogId}`, { method: "DELETE" });
  return res.json();
};