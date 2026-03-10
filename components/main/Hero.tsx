import React from "react";
import HeroContent from "../sub/HeroContent";

const Hero = () => {
  return (
    <div className="relative flex flex-col h-full w-full" id="about-me">
      <video
        autoPlay
        muted
        loop
        className="rotate-180 absolute top-[-340px] h-[800px] w-full left-0 z-[1] object-cover"
        // ↑ hauteur fixe plus grande au lieu de h-full
      >
        <source src="/blackhole.webm" type="video/webm" />
      </video>

      {/* Fondu bas */}
      <div
        className="absolute left-0 w-full z-[2] pointer-events-none"
        style={{
          top: "calc(-340px + 800px - 350px)", // bas de la vidéo - overlap
          height: "350px",
          background: "linear-gradient(to bottom, transparent 0%, #030014 100%)",
        }}
      />

      <HeroContent />
    </div>
  );
};

export default Hero;