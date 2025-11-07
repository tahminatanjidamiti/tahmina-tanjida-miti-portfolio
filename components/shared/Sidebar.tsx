"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Home, LogOut, BookCheck, Users, ProjectorIcon } from "lucide-react";
import { signOut, useSession } from "next-auth/react";

export default function Sidebar() {
  const session = useSession();
  return (
    <aside className="flex h-screen w-64 flex-col border-r">
      {/* Top navigation */}
      <nav className="flex-1 space-y-2 p-4">
        <Link
          href="/"
          className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium hover:bg-yellow-200 hover:text-black"
        >
          <Home className="h-4 w-4" />
          Home
        </Link>

        <Link
          href="/dashboard/blogs"
          className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium hover:bg-gray-100 hover:text-black"
        >
          <BookCheck className="h-4 w-4" />
           Blogs
        </Link>
        <Link
          href="/dashboard/projects"
          className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium hover:bg-yellow-200 hover:text-black"
        >
          <ProjectorIcon className="h-4 w-4" />
           Projects
        </Link>
        <Link
          href="/dashboard/users"
          className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium hover:bg-gray-100 hover:text-black"
        >
          <Users className="h-4 w-4" />
           Users
        </Link>
      </nav>

      {/* Bottom action */}
      <div className="p-4 border-t border-gray-500">
        {session.status === "authenticated" && (
          <Button
            className="w-full justify-start gap-2 cursor-pointer bg-yellow-800 hover:bg-yellow-700 transition border-2 border-amber-500"
            onClick={() => signOut()}
          >
            <LogOut className="h-4 w-4" />
            Logout
          </Button>
        )}
      </div>
    </aside>
  );
}
