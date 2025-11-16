export const getAllProjects = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/project`, { next: { tags: ["PROJECTS"] } });
  if (!res.ok) throw new Error("Failed to fetch projects");
  const { data: projects } = await res.json();
  return projects;
};

export const getProjectById = async (projectId: string) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/project/${projectId}`);
  return await res.json();
};


export const updateProject = async (projectId: string, formData: FormData) => {
  // console.log("first", projectId, formData)
  const projectInfo = Object.fromEntries(formData.entries());
  const payload = {
    ...projectInfo,
    features: projectInfo.features?.toString().split(",").map((f) => f.trim()) || [],
    isFeatured: Boolean(projectInfo.isFeatured === "true"),
  };
  
  // console.log("Sending project payload:", payload);
  // console.log("URL:", `${process.env.NEXT_PUBLIC_BASE_API}/project/${projectId}`);
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/project/${projectId}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
//  console.log("Response status:", res.status);
  const result = await res.json();
  // console.log("Response body:", result);
  return result;
};

export const deleteProject = async (projectId: string) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/project/${projectId}`, { method: "DELETE" });
  return res.json();
};