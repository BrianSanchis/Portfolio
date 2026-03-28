"use client";

import React, { useEffect, useRef, useState } from "react";
import ProjectCard from "../sub/ProjectCard";
import PasswordModal from "../sub/Passwordmodal";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Projects = () => {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const [modalHref, setModalHref] = useState<string | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
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
            onLeave: () => gsap.set(titleRef.current, { clearProps: "all" }),
          },
        }
      );

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
            onLeave: () => gsap.set(cardsRef.current, { clearProps: "all" }),
          },
        }
      );
    });

    return () => ctx.revert();
  }, []);

  return (
    <>
      {modalHref && (
        <PasswordModal href={modalHref} onClose={() => setModalHref(null)} />
      )}

      <div className="flex flex-col items-center justify-center py-20" id="projects">
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
              { label: "Installation et première configuration", href: "/resume.pdf", onClick: (href) => setModalHref(href) },
              { label: "Configuration du HA (High Availability)", href: "/resume.pdf", onClick: (href) => setModalHref(href) },
              { label: "Mise en place du FortiManager et FortiAnalyzer", href: "/resume.pdf", onClick: (href) => setModalHref(href) },
              { label: "Configuration du routage", href: "/resume.pdf", onClick: (href) => setModalHref(href) },
              { label: "Matrice de flux", href: "/resume.pdf", onClick: (href) => setModalHref(href) },
            ]}
          />
          <ProjectCard
            src="/gitlab-preview.png"
            title="Serveur Gitlab"
            description="Mise en place d'une forge logicielle complète basée sur GitLab (Self-Hosted). Ce projet vise à centraliser la gestion du code source et à automatiser les cycles de développement via des pipelines CI/CD. Il inclut la configuration de GitLab Runners pour l'exécution des tests, la gestion d'un registre de conteneurs (Container Registry) et la sécurisation des accès pour une approche DevOps intégrale."
            links={[
              { label: "Installation & Configuration", href: "/resume.pdf", onClick: (href) => setModalHref(href) },
              { label: "Sécurisation", href: "/resume.pdf", onClick: (href) => setModalHref(href) },
              { label: "GitLab CI/CD", href: "/resume.pdf", onClick: (href) => setModalHref(href) },
            ]}
          />
        </div>
      </div>
    </>
  );
};

export default Projects;
