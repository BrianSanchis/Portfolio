"use client";

import React, { useEffect, useRef } from "react";
import ProjectCard from "../sub/ProjectCard";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Projects = () => {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Titre arrive du haut
      gsap.fromTo(
        titleRef.current,
        { y: -50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: titleRef.current,
            start: "top 85%",
            end: "top 50%",
            scrub: 1,
          },
        }
      );

      // Cartes arrivent de la gauche
      gsap.fromTo(
        cardsRef.current,
        { x: -150, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: cardsRef.current,
            start: "top 85%",
            end: "top 40%",
            scrub: 1,
          },
        }
      );
    });

    return () => ctx.revert();
  }, []);

  return (
    <div
      className="flex flex-col items-center justify-center py-20"
      id="projects"
    >
      <h1
        ref={titleRef}
        className="text-[40px] font-semibold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-cyan-500 py-20"
      >
        Mes projets
      </h1>

      <div
        ref={cardsRef}
        className="h-full w-full flex flex-col md:flex-row gap-10 px-10 mt-10"
      >
        <ProjectCard
          src="/homelab.png"
          title="Homelab"
          description="En cours de construction, mon homelab est un projet personnel visant à créer un environnement de test et d'apprentissage pour les technologies réseau et de sécurité. Il comprend des équipements tels que des routeurs, des commutateurs, des pare-feu et des serveurs, permettant de simuler des scénarios réels et d'expérimenter avec différentes configurations et outils."
        />
        <ProjectCard
          src="/firewall.png"
          title="Firewalling"
          description="En cours de construction, ce projet de firewalling vise à mettre en place une solution de sécurité réseau robuste pour protéger les systèmes et les données contre les menaces potentielles. Il comprend la configuration et la gestion d'un pare-feu, ainsi que l'implémentation de règles de filtrage pour contrôler le trafic entrant et sortant, assurant ainsi la sécurité et l'intégrité du réseau."
          links={[
            { label: "Installation et première configuration", href: "/firewall" },
            { label: "Configuration du HA (High Availability)", href: "/firewall" },
            { label: "Mise en place du FortiManager et FortiAnalyzer", href: "/firewall" },
            { label: "Configuration du routage", href: "/firewall" },
            { label: "Matrice de flux", href: "/firewall" },
          ]}
        />
        <ProjectCard
          src="/switching.png"
          title="Switching"
          description="En cours de construction, ce projet de switching vise à mettre en place une infrastructure réseau efficace et performante en utilisant des commutateurs. Il comprend la configuration et la gestion de commutateurs pour assurer une connectivité fiable entre les différents appareils du réseau, ainsi que l'implémentation de protocoles de commutation pour optimiser les performances et la sécurité du réseau."
        />
      </div>
    </div>
  );
};

export default Projects;