"use client";

import {
  Backend_skill,
  Frontend_skill,
  Full_stack,
  Skill_data,
  Other_skill,
} from "@/constants";
import React, { useEffect, useRef } from "react";
import SkillDataProvider from "../sub/SkillDataProvider";
import SkillText from "../sub/SkillText";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const skillRows = [
  Skill_data,
  Frontend_skill,
  Backend_skill,
  Full_stack,
  Other_skill,
];

const Skills = () => {
  const rowRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      rowRefs.current.forEach((row, index) => {
        if (!row) return;

        const direction = index % 2 === 0 ? 150 : -150;

        gsap.fromTo(
          row,
          { x: direction, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: row,
              start: "top 85%",
              end: "top 40%",
              scrub: 1,
            },
          }
        );
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="skills"
      className="flex flex-col items-center justify-center gap-3 h-full relative pb-80 py-20"
      style={{ transform: "scale(0.9)" }}
    >
      {/* Fondu haut */}
      <div
        className="absolute top-0 left-0 w-full pointer-events-none z-10"
        style={{
          height: "250px",
          background: "linear-gradient(to bottom, #030014 0%, transparent 100%)",
        }}
      />

      {/* Fondu bas */}
      <div
        className="absolute bottom-0 left-0 w-full pointer-events-none z-10"
        style={{
          height: "600px",
          background: "linear-gradient(to top, #030014 30%, transparent 100%)",
        }}
      />

      {/* Contenu */}
      <div className="relative z-20 w-full flex flex-col items-center gap-3">
        <SkillText />

        {skillRows.map((row, index) => (
          <div
            key={index}
            ref={(el) => { rowRefs.current[index] = el; }}
            className="flex flex-row justify-around flex-wrap mt-4 gap-5 items-center"
          >
            {row.map((image, i) => (
              <SkillDataProvider
                key={i}
                src={image.Image}
                width={image.width}
                height={image.height}
                index={i}
              />
            ))}
          </div>
        ))}
      </div>

      {/* Vidéo de fond */}
      <div className="w-full h-full absolute top-0 left-0 z-0 opacity-30 flex items-center justify-center">
        <video
          className="w-full h-auto"
          preload="false"
          playsInline
          loop
          muted
          autoPlay
          src="/cards-video.webm"
        />
      </div>
    </section>
  );
};

export default Skills;