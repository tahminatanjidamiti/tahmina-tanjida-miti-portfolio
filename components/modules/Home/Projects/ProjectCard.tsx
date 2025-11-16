import Link from "next/link";
import Image from "next/image";
import { Project } from "@/types";

export default function ProjectCard({ project }: { project: Project }) {
  return (
    <div className="block group transform hover:-translate-y-1 transition-transform duration-300 h-full">
      <div className="bg-linear-to-l from-gray-700 from-5% via-amber-400 to-gray-700 dark:bg-linear-to-l dark:from-gray-900 dark:from-5% dark:via-gray-950 dark:to-gray-900 rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 h-full flex flex-col border border-slate-700/70">
        {project.thumbnail ? (
          <div className="relative h-56 w-full overflow-hidden">
            <Image
              src={project.thumbnail}
              alt={project.title}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-fill group-hover:scale-105 transition-transform duration-300"
            />
          </div>
        ) : (
          <div className="h-56 w-full flex items-center justify-center">
            No Image
          </div>
        )}

        <div className="p-6 flex flex-col grow">
          <h3 className="text-xl font-bold mb-2 dark:group-hover:text-black group-hover:text-white transition-colors">
            {project.title}
          </h3>
          <div className="mb-4 mt-auto">
            <span className="text-sm flex items-center gap-2">
              <Image
                src={
                  project.author?.picture ||
                  "https://cdn-icons-png.flaticon.com/512/9385/9385289.png"
                }
                alt={project.author?.name}
                width={36}
                height={36}
                className="rounded-full border-2 border-gray-200 dark:border-gray-700"
              />
              {project.author?.name}
              {project.author?.isVerified && (
                <span className="text-blue-500">✔</span>
              )}
            </span>
          </div>

          <div
            className="mb-4 line-clamp-4"
            dangerouslySetInnerHTML={{ __html: project.description }}
          />

          <div className="text-sm mb-4">
            <span className="font-bold">Features:</span> {project.features?.map((feature, index) => (
              <div key={index}>● {feature}</div>
            ))}
          </div>

          <div className="flex items-center justify-around mt-2">
            <Link
              href={project.liveSite || "#"}
              className="text-xs font-bold px-6 py-2 rounded-md border border-amber-500 bg-linear-to-b from-gray-700 from-5% via-amber-500 to-gray-700 hover:text-white dark:hover:text-black transition text-center"
              target="_blank"
            >
              {project.liveSite ? "Live" : "N/A"}
            </Link>

            <Link
              href={project.clientSite || "#"}
              className="text-xs font-bold px-4 py-2 rounded-md bg-yellow-700 hover:bg-yellow-800  border border-yellow-900 hover:text-white dark:hover:text-black transition text-center"
              target="_blank"
            >
              {project.clientSite ? "Client" : "N/A"}
            </Link>

            <Link
              href={project.serverSite || "#"}
              className="text-xs font-bold px-4 py-2 rounded-md bg-gray-700 hover:bg-gray-800  border border-gray-900 hover:text-white dark:hover:text-black transition text-center"
              target="_blank"
            >
              {project.serverSite ? "Server" : "N/A"}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}