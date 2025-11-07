export const getAllBlogs = async (options?: RequestInit & { next?: { revalidate?: number; tags?: string[] } }) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/post`, {
    // Default behavior: dynamic fetch (no-store)
    cache: "no-store",
    ...options, // override dynamically
  });

  if (!res.ok) {
    throw new Error("Failed to fetch blogs");
  }

  const { data: blogs } = await res.json();
  return blogs;
};
export const getBlogById = async (blogId: string) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/post/${blogId}`);
  return await res.json();
};