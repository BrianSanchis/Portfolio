"use client";

import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import {
  slideInFromLeft,
  slideInFromRight,
  slideInFromTop,
} from "@/utils/motion";
import { SparklesIcon } from "@heroicons/react/24/solid";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const HeroContent = () => {
  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Colonne gauche — part à gauche et perd en opacité
      gsap.to(leftRef.current, {
        x: -200,
        opacity: 0,
        ease: "none",
        scrollTrigger: {
          trigger: leftRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1,
        },
      });

      // Colonne droite — part à droite et perd en opacité
      gsap.to(rightRef.current, {
        x: 200,
        opacity: 0,
        ease: "none",
        scrollTrigger: {
          trigger: rightRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1,
        },
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      className="flex flex-col md:flex-row items-center justify-center px-6 md:px-20 mt-36 md:mt-40 w-full z-[20]"
    >
      {/* Colonne texte — part à gauche */}
      <div
        ref={leftRef}
        className="h-full w-full flex flex-col gap-5 justify-center m-auto text-start"
      >
        <motion.div
          variants={slideInFromTop}
          className="hidden md:flex Welcome-box py-[8px] px-[7px] border border-[#7042f88b] opacity-[0.9] w-fit"
        >
          <SparklesIcon className="text-[#b49bff] mr-[10px] h-5 w-5" />
          <h1 className="Welcome-text text-[13px]">
            Apprentie ingénieur en informatique et cybersécurité
          </h1>
        </motion.div>

        <motion.div
          variants={slideInFromLeft(0.5)}
          className="flex flex-col gap-6 mt-6 text-4xl sm:text-5xl md:text-6xl font-bold text-white max-w-[600px] w-auto h-auto"
        >
          <span>
            Construire les
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-cyan-500">
              {" "}réseaux{" "}
            </span>
            de demain
          </span>
        </motion.div>

        <motion.p
          variants={slideInFromLeft(0.8)}
          className="text-base md:text-lg text-gray-400 my-5 max-w-[600px]"
        >
          Apprenti ingénieur en informatique, passionné par les défis techniques. Je construis, j&apos;explore et je sécurise.
        </motion.p>

        <motion.a
          href="#encryption"
          variants={slideInFromLeft(1)}
          className="py-2 button-primary text-center text-white cursor-pointer rounded-lg max-w-[200px]"
        >
          En savoir plus !
        </motion.a>
      </div>

      {/* Image — part à droite */}
      <motion.div
        variants={slideInFromRight(0.8)}
        className="hidden md:flex w-full h-full justify-end items-start -mt-4"
      >
        <div ref={rightRef} className="w-full flex justify-end">
          <Image
            src="/mainIconsdark1.svg"
            alt="work icons"
            height={500}
            width={500}
            className="w-full max-w-[500px] h-auto"
          />
        </div>
      </motion.div>
    </motion.div>
  );
};

export default HeroContent;