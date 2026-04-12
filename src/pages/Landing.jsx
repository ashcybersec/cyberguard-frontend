import React, { useEffect, useState } from 'react'

const PILLS = ['NCSC Cyber Essentials v3.3', 'UK GDPR Article 32', 'CE+ Ready', '5 Controls', 'Free PDF Report']

const STATS = [
  { num: '5', label: 'CE Controls', sub: 'fully assessed' },
  { num: '35', label: 'Questions', sub: 'CE v3.3 aligned' },
  { num: '£320', label: 'Cert Cost', sub: 'via IASME' },
]

const TRUST_ITEMS = [
  { icon: '🔒', text: 'Aligned to NCSC Cyber Essentials v3.3 (April 2026)' },
  { icon: '📋', text: 'Evidence pack ready for IASME submission' },
  { icon: '⚡', text: 'Results in under 5 minutes' },
  { icon: '🇬🇧', text: 'Built for UK SMEs by UK cybersecurity professionals' },
]

export default function Landing({ onStart }) {
  const [visible, setVisible] = useState(false)
  const [hovered, setHovered] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 80)
    return () => clearTimeout(t)
  }, [])

  const fade = (delay = 0, y = 24) => ({
    opacity: visible ? 1 : 0,
    transform: visible ? 'translateY(0)' : `translateY(${y}px)`,
    transition: `opacity 0.7s ${delay}s cubic-bezier(0.22,1,0.36,1), transform 0.7s ${delay}s cubic-bezier(0.22,1,0.36,1)`,
  })

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '3rem 1.5rem',
      position: 'relative',
      overflow: 'hidden',
    }}>

      {/* Background grid */}
      <div style={{
        position: 'fixed',
        inset: 0,
        backgroundImage: `
          linear-gradient(rgba(0,194,203,0.03) 1px, transparent 1px),
          linear-gradient(90deg, rgba(0,194,203,0.03) 1px, transparent 1px)
        `,
        backgroundSize: '48px 48px',
        pointerEvents: 'none',
        zIndex: 0,
      }} />

      {/* Glow orbs */}
      <div style={{
        position: 'fixed',
        width: 800,
        height: 800,
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(0,194,203,0.06) 0%, transparent 65%)',
        top: '30%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        pointerEvents: 'none',
        zIndex: 0,
      }} />
      <div style={{
        position: 'fixed',
        width: 400,
        height: 400,
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(83,74,183,0.08) 0%, transparent 65%)',
        bottom: '10%',
        right: '10%',
        pointerEvents: 'none',
        zIndex: 0,
      }} />

      <div style={{ position: 'relative', zIndex: 1, width: '100%', maxWidth: 720, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>

        {/* Brand badge */}
        <div style={{
          ...fade(0),
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          marginBottom: '2.5rem',
          background: 'rgba(0,194,203,0.06)',
          border: '1px solid rgba(0,194,203,0.2)',
          borderRadius: 100,
          padding: '0.4rem 1rem 0.4rem 0.6rem',
        }}>
          <div style={{
            width: 7,
            height: 7,
            borderRadius: '50%',
            background: 'var(--cyan)',
            boxShadow: '0 0 10px var(--cyan)',
            animation: 'pulse 2s ease-in-out infinite',
          }} />
          <span style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.68rem',
            letterSpacing: '0.25em',
            color: 'var(--cyan)',
            textTransform: 'uppercase',
          }}>
            CyberGuard Essentials
          </span>
        </div>

        {/* Headline */}
        <h1 style={{
          ...fade(0.1),
          fontFamily: 'var(--font-head)',
          fontSize: 'clamp(2.6rem, 7vw, 4.8rem)',
          fontWeight: 800,
          lineHeight: 1.04,
          textAlign: 'center',
          margin: 0,
          letterSpacing: '-0.02em',
        }}>
          Know Your Cyber Risk
          <br />
          <span style={{
            color: 'var(--cyan)',
            position: 'relative',
            display: 'inline-block',
          }}>
            In Minutes.
            <span style={{
              position: 'absolute',
              bottom: -4,
              left: 0,
              right: 0,
              height: 3,
              background: 'linear-gradient(90deg, var(--cyan), transparent)',
              borderRadius: 2,
              opacity: visible ? 1 : 0,
              transition: 'opacity 0.8s 0.6s ease',
            }} />
          </span>
        </h1>

        {/* Subheadline */}
        <p style={{
          ...fade(0.2),
          fontFamily: 'var(--font-body)',
          fontSize: '1.05rem',
          fontWeight: 300,
          color: 'var(--grey)',
          textAlign: 'center',
          maxWidth: 520,
          marginTop: '1.5rem',
          marginBottom: 0,
          lineHeight: 1.75,
        }}>
          Professional Cyber Essentials gap analysis for UK SMEs — aligned to NCSC v3.3.
          Get a free compliance report and submission-ready evidence pack.
        </p>

        {/* Pills */}
        <div style={{
          ...fade(0.25),
          display: 'flex',
          flexWrap: 'wrap',
          gap: '0.5rem',
          justifyContent: 'center',
          marginTop: '2rem',
        }}>
          {PILLS.map(p => (
            <span key={p} style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.65rem',
              color: 'var(--cyan-dim)',
              border: '1px solid rgba(0,194,203,0.15)',
              background: 'rgba(0,194,203,0.04)',
              padding: '0.3rem 0.75rem',
              borderRadius: 100,
              letterSpacing: '0.04em',
            }}>
              {p}
            </span>
          ))}
        </div>

        {/* CTA Button */}
        <div style={{ ...fade(0.35), marginTop: '2.5rem', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.75rem' }}>
          <button
            onClick={onStart}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            style={{
              padding: '1.1rem 3.5rem',
              background: hovered
                ? 'linear-gradient(135deg, #00d4de, #00c2cb)'
                : 'var(--cyan)',
              color: '#080f1a',
              fontFamily: 'var(--font-head)',
              fontSize: '1.05rem',
              fontWeight: 700,
              border: 'none',
              borderRadius: 6,
              cursor: 'pointer',
              letterSpacing: '0.03em',
              transition: 'all 0.25s cubic-bezier(0.22,1,0.36,1)',
              transform: hovered ? 'translateY(-3px) scale(1.02)' : 'translateY(0) scale(1)',
              boxShadow: hovered
                ? '0 12px 40px rgba(0,194,203,0.4), 0 0 0 1px rgba(0,194,203,0.3)'
                : '0 4px 20px rgba(0,194,203,0.2)',
            }}
          >
            Start Free Assessment →
          </button>
          <span style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.65rem',
            color: 'var(--grey-dim)',
            letterSpacing: '0.05em',
          }}>
            3–5 minutes · No account required · Free report
          </span>
        </div>

        {/* Stats bar */}
        <div style={{
          ...fade(0.45),
          display: 'flex',
          gap: '0',
          marginTop: '3.5rem',
          background: 'rgba(13,27,46,0.6)',
          border: '1px solid rgba(0,194,203,0.12)',
          borderRadius: 10,
          overflow: 'hidden',
          width: '100%',
          maxWidth: 560,
        }}>
          {STATS.map((s, i) => (
            <div key={s.label} style={{
              flex: 1,
              padding: '1.2rem',
              textAlign: 'center',
              borderRight: i < STATS.length - 1 ? '1px solid rgba(0,194,203,0.1)' : 'none',
            }}>
              <div style={{
                fontFamily: 'var(--font-head)',
                fontSize: '1.9rem',
                fontWeight: 800,
                color: 'var(--cyan)',
                lineHeight: 1,
              }}>
                {s.num}
              </div>
              <div style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.6rem',
                color: 'var(--grey)',
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                marginTop: '0.3rem',
              }}>
                {s.label}
              </div>
              <div style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.58rem',
                color: 'var(--grey-dim)',
                marginTop: '0.15rem',
              }}>
                {s.sub}
              </div>
            </div>
          ))}
        </div>

        {/* Trust items */}
        <div style={{
          ...fade(0.5),
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '0.6rem',
          marginTop: '2rem',
          width: '100%',
          maxWidth: 580,
        }}>
          {TRUST_ITEMS.map(item => (
            <div key={item.text} style={{
              display: 'flex',
              alignItems: 'flex-start',
              gap: '0.6rem',
              padding: '0.65rem 0.85rem',
              background: 'rgba(13,27,46,0.4)',
              border: '1px solid rgba(0,194,203,0.08)',
              borderRadius: 8,
            }}>
              <span style={{ fontSize: '0.9rem', flexShrink: 0, marginTop: 1 }}>{item.icon}</span>
              <span style={{
                fontFamily: 'var(--font-body)',
                fontSize: '0.78rem',
                color: 'var(--grey)',
                lineHeight: 1.5,
              }}>
                {item.text}
              </span>
            </div>
          ))}
        </div>

        {/* Footer note */}
        <p style={{
          ...fade(0.55),
          fontFamily: 'var(--font-mono)',
          fontSize: '0.62rem',
          color: 'var(--grey-dim)',
          marginTop: '2.5rem',
          textAlign: 'center',
          lineHeight: 1.7,
        }}>
          Powered by Corvaxis Ltd · ceready.co.uk · Aligned to NCSC Cyber Essentials v3.3
        </p>
      </div>

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.4; }
        }
      `}</style>
    </div>
  )
}
