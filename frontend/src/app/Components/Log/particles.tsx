import React, { useEffect, useRef } from 'react';

const ParticleBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let particles: { x: number; y: number; radius: number; vx: number; vy: number }[] = [];
    let mouseX = 0;
    let mouseY = 0;

    function createParticle() {
	if (canvas === null) return;
      for (let i = 0; i < 600; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          radius: Math.random() * 3 + 1,
          vx: Math.random() * 1 - 0.5,
          vy: Math.random() * 1 - 0.5,
        });
      }
    }

    function drawParticles() {
	if (canvas === null || ctx == null) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = '#ffffff';

      particles.forEach((particle) => {
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
        ctx.fill();

        const dx = mouseX - particle.x;
        const dy = mouseY - particle.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < 100) {
          particle.vx += (dx * 0.1 - particle.vx) * 0.05;
          particle.vy += (dy * 0.1 - particle.vy) * 0.05;
        }

        particle.x += particle.vx;
        particle.y += particle.vy;

        if (particle.x > canvas.width + particle.radius) {
          particle.x = -particle.radius;
        } else if (particle.x < -particle.radius) {
          particle.x = canvas.width + particle.radius;
        }

        if (particle.y > canvas.height + particle.radius) {
          particle.y = -particle.radius;
        } else if (particle.y < -particle.radius) {
          particle.y = canvas.height + particle.radius;
        }
      });

      requestAnimationFrame(drawParticles);
    }

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    createParticle();
    drawParticles();

    function handleMouseMove(event: MouseEvent) {
      mouseX = event.clientX;
      mouseY = event.clientY;
    }

    window.addEventListener('resize', () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      particles = [];
      createParticle();
    });

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('resize', () => {});
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return <canvas ref={canvasRef} style={{ position: 'fixed', top: 0, left: 0, zIndex: -1 }} className=' relative bg-gradient-to-br from-slate-900 via-slate-700 to-black'/>;
};

export default ParticleBackground;
