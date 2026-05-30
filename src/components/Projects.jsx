import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

/* ================================================================
   DESIGN TOKENS — identical to Hero, About, Skills
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
   PROJECTS DATA
   ================================================================ */
const projects = [
  {
    id: 'echo-tech',
    number: '01',
    tag: 'Live Product',
    tagColor: '#4ade80',
    tagBg: 'rgba(34,197,94,0.10)',
    tagBorder: 'rgba(34,197,94,0.25)',
    title: 'Echo Tech Website',
    description:
      'AI automation agency website targeting healthcare professionals globally. Built to convert — clean, fast, and deployed on production infrastructure.',
    stack: ['Claude Code', 'Cursor', 'Antigravity'],
    deployedOn: 'DigitalOcean VPS',
    link: 'https://echotechnologies.tech',
    linkLabel: 'echotechnologies.tech',
    featured: true,
  },
  {
    id: 'n8n-automation',
    number: '02',
    tag: 'Automation',
    tagColor: '#F59E0B',
    tagBg: 'rgba(245,158,11,0.10)',
    tagBorder: 'rgba(245,158,11,0.28)',
    title: 'n8n Master Automation',
    description:
      'Clinic lead processing pipeline — Google Sheets to AI-generated proposals, content, and calendar reminders. Fully hands-off once triggered.',
    stack: ['n8n', 'Gemini API', 'Google Sheets', 'MCP'],
    deployedOn: null,
    link: null,
    linkLabel: null,
    featured: false,
  },
  {
    id: 'cold-email',
    number: '03',
    tag: 'Growth System',
    tagColor: '#c084fc',
    tagBg: 'rgba(192,132,252,0.08)',
    tagBorder: 'rgba(192,132,252,0.22)',
    title: 'Cold Email Pipeline',
    description:
      'AI-powered client acquisition system targeting healthcare markets across the US, UK, and EU. Personalized at scale — zero manual effort.',
    stack: ['n8n', 'AI Personalization'],
    deployedOn: null,
    link: null,
    linkLabel: null,
    featured: false,
  },
  {
    id: 'ai-course',
    number: '04',
    tag: 'Education',
    tagColor: '#38bdf8',
    tagBg: 'rgba(56,189,248,0.08)',
    tagBorder: 'rgba(56,189,248,0.22)',
    title: 'AI Course Curriculum',
    description:
      '8-week practical AI course from beginner to advanced. No coding required. Designed for academies across Pakistan — grounded in 20+ real tools.',
    stack: ['Real Experience', '20+ AI Tools'],
    deployedOn: null,
    link: null,
    linkLabel: null,
    featured: false,
  },
];

/* ================================================================
   ANIMATION VARIANTS
   ================================================================ */
const fadeUp = {
  hidden:  { opacity: 0, y: 40, filter: 'blur(8px)' },
  visible: {
    opacity: 1, y: 0, filter: 'blur(0px)',
    transition: { duration: 0.75, ease: [0.22, 1, 0.36, 1] },
  },
};

const stagger = {
  hidden:  {},
  visible: { transition: { staggerChildren: 0.13, delayChildren: 0.05 } },
};

const pillPop = {
  hidden:  { opacity: 0, scale: 0.80 },
  visible: (i) => ({
    opacity: 1, scale: 1,
    transition: { duration: 0.32, ease: [0.34, 1.56, 0.64, 1], delay: i * 0.055 },
  }),
};

/* ================================================================
   SECTION DIVIDER
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
        style={{ flex:1, height:1, background:'linear-gradient(90deg,transparent,rgba(217,119,6,0.25),transparent)', transformOrigin:'left' }}
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
        style={{ flex:1, height:1, background:'linear-gradient(90deg,transparent,rgba(217,119,6,0.25),transparent)', transformOrigin:'right' }}
      />
    </div>
  );
}

/* ================================================================
   TECH STACK PILL
   ================================================================ */
function StackPill({ label, index }) {
  return (
    <motion.span
      variants={pillPop}
      custom={index}
      style={{
        display: 'inline-block',
        padding: '4px 11px',
        borderRadius: 5,
        fontSize: '0.73rem',
        fontWeight: 500,
        fontFamily: "'Space Grotesk', system-ui, sans-serif",
        letterSpacing: '0.02em',
        color: tokens.textMuted,
        background: 'rgba(255,255,255,0.03)',
        border: '1px solid rgba(217,119,6,0.13)',
        whiteSpace: 'nowrap',
      }}
    >
      {label}
    </motion.span>
  );
}

/* ================================================================
   FEATURED PROJECT CARD  (full-width, #01)
   ================================================================ */
function FeaturedCard({ project }) {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <motion.article
      ref={ref}
      id={`project-${project.id}`}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      variants={stagger}
      whileHover={{ y: -6, transition: { duration: 0.25, ease: 'easeOut' } }}
      style={{
        position: 'relative',
        borderRadius: 20,
        border: `1px solid ${tokens.borderSubtle}`,
        background: `linear-gradient(135deg, #181818 0%, ${tokens.bgSecondary} 100%)`,
        overflow: 'hidden',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 340px), 1fr))',
        boxShadow: '0 4px 32px rgba(0,0,0,0.5)',
        cursor: 'default',
        transition: 'box-shadow 0.3s ease, border-color 0.3s ease',
      }}
      onMouseEnter={e => {
        e.currentTarget.style.borderColor = 'rgba(217,119,6,0.42)';
        e.currentTarget.style.boxShadow   = '0 16px 60px rgba(217,119,6,0.14), 0 4px 20px rgba(0,0,0,0.55)';
      }}
      onMouseLeave={e => {
        e.currentTarget.style.borderColor = tokens.borderSubtle;
        e.currentTarget.style.boxShadow   = '0 4px 32px rgba(0,0,0,0.5)';
      }}
    >
      {/* Amber top bar */}
      <div style={{
        position:'absolute', top:0, left:0, right:0, height:3,
        background:`linear-gradient(90deg, transparent, ${tokens.accent}, ${tokens.accentBright}, ${tokens.accent}, transparent)`,
      }} />

      {/* Left — text content */}
      <div style={{ padding:'36px 36px 32px', display:'flex', flexDirection:'column', gap:22 }}>
        {/* Tag + number */}
        <motion.div variants={fadeUp} style={{ display:'flex', alignItems:'center', justifyContent:'space-between' }}>
          <span style={{
            padding:'5px 12px', borderRadius:999, fontSize:'0.68rem', fontWeight:700,
            letterSpacing:'0.10em', textTransform:'uppercase',
            color: project.tagColor, background: project.tagBg, border:`1px solid ${project.tagBorder}`,
            fontFamily:"'Space Grotesk', system-ui, sans-serif",
            display:'flex', alignItems:'center', gap:6,
          }}>
            <span style={{
              width:5, height:5, borderRadius:'50%', background: project.tagColor,
              boxShadow:`0 0 6px ${project.tagColor}`, display:'inline-block',
              animation:'pulse-dot 2s ease-in-out infinite',
            }} />
            {project.tag}
          </span>
          <span style={{
            fontFamily:"'Space Grotesk', system-ui, sans-serif",
            fontSize:'0.68rem', fontWeight:700, letterSpacing:'0.14em',
            color:'rgba(217,119,6,0.30)', userSelect:'none',
          }}>
            {project.number}
          </span>
        </motion.div>

        {/* Title */}
        <motion.h3 variants={fadeUp} style={{
          fontFamily:"'Space Grotesk', system-ui, sans-serif",
          fontSize:'clamp(1.5rem, 3.5vw, 2.1rem)', fontWeight:800,
          letterSpacing:'-0.03em', lineHeight:1.1,
          background:`linear-gradient(135deg, ${tokens.textPrimary} 0%, #D1D1D1 100%)`,
          WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent',
          backgroundClip:'text', margin:0,
        }}>
          {project.title}
        </motion.h3>

        {/* Description */}
        <motion.p variants={fadeUp} style={{
          fontFamily:"'Space Grotesk', system-ui, sans-serif",
          fontSize:'clamp(0.90rem, 2vw, 1rem)', lineHeight:1.78,
          color: tokens.textSecondary, fontWeight:400, margin:0,
        }}>
          {project.description}
        </motion.p>

        {/* Stack pills */}
        <motion.div variants={stagger} style={{ display:'flex', flexWrap:'wrap', gap:7 }}>
          {project.stack.map((s,i) => <StackPill key={s} label={s} index={i} />)}
          {project.deployedOn && (
            <StackPill label={`↑ ${project.deployedOn}`} index={project.stack.length} />
          )}
        </motion.div>

        {/* CTA link */}
        {project.link && (
          <motion.div variants={fadeUp}>
            <motion.a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              id={`link-${project.id}`}
              whileHover={{ scale:1.03, y:-2 }}
              whileTap={{ scale:0.97 }}
              style={{
                display:'inline-flex', alignItems:'center', gap:8,
                padding:'11px 22px', borderRadius:10,
                background:`linear-gradient(135deg, ${tokens.accent} 0%, ${tokens.accentDim} 100%)`,
                color: tokens.textPrimary,
                fontFamily:"'Space Grotesk', system-ui, sans-serif",
                fontSize:'0.82rem', fontWeight:600, letterSpacing:'0.03em',
                textDecoration:'none',
                boxShadow:`0 6px 24px rgba(217,119,6,0.30)`,
                transition:'box-shadow 0.2s ease',
              }}
            >
              {project.linkLabel}
              <svg width="13" height="13" viewBox="0 0 13 13" fill="none" aria-hidden="true">
                <path d="M2 11L11 2M11 2H5M11 2v6" stroke="currentColor" strokeWidth="1.6"
                  strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </motion.a>
          </motion.div>
        )}
      </div>

      {/* Right — decorative visual panel */}
      <div style={{
        position:'relative', minHeight:220,
        background:`linear-gradient(135deg, rgba(217,119,6,0.06) 0%, rgba(180,83,9,0.03) 100%)`,
        borderLeft:`1px solid ${tokens.borderSubtle}`,
        display:'flex', alignItems:'center', justifyContent:'center', overflow:'hidden',
      }}>
        {/* Rotating geometric decoration */}
        <div style={{ position:'absolute', inset:0, display:'flex', alignItems:'center', justifyContent:'center' }}>
          <motion.svg width="200" height="200" viewBox="0 0 200 200"
            animate={{ rotate:360 }}
            transition={{ duration:30, repeat:Infinity, ease:'linear' }}
            style={{ opacity:0.12 }}
          >
            <rect x="20" y="20" width="160" height="160" rx="4"
              fill="none" stroke="#D97706" strokeWidth="1" strokeDasharray="8 6"/>
            <rect x="50" y="50" width="100" height="100" rx="2"
              fill="none" stroke="#F59E0B" strokeWidth="0.8"/>
          </motion.svg>
          <motion.svg width="80" height="80" viewBox="0 0 80 80" style={{ position:'absolute', opacity:0.2 }}
            animate={{ rotate:-360 }}
            transition={{ duration:18, repeat:Infinity, ease:'linear' }}
          >
            <polygon points="40,4 76,60 4,60"
              fill="none" stroke="#F59E0B" strokeWidth="1.2"/>
          </motion.svg>
        </div>

        {/* Domain badge */}
        <div style={{
          position:'relative', zIndex:1,
          padding:'12px 20px', borderRadius:12,
          border:`1px solid rgba(217,119,6,0.28)`,
          background:'rgba(10,10,10,0.70)',
          backdropFilter:'blur(12px)',
          display:'flex', flexDirection:'column', gap:6, alignItems:'center',
        }}>
          <div style={{
            width:36, height:36, borderRadius:8,
            background:`linear-gradient(135deg, rgba(217,119,6,0.25), rgba(180,83,9,0.12))`,
            border:`1px solid rgba(217,119,6,0.30)`,
            display:'flex', alignItems:'center', justifyContent:'center',
            fontSize:'1.1rem',
          }}>◈</div>
          <span style={{
            fontFamily:"'Space Grotesk', system-ui, sans-serif",
            fontSize:'0.72rem', fontWeight:600, color: tokens.accentBright,
            letterSpacing:'0.04em',
          }}>echotechnologies.tech</span>
          <div style={{ display:'flex', alignItems:'center', gap:5 }}>
            <span style={{
              width:5, height:5, borderRadius:'50%', background:'#4ade80',
              boxShadow:'0 0 6px #4ade80', animation:'pulse-dot 2s ease-in-out infinite',
            }}/>
            <span style={{ fontSize:'0.62rem', color:'#4ade80', fontFamily:"'Space Grotesk', system-ui, sans-serif", fontWeight:500 }}>
              Live & Deployed
            </span>
          </div>
        </div>
      </div>
    </motion.article>
  );
}

/* ================================================================
   STANDARD PROJECT CARD  (#02 – #04)
   ================================================================ */
function ProjectCard({ project }) {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <motion.article
      ref={ref}
      id={`project-${project.id}`}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      variants={stagger}
      whileHover={{ y: -6, transition: { duration: 0.25, ease: 'easeOut' } }}
      style={{
        position: 'relative',
        borderRadius: 18,
        border: `1px solid ${tokens.borderSubtle}`,
        background: `linear-gradient(145deg, ${tokens.bgElevated} 0%, ${tokens.bgSecondary} 100%)`,
        padding: '28px 26px 24px',
        display: 'flex',
        flexDirection: 'column',
        gap: 18,
        overflow: 'hidden',
        boxShadow: '0 4px 24px rgba(0,0,0,0.45)',
        cursor: 'default',
        transition: 'box-shadow 0.3s ease, border-color 0.3s ease',
        minHeight: 280,
      }}
      onMouseEnter={e => {
        e.currentTarget.style.borderColor = 'rgba(217,119,6,0.38)';
        e.currentTarget.style.boxShadow   = '0 12px 48px rgba(217,119,6,0.12), 0 4px 16px rgba(0,0,0,0.5)';
      }}
      onMouseLeave={e => {
        e.currentTarget.style.borderColor = tokens.borderSubtle;
        e.currentTarget.style.boxShadow   = '0 4px 24px rgba(0,0,0,0.45)';
      }}
    >
      {/* Corner glow */}
      <div aria-hidden="true" style={{
        position:'absolute', top:-50, right:-50, width:150, height:150, borderRadius:'50%',
        background:'radial-gradient(circle, rgba(217,119,6,0.09) 0%, transparent 70%)',
        pointerEvents:'none',
      }} />

      {/* Tag + number row */}
      <motion.div variants={fadeUp} style={{ display:'flex', alignItems:'center', justifyContent:'space-between' }}>
        <span style={{
          padding:'4px 11px', borderRadius:999,
          fontSize:'0.65rem', fontWeight:700, letterSpacing:'0.10em', textTransform:'uppercase',
          color: project.tagColor, background: project.tagBg, border:`1px solid ${project.tagBorder}`,
          fontFamily:"'Space Grotesk', system-ui, sans-serif",
        }}>
          {project.tag}
        </span>
        <span style={{
          fontFamily:"'Space Grotesk', system-ui, sans-serif",
          fontSize:'0.65rem', fontWeight:700, letterSpacing:'0.14em',
          color:'rgba(217,119,6,0.28)', userSelect:'none',
        }}>
          {project.number}
        </span>
      </motion.div>

      {/* Divider */}
      <div style={{ height:1, background:`linear-gradient(90deg, rgba(217,119,6,0.22), transparent)`, marginTop:-6 }} />

      {/* Title */}
      <motion.h3 variants={fadeUp} style={{
        fontFamily:"'Space Grotesk', system-ui, sans-serif",
        fontSize:'clamp(1.1rem, 2.5vw, 1.35rem)', fontWeight:700,
        letterSpacing:'-0.02em', lineHeight:1.2,
        color: tokens.textPrimary, margin:0,
      }}>
        {project.title}
      </motion.h3>

      {/* Description */}
      <motion.p variants={fadeUp} style={{
        fontFamily:"'Space Grotesk', system-ui, sans-serif",
        fontSize:'0.875rem', lineHeight:1.75,
        color: tokens.textSecondary, fontWeight:400, margin:0,
        flex:1,
      }}>
        {project.description}
      </motion.p>

      {/* Stack pills */}
      <motion.div variants={stagger} style={{ display:'flex', flexWrap:'wrap', gap:6, marginTop:'auto' }}>
        {project.stack.map((s, i) => <StackPill key={s} label={s} index={i} />)}
      </motion.div>

      {/* Arrow indicator (no external link) */}
      <motion.div
        variants={fadeUp}
        style={{
          position:'absolute', bottom:20, right:22,
          width:30, height:30, borderRadius:8,
          border:`1px solid rgba(217,119,6,0.18)`,
          background:'rgba(217,119,6,0.06)',
          display:'flex', alignItems:'center', justifyContent:'center',
        }}
      >
        <svg width="13" height="13" viewBox="0 0 13 13" fill="none" aria-hidden="true">
          <path d="M2.5 10.5L10.5 2.5M10.5 2.5H5M10.5 2.5V8"
            stroke="#D97706" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </motion.div>
    </motion.article>
  );
}

/* ================================================================
   PROJECTS SECTION — main export
   ================================================================ */
export default function Projects() {
  const headerRef = useRef(null);
  const headerInView = useInView(headerRef, { once: true, margin: '-80px' });

  const [featured, ...rest] = projects;

  return (
    <>
      <SectionDivider />

      <section
        id="work"
        style={{
          backgroundColor: tokens.bgPrimary,
          fontFamily: "'Space Grotesk', system-ui, sans-serif",
          padding: 'clamp(64px, 10vw, 120px) 0',
          position: 'relative',
          overflow: 'hidden',
        }}
        aria-label="Projects section"
      >
        {/* Ambient background */}
        <div aria-hidden="true" style={{
          position:'absolute', inset:0,
          background:`
            radial-gradient(ellipse 60% 50% at 90% 10%, rgba(217,119,6,0.05) 0%, transparent 70%),
            radial-gradient(ellipse 50% 60% at 5%  90%, rgba(245,158,11,0.03) 0%, transparent 70%)
          `,
          pointerEvents:'none',
        }} />

        {/* Grid lines */}
        <div aria-hidden="true" style={{
          position:'absolute', inset:0,
          backgroundImage:`
            linear-gradient(rgba(217,119,6,0.025) 1px, transparent 1px),
            linear-gradient(90deg, rgba(217,119,6,0.025) 1px, transparent 1px)
          `,
          backgroundSize:'64px 64px',
          pointerEvents:'none',
        }} />

        <div style={{
          position:'relative', zIndex:1,
          maxWidth:1152, margin:'0 auto',
          padding:'0 clamp(24px, 5vw, 64px)',
          display:'flex', flexDirection:'column',
          gap:'clamp(40px, 6vw, 64px)',
        }}>

          {/* ── Section Header ── */}
          <motion.div
            ref={headerRef}
            initial="hidden"
            animate={headerInView ? 'visible' : 'hidden'}
            variants={stagger}
            style={{ display:'flex', flexDirection:'column', gap:16 }}
          >
            {/* Label pill */}
            <motion.div variants={fadeUp}>
              <div style={{
                display:'inline-flex', alignItems:'center', gap:8,
                padding:'6px 14px', borderRadius:999,
                border:'1px solid rgba(217,119,6,0.28)',
                background:'rgba(217,119,6,0.07)',
                fontSize:'0.70rem', fontWeight:600,
                letterSpacing:'0.16em', textTransform:'uppercase',
                color: tokens.accentBright,
                fontFamily:"'Space Grotesk', system-ui, sans-serif",
              }}>
                <span style={{
                  display:'inline-block', width:5, height:5, borderRadius:'50%',
                  background: tokens.accentBright, boxShadow:`0 0 6px ${tokens.accentBright}`,
                }} />
                What I've Built
              </div>
            </motion.div>

            {/* Heading + count */}
            <div style={{
              display:'flex', alignItems:'flex-end',
              justifyContent:'space-between', flexWrap:'wrap', gap:20,
            }}>
              <motion.div variants={fadeUp}>
                <h2 style={{
                  fontSize:'clamp(2.2rem, 5vw, 3.8rem)', fontWeight:800,
                  letterSpacing:'-0.03em', lineHeight:1.0, margin:0,
                }}>
                  <span style={{ display:'block', color: tokens.textPrimary }}>
                    Selected
                  </span>
                  <span style={{
                    display:'block',
                    background:`linear-gradient(135deg, ${tokens.accentBright} 0%, ${tokens.accent} 60%, ${tokens.accentDim} 100%)`,
                    WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent',
                    backgroundClip:'text',
                    filter:'drop-shadow(0 0 24px rgba(217,119,6,0.35))',
                  }}>
                    Projects.
                  </span>
                </h2>
                <div style={{
                  marginTop:14, height:3, width:56,
                  background:`linear-gradient(90deg, ${tokens.accentBright}, ${tokens.accent} 60%, transparent)`,
                  borderRadius:2, boxShadow:'0 0 10px rgba(217,119,6,0.55)',
                }} />
              </motion.div>

              {/* Count badge */}
              <motion.div variants={fadeUp}>
                <div style={{
                  padding:'10px 20px', borderRadius:12,
                  border:`1px solid ${tokens.borderSubtle}`,
                  background: tokens.bgElevated,
                  display:'flex', flexDirection:'column', alignItems:'center', gap:2,
                }}>
                  <span style={{
                    fontFamily:"'Space Grotesk', system-ui, sans-serif",
                    fontSize:'1.6rem', fontWeight:800, letterSpacing:'-0.03em',
                    background:`linear-gradient(135deg, ${tokens.accentBright}, ${tokens.accent})`,
                    WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent',
                    backgroundClip:'text',
                  }}>
                    {projects.length}
                  </span>
                  <span style={{
                    fontFamily:"'Space Grotesk', system-ui, sans-serif",
                    fontSize:'0.65rem', fontWeight:500,
                    letterSpacing:'0.10em', textTransform:'uppercase',
                    color: tokens.textMuted,
                  }}>
                    Projects
                  </span>
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* ── Featured card (full-width) ── */}
          <FeaturedCard project={featured} />

          {/* ── Grid of 3 standard cards ── */}
          <div style={{
            display:'grid',
            gridTemplateColumns:'repeat(auto-fill, minmax(min(100%, 300px), 1fr))',
            gap:'clamp(14px, 2vw, 20px)',
            alignItems:'start',
          }}>
            {rest.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>

          {/* ── Bottom note ── */}
          <motion.div
            initial={{ opacity:0, y:20 }}
            whileInView={{ opacity:1, y:0 }}
            viewport={{ once:true, margin:'-40px' }}
            transition={{ duration:0.7, ease:[0.22,1,0.36,1] }}
            style={{
              textAlign:'center', padding:'24px',
              borderRadius:14, border:'1px solid rgba(217,119,6,0.10)',
              background:'rgba(217,119,6,0.04)',
            }}
          >
            <p style={{
              fontFamily:"'Space Grotesk', system-ui, sans-serif",
              fontSize:'clamp(0.85rem, 2vw, 1rem)',
              fontStyle:'italic', fontWeight:300,
              color: tokens.textMuted, margin:0,
            }}>
              Every project is a live experiment.{' '}
              <span style={{
                background:`linear-gradient(135deg, ${tokens.accentBright}, ${tokens.accent})`,
                WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent',
                backgroundClip:'text', fontWeight:600, fontStyle:'normal',
              }}>
                Ship first. Iterate always.
              </span>
            </p>
          </motion.div>
        </div>

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
