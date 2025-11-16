"use client";

import { useEffect, useState } from "react";
import { getAllProjects, deleteProject } from "@/services/ProjectServices";
import { useRouter } from "next/navigation";
import EntityTable from "@/components/modules/Admin/EntityTable";

export default function ProjectsDashboard() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [projects, setProjects] = useState<any[]>([]);
  const router = useRouter();

  useEffect(() => {
    getAllProjects().then(setProjects).catch(console.error);
  }, []);

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this project?")) return;
    await deleteProject(String(id));
    setProjects(projects.filter((p) => p.id !== id));
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Projects</h1>
      <button
        className="mb-4 bg-yellow-700 py-2 px-4 rounded-md border border-amber-500"
        onClick={() => router.push("/dashboard/projects/create-project")}
      >
        Create Project
      </button>
      <EntityTable
        data={projects}
        columns={[
          { key: "title", label: "Title" },
          { key: "features", label: "Features" },
          { key: "isFeatured", label: "Featured" },
        ]}
        onEdit={(item) => router.push(`/dashboard/projects/${item.id}`)}
        onDelete={handleDelete}
      />
    </div>
  );
}