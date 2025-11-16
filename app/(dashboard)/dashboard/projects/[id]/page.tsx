"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import ProjectForm from "@/components/modules/Admin/ProjectForm";
import { getProjectById, updateProject } from "@/services/ProjectServices";
import { toast } from "sonner";
import { Project } from "@/types";
import { Loader } from "lucide-react";

export default function EditProjectPage() {
  const { id } = useParams() as { id: string };
  const router = useRouter();
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const data = await getProjectById(id);
        setProject(data);
      } catch (error) {
        console.error("❌ Failed to fetch project:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProject();
  }, [id]);

  const handleUpdate = async (formData: FormData) => {
    try {
      const result = await updateProject(id, formData);
      if (result?.id) {
        toast.success("Project updated successfully!");
        router.push("/");
      }
    } catch (error) {
      console.error("❌ Failed to update project:", error);
    }
  };

  if (loading) return <div className="flex items-center justify-center gap-2 p-4">
      <Loader className="h-8 w-8 animate-spin text-yellow-700" />
      <span className="text-xl font-medium text-yellow-700">Loading...</span>
    </div>;
  if (!project) return <p className="text-center text-gray-500">Project not found.</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Edit Project</h1>
      <ProjectForm
        action={handleUpdate}
        title="Edit Project"
        buttonLabel="Update Project"
        defaultValues={{
          title: project.title ?? "",
          description: project.description ?? "",
          thumbnail: project.thumbnail ?? "",
          features: project.features?.join(", ") ?? "",
          liveSite: project.liveSite ?? "",
          clientSite: project.clientSite ?? "",
          serverSite: project.serverSite ?? "",
          isFeatured: project.isFeatured ? "true" : "false",
        }}
      />
    </div>
  );
}