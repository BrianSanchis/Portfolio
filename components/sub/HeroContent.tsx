"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  slideInFromLeft,
  slideInFromRight,
  slideInFromTop,
} from "@/utils/motion";
import { SparklesIcon } from "@heroicons/react/24/solid";
import Image from "next/image";

const HeroContent = () => {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      className="flex flex-col md:flex-row items-center justify-center px-6 md:px-20 mt-36 md:mt-40 w-full z-[20]"
    >
      {/* Colonne texte */}
      <div className="h-full w-full flex flex-col gap-5 justify-center m-auto text-start">

        {/* Badge */}
        <motion.div
          variants={slideInFromTop}
          className="hidden md:flex Welcome-box py-[8px] px-[7px] border border-[#7042f88b] opacity-[0.9] w-fit"
        >
          <SparklesIcon className="text-[#b49bff] mr-[10px] h-5 w-5" />
          <h1 className="Welcome-text text-[13px]">
            Apprentie ingénieur réseau et systèmes
          </h1>
        </motion.div>

        {/* Titre */}
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

        {/* Description */}
        <motion.p
          variants={slideInFromLeft(0.8)}
          className="text-base md:text-lg text-gray-400 my-5 max-w-[600px]"
        >
          Je suis un apprenti ingénieur réseau spécialisé dans le routage, la
          commutation et la cybersécurité. Découvrez mes projets et compétences.
        </motion.p>

        {/* Bouton */}
        <motion.a
          href="#encryption"
          variants={slideInFromLeft(1)}
          className="py-2 button-primary text-center text-white cursor-pointer rounded-lg max-w-[200px]"
        >
          En savoir plus !
        </motion.a>
      </div>

      {/* Image — cachée sur mobile */}
      <motion.div
        variants={slideInFromRight(0.8)}
        className="hidden md:flex w-full h-full justify-end items-start -mt-4"
      >
        <Image
          src="/mainIconsdark1.svg"
          alt="work icons"
          height={500}
          width={500}
          className="w-full max-w-[500px] h-auto"
        />
      </motion.div>
    </motion.div>
  );
};

export default HeroContent;