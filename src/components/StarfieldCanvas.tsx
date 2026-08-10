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
      maxOpacity: number;
      thickness: number;
      life: number;
      maxLife: number;
      fadeType: 'edge' | 'fade';
    }
    let shootingStars: ShootingStar[] = [];

    const spawnShootingStar = (): ShootingStar => {
      const hasTail = Math.random() > 0.3; // 70% have noticeable tails
      const length = hasTail ? (Math.random() * 200 + 50) : (Math.random() * 15 + 5);
      const speed = Math.random() * 8 + 2; // Much slower
      const thickness = Math.random() * 2.5 + 0.5;
      const maxOpacity = Math.random() * 0.8 + 0.2; // From bright to very faint
      
      const fadeType = Math.random() > 0.5 ? 'edge' : 'fade';
      const maxLife = Math.random() * 150 + 100; // Much longer life for slower speeds
      
      let startX, startY, angle;

      if (fadeType === 'edge') {
        const edge = Math.floor(Math.random() * 4);
        if (edge === 0) { // top, flying down
          startX = Math.random() * canvas.width;
          startY = -length;
          angle = Math.random() * Math.PI;
        } else if (edge === 1) { // right, flying left
          startX = canvas.width + length;
          startY = Math.random() * canvas.height;
          angle = Math.PI / 2 + Math.random() * Math.PI;
        } else if (edge === 2) { // bottom, flying up
          startX = Math.random() * canvas.width;
          startY = canvas.height + length;
          angle = Math.PI + Math.random() * Math.PI;
        } else { // left, flying right
          startX = -length;
          startY = Math.random() * canvas.height;
          angle = -Math.PI / 2 + Math.random() * Math.PI;
        }
      } else {
        // middle of screen, fading in and out
        startX = Math.random() * canvas.width;
        startY = Math.random() * canvas.height;
        angle = Math.random() * Math.PI * 2; // completely random direction
      }

      return { 
        x: startX, 
        y: startY, 
        length, 
        speed, 
        angle, 
        maxOpacity, 
        thickness, 
        life: 0, 
        maxLife, 
        fadeType 
      };
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
      if (Math.random() < 0.005 && shootingStars.length < 2) {
        // Occasionally spawn a shooting star
        shootingStars.push(spawnShootingStar());
      }

      for (let i = shootingStars.length - 1; i >= 0; i--) {
        const ss = shootingStars[i];
        
        ss.life++;

        let currentOpacity = ss.maxOpacity;
        if (ss.fadeType === 'fade') {
           const progress = ss.life / ss.maxLife;
           currentOpacity = Math.sin(progress * Math.PI) * ss.maxOpacity;
        }

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
        gradient.addColorStop(0, `rgba(255, 255, 255, ${currentOpacity})`);
        gradient.addColorStop(1, `rgba(255, 255, 255, 0)`);
        
        ctx.strokeStyle = gradient;
        ctx.lineWidth = ss.thickness;
        ctx.lineCap = "round";
        ctx.moveTo(ss.x, ss.y);
        ctx.lineTo(tailX, tailY);
        ctx.stroke();
        
        // Remove conditions
        const isOffScreen = (
           ss.x < -ss.length || 
           ss.x > canvas.width + ss.length || 
           ss.y > canvas.height + ss.length || 
           ss.y < -ss.length
        );
        
        if (isOffScreen || (ss.fadeType === 'fade' && ss.life >= ss.maxLife)) {
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
