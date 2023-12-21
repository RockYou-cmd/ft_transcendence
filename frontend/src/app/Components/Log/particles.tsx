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
      for (let i = 0; i < 500; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          radius: Math.random() * 3 + 1,
          vx: Math.random() * 2 - 1,
          vy: Math.random() * 2 - 1,
        });
      }
    }

    function drawParticles() {
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
          particle.vx = dx * 0.04;
          particle.vy = dy * 0.04;
        } else {
          particle.vx *= 0.99;
          particle.vy *= 0.99;
        }

        particle.x += particle.vx;
        particle.y += particle.vy;

        if (particle.x > canvas.width || particle.x < 0) {
          particle.vx *= -1;
        }
        if (particle.y > canvas.height || particle.y < 0) {
          particle.vy *= -1;
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

  return <canvas ref={canvasRef} style={{ position: 'fixed', top: 0, left: 0, zIndex: -1 }} />;
};

export default ParticleBackground;
