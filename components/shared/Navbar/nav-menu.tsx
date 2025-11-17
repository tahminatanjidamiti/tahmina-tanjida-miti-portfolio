"use client";

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { NavigationMenuProps } from "@radix-ui/react-navigation-menu";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { usePathname } from "next/navigation";

export const NavMenu = (props: NavigationMenuProps) => {
  const { data: session, status } = useSession();
  const pathname = usePathname();

  const isAdmin = session?.user?.email === "tahminatanjidamiti@gmail.com";

  if (status === "loading") return null;

  const linkClasses = (path: string) =>
    pathname === path
      ? "active text-yellow-700" 
      : "hover:text-gold transition";

  return (
    <NavigationMenu {...props}>
      <NavigationMenuList className="gap-1 space-x-0 data-[orientation=vertical]:flex-col data-[orientation=vertical]:items-start font-medium">
        
        <NavigationMenuItem>
          <NavigationMenuLink asChild>
            <Link className={linkClasses("/")} href="/">Home</Link>
          </NavigationMenuLink>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavigationMenuLink asChild>
            <Link className={linkClasses("/blogs")} href="/blogs">Blogs</Link>
          </NavigationMenuLink>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavigationMenuLink asChild>
            <Link className={linkClasses("/about")} href="/about">About</Link>
          </NavigationMenuLink>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavigationMenuLink asChild>
            <Link className={linkClasses("/contact")} href="/contact">Contact</Link>
          </NavigationMenuLink>
        </NavigationMenuItem>

        {isAdmin && (
          <NavigationMenuItem>
            <NavigationMenuLink asChild>
              <Link className={linkClasses("/dashboard")} href="/dashboard">
                Dashboard
              </Link>
            </NavigationMenuLink>
          </NavigationMenuItem>
        )}
      </NavigationMenuList>
    </NavigationMenu>
  );
};