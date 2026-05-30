import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

/* ================================================================
   PARTICLE NETWORK CANVAS BACKGROUND
   Renders a dynamic interconnected node network with amber tones
   ================================================================ */
function ParticleCanvas() {
  const canvasRef = useRef(null);
  const animRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let width, height;
    let particles = [];

    const PARTICLE_COUNT = 70;
    const CONNECTION_DISTANCE = 140;
    const PARTICLE_SPEED = 0.28;

    function resize() {
      width = canvas.width = canvas.offsetWidth;
      height = canvas.height = canvas.offsetHeight;
    }

    class Particle {
      constructor() {
        this.reset();
      }
      reset() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.vx = (Math.random() - 0.5) * PARTICLE_SPEED * 2;
        this.vy = (Math.random() - 0.5) * PARTICLE_SPEED * 2;
        this.radius = Math.random() * 1.6 + 0.6;
        this.opacity = Math.random() * 0.5 + 0.2;
        this.pulseOffset = Math.random() * Math.PI * 2;
      }
      update(time) {
        this.x += this.vx;
        this.y += this.vy;
        if (this.x < 0 || this.x > width) this.vx *= -1;
        if (this.y < 0 || this.y > height) this.vy *= -1;
        this.currentOpacity =
          this.opacity + Math.sin(time * 0.001 + this.pulseOffset) * 0.15;
      }
      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(217, 119, 6, ${this.currentOpacity})`;
        ctx.fill();
      }
    }

    function init() {
      resize();
      particles = Array.from({ length: PARTICLE_COUNT }, () => new Particle());
    }

    function drawConnections() {
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < CONNECTION_DISTANCE) {
            const alpha = (1 - dist / CONNECTION_DISTANCE) * 0.18;
            const gradient = ctx.createLinearGradient(
              particles[i].x, particles[i].y,
              particles[j].x, particles[j].y
            );
            gradient.addColorStop(0, `rgba(245, 158, 11, ${alpha})`);
            gradient.addColorStop(1, `rgba(217, 119, 6, ${alpha * 0.4})`);
            ctx.beginPath();
            ctx.strokeStyle = gradient;
            ctx.lineWidth = 0.7;
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }
    }

    let rafId;
    function animate(time = 0) {
      ctx.clearRect(0, 0, width, height);
      particles.forEach(p => {
        p.update(time);
        p.draw();
      });
      drawConnections();
      rafId = requestAnimationFrame(animate);
    }

    const observer = new ResizeObserver(resize);
    observer.observe(canvas);

    init();
    animate();

    return () => {
      cancelAnimationFrame(rafId);
      observer.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      style={{ opacity: 0.9 }}
      aria-hidden="true"
    />
  );
}

/* ================================================================
   ANIMATED GLOW ORBS — ambient depth behind hero content
   ================================================================ */
function GlowOrbs() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
      {/* top-left large orb */}
      <motion.div
        className="absolute rounded-full"
        style={{
          width: 600,
          height: 600,
          top: '-15%',
          left: '-12%',
          background: 'radial-gradient(circle, rgba(217,119,6,0.07) 0%, transparent 70%)',
        }}
        animate={{ scale: [1, 1.08, 1], opacity: [0.7, 1, 0.7] }}
        transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
      />
      {/* bottom-right orb */}
      <motion.div
        className="absolute rounded-full"
        style={{
          width: 500,
          height: 500,
          bottom: '-10%',
          right: '-8%',
          background: 'radial-gradient(circle, rgba(245,158,11,0.06) 0%, transparent 70%)',
        }}
        animate={{ scale: [1, 1.12, 1], opacity: [0.5, 0.9, 0.5] }}
        transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
      />
      {/* center subtle accent */}
      <motion.div
        className="absolute rounded-full"
        style={{
          width: 300,
          height: 300,
          top: '40%',
          left: '55%',
          transform: 'translate(-50%, -50%)',
          background: 'radial-gradient(circle, rgba(217,119,6,0.05) 0%, transparent 70%)',
        }}
        animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.7, 0.3] }}
        transition={{ duration: 11, repeat: Infinity, ease: 'easeInOut', delay: 4 }}
      />
    </div>
  );
}

/* ================================================================
   FRAMER MOTION VARIANTS
   ================================================================ */
const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.2,
    },
  },
};

const fadeUpVariants = {
  hidden: { opacity: 0, y: 36, filter: 'blur(8px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: {
      duration: 0.85,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const nameVariants = {
  hidden: { opacity: 0, y: 50, filter: 'blur(12px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: {
      duration: 1.0,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const lineVariants = {
  hidden: { scaleX: 0, opacity: 0 },
  visible: {
    scaleX: 1,
    opacity: 1,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.1 },
  },
};

const buttonVariants = {
  hidden: { opacity: 0, y: 20, filter: 'blur(4px)' },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: {
      duration: 0.7,
      ease: [0.34, 1.56, 0.64, 1],
      delay: i * 0.12,
    },
  }),
};

/* ================================================================
   HERO COMPONENT
   ================================================================ */
export default function Hero() {
  return (
    <section
      id="hero"
      className="relative flex items-center justify-center overflow-hidden"
      style={{
        minHeight: '100vh',
        backgroundColor: '#0A0A0A',
        fontFamily: "'Space Grotesk', system-ui, sans-serif",
      }}
      aria-label="Hero section"
    >
      {/* === Background Layers === */}
      <ParticleCanvas />
      <GlowOrbs />

      {/* === Subtle grid overlay === */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(rgba(217,119,6,0.035) 1px, transparent 1px),
            linear-gradient(90deg, rgba(217,119,6,0.035) 1px, transparent 1px)
          `,
          backgroundSize: '64px 64px',
        }}
        aria-hidden="true"
      />

      {/* === Vignette edges === */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 80% 70% at 50% 50%, transparent 40%, #0A0A0A 100%)',
        }}
        aria-hidden="true"
      />

      {/* === HERO CONTENT === */}
      <div className="relative z-10 w-full max-w-6xl mx-auto px-6 sm:px-10 lg:px-16">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col items-start"
        >
          {/* — Badge pill — */}
          <motion.div variants={fadeUpVariants}>
            <div
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-8 text-sm font-medium tracking-widest uppercase"
              style={{
                border: '1px solid rgba(217,119,6,0.30)',
                background: 'rgba(217,119,6,0.07)',
                color: '#F59E0B',
                letterSpacing: '0.15em',
              }}
            >
              <span
                className="inline-block w-1.5 h-1.5 rounded-full"
                style={{
                  background: '#F59E0B',
                  boxShadow: '0 0 6px #F59E0B',
                  animation: 'pulse-dot 2s ease-in-out infinite',
                }}
              />
              AI Educator & Systems Builder
            </div>
          </motion.div>

          {/* — Name — */}
          <motion.h1
            variants={nameVariants}
            className="font-extrabold leading-none tracking-tight mb-2"
            style={{
              fontSize: 'clamp(3.5rem, 9vw, 7.5rem)',
              lineHeight: 0.95,
              letterSpacing: '-0.03em',
            }}
          >
            <span
              style={{
                display: 'block',
                background: 'linear-gradient(135deg, #FAFAFA 0%, #D1D1D1 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              Abdul
            </span>
            <span
              style={{
                display: 'block',
                background: 'linear-gradient(135deg, #F59E0B 0%, #D97706 50%, #B45309 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                filter: 'drop-shadow(0 0 32px rgba(217,119,6,0.45))',
              }}
            >
              Basit.
            </span>
          </motion.h1>

          {/* — Amber accent line — */}
          <motion.div
            variants={lineVariants}
            className="origin-left mb-8 mt-6"
            style={{
              height: 3,
              width: 80,
              background: 'linear-gradient(90deg, #F59E0B, #D97706 60%, transparent)',
              borderRadius: 2,
              boxShadow: '0 0 12px rgba(217,119,6,0.6)',
            }}
          />

          {/* — Tagline — */}
          <motion.p
            variants={fadeUpVariants}
            className="mb-10"
            style={{
              fontSize: 'clamp(1rem, 2.5vw, 1.25rem)',
              fontStyle: 'italic',
              fontWeight: 300,
              color: '#A3A3A3',
              letterSpacing: '0.01em',
              maxWidth: '520px',
              lineHeight: 1.6,
            }}
          >
            <span style={{ color: 'rgba(245,158,11,0.7)', fontStyle: 'normal', fontWeight: 500 }}>"</span>
            Learn AI Before AI Learns You
            <span style={{ color: 'rgba(245,158,11,0.7)', fontStyle: 'normal', fontWeight: 500 }}>"</span>
          </motion.p>

          {/* — CTA Buttons — */}
          <div className="flex flex-wrap gap-4 items-center">
            <motion.a
              href="#work"
              id="cta-view-work"
              variants={buttonVariants}
              custom={0}
              whileHover={{
                scale: 1.04,
                boxShadow: '0 12px 48px rgba(217,119,6,0.50), 0 4px 16px rgba(0,0,0,0.7)',
                y: -2,
              }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center gap-2.5 font-semibold rounded-xl transition-colors"
              style={{
                padding: '14px 34px',
                fontSize: '0.95rem',
                letterSpacing: '0.025em',
                background: 'linear-gradient(135deg, #D97706 0%, #B45309 100%)',
                color: '#FAFAFA',
                boxShadow: '0 8px 32px rgba(217,119,6,0.35), 0 2px 8px rgba(0,0,0,0.5)',
                textDecoration: 'none',
              }}
            >
              View My Work
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                aria-hidden="true"
                style={{ transition: 'transform 0.2s ease' }}
              >
                <path
                  d="M3 8h10M9 4l4 4-4 4"
                  stroke="currentColor"
                  strokeWidth="1.7"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </motion.a>

            <motion.a
              href="#contact"
              id="cta-lets-connect"
              variants={buttonVariants}
              custom={1}
              whileHover={{
                scale: 1.04,
                borderColor: 'rgba(217,119,6,0.70)',
                background: 'rgba(217,119,6,0.10)',
                y: -2,
              }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center gap-2.5 font-semibold rounded-xl transition-all"
              style={{
                padding: '14px 34px',
                fontSize: '0.95rem',
                letterSpacing: '0.025em',
                border: '1px solid rgba(217,119,6,0.35)',
                background: 'rgba(217,119,6,0.06)',
                color: '#F59E0B',
                textDecoration: 'none',
                backdropFilter: 'blur(8px)',
              }}
            >
              Let&apos;s Connect
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                aria-hidden="true"
              >
                <path
                  d="M2 8s2.5-4 6-4 6 4 6 4-2.5 4-6 4-6-4-6-4z"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
                <circle
                  cx="8"
                  cy="8"
                  r="1.8"
                  stroke="currentColor"
                  strokeWidth="1.5"
                />
              </svg>
            </motion.a>
          </div>

          {/* — Subtle scroll indicator — */}
          <motion.div
            variants={fadeUpVariants}
            className="mt-20 flex items-center gap-3"
            style={{ color: '#525252' }}
          >
            <motion.div
              style={{
                width: 1,
                height: 40,
                background: 'linear-gradient(180deg, transparent, rgba(217,119,6,0.5), transparent)',
              }}
              animate={{ scaleY: [0.4, 1, 0.4], opacity: [0.4, 1, 0.4] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            />
            <span
              style={{
                fontSize: '0.7rem',
                fontWeight: 500,
                letterSpacing: '0.18em',
                textTransform: 'uppercase',
                color: '#525252',
              }}
            >
              Scroll to explore
            </span>
          </motion.div>
        </motion.div>
      </div>

      {/* === Floating geometric accent shapes === */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
        {/* Top-right geometric bracket */}
        <motion.svg
          width="220"
          height="220"
          viewBox="0 0 220 220"
          className="absolute"
          style={{ top: '8%', right: '6%', opacity: 0.12 }}
          animate={{ rotate: [0, 3, -2, 0], y: [0, -12, 0] }}
          transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
        >
          <rect x="10" y="10" width="80" height="80" rx="4" fill="none" stroke="#D97706" strokeWidth="1.2" />
          <rect x="30" y="30" width="40" height="40" rx="2" fill="none" stroke="#F59E0B" strokeWidth="0.8" />
          <line x1="50" y1="10" x2="50" y2="0" stroke="#D97706" strokeWidth="1" />
          <line x1="10" y1="50" x2="0" y2="50" stroke="#D97706" strokeWidth="1" />
        </motion.svg>

        {/* Bottom-left hexagon outline */}
        <motion.svg
          width="160"
          height="160"
          viewBox="0 0 160 160"
          className="absolute"
          style={{ bottom: '14%', left: '4%', opacity: 0.10 }}
          animate={{ rotate: [0, -4, 2, 0], y: [0, 10, 0] }}
          transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut', delay: 3 }}
        >
          <polygon
            points="80,10 140,45 140,115 80,150 20,115 20,45"
            fill="none"
            stroke="#D97706"
            strokeWidth="1.2"
          />
          <polygon
            points="80,30 120,52 120,108 80,130 40,108 40,52"
            fill="none"
            stroke="#F59E0B"
            strokeWidth="0.6"
            opacity="0.6"
          />
        </motion.svg>

        {/* Mid-right small diamond */}
        <motion.div
          className="absolute"
          style={{
            width: 24,
            height: 24,
            border: '1.5px solid rgba(217,119,6,0.4)',
            transform: 'rotate(45deg)',
            right: '18%',
            top: '35%',
          }}
          animate={{ rotate: [45, 90, 45], opacity: [0.4, 0.8, 0.4] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
        />

        {/* Small dot cluster */}
        <motion.div
          className="absolute grid gap-3"
          style={{
            gridTemplateColumns: 'repeat(4, 1fr)',
            top: '20%',
            right: '12%',
            opacity: 0.25,
          }}
          animate={{ opacity: [0.15, 0.35, 0.15] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
        >
          {Array.from({ length: 12 }).map((_, i) => (
            <div
              key={i}
              style={{
                width: 3,
                height: 3,
                borderRadius: '50%',
                background: '#D97706',
              }}
            />
          ))}
        </motion.div>
      </div>

      {/* === Pulse dot keyframes === */}
      <style>{`
        @keyframes pulse-dot {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(1.4); }
        }
      `}</style>
    </section>
  );
}
