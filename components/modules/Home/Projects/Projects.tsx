import { getAllProjects } from "@/services/ProjectServices";
import ProjectCard from "./ProjectCard";
import { Project } from "@/types";


export default async function Projects() {
    const projects = await getAllProjects();
    return (
        <div id="projects">
            <h2 className="text-center mt-10 text-4xl">My Recent Projects</h2>
            <p className="text-center mt-4 mb-10 text-gray-500 w-full md:w-6/12 mx-auto">Built these modern web platforms—ride booking, scholarship management, and hotel reservation—featuring secure authentication, dashboards, payments, maps, and dynamic user experiences with responsive, scalable architecture.</p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-6xl mx-auto my-5 items-stretch">
                {projects.map((project: Project) => (<ProjectCard key={project?.id} project={project} />))}
            </div>
          
        </div>
    )
}
