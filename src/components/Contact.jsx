import { useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';

/* ================================================================
   DESIGN TOKENS — identical to all other sections
   ================================================================ */
const tokens = {
  bgPrimary:     '#0A0A0A',
  bgSecondary:   '#111111',
  bgElevated:    '#1A1A1A',
  accent:        '#D97706',
  accentBright:  '#F59E0B',
  accentDim:     '#B45309',
  textPrimary:   '#FAFAFA',
  textSecondary: '#A3A3A3',
  textMuted:     '#525252',
  borderSubtle:  'rgba(217,119,6,0.12)',
  borderActive:  'rgba(217,119,6,0.40)',
};

/* ================================================================
   PARTICLE CANVAS — same algorithm as Hero, tuned for contact
   ================================================================ */
function ParticleCanvas() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx    = canvas.getContext('2d');
    let width, height, rafId;
    let particles = [];

    const COUNT    = 50;
    const DISTANCE = 120;
    const SPEED    = 0.22;

    function resize() {
      width  = canvas.width  = canvas.offsetWidth;
      height = canvas.height = canvas.offsetHeight;
    }

    class Particle {
      constructor() { this.reset(); }
      reset() {
        this.x    = Math.random() * width;
        this.y    = Math.random() * height;
        this.vx   = (Math.random() - 0.5) * SPEED * 2;
        this.vy   = (Math.random() - 0.5) * SPEED * 2;
        this.r    = Math.random() * 1.4 + 0.5;
        this.op   = Math.random() * 0.45 + 0.15;
        this.phase = Math.random() * Math.PI * 2;
      }
      update(t) {
        this.x += this.vx;
        this.y += this.vy;
        if (this.x < 0 || this.x > width)  this.vx *= -1;
        if (this.y < 0 || this.y > height)  this.vy *= -1;
        this.cur = this.op + Math.sin(t * 0.001 + this.phase) * 0.12;
      }
      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(217,119,6,${this.cur})`;
        ctx.fill();
      }
    }

    function drawLines() {
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx   = particles[i].x - particles[j].x;
          const dy   = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < DISTANCE) {
            const alpha = (1 - dist / DISTANCE) * 0.14;
            ctx.beginPath();
            ctx.strokeStyle = `rgba(245,158,11,${alpha})`;
            ctx.lineWidth   = 0.6;
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }
    }

    function init() {
      resize();
      particles = Array.from({ length: COUNT }, () => new Particle());
    }

    function animate(t = 0) {
      ctx.clearRect(0, 0, width, height);
      particles.forEach(p => { p.update(t); p.draw(); });
      drawLines();
      rafId = requestAnimationFrame(animate);
    }

    const observer = new ResizeObserver(resize);
    observer.observe(canvas);
    init();
    animate();

    return () => { cancelAnimationFrame(rafId); observer.disconnect(); };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{ position:'absolute', inset:0, width:'100%', height:'100%', opacity:0.7 }}
    />
  );
}

/* ================================================================
   SECTION DIVIDER — same pattern
   ================================================================ */
function SectionDivider() {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  return (
    <div ref={ref} style={{ display:'flex', alignItems:'center', gap:20,
      maxWidth:1152, margin:'0 auto', padding:'0 clamp(24px,5vw,64px)' }}>
      <motion.div
        initial={{ scaleX:0, opacity:0 }}
        animate={inView ? { scaleX:1, opacity:1 } : {}}
        transition={{ duration:0.9, ease:[0.22,1,0.36,1] }}
        style={{ flex:1, height:1,
          background:'linear-gradient(90deg,transparent,rgba(217,119,6,0.25),transparent)',
          transformOrigin:'left' }}
      />
      <motion.div
        initial={{ opacity:0, scale:0.5, rotate:45 }}
        animate={inView ? { opacity:1, scale:1, rotate:45 } : {}}
        transition={{ duration:0.5, delay:0.3, ease:[0.34,1.56,0.64,1] }}
        style={{ width:8, height:8, border:'1.5px solid rgba(217,119,6,0.5)', flexShrink:0 }}
      />
      <motion.div
        initial={{ scaleX:0, opacity:0 }}
        animate={inView ? { scaleX:1, opacity:1 } : {}}
        transition={{ duration:0.9, ease:[0.22,1,0.36,1], delay:0.1 }}
        style={{ flex:1, height:1,
          background:'linear-gradient(90deg,transparent,rgba(217,119,6,0.25),transparent)',
          transformOrigin:'right' }}
      />
    </div>
  );
}

/* ================================================================
   CONTACT LINK BUTTON
   ================================================================ */
function ContactButton({ id, href, label, icon, delay = 0 }) {
  return (
    <motion.a
      id={id}
      href={href}
      target={href.startsWith('http') ? '_blank' : undefined}
      rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
      initial={{ opacity:0, y:24, filter:'blur(6px)' }}
      whileInView={{ opacity:1, y:0, filter:'blur(0px)' }}
      viewport={{ once:true, margin:'-40px' }}
      transition={{ duration:0.65, ease:[0.22,1,0.36,1], delay }}
      whileHover={{ scale:1.04, y:-3,
        boxShadow:'0 12px 40px rgba(217,119,6,0.28), 0 4px 16px rgba(0,0,0,0.6)',
        borderColor:'rgba(217,119,6,0.60)',
      }}
      whileTap={{ scale:0.97 }}
      style={{
        display:'inline-flex', alignItems:'center', gap:12,
        padding:'15px 30px', borderRadius:14,
        border:'1px solid rgba(217,119,6,0.28)',
        background:'rgba(217,119,6,0.06)',
        color: tokens.textSecondary,
        fontFamily:"'Space Grotesk', system-ui, sans-serif",
        fontSize:'0.92rem', fontWeight:500, letterSpacing:'0.02em',
        textDecoration:'none',
        backdropFilter:'blur(10px)',
        transition:'color 0.25s ease, background 0.25s ease',
        cursor:'pointer',
        minWidth:200,
        justifyContent:'center',
      }}
      onMouseEnter={e => {
        e.currentTarget.style.color      = tokens.textPrimary;
        e.currentTarget.style.background = 'rgba(217,119,6,0.10)';
      }}
      onMouseLeave={e => {
        e.currentTarget.style.color      = tokens.textSecondary;
        e.currentTarget.style.background = 'rgba(217,119,6,0.06)';
      }}
    >
      {/* Icon */}
      <span style={{ color: tokens.accentBright, flexShrink:0, display:'flex', alignItems:'center' }}>
        {icon}
      </span>
      {label}
    </motion.a>
  );
}

/* ================================================================
   SVG ICONS
   ================================================================ */
const IconLinkedIn = (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <rect x="2" y="2" width="20" height="20" rx="4" stroke="currentColor" strokeWidth="1.6"/>
    <path d="M7 10v7M7 7v.5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round"/>
    <path d="M11 17v-4a2 2 0 0 1 4 0v4M11 10v7" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const IconGitHub = (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path d="M9 19c-4.3 1.4-4.3-2.5-6-3m12 5v-3.5c0-1 .1-1.4-.5-2 2.8-.3 5.5-1.4 5.5-6a4.6 4.6 0 0 0-1.3-3.2 4.2 4.2 0 0 0-.1-3.2s-1-.3-3.3 1.3a11.5 11.5 0 0 0-6 0C6.3 2.8 5.3 3.1 5.3 3.1a4.2 4.2 0 0 0-.1 3.2A4.6 4.6 0 0 0 3.9 9.5c0 4.6 2.7 5.7 5.5 6-.6.6-.6 1.2-.5 2V21" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const IconEmail = (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <rect x="2" y="4" width="20" height="16" rx="3" stroke="currentColor" strokeWidth="1.6"/>
    <path d="M2 8l10 6 10-6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

/* ================================================================
   CONTACT SECTION — main export
   ================================================================ */
export default function Contact() {
  const sectionRef = useRef(null);
  const inView     = useInView(sectionRef, { once: true, margin: '-80px' });

  return (
    <>
      <SectionDivider />

      <section
        id="contact"
        ref={sectionRef}
        style={{
          position:'relative',
          backgroundColor: tokens.bgPrimary,
          fontFamily:"'Space Grotesk', system-ui, sans-serif",
          minHeight:'100vh',
          display:'flex', flexDirection:'column',
          overflow:'hidden',
        }}
        aria-label="Contact section"
      >
        {/* Particle network */}
        <ParticleCanvas />

        {/* Ambient glow orbs */}
        <div aria-hidden="true" style={{ position:'absolute', inset:0, pointerEvents:'none' }}>
          <motion.div
            style={{
              position:'absolute', top:'-20%', left:'-10%',
              width:700, height:700, borderRadius:'50%',
              background:'radial-gradient(circle, rgba(217,119,6,0.06) 0%, transparent 70%)',
            }}
            animate={{ scale:[1,1.08,1], opacity:[0.6,1,0.6] }}
            transition={{ duration:8, repeat:Infinity, ease:'easeInOut' }}
          />
          <motion.div
            style={{
              position:'absolute', bottom:'-15%', right:'-8%',
              width:600, height:600, borderRadius:'50%',
              background:'radial-gradient(circle, rgba(245,158,11,0.05) 0%, transparent 70%)',
            }}
            animate={{ scale:[1,1.12,1], opacity:[0.4,0.85,0.4] }}
            transition={{ duration:10, repeat:Infinity, ease:'easeInOut', delay:3 }}
          />
        </div>

        {/* Grid lines */}
        <div aria-hidden="true" style={{
          position:'absolute', inset:0, pointerEvents:'none',
          backgroundImage:`
            linear-gradient(rgba(217,119,6,0.025) 1px, transparent 1px),
            linear-gradient(90deg, rgba(217,119,6,0.025) 1px, transparent 1px)
          `,
          backgroundSize:'64px 64px',
        }} />

        {/* Vignette */}
        <div aria-hidden="true" style={{
          position:'absolute', inset:0, pointerEvents:'none',
          background:'radial-gradient(ellipse 80% 70% at 50% 50%, transparent 30%, #0A0A0A 100%)',
        }} />

        {/* ── Main centered content ── */}
        <div style={{
          position:'relative', zIndex:1, flex:1,
          display:'flex', flexDirection:'column',
          alignItems:'center', justifyContent:'center',
          textAlign:'center',
          padding:'clamp(80px,12vw,140px) clamp(24px,6vw,80px) clamp(60px,8vw,100px)',
          maxWidth:860, margin:'0 auto', width:'100%',
          gap:'clamp(32px,5vw,52px)',
        }}>

          {/* Label pill */}
          <motion.div
            initial={{ opacity:0, y:20, filter:'blur(6px)' }}
            animate={inView ? { opacity:1, y:0, filter:'blur(0px)' } : {}}
            transition={{ duration:0.65, ease:[0.22,1,0.36,1] }}
          >
            <div style={{
              display:'inline-flex', alignItems:'center', gap:8,
              padding:'6px 14px', borderRadius:999,
              border:'1px solid rgba(217,119,6,0.28)',
              background:'rgba(217,119,6,0.07)',
              fontSize:'0.70rem', fontWeight:600,
              letterSpacing:'0.16em', textTransform:'uppercase',
              color: tokens.accentBright,
            }}>
              <span style={{
                width:5, height:5, borderRadius:'50%',
                background: tokens.accentBright,
                boxShadow:`0 0 6px ${tokens.accentBright}`,
                display:'inline-block',
                animation:'pulse-dot 2s ease-in-out infinite',
              }} />
              Available for Work
            </div>
          </motion.div>

          {/* Heading */}
          <motion.div
            initial={{ opacity:0, y:40, filter:'blur(10px)' }}
            animate={inView ? { opacity:1, y:0, filter:'blur(0px)' } : {}}
            transition={{ duration:0.9, ease:[0.22,1,0.36,1], delay:0.1 }}
          >
            <h2 style={{
              fontSize:'clamp(2.8rem,8vw,5.5rem)',
              fontWeight:800, letterSpacing:'-0.035em',
              lineHeight:1.0, margin:0,
            }}>
              <span style={{
                display:'block',
                color: tokens.textPrimary,
              }}>
                Let&apos;s Build
              </span>
              <span style={{
                display:'block',
                background:`linear-gradient(135deg, ${tokens.accentBright} 0%, ${tokens.accent} 55%, ${tokens.accentDim} 100%)`,
                WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent',
                backgroundClip:'text',
                filter:'drop-shadow(0 0 36px rgba(217,119,6,0.45))',
              }}>
                Something.
              </span>
            </h2>

            {/* Amber underline */}
            <motion.div
              initial={{ scaleX:0, opacity:0 }}
              animate={inView ? { scaleX:1, opacity:1 } : {}}
              transition={{ duration:0.7, ease:[0.22,1,0.36,1], delay:0.5 }}
              style={{
                margin:'18px auto 0',
                height:3, width:72,
                background:`linear-gradient(90deg, transparent, ${tokens.accentBright}, ${tokens.accent}, transparent)`,
                borderRadius:2,
                boxShadow:'0 0 12px rgba(217,119,6,0.60)',
                transformOrigin:'center',
              }}
            />
          </motion.div>

          {/* Subtext */}
          <motion.p
            initial={{ opacity:0, y:24, filter:'blur(6px)' }}
            animate={inView ? { opacity:1, y:0, filter:'blur(0px)' } : {}}
            transition={{ duration:0.7, ease:[0.22,1,0.36,1], delay:0.22 }}
            style={{
              fontSize:'clamp(0.95rem,2.2vw,1.15rem)',
              fontWeight:300, lineHeight:1.75,
              color: tokens.textSecondary,
              maxWidth:520, margin:'0 auto',
            }}
          >
            Open to{' '}
            <span style={{ color: tokens.textPrimary, fontWeight:500 }}>teaching opportunities</span>
            ,{' '}
            <span style={{ color: tokens.textPrimary, fontWeight:500 }}>collaborations</span>
            , and{' '}
            <span style={{ color: tokens.textPrimary, fontWeight:500 }}>AI consulting</span>
            .
          </motion.p>

          {/* ── Contact Buttons ── */}
          <div style={{
            display:'flex', flexWrap:'wrap',
            gap:14, justifyContent:'center',
          }}>
            <ContactButton
              id="contact-linkedin"
              href="https://linkedin.com/in/abdulbasit"
              label="LinkedIn"
              icon={IconLinkedIn}
              delay={0.30}
            />
            <ContactButton
              id="contact-github"
              href="https://abdulbasit-echotech.github.io/echo-tech-portfolio"
              label="GitHub"
              icon={IconGitHub}
              delay={0.40}
            />
            <ContactButton
              id="contact-email"
              href="mailto:abdulbasit@echotechnologies.tech"
              label="Send Email"
              icon={IconEmail}
              delay={0.50}
            />
          </div>

          {/* Decorative floating geometric shapes */}
          <div aria-hidden="true" style={{ position:'absolute', inset:0, pointerEvents:'none', overflow:'hidden' }}>
            {/* Top-left bracket */}
            <motion.svg width="90" height="90" viewBox="0 0 90 90"
              style={{ position:'absolute', top:'12%', left:'6%', opacity:0.10 }}
              animate={{ rotate:[0,4,-3,0], y:[0,-8,0] }}
              transition={{ duration:12, repeat:Infinity, ease:'easeInOut' }}
            >
              <path d="M30 10 L10 10 L10 30" fill="none" stroke="#D97706" strokeWidth="2" strokeLinecap="round"/>
              <path d="M30 80 L10 80 L10 60" fill="none" stroke="#D97706" strokeWidth="2" strokeLinecap="round"/>
            </motion.svg>

            {/* Top-right bracket */}
            <motion.svg width="90" height="90" viewBox="0 0 90 90"
              style={{ position:'absolute', top:'12%', right:'6%', opacity:0.10 }}
              animate={{ rotate:[0,-4,3,0], y:[0,-8,0] }}
              transition={{ duration:14, repeat:Infinity, ease:'easeInOut', delay:2 }}
            >
              <path d="M60 10 L80 10 L80 30" fill="none" stroke="#D97706" strokeWidth="2" strokeLinecap="round"/>
              <path d="M60 80 L80 80 L80 60" fill="none" stroke="#D97706" strokeWidth="2" strokeLinecap="round"/>
            </motion.svg>

            {/* Bottom-left diamond */}
            <motion.div
              style={{
                position:'absolute', bottom:'20%', left:'10%',
                width:18, height:18,
                border:'1.5px solid rgba(217,119,6,0.35)',
                transform:'rotate(45deg)',
              }}
              animate={{ rotate:[45,90,45], opacity:[0.35,0.75,0.35] }}
              transition={{ duration:7, repeat:Infinity, ease:'easeInOut', delay:1 }}
            />

            {/* Bottom-right dot grid */}
            <motion.div
              style={{
                position:'absolute', bottom:'18%', right:'8%',
                display:'grid', gridTemplateColumns:'repeat(3,1fr)',
                gap:8, opacity:0.18,
              }}
              animate={{ opacity:[0.10,0.25,0.10] }}
              transition={{ duration:5, repeat:Infinity, ease:'easeInOut', delay:2.5 }}
            >
              {Array.from({ length:9 }).map((_,i) => (
                <div key={i} style={{ width:3, height:3, borderRadius:'50%', background:'#D97706' }} />
              ))}
            </motion.div>
          </div>
        </div>

        {/* ── Footer ── */}
        <motion.footer
          initial={{ opacity:0 }}
          animate={inView ? { opacity:1 } : {}}
          transition={{ duration:0.8, ease:'easeOut', delay:0.7 }}
          style={{
            position:'relative', zIndex:1,
            borderTop:'1px solid rgba(217,119,6,0.08)',
            padding:'24px clamp(24px,5vw,64px)',
            display:'flex', alignItems:'center',
            justifyContent:'space-between', flexWrap:'wrap',
            gap:12,
          }}
        >
          {/* Left — name + year */}
          <span style={{
            fontFamily:"'Space Grotesk', system-ui, sans-serif",
            fontSize:'0.80rem', fontWeight:500,
            color: tokens.textMuted, letterSpacing:'0.02em',
          }}>
            <span style={{
              background:`linear-gradient(135deg, ${tokens.accentBright}, ${tokens.accent})`,
              WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent',
              backgroundClip:'text', fontWeight:700,
            }}>
              Abdul Basit
            </span>
            {' '}© 2026
          </span>

          {/* Center — tagline */}
          <span style={{
            fontFamily:"'Space Grotesk', system-ui, sans-serif",
            fontSize:'0.75rem', fontWeight:400,
            fontStyle:'italic', color: tokens.textMuted,
            letterSpacing:'0.02em',
            textAlign:'center', flex:1,
          }}>
            Built with AI, not excuses.
          </span>

          {/* Right — back to top */}
          <motion.button
            id="back-to-top"
            onClick={() => window.scrollTo({ top:0, behavior:'smooth' })}
            whileHover={{ scale:1.05, borderColor:'rgba(217,119,6,0.50)' }}
            whileTap={{ scale:0.95 }}
            style={{
              display:'flex', alignItems:'center', gap:6,
              padding:'6px 14px', borderRadius:8,
              border:'1px solid rgba(217,119,6,0.20)',
              background:'rgba(217,119,6,0.05)',
              color: tokens.textMuted,
              fontFamily:"'Space Grotesk', system-ui, sans-serif",
              fontSize:'0.72rem', fontWeight:500,
              letterSpacing:'0.06em', textTransform:'uppercase',
              cursor:'pointer', transition:'color 0.2s ease',
            }}
            onMouseEnter={e => e.currentTarget.style.color = tokens.accentBright}
            onMouseLeave={e => e.currentTarget.style.color = tokens.textMuted}
          >
            <svg width="11" height="11" viewBox="0 0 11 11" fill="none" aria-hidden="true">
              <path d="M5.5 9V2M2 5.5l3.5-3.5 3.5 3.5"
                stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Top
          </motion.button>
        </motion.footer>

        <style>{`
          @keyframes pulse-dot {
            0%, 100% { opacity: 1; transform: scale(1); }
            50%       { opacity: 0.5; transform: scale(1.5); }
          }
        `}</style>
      </section>
    </>
  );
}
