import ProjectForm from "@/components/modules/Admin/ProjectForm";
import { createProject } from "@/actions/projects";

export default function CreateProjectPage() {
  const handleCreate = async (formData: FormData) => {
    "use server";
    await createProject(formData);
  };

  return (
    <div className="p-6">
      <ProjectForm
        action={handleCreate}
        title="Create New Project"
        buttonLabel="Create Project"
      />
    </div>
  );
}