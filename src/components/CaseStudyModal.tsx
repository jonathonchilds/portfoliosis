import { useRef, useEffect } from "react";
import gsap from "gsap";
import type { ProjectData } from "../data/portfolioData";
import { ExternalLink } from "lucide-react";

interface CaseStudyModalProps {
  isOpen: boolean;
  onClose: () => void;
  project: ProjectData | null;
}

export default function CaseStudyModal({ isOpen, onClose, project }: CaseStudyModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen && project) {
      // Animate in
      gsap.fromTo(overlayRef.current, { opacity: 0 }, { opacity: 1, duration: 0.3 });
      gsap.fromTo(
        modalRef.current,
        { opacity: 0, y: 50, scale: 0.95 },
        { opacity: 1, y: 0, scale: 1, duration: 0.4, ease: "back.out(1.2)" }
      );
      // Lock body scroll
      document.body.style.overflow = "hidden";
    } else {
      // Unlock body scroll
      document.body.style.overflow = "auto";
    }
    
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen, project]);

  if (!isOpen || !project) return null;

  const handleClose = () => {
    // Animate out
    gsap.to(overlayRef.current, { opacity: 0, duration: 0.3 });
    gsap.to(modalRef.current, {
      opacity: 0,
      y: 20,
      scale: 0.95,
      duration: 0.3,
      ease: "power2.in",
      onComplete: onClose,
    });
  };

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm overflow-y-auto pt-24 pb-10"
      onClick={handleClose}
    >
      <div
        ref={modalRef}
        className="relative w-full max-w-3xl p-8 md:p-12 backdrop-blur-2xl bg-slate-900/90 border border-teal-500/30 rounded-[3rem] shadow-[0_30px_60px_-15px_rgba(0,0,0,0.8),inset_0_1px_1px_rgba(255,255,255,0.1)] my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={handleClose}
          className="cursor-pointer absolute top-6 right-6 text-slate-400 hover:text-white transition-colors bg-white/5 hover:bg-white/10 p-2 rounded-full border border-white/10"
          aria-label="Close"
        >
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="mb-8">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4 pr-12 tracking-tight">
            {project.title}
          </h2>
          <div className="flex flex-wrap gap-2 mb-6">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="text-xs font-medium px-3 py-1 bg-teal-500/10 border border-teal-500/20 rounded-full text-teal-300 uppercase tracking-wide"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        <div className="space-y-6 text-slate-300 text-lg leading-relaxed mb-10">
          {project.caseStudy.paragraphs.map((paragraph, idx) => (
            <p key={idx}>{paragraph}</p>
          ))}
        </div>

        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 mb-10">
          <h4 className="text-xl font-semibold text-white mb-4">Key Metrics</h4>
          <ul className="space-y-3">
            {project.caseStudy.metrics.map((metric, idx) => (
              <li key={idx} className="flex items-start">
                <span className="text-teal-400 mr-3 mt-1">✦</span>
                <span className="text-slate-300">{metric}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 pt-4 border-t border-white/10">
          {project.caseStudy.link && (
            <a
              href={project.caseStudy.link}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 flex items-center justify-center gap-2 px-6 py-4 bg-teal-500 hover:bg-teal-400 text-slate-900 font-bold rounded-xl transition-all hover:scale-[1.02] hover:shadow-[0_0_20px_rgba(45,212,191,0.4)]"
            >
              <ExternalLink size={20} />
              View Live Site
            </a>
          )}
          {project.caseStudy.github && (
            <a
              href={project.caseStudy.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 flex items-center justify-center gap-2 px-6 py-4 bg-white/5 hover:bg-white/10 text-white font-semibold rounded-xl border border-white/10 transition-all hover:scale-[1.02]"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/>
                <path d="M9 18c-4.51 2-5-2-7-2"/>
              </svg>
              View Source
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
