import { useState, useRef, useEffect } from "react";
import gsap from "gsap";

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ContactModal({ isOpen, onClose }: ContactModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

  useEffect(() => {
    if (isOpen) {
      // Reset status when opened
      setStatus("idle");
      // Animate in
      gsap.fromTo(overlayRef.current, { opacity: 0 }, { opacity: 1, duration: 0.3 });
      gsap.fromTo(
        modalRef.current,
        { opacity: 0, y: 50, scale: 0.95 },
        { opacity: 1, y: 0, scale: 1, duration: 0.4, ease: "back.out(1.5)" }
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
  }, [isOpen]);

  if (!isOpen) return null;

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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("submitting");

    const form = e.currentTarget;
    const formData = new FormData(form);

    try {
      // Replace with your actual Formspree endpoint URL
      const response = await fetch("https://formspree.io/f/YOUR_FORM_ID", {
        method: "POST",
        body: formData,
        headers: {
          Accept: "application/json",
        },
      });

      if (response.ok) {
        setStatus("success");
        form.reset();
      } else {
        setStatus("error");
      }
    } catch (error) {
      setStatus("error");
    }
  };

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
      onClick={handleClose}
    >
      <div
        ref={modalRef}
        className="relative w-full max-w-lg p-8 md:p-10 backdrop-blur-2xl bg-slate-900/90 border border-teal-500/30 rounded-3xl shadow-[0_30px_60px_-15px_rgba(0,0,0,0.8),inset_0_1px_1px_rgba(255,255,255,0.1)]"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={handleClose}
          className="absolute top-6 right-6 text-slate-400 hover:text-white transition-colors"
          aria-label="Close"
        >
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <h3 className="text-3xl font-bold text-white mb-2">Start a Conversation</h3>
        <p className="text-slate-400 mb-8">
          Fill out the form below and I'll get back to you as soon as possible.
        </p>

        {status === "success" ? (
          <div className="bg-teal-500/10 border border-teal-500/30 text-teal-300 p-6 rounded-2xl text-center">
            <div className="text-4xl mb-4">🚀</div>
            <h4 className="text-xl font-semibold mb-2">Message Sent!</h4>
            <p>Thanks for reaching out. I'll be in touch soon.</p>
            <button
              onClick={handleClose}
              className="mt-6 px-6 py-2 bg-teal-500/20 hover:bg-teal-500/30 text-teal-300 font-medium rounded-full transition-colors"
            >
              Close
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-slate-300 mb-1.5">
                Name
              </label>
              <input
                type="text"
                name="name"
                id="name"
                required
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-teal-500/50 focus:border-teal-500/50 transition-all"
                placeholder="Jane Doe"
              />
            </div>
            
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-slate-300 mb-1.5">
                Email
              </label>
              <input
                type="email"
                name="email"
                id="email"
                required
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-teal-500/50 focus:border-teal-500/50 transition-all"
                placeholder="jane@example.com"
              />
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-medium text-slate-300 mb-1.5">
                Message
              </label>
              <textarea
                name="message"
                id="message"
                required
                rows={4}
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-teal-500/50 focus:border-teal-500/50 transition-all resize-none"
                placeholder="Tell me about your project..."
              ></textarea>
            </div>

            {status === "error" && (
              <p className="text-red-400 text-sm">
                Oops! There was a problem submitting your form. Did you set up the Formspree endpoint?
              </p>
            )}

            <button
              type="submit"
              disabled={status === "submitting"}
              className="mt-2 w-full px-8 py-4 bg-teal-500 hover:bg-teal-400 disabled:opacity-50 disabled:hover:bg-teal-500 text-slate-900 font-bold rounded-xl transition-all hover:shadow-[0_0_20px_rgba(45,212,191,0.4)] flex items-center justify-center"
            >
              {status === "submitting" ? (
                <span className="flex items-center gap-2">
                  <svg className="animate-spin h-5 w-5 text-slate-900" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Sending...
                </span>
              ) : (
                "Send Message"
              )}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
