import React, { useEffect, useState } from 'react'

const PILLS = ['NCSC CE v3.3', 'UK GDPR Article 32', 'CE+ Ready', '5 Controls', 'Free PDF Report']

const STATS = [
  { num: '35', label: 'Questions', sub: 'CE v3.3 aligned' },
  { num: '5', label: 'Controls', sub: 'fully assessed' },
  { num: '5 min', label: 'To complete', sub: 'instant results' },
]

const FEATURES = [
  { icon: '🛡', title: 'CE v3.3 Aligned', desc: 'Updated for April 2026 NCSC requirements including mandatory MFA' },
  { icon: '📄', title: 'Free PDF Report', desc: 'Professional gap analysis report, no account required' },
  { icon: '📦', title: 'Evidence Pack', desc: '7 submission-ready Word policy documents for £9.99' },
  { icon: '🇬🇧', title: 'UK SME Focused', desc: 'Built specifically for UK businesses seeking CE certification' },
]

export default function Landing({ onStart }) {
  const [vis, setVis]       = useState(false)
  const [hovered, setHov]   = useState(false)
  const [featHov, setFeatHov] = useState(null)

  useEffect(() => { const t = setTimeout(() => setVis(true), 60); return () => clearTimeout(t) }, [])

  const fade = (delay = 0, x = 0, y = 20) => ({
    opacity: vis ? 1 : 0,
    transform: vis ? 'translate(0,0)' : `translate(${x}px,${y}px)`,
    transition: `opacity 0.7s ${delay}s cubic-bezier(0.22,1,0.36,1), transform 0.7s ${delay}s cubic-bezier(0.22,1,0.36,1)`,
  })

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '4rem 1.5rem 5rem', position: 'relative', overflow: 'hidden' }}>

      {/* Decorative blobs */}
      <div style={{ position: 'fixed', width: 700, height: 700, borderRadius: '50%', background: 'radial-gradient(circle, rgba(0,212,224,0.07) 0%, transparent 70%)', top: '-10%', left: '-10%', pointerEvents: 'none', animation: 'float 8s ease-in-out infinite' }} />
      <div style={{ position: 'fixed', width: 500, height: 500, borderRadius: '50%', background: 'radial-gradient(circle, rgba(124,111,247,0.07) 0%, transparent 70%)', bottom: '-5%', right: '-5%', pointerEvents: 'none', animation: 'float 10s ease-in-out infinite reverse' }} />

      <div style={{ position: 'relative', zIndex: 1, width: '100%', maxWidth: 760, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>

        {/* Brand pill */}
        <div style={{
          ...fade(0),
          display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
          background: 'linear-gradient(135deg, rgba(0,212,224,0.1), rgba(124,111,247,0.1))',
          border: '1px solid rgba(0,212,224,0.25)',
          borderRadius: 100, padding: '0.45rem 1.1rem 0.45rem 0.7rem',
          marginBottom: '2.5rem',
        }}>
          <span style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--cyan)', boxShadow: '0 0 12px var(--cyan)', display: 'inline-block', animation: 'pulse 2s ease-in-out infinite' }} />
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.68rem', letterSpacing: '0.2em', color: 'var(--cyan)', textTransform: 'uppercase' }}>CyberGuard Essentials</span>
        </div>

        {/* Headline */}
        <h1 style={{
          ...fade(0.08),
          fontFamily: 'var(--font-head)', fontSize: 'clamp(2.8rem, 7vw, 5rem)',
          fontWeight: 800, lineHeight: 1.04, textAlign: 'center',
          letterSpacing: '-0.025em', marginBottom: '1.5rem',
        }}>
          Know Your Cyber Risk
          <span style={{ display: 'block', position: 'relative', width: 'fit-content', margin: '0 auto' }}>
            <span style={{
              background: 'linear-gradient(135deg, var(--cyan), #a78bfa)',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}>In Minutes.</span>
            {/* Underline accent */}
            <span style={{
              position: 'absolute', bottom: -6, left: 0, right: 0, height: 3,
              background: 'linear-gradient(90deg, var(--cyan), #a78bfa, transparent)',
              borderRadius: 2, opacity: vis ? 1 : 0,
              transition: 'opacity 0.6s 0.7s',
            }} />
          </span>
        </h1>

        {/* Subheadline */}
        <p style={{
          ...fade(0.15),
          fontFamily: 'var(--font-body)', fontSize: '1.05rem', fontWeight: 300,
          color: 'var(--grey)', textAlign: 'center', maxWidth: 540,
          lineHeight: 1.8, marginBottom: '2rem',
        }}>
          Professional Cyber Essentials gap analysis for UK SMEs — aligned to NCSC v3.3 (April 2026).
          Get a free compliance report and submission-ready evidence pack.
        </p>

        {/* Pills */}
        <div style={{ ...fade(0.2), display: 'flex', flexWrap: 'wrap', gap: '0.5rem', justifyContent: 'center', marginBottom: '2.5rem' }}>
          {PILLS.map(p => (
            <span key={p} style={{
              fontFamily: 'var(--font-mono)', fontSize: '0.63rem', letterSpacing: '0.04em',
              color: 'var(--cyan-dim)', border: '1px solid rgba(0,212,224,0.18)',
              background: 'rgba(0,212,224,0.05)', padding: '0.3rem 0.8rem', borderRadius: 100,
            }}>{p}</span>
          ))}
        </div>

        {/* CTA */}
        <div style={{ ...fade(0.25), display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.8rem', marginBottom: '4rem' }}>
          <button
            onClick={onStart}
            onMouseEnter={() => setHov(true)}
            onMouseLeave={() => setHov(false)}
            style={{
              padding: '1.1rem 3.5rem',
              background: hovered
                ? 'linear-gradient(135deg, #00e5f0, #00c4d0)'
                : 'linear-gradient(135deg, var(--cyan), #0099a8)',
              color: '#080f1a', fontFamily: 'var(--font-head)', fontSize: '1.05rem',
              fontWeight: 700, border: 'none', borderRadius: 8, cursor: 'pointer',
              letterSpacing: '0.03em',
              transition: 'all 0.3s cubic-bezier(0.22,1,0.36,1)',
              transform: hovered ? 'translateY(-4px) scale(1.03)' : 'translateY(0) scale(1)',
              boxShadow: hovered
                ? '0 16px 48px rgba(0,212,224,0.45), 0 0 0 1px rgba(0,212,224,0.4)'
                : '0 6px 24px rgba(0,212,224,0.25)',
            }}
          >
            Start Free Assessment →
          </button>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.63rem', color: 'var(--grey-dim)', letterSpacing: '0.06em' }}>
            3–5 MINUTES · NO ACCOUNT REQUIRED · 100% FREE REPORT
          </span>
        </div>

        {/* Stats bar */}
        <div style={{
          ...fade(0.3),
          display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)',
          width: '100%', maxWidth: 580,
          background: 'linear-gradient(135deg, var(--bg-card), var(--bg-2))',
          border: '1px solid var(--border-2)',
          borderRadius: 14, overflow: 'hidden',
          boxShadow: 'var(--shadow-card)', marginBottom: '2rem',
        }}>
          {STATS.map((s, i) => (
            <div key={s.label} style={{
              padding: '1.4rem 1rem', textAlign: 'center',
              borderRight: i < 2 ? '1px solid var(--border-2)' : 'none',
              position: 'relative',
            }}>
              <div style={{ position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)', width: 40, height: 2, background: 'linear-gradient(90deg, transparent, var(--cyan), transparent)', opacity: 0.5 }} />
              <div style={{ fontFamily: 'var(--font-head)', fontSize: '2rem', fontWeight: 800, background: 'linear-gradient(135deg, var(--cyan), #a78bfa)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', lineHeight: 1 }}>{s.num}</div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6rem', color: 'var(--grey)', letterSpacing: '0.1em', textTransform: 'uppercase', marginTop: '0.3rem' }}>{s.label}</div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.56rem', color: 'var(--grey-dim)', marginTop: '0.15rem' }}>{s.sub}</div>
            </div>
          ))}
        </div>

        {/* Feature cards */}
        <div style={{
          ...fade(0.35),
          display: 'grid', gridTemplateColumns: '1fr 1fr',
          gap: '0.75rem', width: '100%', marginBottom: '2.5rem',
        }}>
          {FEATURES.map((f, i) => (
            <div
              key={f.title}
              onMouseEnter={() => setFeatHov(i)}
              onMouseLeave={() => setFeatHov(null)}
              style={{
                padding: '1.1rem 1.2rem',
                background: featHov === i
                  ? 'linear-gradient(135deg, rgba(0,212,224,0.08), rgba(124,111,247,0.06))'
                  : 'rgba(22,30,46,0.8)',
                border: `1px solid ${featHov === i ? 'rgba(0,212,224,0.25)' : 'var(--border-2)'}`,
                borderRadius: 12, cursor: 'default',
                transition: 'all 0.25s cubic-bezier(0.22,1,0.36,1)',
                transform: featHov === i ? 'translateY(-2px)' : 'translateY(0)',
                boxShadow: featHov === i ? '0 8px 32px rgba(0,0,0,0.2)' : 'none',
              }}
            >
              <div style={{ fontSize: '1.3rem', marginBottom: '0.5rem' }}>{f.icon}</div>
              <div style={{ fontFamily: 'var(--font-head)', fontSize: '0.9rem', fontWeight: 700, color: 'var(--white)', marginBottom: '0.3rem' }}>{f.title}</div>
              <div style={{ fontFamily: 'var(--font-body)', fontSize: '0.78rem', color: 'var(--grey)', lineHeight: 1.55 }}>{f.desc}</div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <p style={{ ...fade(0.4), fontFamily: 'var(--font-mono)', fontSize: '0.6rem', color: 'var(--grey-dim)', textAlign: 'center', lineHeight: 1.8 }}>
          Corvaxis Ltd · ceready.co.uk · Aligned to NCSC Cyber Essentials v3.3 (April 2026)
        </p>
      </div>
    </div>
  )
}
