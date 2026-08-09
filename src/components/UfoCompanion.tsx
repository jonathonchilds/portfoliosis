import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ufoImg from "../assets/ufo.png";

gsap.registerPlugin(ScrollTrigger);

export default function UfoCompanion() {
  const ufoRef = useRef<HTMLImageElement>(null);

  useGSAP(() => {
    // A constant subtle hover/wobble effect
    gsap.to(ufoRef.current, {
      y: "-=15",
      rotation: -3,
      duration: 2,
      yoyo: true,
      repeat: -1,
      ease: "sine.inOut",
    });

    // Scroll-based parallax so it follows you down the page
    // We'll move it down slightly as you scroll down the page,
    // so it doesn't just sit rigidly fixed.
    gsap.to(ufoRef.current, {
      scrollTrigger: {
        trigger: document.body,
        start: "top top",
        end: "bottom bottom",
        scrub: 1, // Smooth scrubbing
      },
      y: "100vh", // It traverses down with the scroll
      rotation: 10, // Tilts forward as it "flies" down
      ease: "none",
    });
  });

  return (
    <div className="fixed top-20 right-4 md:right-16 z-0 pointer-events-none">
      <img
        ref={ufoRef}
        src={ufoImg}
        alt="UFO Companion"
        className="w-32 md:w-48 opacity-90 transition-opacity duration-300 drop-shadow-2xl"
      />
    </div>
  );
}
