/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { revalidatePath, revalidateTag } from "next/cache";
import { redirect } from "next/navigation";
import sanitizeHtml from "sanitize-html";
import { getUserSession } from "@/helpers/getUserSession";

export const createBlog = async (data: FormData) => {

  // console.log("typeof data:", typeof data);
  // console.log("data instanceof FormData:", data instanceof FormData);
  const session = await getUserSession();
  if (!session || session.user.role !== "ADMIN") throw new Error("Unauthorized");
  const blogInfo = Object.fromEntries(data.entries()) as Record<string, any>;

  const cleanContent = sanitizeHtml(blogInfo.content?.toString() ?? "", {
    allowedTags: sanitizeHtml.defaults.allowedTags.concat(["img", "h1", "h2", "iframe"]),
    allowedAttributes: {
      ...sanitizeHtml.defaults.allowedAttributes,
      img: ["src", "alt", "width", "height", "style"],
      a: ["href", "target", "rel"],
    },
  });

  const payload = {
    ...blogInfo,
    content: cleanContent,
    thumbnail: blogInfo.thumbnail?.toString() || null,
    tags: blogInfo.tags?.toString().split(",").map((t: string) => t.trim()).filter(Boolean) || [],
    isFeatured: Boolean(blogInfo.isFeatured === "true"),
    authorId: session?.user?.id,
  };
  // console.log("payload", payload)

  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/post`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  // console.log("response status:", res.status);
  // console.log("response headers:", [...res.headers.entries()]);


  const result = await res.json();
  if (result?.id) {
    revalidateTag("BLOGS", "max");
    revalidatePath("/blogs");
    redirect("/");
  }

  return result;
};
