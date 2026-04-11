import React, { useEffect, useState } from 'react'

const PILLS = ['NCSC Cyber Essentials', 'UK GDPR Article 32', 'CE v3.3', '5 Controls', 'Free PDF Report']

export default function Landing({ onStart }) {
  const [visible, setVisible] = useState(false)
  useEffect(() => { setTimeout(() => setVisible(true), 50) }, [])

  const fade = (delay) => ({
    opacity: visible ? 1 : 0,
    transform: visible ? 'translateY(0)' : 'translateY(20px)',
    transition: `opacity 0.6s ${delay}s ease, transform 0.6s ${delay}s ease`,
  })

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '2rem', position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', width: 600, height: 600, borderRadius: '50%', background: 'radial-gradient(circle, rgba(0,194,203,0.07) 0%, transparent 70%)', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', pointerEvents: 'none' }} />

      <div style={{ ...fade(0), display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '3rem' }}>
        <div style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--cyan)', boxShadow: '0 0 12px var(--cyan)' }} />
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', letterSpacing: '0.3em', color: 'var(--cyan)', textTransform: 'uppercase' }}>CyberGuard</span>
      </div>

      <h1 style={{ ...fade(0.1), fontFamily: 'var(--font-head)', fontSize: 'clamp(2.4rem, 6vw, 4.5rem)', fontWeight: 800, lineHeight: 1.05, textAlign: 'center', maxWidth: 800 }}>
        Know Your Cyber Risk{' '}
        <span style={{ color: 'var(--cyan)', display: 'block' }}>In Minutes.</span>
      </h1>

      <p style={{ ...fade(0.2), fontFamily: 'var(--font-body)', fontSize: '1.05rem', fontWeight: 300, color: 'var(--grey)', textAlign: 'center', maxWidth: 540, marginTop: '1.5rem', lineHeight: 1.7 }}>
        AI-powered Cyber Essentials gap analysis for UK SMEs. Get a professional compliance report aligned to NCSC standards — without the consultancy price tag.
      </p>

      <div style={{ ...fade(0.3), display: 'flex', flexWrap: 'wrap', gap: '0.6rem', justifyContent: 'center', marginTop: '2.5rem' }}>
        {PILLS.map(p => (
          <span key={p} style={{ fontFamily: 'var(--font-mono)', fontSize: '0.68rem', color: 'var(--cyan-dim)', border: '1px solid var(--border)', background: 'rgba(0,194,203,0.04)', padding: '0.35rem 0.85rem', borderRadius: 100, letterSpacing: '0.04em' }}>{p}</span>
        ))}
      </div>

      <button
        onClick={onStart}
        style={{ ...fade(0.4), marginTop: '3rem', padding: '1rem 3rem', background: 'var(--cyan)', color: 'var(--navy)', fontFamily: 'var(--font-head)', fontSize: '1rem', fontWeight: 700, border: 'none', borderRadius: 4, cursor: 'pointer', letterSpacing: '0.04em', transition: 'all 0.2s' }}
        onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 8px 32px rgba(0,194,203,0.35)' }}
        onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none' }}
      >
        Start Free Assessment →
      </button>

      <p style={{ ...fade(0.5), fontFamily: 'var(--font-mono)', fontSize: '0.68rem', color: 'var(--grey-dim)', marginTop: '0.85rem' }}>Takes 3–5 minutes · No account required</p>

      <div style={{ ...fade(0.5), display: 'flex', gap: '3rem', marginTop: '4rem', alignItems: 'center' }}>
        {[['5', 'CE Controls'], ['v3.3', 'NCSC Aligned'], ['Free', 'PDF Report']].map(([num, label], i) => (
          <React.Fragment key={label}>
            {i > 0 && <div style={{ width: 1, height: 36, background: 'var(--border)' }} />}
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontFamily: 'var(--font-head)', fontSize: '1.8rem', fontWeight: 800 }}>{num}</div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.62rem', color: 'var(--grey)', letterSpacing: '0.1em', textTransform: 'uppercase', marginTop: 4 }}>{label}</div>
            </div>
          </React.Fragment>
        ))}
      </div>
    </div>
  )
}
