import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

/* ================================================================
   DESIGN TOKENS — identical to Hero & About
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
   SKILLS DATA
   ================================================================ */
const skillCategories = [
  {
    id: 'ai-llms',
    category: 'AI & LLMs',
    number: '01',
    skills: ['Claude', 'ChatGPT', 'Gemini', 'Grok', 'Perplexity'],
    accent: 'rgba(245,158,11,1)',
    glow: 'rgba(245,158,11,0.12)',
  },
  {
    id: 'automation',
    category: 'Automation',
    number: '02',
    skills: ['n8n', 'MCP', 'Claude Code', 'API Integrations'],
    accent: 'rgba(217,119,6,1)',
    glow: 'rgba(217,119,6,0.12)',
  },
  {
    id: 'building',
    category: 'Building',
    number: '03',
    skills: ['Cursor', 'Antigravity', 'DigitalOcean VPS', 'GitHub'],
    accent: 'rgba(251,191,36,1)',
    glow: 'rgba(251,191,36,0.10)',
  },
  {
    id: 'design',
    category: 'Design',
    number: '04',
    skills: ['Google Stitch', 'Canva', 'Pemilli'],
    accent: 'rgba(245,158,11,1)',
    glow: 'rgba(245,158,11,0.12)',
  },
  {
    id: 'content-media',
    category: 'Content & Media',
    number: '05',
    skills: ['NotebookLM', 'Genspark', 'ElevenLabs', 'Google Flow', 'Veo'],
    accent: 'rgba(217,119,6,1)',
    glow: 'rgba(217,119,6,0.10)',
  },
  {
    id: 'local-ai',
    category: 'Local AI',
    number: '06',
    skills: ['Ollama', 'Hermes', 'OpenClaw'],
    accent: 'rgba(180,83,9,1)',
    glow: 'rgba(180,83,9,0.12)',
  },
];

/* ================================================================
   ANIMATION VARIANTS
   ================================================================ */
const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.10, delayChildren: 0.05 },
  },
};

const cardVariants = {
  hidden:  { opacity: 0, y: 36, filter: 'blur(8px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.70, ease: [0.22, 1, 0.36, 1] },
  },
};

const pillVariants = {
  hidden:  { opacity: 0, scale: 0.82 },
  visible: (i) => ({
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.35,
      ease: [0.34, 1.56, 0.64, 1],
      delay: i * 0.06,
    },
  }),
};

const headingVariants = {
  hidden:  { opacity: 0, x: -24 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] },
  },
};

/* ================================================================
   SKILL BADGE PILL
   ================================================================ */
function SkillPill({ label, index }) {
  return (
    <motion.span
      variants={pillVariants}
      custom={index}
      whileHover={{ scale: 1.06, borderColor: 'rgba(217,119,6,0.50)' }}
      style={{
        display: 'inline-block',
        padding: '5px 13px',
        borderRadius: 6,
        fontSize: '0.78rem',
        fontWeight: 500,
        fontFamily: "'Space Grotesk', system-ui, sans-serif",
        letterSpacing: '0.02em',
        color: tokens.textSecondary,
        background: 'rgba(255,255,255,0.03)',
        border: `1px solid rgba(217,119,6,0.15)`,
        cursor: 'default',
        transition: 'border-color 0.2s ease, color 0.2s ease, background 0.2s ease',
        whiteSpace: 'nowrap',
      }}
      onMouseEnter={e => {
        e.currentTarget.style.color = tokens.textPrimary;
        e.currentTarget.style.background = 'rgba(217,119,6,0.08)';
      }}
      onMouseLeave={e => {
        e.currentTarget.style.color = tokens.textSecondary;
        e.currentTarget.style.background = 'rgba(255,255,255,0.03)';
      }}
    >
      {label}
    </motion.span>
  );
}

/* ================================================================
   SKILL CATEGORY CARD
   ================================================================ */
function SkillCard({ data, index }) {
  const cardRef = useRef(null);
  const inView  = useInView(cardRef, { once: true, margin: '-60px' });

  return (
    <motion.article
      ref={cardRef}
      id={`skill-card-${data.id}`}
      variants={cardVariants}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      whileHover={{ y: -5, transition: { duration: 0.25, ease: 'easeOut' } }}
      style={{
        position: 'relative',
        borderRadius: 18,
        border: `1px solid ${tokens.borderSubtle}`,
        background: `linear-gradient(145deg, ${tokens.bgElevated} 0%, ${tokens.bgSecondary} 100%)`,
        padding: '28px 26px 26px',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        gap: 20,
        boxShadow: '0 4px 24px rgba(0,0,0,0.45)',
        cursor: 'default',
        transition: 'box-shadow 0.3s ease, border-color 0.3s ease',
      }}
      onMouseEnter={e => {
        e.currentTarget.style.borderColor = 'rgba(217,119,6,0.35)';
        e.currentTarget.style.boxShadow = `0 12px 48px ${data.glow}, 0 4px 16px rgba(0,0,0,0.5)`;
      }}
      onMouseLeave={e => {
        e.currentTarget.style.borderColor = tokens.borderSubtle;
        e.currentTarget.style.boxShadow = '0 4px 24px rgba(0,0,0,0.45)';
      }}
    >
      {/* Background glow blob */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          top: -60,
          right: -60,
          width: 180,
          height: 180,
          borderRadius: '50%',
          background: `radial-gradient(circle, ${data.glow} 0%, transparent 70%)`,
          pointerEvents: 'none',
          transition: 'opacity 0.3s ease',
        }}
      />

      {/* Top row: number + category name */}
      <motion.div
        variants={headingVariants}
        style={{
          display: 'flex',
          alignItems: 'baseline',
          gap: 12,
        }}
      >
        <span
          style={{
            fontFamily: "'Space Grotesk', system-ui, sans-serif",
            fontSize: '0.68rem',
            fontWeight: 700,
            letterSpacing: '0.14em',
            color: 'rgba(217,119,6,0.35)',
            userSelect: 'none',
          }}
        >
          {data.number}
        </span>

        <h3
          style={{
            fontFamily: "'Space Grotesk', system-ui, sans-serif",
            fontSize: 'clamp(0.95rem, 2vw, 1.08rem)',
            fontWeight: 700,
            letterSpacing: '-0.01em',
            background: `linear-gradient(135deg, ${tokens.accentBright} 0%, ${tokens.accent} 100%)`,
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            margin: 0,
          }}
        >
          {data.category}
        </h3>
      </motion.div>

      {/* Thin amber divider */}
      <div
        style={{
          height: 1,
          background: `linear-gradient(90deg, rgba(217,119,6,0.30), transparent)`,
          marginTop: -8,
        }}
      />

      {/* Pill badges */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate={inView ? 'visible' : 'hidden'}
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: 8,
        }}
      >
        {data.skills.map((skill, i) => (
          <SkillPill key={skill} label={skill} index={i} />
        ))}
      </motion.div>

      {/* Count chip — bottom right */}
      <div
        style={{
          position: 'absolute',
          bottom: 18,
          right: 18,
          fontFamily: "'Space Grotesk', system-ui, sans-serif",
          fontSize: '0.65rem',
          fontWeight: 600,
          letterSpacing: '0.08em',
          color: 'rgba(217,119,6,0.35)',
          userSelect: 'none',
        }}
      >
        {data.skills.length} tools
      </div>
    </motion.article>
  );
}

/* ================================================================
   SECTION DIVIDER — reused pattern from About
   ================================================================ */
function SectionDivider() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <div
      ref={ref}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 20,
        maxWidth: 1152,
        margin: '0 auto',
        padding: '0 clamp(24px, 5vw, 64px)',
      }}
    >
      <motion.div
        initial={{ scaleX: 0, opacity: 0 }}
        animate={inView ? { scaleX: 1, opacity: 1 } : {}}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        style={{
          flex: 1,
          height: 1,
          background: 'linear-gradient(90deg, transparent, rgba(217,119,6,0.25), transparent)',
          transformOrigin: 'left',
        }}
      />
      <motion.div
        initial={{ opacity: 0, scale: 0.5, rotate: 45 }}
        animate={inView ? { opacity: 1, scale: 1, rotate: 45 } : {}}
        transition={{ duration: 0.5, delay: 0.3, ease: [0.34, 1.56, 0.64, 1] }}
        style={{
          width: 8,
          height: 8,
          border: '1.5px solid rgba(217,119,6,0.5)',
          flexShrink: 0,
        }}
      />
      <motion.div
        initial={{ scaleX: 0, opacity: 0 }}
        animate={inView ? { scaleX: 1, opacity: 1 } : {}}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
        style={{
          flex: 1,
          height: 1,
          background: 'linear-gradient(90deg, transparent, rgba(217,119,6,0.25), transparent)',
          transformOrigin: 'right',
        }}
      />
    </div>
  );
}

/* ================================================================
   SKILLS SECTION — main export
   ================================================================ */
export default function Skills() {
  const headerRef = useRef(null);
  const headerInView = useInView(headerRef, { once: true, margin: '-80px' });

  return (
    <>
      <SectionDivider />

      <section
        id="skills"
        style={{
          backgroundColor: tokens.bgPrimary,
          fontFamily: "'Space Grotesk', system-ui, sans-serif",
          padding: 'clamp(64px, 10vw, 120px) 0',
          position: 'relative',
          overflow: 'hidden',
        }}
        aria-label="Skills section"
      >
        {/* Ambient background radials */}
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            inset: 0,
            background: `
              radial-gradient(ellipse 55% 45% at 15% 20%, rgba(217,119,6,0.04) 0%, transparent 70%),
              radial-gradient(ellipse 45% 55% at 85% 75%, rgba(245,158,11,0.03) 0%, transparent 70%)
            `,
            pointerEvents: 'none',
          }}
        />

        {/* Grid lines */}
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: `
              linear-gradient(rgba(217,119,6,0.025) 1px, transparent 1px),
              linear-gradient(90deg, rgba(217,119,6,0.025) 1px, transparent 1px)
            `,
            backgroundSize: '64px 64px',
            pointerEvents: 'none',
          }}
        />

        <div
          style={{
            position: 'relative',
            zIndex: 1,
            maxWidth: 1152,
            margin: '0 auto',
            padding: '0 clamp(24px, 5vw, 64px)',
            display: 'flex',
            flexDirection: 'column',
            gap: 'clamp(40px, 6vw, 64px)',
          }}
        >
          {/* ── Section Header ── */}
          <motion.div
            ref={headerRef}
            initial="hidden"
            animate={headerInView ? 'visible' : 'hidden'}
            variants={containerVariants}
            style={{ display: 'flex', flexDirection: 'column', gap: 16 }}
          >
            {/* Label pill */}
            <motion.div variants={cardVariants}>
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 8,
                  padding: '6px 14px',
                  borderRadius: 999,
                  border: '1px solid rgba(217,119,6,0.28)',
                  background: 'rgba(217,119,6,0.07)',
                  fontSize: '0.70rem',
                  fontWeight: 600,
                  letterSpacing: '0.16em',
                  textTransform: 'uppercase',
                  color: tokens.accentBright,
                }}
              >
                <span
                  style={{
                    display: 'inline-block',
                    width: 5,
                    height: 5,
                    borderRadius: '50%',
                    background: tokens.accentBright,
                    boxShadow: `0 0 6px ${tokens.accentBright}`,
                  }}
                />
                My Arsenal
              </div>
            </motion.div>

            {/* Heading + sub row */}
            <div
              style={{
                display: 'flex',
                alignItems: 'flex-end',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                gap: 20,
              }}
            >
              <motion.div variants={cardVariants}>
                <h2
                  style={{
                    fontSize: 'clamp(2.2rem, 5vw, 3.8rem)',
                    fontWeight: 800,
                    letterSpacing: '-0.03em',
                    lineHeight: 1.0,
                    margin: 0,
                  }}
                >
                  <span style={{ display: 'block', color: tokens.textPrimary }}>
                    Tools &amp;
                  </span>
                  <span
                    style={{
                      display: 'block',
                      background: `linear-gradient(135deg, ${tokens.accentBright} 0%, ${tokens.accent} 60%, ${tokens.accentDim} 100%)`,
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      backgroundClip: 'text',
                      filter: 'drop-shadow(0 0 24px rgba(217,119,6,0.35))',
                    }}
                  >
                    Skills.
                  </span>
                </h2>
                {/* Amber underline */}
                <div
                  style={{
                    marginTop: 14,
                    height: 3,
                    width: 56,
                    background: `linear-gradient(90deg, ${tokens.accentBright}, ${tokens.accent} 60%, transparent)`,
                    borderRadius: 2,
                    boxShadow: '0 0 10px rgba(217,119,6,0.55)',
                  }}
                />
              </motion.div>

              {/* Total count badge */}
              <motion.div variants={cardVariants}>
                <div
                  style={{
                    padding: '10px 20px',
                    borderRadius: 12,
                    border: `1px solid ${tokens.borderSubtle}`,
                    background: tokens.bgElevated,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: 2,
                  }}
                >
                  <span
                    style={{
                      fontFamily: "'Space Grotesk', system-ui, sans-serif",
                      fontSize: '1.6rem',
                      fontWeight: 800,
                      letterSpacing: '-0.03em',
                      background: `linear-gradient(135deg, ${tokens.accentBright}, ${tokens.accent})`,
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      backgroundClip: 'text',
                    }}
                  >
                    {skillCategories.reduce((sum, c) => sum + c.skills.length, 0)}+
                  </span>
                  <span
                    style={{
                      fontFamily: "'Space Grotesk', system-ui, sans-serif",
                      fontSize: '0.65rem',
                      fontWeight: 500,
                      letterSpacing: '0.10em',
                      textTransform: 'uppercase',
                      color: tokens.textMuted,
                    }}
                  >
                    Tools in stack
                  </span>
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* ── Cards Grid ── */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 320px), 1fr))',
              gap: 'clamp(14px, 2vw, 20px)',
              alignItems: 'start',
            }}
          >
            {skillCategories.map((cat, i) => (
              <SkillCard key={cat.id} data={cat} index={i} />
            ))}
          </div>

          {/* ── Bottom tagline ── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            style={{
              textAlign: 'center',
              padding: '24px',
              borderRadius: 14,
              border: '1px solid rgba(217,119,6,0.10)',
              background: 'rgba(217,119,6,0.04)',
            }}
          >
            <p
              style={{
                fontFamily: "'Space Grotesk', system-ui, sans-serif",
                fontSize: 'clamp(0.85rem, 2vw, 1rem)',
                fontStyle: 'italic',
                fontWeight: 300,
                color: tokens.textMuted,
                margin: 0,
              }}
            >
              Not a developer. Just someone who makes{' '}
              <span
                style={{
                  background: `linear-gradient(135deg, ${tokens.accentBright}, ${tokens.accent})`,
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  fontWeight: 600,
                  fontStyle: 'normal',
                }}
              >
                AI do the heavy lifting.
              </span>
            </p>
          </motion.div>
        </div>
      </section>
    </>
  );
}
