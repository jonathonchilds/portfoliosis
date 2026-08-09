import { useState, useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ContactModal from "./ContactModal";

gsap.registerPlugin(ScrollTrigger);

export default function Contact() {
  const containerRef = useRef<HTMLElement>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useGSAP(
    () => {
      gsap.from(".contact-content", {
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top bottom-=150",
          toggleActions: "play none none reverse",
        },
        y: 50,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
      });
    },
    { scope: containerRef }
  );

  return (
    <section
      id="contact"
      ref={containerRef}
      className="relative z-10 py-32 px-6 flex flex-col items-center justify-center text-center"
    >
      <div className="contact-content max-w-2xl mx-auto backdrop-blur-xl bg-white/5 border border-white/10 p-12 rounded-[2.5rem] shadow-2xl">
        <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white tracking-tight">
          Ready to Innovate?
        </h2>
        <p className="text-lg text-slate-400 mb-10 leading-relaxed">
          I partner with visionary brands and ambitious engineering teams to build software that stands out. Whether you have a specific project in mind or just want to explore what's possible, let's engineer the future.
        </p>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="px-10 py-5 bg-teal-500 hover:bg-teal-400 text-slate-900 font-bold rounded-full transition-all hover:scale-105 hover:shadow-[0_0_40px_rgba(45,212,191,0.5)] text-lg"
        >
          Get in Touch
        </button>
      </div>

      <ContactModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />
    </section>
  );
}
