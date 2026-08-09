import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const capabilities = [
  {
    title: "Greenfield Architecture",
    description: "Architecting revenue-generating platforms from inception to production. I thrive on taking full ownership of a system's lifecycle—from a blank slate to a scaled, highly-available solution.",
    icon: "🏗️",
  },
  {
    title: "Legacy Revitalization",
    description: "Resolving accumulated technical debt is an art. I regularly refactor massive monolithic codebases into Clean Architecture, dramatically reducing lines of code while improving maintainability and testability.",
    icon: "♻️",
  },
  {
    title: "Database Mastery",
    description: "From overhauling complex database schemas to constructing massive SQL aggregation queries across thousands of records, I ensure the data layer is robust, optimized, and blazingly fast.",
    icon: "💾",
  },
  {
    title: "Complex Integrations",
    description: "Engineering secure RESTful APIs and background job processors (batch data, queueing) to seamlessly integrate third-party platforms with zero-downtime deployments.",
    icon: "🔌",
  }
];

export default function Capabilities() {
  const containerRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const cards = gsap.utils.toArray<HTMLElement>(".capability-card");

      cards.forEach((card, index) => {
        gsap.from(card, {
          scrollTrigger: {
            trigger: card,
            start: "top bottom-=100",
            toggleActions: "play none none reverse",
          },
          x: index % 2 === 0 ? -50 : 50,
          opacity: 0,
          duration: 0.8,
          ease: "power3.out",
        });
      });
    },
    { scope: containerRef }
  );

  return (
    <section
      id="capabilities"
      ref={containerRef}
      className="relative z-10 py-24 px-6 max-w-6xl mx-auto flex flex-col justify-center"
    >
      <div className="mb-16 text-center md:text-left">
        <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tight mb-4">
          Beyond the Frontend
        </h2>
        <p className="text-lg text-slate-400 max-w-2xl">
          While I love crafting immersive 3D UIs, my true strength lies beneath the surface. I build the engines that run the business.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {capabilities.map((cap, idx) => (
          <div
            key={idx}
            className="capability-card flex flex-col backdrop-blur-2xl bg-slate-900/60 border border-indigo-500/30 shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)] p-8 rounded-[2rem] hover:bg-slate-900/80 transition-all group hover:-translate-y-1 hover:shadow-2xl hover:shadow-indigo-500/20"
          >
            <div className="text-4xl mb-6 bg-white/5 w-16 h-16 flex items-center justify-center rounded-2xl border border-white/10 group-hover:scale-110 transition-transform">
              {cap.icon}
            </div>
            <h3 className="text-2xl font-semibold text-white mb-3">
              {cap.title}
            </h3>
            <p className="text-slate-400 leading-relaxed">
              {cap.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
