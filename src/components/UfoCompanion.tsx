import { useRef, useEffect } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ufoImg from "../assets/ufo.png";
import { useAnimationState } from "../context/AnimationContext";

gsap.registerPlugin(ScrollTrigger);

export default function UfoCompanion() {
  const ufoWrapperRef = useRef<HTMLDivElement>(null);
  const flameRef = useRef<HTMLDivElement>(null);
  const { ufoEnabled } = useAnimationState();
  const roamTween = useRef<gsap.core.Tween | null>(null);
  const flameTween = useRef<gsap.core.Tween | null>(null);
  const roamRef = useRef<(() => void) | null>(null);
  const isInitialMount = useRef(true);

  // Handle toggling on and off dynamically
  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }

    if (ufoEnabled) {
      roamTween.current?.kill();
      flameTween.current?.resume();
      roamRef.current?.(); // Resume erratic roaming
    } else {
      // Intercept the halt and zoom off screen!
      roamTween.current?.kill();
      roamTween.current = gsap.to(ufoWrapperRef.current, {
        y: -window.innerHeight - 500, // Zoom way off the top
        x: "+=800", // Bank hard right
        rotation: 60,
        duration: 1.5,
        ease: "power2.in",
        onComplete: () => {
          flameTween.current?.pause(); // Pause flames only once it's completely gone
        }
      });
    }
  }, [ufoEnabled]);

  useGSAP(() => {
    let currentX = 0;
    let currentY = 0;

    // Flicker the flame wildly
    flameTween.current = gsap.to(flameRef.current, {
      opacity: 0.4,
      scaleY: 0.8,
      duration: 0.05,
      yoyo: true,
      repeat: -1,
      ease: "power1.inOut",
    });

    const roam = () => {
      if (!ufoWrapperRef.current) return;
      
      const nextX = gsap.utils.random(-window.innerWidth / 2 - 300, window.innerWidth / 2 + 300);
      const nextY = gsap.utils.random(-window.innerHeight / 2 - 300, window.innerHeight / 2 + 300);
      
      const dist = Math.sqrt(Math.pow(nextX - currentX, 2) + Math.pow(nextY - currentY, 2));
      const duration = Math.max(3, dist / 200); 
      
      const dx = nextX - currentX;
      const tilt = Math.max(-45, Math.min(45, dx / 15));
      
      const delayTime = Math.random() * 8 + 4; // Rest for 4 to 12 seconds between movements
      
      roamTween.current = gsap.to(ufoWrapperRef.current, {
        x: nextX,
        y: nextY,
        rotation: tilt,
        duration: duration,
        delay: delayTime,
        ease: "sine.inOut",
        onComplete: roam
      });
      
      currentX = nextX;
      currentY = nextY;
    };
    
    // Store roam function so the useEffect can call it later
    roamRef.current = roam;
    
    // Initial start
    if (ufoEnabled) {
      roam();
    }
  });

  return (
    // Fixed at center, z-0 puts it behind main content but above background
    <div className="fixed top-1/2 left-1/2 z-0 pointer-events-none -translate-x-1/2 -translate-y-1/2">
      <div ref={ufoWrapperRef} className="relative">
        {/* The UFO Image */}
        <img
          src={ufoImg}
          alt="UFO Companion"
          className="relative z-10 w-32 md:w-48 opacity-90 drop-shadow-2xl"
        />
        
        {/* The Fiery Engine Thruster */}
        <div 
          ref={flameRef}
          className="absolute left-1/2 -bottom-8 md:-bottom-12 -translate-x-1/2 w-6 md:w-10 h-16 md:h-24 bg-gradient-to-b from-yellow-100 via-orange-500 to-transparent rounded-full blur-[4px] origin-top mix-blend-screen"
        />
      </div>
    </div>
  );
}
