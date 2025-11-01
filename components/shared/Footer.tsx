import Link from "next/link";
import { Logo } from "./Navbar/logo";

export default function Footer() {

  return (
    <footer className="border-t dark:border-slate-700/70">
      <div className="container mx-auto py-10">
        <div className="p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

          <div><div className="flex justify-start items-center gap-2">
            {/* Logo */}
            <Link href="/" className="shrink-0">
              <Logo />
            </Link>
            <h1 className="font-semibold text-transparent bg-clip-text bg-linear-to-r from-gray-700 from-5% via-amber-500 to-gray-700"><i>TAHMINA TANJIDA MITI</i></h1>
          </div>
            <Link
              href="mailto:tahminatanjidamiti@gmail.com"
              className="hover:text-yellow-600 transition-colors"
            >
              Email: tahminatanjidamiti@gmail.com
            </Link>
            <p>Call Now: +880 1978387924</p></div>
          <div><h2 className="text-xl font-semibold">
            Useful Links
          </h2>
            <div className="flex justify-start items-center gap-4 mt-2">
              <Link href="/blogs" className="hover:text-yellow-600 transition-colors">
                Blogs
              </Link>
              <Link href="#projects" className="hover:text-yellow-600 transition-colors">
                Projects
              </Link>
              <Link href="/about" className="hover:text-yellow-600 transition-colors">
                About
              </Link>
              <Link
                href="/contact"
                className="hover:text-yellow-600 transition-colors"
              >
                Contact
              </Link>
            </div></div>
          <div>
            <h2 className="text-xl font-semibold mb-1">
            Connected With Me!
          </h2>
            <div className="flex justify-start items-center gap-6 text-sm mt-2">
              <Link href="https://www.linkedin.com/in/tahminatanjida" target="_blank" className="p-2 rounded-full bg-yellow-600 hover:bg-yellow-700 transition">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-linkedin-icon lucide-linkedin"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" /><rect width="4" height="12" x="2" y="9" /><circle cx="4" cy="4" r="2" /></svg>
              </Link>
              <Link href="https://github.com/tahminatanjidamiti" target="_blank" className="p-2 rounded-full bg-yellow-600 hover:bg-yellow-700 transition">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-github-icon lucide-github"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" /><path d="M9 18c-4.51 2-5-2-7-2" /></svg>
              </Link>
            </div></div>
        </div>
      </div>
      <div className="text-sm flex justify-center items-center pb-2">
        © {new Date().getFullYear()} Tahmina Tanjida Miti. All rights reserved.
      </div>
    </footer>
  );
}
