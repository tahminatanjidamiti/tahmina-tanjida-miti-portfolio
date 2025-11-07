import { getAllBlogs } from "@/services/PostServices";
import BlogCard from "../Blogs/BlogCard";
import { Post } from "@/types";
import Link from "next/link";


export default async function FeaturedPosts() {
    const blogs = await getAllBlogs({
        next: { tags: ["BLOGS"] },
    });
    return (
        <div>
            <h2 className="text-center my-10 text-4xl">Featured Blogs</h2>
            <div className="grid grid-cols-3 gap-4 max-w-6xl mx-auto my-5">
                {blogs.slice(0, 3).map((blog: Post) => (<BlogCard key={blog?.id} post={blog} />))}
            </div>
            {/* CTA */}
          <div className="my-5 flex flex-col items-center justify-center sm:flex-row gap-4">
            <Link
              href="/blogs"
              className="inline-flex items-center justify-center px-8 py-4 font-medium rounded-xl border border-amber-500 bg-linear-to-r from-gray-700 from-5% via-amber-500 to-gray-700 transition"
            >
              Explore Blogs
            </Link>
          </div>
        </div>
    )
}
