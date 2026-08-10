import { useState, useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { projectsData } from "../data/portfolioData";
import type { ProjectData } from "../data/portfolioData";
import CaseStudyModal from "./CaseStudyModal";

gsap.registerPlugin(ScrollTrigger);

export default function Projects() {
  const containerRef = useRef<HTMLElement>(null);
  const [selectedProject, setSelectedProject] = useState<ProjectData | null>(null);

  useGSAP(
    () => {
      const cards = gsap.utils.toArray<HTMLElement>(".project-card");

      cards.forEach((card, index) => {
        gsap.from(card, {
          scrollTrigger: {
            trigger: card,
            start: "top bottom-=100",
            once: true,
          },
          y: 100,
          opacity: 0,
          duration: 0.8,
          ease: "power3.out",
          delay: index * 0.1, // Stagger effect
        });
      });
    },
    { scope: containerRef }
  );

  return (
    <section
      id="projects"
      ref={containerRef}
      className="relative z-10 min-h-screen py-24 px-6 max-w-6xl mx-auto flex flex-col justify-center"
    >
      <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 text-white tracking-tight">
        Engineering Showcase
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {projectsData.map((project) => (
          <div
            key={project.id}
            onClick={() => setSelectedProject(project)}
            className="cursor-pointer project-card flex flex-col backdrop-blur-2xl bg-slate-900/60 border border-white/20 shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)] p-8 rounded-3xl hover:bg-slate-900/80 transition-all group hover:-translate-y-1 hover:shadow-2xl hover:border-teal-500/50"
          >
            <div className="w-full h-48 bg-white/5 rounded-2xl mb-6 flex items-center justify-center border border-white/5 group-hover:border-teal-500/30 transition-colors">
              <span className="text-slate-500 text-sm italic">Screenshot Placeholder</span>
            </div>
            <h3 className="text-2xl font-semibold text-white mb-3">
              {project.title}
            </h3>
            <p className="text-slate-400 leading-relaxed mb-6 flex-grow">
              {project.description}
            </p>
            <div className="flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-xs font-medium px-3 py-1 bg-white/5 border border-white/10 rounded-full text-teal-300"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>

      <CaseStudyModal 
        isOpen={!!selectedProject} 
        onClose={() => setSelectedProject(null)} 
        project={selectedProject} 
      />
    </section>
  );
}
