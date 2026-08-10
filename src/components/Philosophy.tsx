import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { philosophyData } from "../data/portfolioData";

gsap.registerPlugin(ScrollTrigger);

export default function Philosophy() {
  const containerRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      gsap.from(".philosophy-content", {
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top bottom-=150",
          once: true,
        },
        scale: 0.95,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
      });
    },
    { scope: containerRef },
  );

  return (
    <section
      id="philosophy"
      ref={containerRef}
      className="relative z-10 py-32 px-6 flex flex-col items-center justify-center"
    >
      <div className="philosophy-content max-w-4xl mx-auto backdrop-blur-2xl bg-slate-900/70 border border-teal-500/30 p-12 md:p-20 rounded-[3rem] shadow-[0_30px_60px_-15px_rgba(0,0,0,0.5),inset_0_1px_1px_rgba(255,255,255,0.1)] relative overflow-hidden">
        {/* Decorative background element */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-teal-500/10 blur-[80px] rounded-full pointer-events-none -translate-y-1/2 translate-x-1/2"></div>

        <h2 className="text-4xl md:text-5xl font-bold mb-8 text-white tracking-tight relative z-10">
          More Than Just Code
        </h2>

        <div className="space-y-8 relative z-10">
          {philosophyData.map((paragraph, index) => {
            // Highlighting the first sentence of the first paragraph, if desired
            if (index === 0) {
              const firstPeriod = paragraph.indexOf('.');
              if (firstPeriod !== -1) {
                const highlight = paragraph.slice(0, firstPeriod + 1);
                const rest = paragraph.slice(firstPeriod + 1);
                return (
                  <p key={index} className="text-xl text-slate-300 leading-relaxed">
                    <span className="font-semibold text-teal-300">
                      {highlight}
                    </span>
                    {rest}
                  </p>
                );
              }
            }
            return (
              <p key={index} className="text-xl text-slate-300 leading-relaxed">
                {paragraph}
              </p>
            );
          })}
        </div>
      </div>
    </section>
  );
}
