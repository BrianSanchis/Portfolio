import Image from "next/image";
import React from "react";

interface LinkItem {
  label: string;
  href: string;
}

interface Props {
  src: string;
  title: string;
  description: string;
  links?: LinkItem[];
}

const ProjectCard = ({ src, title, description, links = [] }: Props) => {
  return (
    <div className="relative overflow-hidden rounded-lg shadow-lg border border-[#2A0E61]">
      <Image
        src={src}
        alt={title}
        width={1000}
        height={1000}
        className="w-full object-contain"
      />

      <div className="relative p-4">
        <h1 className="text-2xl font-semibold text-white">{title}</h1>
        <p className="mt-2 text-gray-300">{description}</p>

        {links.length > 0 && (
          <div className="flex flex-col gap-1 mt-3">
            {links.map((link: LinkItem, index: number) => (
              <div key={index} className="flex items-center gap-1">
                <span className="text-white">•</span>
                <a
                  href={link.href}
                  className="underline text-white hover:text-grey-300 transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {link.label}
                </a>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProjectCard;