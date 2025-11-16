/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { revalidatePath, revalidateTag } from "next/cache";
import { redirect } from "next/navigation";
import sanitizeHtml from "sanitize-html";
import { getUserSession } from "@/helpers/getUserSession";

export const createProject = async (data: FormData) => {
  const session = await getUserSession();
  if (!session || session.user.role !== "ADMIN") throw new Error("Unauthorized");

  const projectInfo = Object.fromEntries(data.entries()) as Record<string, any>;

  const cleanDescription = sanitizeHtml(projectInfo.description?.toString() ?? "", {
    allowedTags: sanitizeHtml.defaults.allowedTags.concat(["img", "h1", "h2", "iframe"]),
    allowedAttributes: {
      ...sanitizeHtml.defaults.allowedAttributes,
      img: ["src", "alt", "width", "height", "style"],
      a: ["href", "target", "rel"],
    },
  });

  const payload = {
    title: projectInfo.title?.toString(),
    description: cleanDescription,
    features: projectInfo.features?.toString().split(",").map((f: string) => f.trim()).filter(Boolean) || [],
    thumbnail: projectInfo.thumbnail?.toString() || null,
    liveSite: projectInfo.liveSite?.toString() || null,
    ClientSite: projectInfo.ClientSite?.toString() || null,
    ServerSite: projectInfo.ServerSite?.toString() || null,
    isFeatured: Boolean(projectInfo.isFeatured === "true"),
    authorId: session?.user?.id,
  };

  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/project`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  const result = await res.json();

  if (result?.id) {
    revalidateTag("PROJECTS", "max");
    revalidatePath("/dashboard/projects");
    redirect("/");
  }

  return result;
};
