"use client";

import { Socials } from "@/constants";
import Image from "next/image";
import React, { useState } from "react";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      {/* Barre principale */}
      <div className="w-full h-[65px] fixed top-0 shadow-lg shadow-[#2A0E61]/50 bg-[#03001417] backdrop-blur-md z-50 px-4 md:px-10">
        <div className="w-full h-full flex flex-row items-center justify-between m-auto">

          {/* Logo + Nom */}
          <a href="#about-me" className="h-auto w-auto flex flex-row items-center">
            <Image
              src="/LogoPortfolio.png"
              alt="logo"
              width={40}
              height={40}
              className="cursor-pointer hover:animate-slowspin"
            />
            <span className="font-bold ml-[10px] hidden md:block text-gray-300">
              Brian SANCHIS
            </span>
          </a>

          {/* Liens — visibles uniquement sur md+ */}
          <div className="hidden md:flex h-full flex-row items-center md:mr-20">
            <div className="flex items-center gap-[130px] justify-between h-auto border border-[#7042f861] bg-[#0300145e] px-[20px] py-[10px] rounded-full text-gray-200">
              <a href="#about-me" className="cursor-pointer hover:text-purple-400 transition-colors">
                Moi
              </a>
              <a href="#skills" className="cursor-pointer hover:text-purple-400 transition-colors">
                Compétences
              </a>
              <a href="#projects" className="cursor-pointer hover:text-purple-400 transition-colors">
                Projets
              </a>
            </div>
          </div>

          {/* Icônes sociales + burger */}
          <div className="flex flex-row items-center gap-4">

            {/* Socials — cachés sur mobile */}
            <div className="hidden md:flex flex-row gap-5">
              {Socials.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Image
                    src={social.src}
                    alt={social.name}
                    width={24}
                    height={24}
                  />
                </a>
              ))}
            </div>

            {/* Bouton hamburger — visible uniquement sur mobile */}
            <button
              className="md:hidden flex flex-col justify-center items-center gap-[5px] w-8 h-8"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Menu"
            >
              <span
                className={`block w-6 h-0.5 bg-gray-300 transition-all duration-300 ${
                  menuOpen ? "rotate-45 translate-y-[7px]" : ""
                }`}
              />
              <span
                className={`block w-6 h-0.5 bg-gray-300 transition-all duration-300 ${
                  menuOpen ? "opacity-0" : ""
                }`}
              />
              <span
                className={`block w-6 h-0.5 bg-gray-300 transition-all duration-300 ${
                  menuOpen ? "-rotate-45 -translate-y-[7px]" : ""
                }`}
              />
            </button>

          </div>
        </div>
      </div>

      {/* Menu mobile déroulant */}
      <div
        className={`md:hidden fixed top-[65px] left-0 w-full z-40 bg-[#03001417] backdrop-blur-md border-t border-[#7042f861] transition-all duration-300 overflow-hidden ${
          menuOpen ? "max-h-[300px] py-6" : "max-h-0"
        }`}
      >
        <div className="flex flex-col items-center gap-6 text-gray-200 text-lg">
          <a
            href="#about-me"
            onClick={() => setMenuOpen(false)}
            className="hover:text-purple-400 transition-colors"
          >
            Moi
          </a>
          <a
            href="#skills"
            onClick={() => setMenuOpen(false)}
            className="hover:text-purple-400 transition-colors"
          >
            Compétences
          </a>
          <a
            href="#projects"
            onClick={() => setMenuOpen(false)}
            className="hover:text-purple-400 transition-colors"
          >
            Projets
          </a>

          {/* Socials dans le menu mobile */}
          <div className="flex flex-row gap-6 pt-2 border-t border-[#7042f861] w-full justify-center">
            {Socials.map((social) => (
              <a
                key={social.name}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setMenuOpen(false)}
              >
                <Image
                  src={social.src}
                  alt={social.name}
                  width={24}
                  height={24}
                />
              </a>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;