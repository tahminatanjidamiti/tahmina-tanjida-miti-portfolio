/* eslint-disable @typescript-eslint/no-explicit-any */
import BlogCard from "@/components/modules/Blogs/BlogCard";
import { getAllBlogs } from "@/services/PostServices";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "All Blogs | Next Blog",
  description: "Browse all blog posts on web development, Next.js, React and more. Stay updated with the latest tutorials and articles.",
}

export default async function AllBlogsPage() {
  const blogs = await getAllBlogs({
    cache: "no-store",
  });
  // console.log(blogs)
  return (
    <div>
      <h2 className="text-center my-5 text-4xl">All Blogs</h2>
      <div className="grid grid-cols-3 gap-4 max-w-6xl mx-auto my-5">
        {blogs.map((blog: any) => (<BlogCard key={blog?.id} post={blog} />))}
      </div>
    </div>
  );
};

