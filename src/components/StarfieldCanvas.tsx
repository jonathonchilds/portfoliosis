import { useEffect, useRef } from "react";

interface Star {
  x: number;
  y: number;
  radius: number;
  opacity: number;
  speed: number;
  twinkleSpeed: number;
  twinkleOffset: number;
}

export default function StarfieldCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let stars: Star[] = [];

    interface ShootingStar {
      x: number;
      y: number;
      length: number;
      speed: number;
      angle: number;
      opacity: number;
      thickness: number;
    }
    let shootingStars: ShootingStar[] = [];

    const spawnShootingStar = (): ShootingStar => {
      // Angle: mostly top-right to bottom-left (approx 135 degrees / 2.35 radians)
      // but randomized by a bit so they aren't all exactly parallel
      const angle = 2.35 + (Math.random() * 0.8 - 0.4);
      
      const hasTail = Math.random() > 0.3; // 70% have noticeable tails
      const length = hasTail ? (Math.random() * 200 + 50) : (Math.random() * 15 + 5);
      const speed = Math.random() * 30 + 10; // Mix of super quick and a bit slower
      const thickness = Math.random() * 2.5 + 0.5;
      const opacity = Math.random() * 0.8 + 0.2; // From bright to very faint
      
      // Spawn area: above the screen and to the right
      const startX = Math.random() * canvas.width * 1.5;
      const startY = -(Math.random() * 500 + length);

      return { x: startX, y: startY, length, speed, angle, opacity, thickness };
    };

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      initStars();
    };

    const initStars = () => {
      const count = 350;
      stars = Array.from({ length: count }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 1.5 + 0.3,
        opacity: Math.random() * 0.5 + 0.2, // Higher base opacity
        speed: 0,
        twinkleSpeed: Math.random() * 0.015 + 0.005, // Slower, subtle twinkling
        twinkleOffset: Math.random() * Math.PI * 2,
      }));
    };

    let t = 0;
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      t += 0.016;

      for (const star of stars) {
        const twinkle =
          star.opacity + Math.sin(t * star.twinkleSpeed * 60 + star.twinkleOffset) * 0.15; // Subtle amplitude
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${Math.max(0, Math.min(1, twinkle))})`;
        ctx.fill();
      }

      // Shooting stars logic
      if (Math.random() < 0.03 && shootingStars.length < 5) {
        // Occasionally spawn a shooting star
        shootingStars.push(spawnShootingStar());
      }

      for (let i = shootingStars.length - 1; i >= 0; i--) {
        const ss = shootingStars[i];
        
        // Update position
        const vx = Math.cos(ss.angle) * ss.speed;
        const vy = Math.sin(ss.angle) * ss.speed;
        ss.x += vx;
        ss.y += vy;
        
        // Draw
        ctx.beginPath();
        const tailX = ss.x - Math.cos(ss.angle) * ss.length;
        const tailY = ss.y - Math.sin(ss.angle) * ss.length;
        
        const gradient = ctx.createLinearGradient(ss.x, ss.y, tailX, tailY);
        gradient.addColorStop(0, `rgba(255, 255, 255, ${ss.opacity})`);
        gradient.addColorStop(1, `rgba(255, 255, 255, 0)`);
        
        ctx.strokeStyle = gradient;
        ctx.lineWidth = ss.thickness;
        ctx.lineCap = "round";
        ctx.moveTo(ss.x, ss.y);
        ctx.lineTo(tailX, tailY);
        ctx.stroke();
        
        // Remove if off screen
        if (
           ss.x < -ss.length || 
           ss.x > canvas.width + ss.length || 
           ss.y > canvas.height + ss.length || 
           ss.y < -ss.length
        ) {
          shootingStars.splice(i, 1);
        }
      }

      animId = requestAnimationFrame(draw);
    };

    resize();
    draw();

    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    return () => {
      cancelAnimationFrame(animId);
      ro.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        zIndex: 10,
        pointerEvents: "none",
      }}
    />
  );
}
