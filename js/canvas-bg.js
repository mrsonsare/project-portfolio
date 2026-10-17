/**
 * ==============================================================================
 * KINEMATICS & NEURAL NETWORK CANVAS ANIMATION
 * Ambient, lightweight, 60 FPS interactive particle graph
 * ==============================================================================
 */

(function () {
  'use strict';

  // Check user motion preference
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReducedMotion) return;

  const canvas = document.getElementById('neuro-canvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let width = (canvas.width = window.innerWidth);
  let height = (canvas.height = window.innerHeight);

  let animationFrameId = null;
  let isRunning = true;

  // Particle configuration
  const PARTICLE_COUNT = Math.min(Math.floor((width * height) / 18000), 75);
  const CONNECTION_DIST = 140;
  const MOUSE_RADIUS = 160;

  const mouse = {
    x: null,
    y: null,
    radius: MOUSE_RADIUS
  };

  window.addEventListener('mousemove', (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
  });

  window.addEventListener('mouseleave', () => {
    mouse.x = null;
    mouse.y = null;
  });

  // Particle Class
  class Particle {
    constructor() {
      this.reset();
      // Scatter initially
      this.x = Math.random() * width;
      this.y = Math.random() * height;
    }

    reset() {
      this.x = Math.random() * width;
      this.y = Math.random() * height;
      this.vx = (Math.random() - 0.5) * 0.65;
      this.vy = (Math.random() - 0.5) * 0.65;
      this.radius = Math.random() * 1.8 + 1.2;
      this.baseAlpha = Math.random() * 0.45 + 0.25;
      // Accent tint (cyan or soft blue or violet)
      const colors = ['#00F0FF', '#38BDF8', '#818CF8'];
      this.color = colors[Math.floor(Math.random() * colors.length)];
    }

    update() {
      // Mouse interaction
      if (mouse.x !== null && mouse.y !== null) {
        const dx = mouse.x - this.x;
        const dy = mouse.y - this.y;
        const dist = Math.hypot(dx, dy);

        if (dist < mouse.radius) {
          const force = (mouse.radius - dist) / mouse.radius;
          const angle = Math.atan2(dy, dx);
          // Subtle deflection
          this.x -= Math.cos(angle) * force * 1.5;
          this.y -= Math.sin(angle) * force * 1.5;
        }
      }

      this.x += this.vx;
      this.y += this.vy;

      // Wrap around screen boundaries
      if (this.x < -10) this.x = width + 10;
      if (this.x > width + 10) this.x = -10;
      if (this.y < -10) this.y = height + 10;
      if (this.y > height + 10) this.y = -10;
    }

    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.fillStyle = this.color;
      ctx.globalAlpha = this.baseAlpha;
      ctx.fill();
    }
  }

  // Initialize particle array
  const particles = [];
  for (let i = 0; i < PARTICLE_COUNT; i++) {
    particles.push(new Particle());
  }

  // Draw connecting edges
  function drawConnections() {
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const p1 = particles[i];
        const p2 = particles[j];
        const dx = p1.x - p2.x;
        const dy = p1.y - p2.y;
        const dist = Math.hypot(dx, dy);

        if (dist < CONNECTION_DIST) {
          const alpha = (1 - dist / CONNECTION_DIST) * 0.18;
          ctx.beginPath();
          ctx.moveTo(p1.x, p1.y);
          ctx.lineTo(p2.x, p2.y);
          ctx.strokeStyle = '#00F0FF';
          ctx.globalAlpha = alpha;
          ctx.lineWidth = 1;
          ctx.stroke();
        }
      }
    }
  }

  // Render loop
  function animate() {
    if (!isRunning) return;

    ctx.clearRect(0, 0, width, height);

    drawConnections();

    for (let i = 0; i < particles.length; i++) {
      particles[i].update();
      particles[i].draw();
    }

    ctx.globalAlpha = 1.0;
    animationFrameId = requestAnimationFrame(animate);
  }

  // Handle Resize
  let resizeTimeout;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    }, 150);
  });

  // Pause when offscreen/tab hidden to save resources
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      isRunning = false;
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
    } else {
      isRunning = true;
      animate();
    }
  });

  // Start animation
  animate();
})();
