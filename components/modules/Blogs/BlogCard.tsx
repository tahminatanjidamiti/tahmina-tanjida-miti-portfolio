import Link from "next/link";
import Image from "next/image";
import { Post } from "@/types";

export default function BlogCard({ post }: { post: Post }) {
  return (
    <Link
      href={`/blogs/${post.id}`}
      className="block group transform hover:-translate-y-1 transition-transform duration-300 h-full"
    >
      <div className="bg-linear-to-l from-gray-600 from-5% via-grey-400 to-gray-800 dark:bg-linear-to-l dark:from-gray-800 dark:from-5% dark:via-gray-950 dark:to-gray-800 rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 h-full flex flex-col border border-slate-700/70">
        {post.thumbnail ? (
          <div className="relative h-56 w-full overflow-hidden">
            <Image
              src={post.thumbnail}
              alt={post.title}
              fill
              loading="eager"
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
          <h3 className="text-xl font-bold mb-2 dark:group-hover:text-black  group-hover:text-white transition-colors">
            {post.title}
          </h3>

          <div
            className="mb-4 line-clamp-3"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          <div className="flex items-center justify-between mb-4 mt-auto">
            <div className="flex items-center gap-2">
              <Image
                src={
                  post.author.picture ||
                  "https://cdn-icons-png.flaticon.com/512/9385/9385289.png"
                }
                alt={post.author.name}
                width={36}
                height={36}
                className="rounded-full border-2 border-gray-200 dark:border-gray-700"
              />
              <span className="text-sm flex items-center gap-1">
                {post.author.name}
                {post.author.isVerified && (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 text-blue-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={3}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                )}
              </span>
            </div>
            <span className="text-gray-200 dark:text-gray-400 text-sm">
              {post.views} views
            </span>
          </div>

          <div className="text-right">
            <span className="text-amber-500 hover:underline">
              Read More →
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
