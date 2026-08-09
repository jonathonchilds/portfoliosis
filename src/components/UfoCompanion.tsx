import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ufoImg from "../assets/ufo.png";

gsap.registerPlugin(ScrollTrigger);

export default function UfoCompanion() {
  const containerRef = useRef<HTMLDivElement>(null);
  const ufoRef = useRef<HTMLImageElement>(null);

  useGSAP(() => {
    // 1. Unpredictable wobble applied directly to the image (only X and Y)
    const roam = () => {
      if (!ufoRef.current) return;
      gsap.to(ufoRef.current, {
        x: gsap.utils.random(-25, 25),
        y: gsap.utils.random(-25, 25),
        duration: gsap.utils.random(1.5, 3),
        ease: "sine.inOut",
        onComplete: roam
      });
    };
    roam();

    // 2. Interactive tilt tracking scroll velocity
    const tiltTo = gsap.quickTo(ufoRef.current, "rotation", { duration: 0.8, ease: "power3.out" });
    
    // 3. Scroll-based parallax applied to the container
    gsap.to(containerRef.current, {
      scrollTrigger: {
        trigger: document.body,
        start: "top top",
        end: "bottom bottom",
        scrub: 1,
        onUpdate: (self) => {
           // Tilt based entirely on how fast the user is scrolling up or down
           const velocityTilt = Math.max(-35, Math.min(35, self.getVelocity() / 100));
           tiltTo(velocityTilt);
        }
      },
      y: "100vh", 
      ease: "none",
    });
  });

  return (
    <div ref={containerRef} className="fixed top-20 right-4 md:right-16 z-0 pointer-events-none">
      <img
        ref={ufoRef}
        src={ufoImg}
        alt="UFO Companion"
        className="w-32 md:w-48 opacity-90 transition-opacity duration-300 drop-shadow-2xl"
      />
    </div>
  );
}
