"use client";

import Image from "next/image";
import Marquee from "react-fast-marquee";
import { Typewriter } from "react-simple-typewriter";

export default function AboutMe() {
  return (
    <div className="relative p-6 w-10/12 mx-auto mb-10">
      <h1 className="text-3xl font-extrabold my-6 text-center pt-6">About Me</h1>
      <div className="mb-16 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h2 className="text-3xl font-bold mt-2 md:mt-16 mb-2">
          My{" "}
          <span className="text-transparent bg-clip-text bg-linear-to-r from-gray-700 from-5% via-amber-500 to-gray-700">
            <Typewriter
              words={["Interest!", "Skills!"]}
              loop={false}
              cursor
              cursorStyle="_"
              typeSpeed={70}
              deleteSpeed={40}
              delaySpeed={1200}
            />
          </span>
        </h2>
        <h2 className="text-2xl font-semibold mb-2">
          My Programming Journey
        </h2>

        <p className="leading-relaxed w-10/12">
          I started my programming journey with a passion for solving problems
          and creating dynamic web applications. Over time, I honed my skills in
          technologies like TypeScript, Next.js, React, Node.js, and MongoDB.
        </p>
          <h3 className="text-2xl font-semibold mb-2 mt-2">
            My Interests
          </h3>
          <p className="w-10/12">
            Outside of programming, I have a deep love for take care of plant, painting and creative
            expression.
          </p>
        </div>

        {/* Gallery */}
        <div>
          <h3 className="text-xl font-bold text-center text-transparent bg-clip-text bg-linear-to-r from-gray-700 from-5% via-amber-500 to-gray-700">
            Gallery
          </h3>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-4">
            {[
              "https://i.ibb.co.com/0pwzwcH9/Whats-App-Image-2025-03-13-at-12-35-55-25072269.jpg",
              "https://i.ibb.co.com/GgwjLzG/Whats-App-Image-2025-03-13-at-12-28-50-3d1030f3.jpg",
              "https://i.ibb.co.com/0prqg3j0/Whats-App-Image-2025-03-13-at-12-38-33-735b2d3f.jpg",
              "https://i.ibb.co.com/8LXFRWs4/Whats-App-Image-2025-03-13-at-12-44-13-50c2f9ef.jpg",
              "https://i.ibb.co.com/Tq2YRFXQ/Whats-App-Image-2025-03-13-at-12-34-39-67fd3d2a.jpg",
              "https://i.ibb.co.com/vCvGbY7C/Whats-App-Image-2025-03-13-at-12-30-49-d92e26c4.jpg",
            ].map((src, i) => (
              <div
                key={i}
                className="relative w-full h-40 rounded-lg overflow-hidden"
              >
                <Image
                  src={src}
                  alt={`Painting ${i + 1}`}
                  fill
                  sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 300px"
                  className="object-cover transition-transform duration-300 hover:scale-105"
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Backend Skills */}
      <SkillSection
        title="Backend Development"
        width="w-7/12"
        logos={[
          "https://i.ibb.co.com/gHx5TQ5/1-bq-E19-D6-Wk2-Vp-VIEb-Njkyv-A.png",
          "https://img.icons8.com/?size=48&id=bosfpvRzNOG8&format=png",
          "https://img.icons8.com/?size=48&id=rHpveptSuwDz&format=png",
          "https://i.ibb.co.com/DqYy9wk/typescript.jpg",
          "https://i.ibb.co.com/990ddKQV/postgresql.png",
          "https://i.ibb.co.com/7NVt1VRh/images.png",
          "https://i.ibb.co.com/v6TY2DWt/prisma.png",
        ]}
      />

      {/* Frontend Skills */}
      <SkillSection
        title="Frontend Development"
        width="w-9/12"
        logos={[
          "https://img.icons8.com/?size=64&id=t4YbEbA834uH&format=png",
          "https://img.icons8.com/?size=48&id=21278&format=png",
          "https://img.icons8.com/?size=48&id=20909&format=png",
          "https://img.icons8.com/?size=48&id=x7XMNGh2vdqA&format=png",
          "https://i.ibb.co.com/zTTnWCVG/shadcn.png",
          "https://img.icons8.com/?size=48&id=62452&format=png",
          "https://i.ibb.co.com/DHxSKmt5/nextjs.png",
          "https://i.ibb.co.com/Mxt4D1wt/download-4.png",
          "https://i.ibb.co.com/dJ3XcXy9/vercel.png",
        ]}
      />

      {/* Tools */}
      <SkillSection
        title="Tools"
        width="w-5/12"
        logos={[
          "https://img.icons8.com/?size=50&id=12599&format=png",
          "https://i.ibb.co.com/LhtW4bQF/download-4.jpg",
          "https://img.icons8.com/?size=50&id=38389&format=png",
          "https://img.icons8.com/?size=48&id=8gWOBXY72Osj&format=png",
        ]}
      />
    </div>
  );
}

function SkillSection({
  title,
  width,
  logos,
}: {
  title: string;
  width: string;
  logos: string[];
}) {
  return (
    <>
      <h2 className="text-2xl font-extrabold mt-10 mb-6 text-center">{title}</h2>

      <div className={`${width} mx-auto`}>
        <Marquee pauseOnHover={true} speed={80}>
          {logos.map((src, idx) => (
            <div key={idx} className="h-26 w-24 mx-10">
              <Image
                src={src}
                alt={`${title} Logo`}
                width={96}
                height={96}
                className="object-contain rounded-full"
              />
            </div>
          ))}
        </Marquee>
      </div>
    </>
  );
}