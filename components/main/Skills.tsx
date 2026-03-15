import {
  Backend_skill,
  Frontend_skill,
  Full_stack,
  Skill_data,
} from "@/constants";
import React from "react";
import SkillDataProvider from "../sub/SkillDataProvider";
import SkillText from "../sub/SkillText";

const Skills = () => {
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

      {/* Contenu au-dessus des dégradés */}
      <div className="relative z-20 w-full flex flex-col items-center gap-3">
        <SkillText />

        <div className="flex flex-row justify-around flex-wrap mt-4 gap-5 items-center">
          {Skill_data.map((image, index) => (
            <SkillDataProvider
              key={index}
              src={image.Image}
              width={image.width}
              height={image.height}
              index={index}
            />
          ))}
        </div>

        <div className="flex flex-row justify-around flex-wrap mt-4 gap-5 items-center">
          {Frontend_skill.map((image, index) => (
            <SkillDataProvider
              key={index}
              src={image.Image}
              width={image.width}
              height={image.height}
              index={index}
            />
          ))}
        </div>

        <div className="flex flex-row justify-around flex-wrap mt-4 gap-5 items-center">
          {Backend_skill.map((image, index) => (
            <SkillDataProvider
              key={index}
              src={image.Image}
              width={image.width}
              height={image.height}
              index={index}
            />
          ))}
        </div>

        <div className="flex flex-row justify-around flex-wrap mt-4 gap-5 items-center">
          {Full_stack.map((image, index) => (
            <SkillDataProvider
              key={index}
              src={image.Image}
              width={image.width}
              height={image.height}
              index={index}
            />
          ))}
        </div>

        {/* <div className="flex flex-row justify-around flex-wrap mt-4 gap-5 items-center">
          {Other_skill.map((image, index) => (
            <SkillDataProvider
              key={index}
              src={image.Image}
              width={image.width}
              height={image.height}
              index={index}
            />
          ))}
        </div> */}
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