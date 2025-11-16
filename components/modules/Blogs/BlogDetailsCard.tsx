import { Post } from "@/types";
import Image from "next/image";

export default async function BlogDetailsCard({ blog }: { blog: Post }) {
  if (!blog) {
    return (
      <div className="py-20 text-center text-gray-500">Blog not found.</div>
    );
  }

  return (
    <main
  className="relative max-w-4xl mx-auto py-6 px-4 bg-[url('https://i.ibb.co.com/PswVd4JW/digital-techno-background-with-connecting-lines-dots.jpg')] bg-cover bg-center bg-no-repeat"
>
  <div className="absolute inset-0 bg-black/50" />

  <div className="relative z-10">
    <h1 className="text-5xl font-bold mb-6 text-white">{blog?.title}</h1>

    <div className="flex items-center gap-4 mb-8 text-white">
      <Image
        src={
          blog.author.picture ||
          "https://cdn-icons-png.flaticon.com/512/9385/9385289.png"
        }
        alt={blog?.author?.name}
        width={48}
        height={48}
        className="rounded-full"
      />
      <div>
        <p className="font-semibold">
          {blog.author.name}{" "}
          {blog.author.isVerified && (
            <span className="inline-block ml-1 text-blue-400">✔</span>
          )}
        </p>
        <p className="text-gray-200 text-sm">
          {new Date(blog.createdAt).toLocaleDateString()} • {blog.views} views
        </p>
      </div>
    </div>

    {blog.thumbnail && (
      <div className="relative h-80 w-full overflow-hidden mb-5">
        <Image
          src={blog.thumbnail}
          alt={blog.title}
          fill
          sizes="100vw"
          priority
          className="rounded-lg object-contain shadow-md"
        />
      </div>
    )}

    <article className="prose prose-lg max-w-none text-white">
      <div dangerouslySetInnerHTML={{ __html: blog.content }} />
    </article>
  </div>
</main>
  );
}
