import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

/* ================================================================
   DESIGN TOKENS — mirrors Hero.jsx token set
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
   ANIMATION VARIANTS
   ================================================================ */
const fadeUp = {
  hidden:  { opacity: 0, y: 40, filter: 'blur(8px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.75, ease: [0.22, 1, 0.36, 1] },
  },
};

const fadeLeft = {
  hidden:  { opacity: 0, x: -40, filter: 'blur(6px)' },
  visible: {
    opacity: 1,
    x: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.80, ease: [0.22, 1, 0.36, 1] },
  },
};

const fadeRight = {
  hidden:  { opacity: 0, x: 40, filter: 'blur(6px)' },
  visible: {
    opacity: 1,
    x: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.80, ease: [0.22, 1, 0.36, 1] },
  },
};

const stagger = {
  hidden:  {},
  visible: { transition: { staggerChildren: 0.13, delayChildren: 0.05 } },
};

/* ================================================================
   STAT CARD
   ================================================================ */
function StatCard({ icon, value, label, delay = 0 }) {
  return (
    <motion.div
      variants={fadeUp}
      transition={{ delay }}
      whileHover={{ scale: 1.03, y: -4 }}
      style={{
        background: `linear-gradient(135deg, ${tokens.bgElevated} 0%, ${tokens.bgSecondary} 100%)`,
        border: `1px solid ${tokens.borderSubtle}`,
        borderRadius: 16,
        padding: '28px 28px',
        display: 'flex',
        flexDirection: 'column',
        gap: 10,
        position: 'relative',
        overflow: 'hidden',
        cursor: 'default',
        transition: 'box-shadow 0.3s ease, border-color 0.3s ease',
        boxShadow: '0 4px 24px rgba(0,0,0,0.4)',
      }}
      onMouseEnter={e => {
        e.currentTarget.style.borderColor = tokens.borderActive;
        e.currentTarget.style.boxShadow = `0 8px 40px rgba(217,119,6,0.14), 0 4px 16px rgba(0,0,0,0.5)`;
      }}
      onMouseLeave={e => {
        e.currentTarget.style.borderColor = tokens.borderSubtle;
        e.currentTarget.style.boxShadow = '0 4px 24px rgba(0,0,0,0.4)';
      }}
    >
      {/* corner glow */}
      <div
        style={{
          position: 'absolute',
          top: -40,
          right: -40,
          width: 120,
          height: 120,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(217,119,6,0.10) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />

      {/* Icon badge */}
      <div
        style={{
          width: 44,
          height: 44,
          borderRadius: 10,
          background: 'rgba(217,119,6,0.10)',
          border: `1px solid rgba(217,119,6,0.22)`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: 20,
          marginBottom: 4,
        }}
      >
        {icon}
      </div>

      <span
        style={{
          fontFamily: "'Space Grotesk', system-ui, sans-serif",
          fontSize: 'clamp(1.6rem, 4vw, 2.2rem)',
          fontWeight: 800,
          letterSpacing: '-0.03em',
          background: `linear-gradient(135deg, ${tokens.accentBright} 0%, ${tokens.accent} 100%)`,
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
          lineHeight: 1,
        }}
      >
        {value}
      </span>

      <span
        style={{
          fontFamily: "'Space Grotesk', system-ui, sans-serif",
          fontSize: '0.82rem',
          fontWeight: 500,
          letterSpacing: '0.06em',
          textTransform: 'uppercase',
          color: tokens.textSecondary,
        }}
      >
        {label}
      </span>
    </motion.div>
  );
}

/* ================================================================
   COFOUNDER CHIP
   ================================================================ */
function CofounderChip() {
  return (
    <motion.div
      variants={fadeUp}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 12,
        padding: '10px 16px',
        borderRadius: 12,
        border: `1px solid ${tokens.borderSubtle}`,
        background: `rgba(217,119,6,0.05)`,
        marginTop: 8,
        width: 'fit-content',
      }}
    >
      {/* Avatar placeholder — geometric initials */}
      <div
        style={{
          width: 34,
          height: 34,
          borderRadius: 8,
          background: `linear-gradient(135deg, rgba(217,119,6,0.30), rgba(180,83,9,0.15))`,
          border: `1px solid rgba(217,119,6,0.30)`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: "'Space Grotesk', system-ui, sans-serif",
          fontSize: '0.72rem',
          fontWeight: 700,
          color: tokens.accentBright,
          letterSpacing: '0.04em',
          flexShrink: 0,
        }}
      >
        ZA
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
        <span
          style={{
            fontFamily: "'Space Grotesk', system-ui, sans-serif",
            fontSize: '0.82rem',
            fontWeight: 600,
            color: tokens.textPrimary,
          }}
        >
          Zain Ali
        </span>
        <span
          style={{
            fontFamily: "'Space Grotesk', system-ui, sans-serif",
            fontSize: '0.70rem',
            fontWeight: 400,
            color: tokens.textMuted,
            letterSpacing: '0.04em',
          }}
        >
          Co-Founder · CTO @ Echo Tech
        </span>
      </div>
    </motion.div>
  );
}

/* ================================================================
   SECTION DIVIDER
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
        maxWidth: '6xl',
        margin: '0 auto',
        padding: '0 24px',
      }}
    >
      <motion.div
        initial={{ scaleX: 0, opacity: 0 }}
        animate={inView ? { scaleX: 1, opacity: 1 } : {}}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        style={{
          flex: 1,
          height: 1,
          background: `linear-gradient(90deg, transparent, rgba(217,119,6,0.25), transparent)`,
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
          border: `1.5px solid rgba(217,119,6,0.5)`,
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
          background: `linear-gradient(90deg, transparent, rgba(217,119,6,0.25), transparent)`,
          transformOrigin: 'right',
        }}
      />
    </div>
  );
}

/* ================================================================
   ABOUT COMPONENT
   ================================================================ */
export default function About() {
  const sectionRef  = useRef(null);
  const leftRef     = useRef(null);
  const rightRef    = useRef(null);

  const sectionInView = useInView(sectionRef, { once: true, margin: '-100px' });
  const leftInView    = useInView(leftRef,    { once: true, margin: '-80px'  });
  const rightInView   = useInView(rightRef,   { once: true, margin: '-80px'  });

  return (
    <>
      {/* ─── Section Divider ─── */}
      <SectionDivider />

      {/* ─── About Section ─── */}
      <section
        id="about"
        ref={sectionRef}
        style={{
          backgroundColor: tokens.bgPrimary,
          fontFamily: "'Space Grotesk', system-ui, sans-serif",
          padding: 'clamp(64px, 10vw, 120px) 0',
          position: 'relative',
          overflow: 'hidden',
        }}
        aria-label="About section"
      >
        {/* Background noise texture suggestion via subtle radial */}
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            inset: 0,
            background: `
              radial-gradient(ellipse 60% 50% at 80% 30%, rgba(217,119,6,0.04) 0%, transparent 70%),
              radial-gradient(ellipse 50% 60% at 10% 80%, rgba(217,119,6,0.03) 0%, transparent 70%)
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

        {/* ─── Content Container ─── */}
        <div
          style={{
            position: 'relative',
            zIndex: 1,
            maxWidth: 1152,
            margin: '0 auto',
            padding: '0 clamp(24px, 5vw, 64px)',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 420px), 1fr))',
            gap: 'clamp(48px, 6vw, 80px)',
            alignItems: 'start',
          }}
        >

          {/* ══════════════════════════════
              LEFT COLUMN — Text content
              ══════════════════════════════ */}
          <motion.div
            ref={leftRef}
            variants={stagger}
            initial="hidden"
            animate={leftInView ? 'visible' : 'hidden'}
            style={{ display: 'flex', flexDirection: 'column', gap: 28 }}
          >
            {/* Section label */}
            <motion.div variants={fadeLeft}>
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 8,
                  padding: '6px 14px',
                  borderRadius: 999,
                  border: `1px solid rgba(217,119,6,0.28)`,
                  background: 'rgba(217,119,6,0.07)',
                  fontSize: '0.7rem',
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
                Who I Am
              </div>
            </motion.div>

            {/* Heading */}
            <motion.div variants={fadeLeft}>
              <h2
                style={{
                  fontSize: 'clamp(2.2rem, 5vw, 3.8rem)',
                  fontWeight: 800,
                  letterSpacing: '-0.03em',
                  lineHeight: 1.0,
                  margin: 0,
                }}
              >
                <span
                  style={{
                    display: 'block',
                    color: tokens.textPrimary,
                  }}
                >
                  About
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
                  Me.
                </span>
              </h2>

              {/* Amber accent underline */}
              <div
                style={{
                  marginTop: 14,
                  height: 3,
                  width: 56,
                  background: `linear-gradient(90deg, ${tokens.accentBright}, ${tokens.accent} 60%, transparent)`,
                  borderRadius: 2,
                  boxShadow: `0 0 10px rgba(217,119,6,0.55)`,
                }}
              />
            </motion.div>

            {/* Bio paragraph */}
            <motion.div variants={fadeLeft}>
              <p
                style={{
                  fontSize: 'clamp(0.95rem, 2vw, 1.08rem)',
                  lineHeight: 1.80,
                  color: tokens.textSecondary,
                  fontWeight: 400,
                  margin: 0,
                }}
              >
                BSAI student at{' '}
                <span style={{ color: tokens.textPrimary, fontWeight: 500 }}>
                  University of Wah
                </span>
                . Founder of{' '}
                <span
                  style={{
                    background: `linear-gradient(135deg, ${tokens.accentBright}, ${tokens.accent})`,
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                    fontWeight: 700,
                  }}
                >
                  Echo Tech
                </span>
                {' '}— an AI automation agency targeting healthcare professionals globally.
              </p>
              <p
                style={{
                  fontSize: 'clamp(0.95rem, 2vw, 1.08rem)',
                  lineHeight: 1.80,
                  color: tokens.textSecondary,
                  fontWeight: 400,
                  margin: '16px 0 0',
                }}
              >
                I build real systems, automate workflows, and ship products using{' '}
                <span style={{ color: tokens.textPrimary, fontWeight: 600 }}>
                  20+ AI tools daily
                </span>{' '}
                — without traditional coding.
              </p>
            </motion.div>

            {/* Tags / skills strip */}
            <motion.div
              variants={fadeLeft}
              style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}
            >
              {['AI Automation', 'Healthcare Tech', 'Workflow Engineering', 'Systems Thinking', 'No-Code AI'].map(tag => (
                <span
                  key={tag}
                  style={{
                    padding: '5px 12px',
                    borderRadius: 6,
                    fontSize: '0.72rem',
                    fontWeight: 500,
                    letterSpacing: '0.04em',
                    border: `1px solid rgba(217,119,6,0.18)`,
                    background: 'rgba(217,119,6,0.06)',
                    color: tokens.textSecondary,
                    fontFamily: "'Space Grotesk', system-ui, sans-serif",
                  }}
                >
                  {tag}
                </span>
              ))}
            </motion.div>

            {/* Co-founder chip */}
            <motion.div variants={fadeLeft}>
              <p
                style={{
                  fontSize: '0.72rem',
                  fontWeight: 500,
                  letterSpacing: '0.10em',
                  textTransform: 'uppercase',
                  color: tokens.textMuted,
                  marginBottom: 10,
                }}
              >
                Building alongside
              </p>
              <CofounderChip />
            </motion.div>
          </motion.div>

          {/* ══════════════════════════════
              RIGHT COLUMN — Stats + Visual
              ══════════════════════════════ */}
          <motion.div
            ref={rightRef}
            variants={stagger}
            initial="hidden"
            animate={rightInView ? 'visible' : 'hidden'}
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: 20,
            }}
          >
            {/* Top stat cards — 2 column grid */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: 16,
              }}
            >
              <StatCard
                icon="⚡"
                value="20+"
                label="AI Tools Daily"
                delay={0}
              />
              <StatCard
                icon="🚀"
                value="Live"
                label="Deployed Systems"
                delay={0.1}
              />
            </div>

            {/* Echo Tech feature card */}
            <motion.div
              variants={fadeRight}
              style={{
                borderRadius: 16,
                border: `1px solid ${tokens.borderSubtle}`,
                background: `linear-gradient(135deg, ${tokens.bgElevated} 0%, ${tokens.bgSecondary} 100%)`,
                padding: '28px 28px',
                position: 'relative',
                overflow: 'hidden',
                boxShadow: '0 4px 24px rgba(0,0,0,0.4)',
              }}
            >
              {/* Top amber bar */}
              <div
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  height: 3,
                  background: `linear-gradient(90deg, transparent, ${tokens.accent}, ${tokens.accentBright}, ${tokens.accent}, transparent)`,
                }}
              />

              <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                {/* Logo + name row */}
                <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                  <div
                    style={{
                      width: 48,
                      height: 48,
                      borderRadius: 12,
                      background: `linear-gradient(135deg, rgba(217,119,6,0.25), rgba(180,83,9,0.12))`,
                      border: `1px solid rgba(217,119,6,0.30)`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '1.4rem',
                      flexShrink: 0,
                    }}
                  >
                    ◈
                  </div>
                  <div>
                    <div
                      style={{
                        fontFamily: "'Space Grotesk', system-ui, sans-serif",
                        fontSize: '1.05rem',
                        fontWeight: 700,
                        color: tokens.textPrimary,
                        letterSpacing: '-0.01em',
                      }}
                    >
                      Echo Tech
                    </div>
                    <div
                      style={{
                        fontFamily: "'Space Grotesk', system-ui, sans-serif",
                        fontSize: '0.72rem',
                        fontWeight: 400,
                        color: tokens.textMuted,
                        letterSpacing: '0.04em',
                        marginTop: 2,
                      }}
                    >
                      AI Automation Agency · Healthcare
                    </div>
                  </div>

                  {/* Status badge */}
                  <div
                    style={{
                      marginLeft: 'auto',
                      padding: '4px 10px',
                      borderRadius: 999,
                      background: 'rgba(34,197,94,0.10)',
                      border: '1px solid rgba(34,197,94,0.25)',
                      fontSize: '0.65rem',
                      fontWeight: 600,
                      letterSpacing: '0.08em',
                      textTransform: 'uppercase',
                      color: '#4ade80',
                      display: 'flex',
                      alignItems: 'center',
                      gap: 5,
                      flexShrink: 0,
                    }}
                  >
                    <span
                      style={{
                        width: 5,
                        height: 5,
                        borderRadius: '50%',
                        background: '#4ade80',
                        boxShadow: '0 0 6px #4ade80',
                        display: 'inline-block',
                        animation: 'pulse-dot 2s ease-in-out infinite',
                      }}
                    />
                    Active
                  </div>
                </div>

                {/* Divider */}
                <div
                  style={{
                    height: 1,
                    background: `linear-gradient(90deg, transparent, ${tokens.borderSubtle}, transparent)`,
                  }}
                />

                {/* Focus areas */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                  {[
                    { icon: '🏥', label: 'Healthcare AI Automation' },
                    { icon: '⚙️', label: 'Workflow Engineering' },
                    { icon: '🌍', label: 'Global Client Operations' },
                  ].map(({ icon, label }) => (
                    <div
                      key={label}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 10,
                        fontFamily: "'Space Grotesk', system-ui, sans-serif",
                        fontSize: '0.82rem',
                        fontWeight: 400,
                        color: tokens.textSecondary,
                      }}
                    >
                      <span style={{ fontSize: '1rem' }}>{icon}</span>
                      {label}
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Philosophy quote card */}
            <motion.div
              variants={fadeRight}
              style={{
                borderRadius: 16,
                border: `1px solid rgba(217,119,6,0.18)`,
                background: 'rgba(217,119,6,0.05)',
                padding: '22px 24px',
                position: 'relative',
              }}
            >
              <div
                style={{
                  position: 'absolute',
                  top: 22,
                  left: 20,
                  fontSize: '2.5rem',
                  lineHeight: 1,
                  color: 'rgba(217,119,6,0.18)',
                  fontFamily: 'Georgia, serif',
                  fontWeight: 700,
                  userSelect: 'none',
                }}
              >
                "
              </div>
              <p
                style={{
                  fontFamily: "'Space Grotesk', system-ui, sans-serif",
                  fontSize: '0.88rem',
                  fontStyle: 'italic',
                  fontWeight: 300,
                  lineHeight: 1.7,
                  color: tokens.textSecondary,
                  margin: '20px 0 8px',
                  paddingLeft: 4,
                }}
              >
                I don't wait for perfect conditions. I ship, learn, and iterate — using every AI tool available to close the gap between vision and reality.
              </p>
              <div
                style={{
                  fontSize: '0.70rem',
                  fontWeight: 600,
                  color: tokens.accentBright,
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                }}
              >
                — Abdul Basit
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* keyframe for pulse dot (reused from Hero) */}
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
