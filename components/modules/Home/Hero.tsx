import Image from "next/image";
import Link from "next/link";

export default async function Hero() {
  return (
    <div className="min-h-screen w-full relative">
      <div
        className="absolute inset-0 z-0"
        style={{
          background:
            "radial-gradient(125% 125% at 50% 100%, #000000 40%, #DAA520 100%)",
        }}
      />

      <section className="relative flex flex-col items-center justify-center text-center text-white">
        <Image
          className="pt-16 rounded-4xl w-70 h-96 object-cover"
          width={300}
          height={300}
          src="https://i.ibb.co.com/xqgY5DnL/tahmina-tanjida-miti-image.png"
          alt="Tahmina Tanjida Miti Image!"
          loading="eager" priority />
        <h1 className="my-2 text-3xl font-bold text-transparent bg-clip-text bg-linear-to-r from-yellow-800 from-45% via-amber-500 to-65% to-yellow-900">Web Developer</h1>
        <p className="mb-2">
          Full-Stack Web Developer skilled in MERN, Next.js, and TypeScript.
        </p>
        <Link
          href="https://drive.google.com/file/d/1V5IpUdXKiEHe-r0XB6CO66Cog5Fr3S3-/view?usp=sharing"
          target="_blank"
          rel="noopener noreferrer"
          className="mb-5 bg-transparent border-2 border-amber-500 px-4 py-2 text-xl mt-1 text-white font-bold hover:bg-gray-700"
        >
          Resume
        </Link>
      </section>
    </div>
  );
}
