export const getBlogStats = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/post/stats`);
  if (!res.ok) throw new Error("Failed to load blog stats");
  return await res.json();
};

export const getProjectStats = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/project/stats`);
  if (!res.ok) throw new Error("Failed to load project stats");
  return await res.json();
};

