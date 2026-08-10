import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    title: "Global E-Commerce Engine",
    description: "A highly available, microservices-driven retail platform processing thousands of transactions concurrently.",
    tags: ["React", ".NET Core", "SQL Server"],
  },
  {
    title: "Immersive WebGL Product Showcase",
    description: "An interactive, 3D landing page utilizing custom shaders to drive user engagement and conversion.",
    tags: ["Three.js", "React Three Fiber", "GSAP"],
  },
  {
    title: "Real-Time FinTech Analytics",
    description: "A low-latency dashboard streaming millions of market data points via WebSockets for institutional traders.",
    tags: ["WebSockets", "D3.js", "Redis"],
  },
];

export default function Projects() {
  const containerRef = useRef<HTMLElement>(null);

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
        {projects.map((project, idx) => (
          <div
            key={idx}
            className="project-card flex flex-col backdrop-blur-2xl bg-slate-900/60 border border-white/20 shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)] p-8 rounded-3xl hover:bg-slate-900/80 transition-all group hover:-translate-y-1 hover:shadow-2xl"
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
    </section>
  );
}
