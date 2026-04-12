import React, { useEffect, useState } from 'react'

const STEPS = [
  { id: 'fw',   label: 'Firewall Configuration',       icon: '🛡', detail: 'Evaluating boundary controls and rule sets' },
  { id: 'sc',   label: 'Secure Configuration',         icon: '⚙️', detail: 'Checking system hardening and defaults' },
  { id: 'ac',   label: 'User Access Control',          icon: '🔐', detail: 'Analysing MFA, admin accounts and offboarding' },
  { id: 'mp',   label: 'Malware Protection',           icon: '🦠', detail: 'Reviewing AV coverage and email scanning' },
  { id: 'pm',   label: 'Security Update Management',  icon: '🔧', detail: 'Checking 14-day patching compliance' },
  { id: 'risk', label: 'Calculating Risk Scores',      icon: '📊', detail: 'Scoring against CE v3.3 requirements' },
  { id: 'rep',  label: 'Generating Your Report',       icon: '📄', detail: 'Compiling NCSC-aligned recommendations' },
]

export default function Generating() {
  const [step, setStep]     = useState(0)
  const [done, setDone]     = useState([])
  const [pct, setPct]       = useState(0)
  const [mounted, setMount] = useState(false)

  useEffect(() => {
    setMount(true)
    const interval = setInterval(() => {
      setStep(s => {
        const next = Math.min(s + 1, STEPS.length - 1)
        setDone(d => s < STEPS.length - 1 ? [...d, STEPS[s].id] : d)
        setPct(Math.round(((next) / STEPS.length) * 100))
        return next
      })
    }, 1800)
    return () => clearInterval(interval)
  }, [])

  return (
    <div style={{
      minHeight: '100vh', display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center',
      padding: '3rem 1.5rem', position: 'relative', overflow: 'hidden',
    }}>

      {/* Animated background rings */}
      {[1,2,3].map(i => (
        <div key={i} style={{
          position: 'fixed',
          width: i * 300, height: i * 300,
          borderRadius: '50%',
          border: `1px solid rgba(0,212,224,${0.06 / i})`,
          top: '50%', left: '50%',
          transform: 'translate(-50%, -50%)',
          animation: `spin ${8 + i * 4}s linear infinite ${i % 2 === 0 ? 'reverse' : ''}`,
          pointerEvents: 'none',
        }} />
      ))}

      <div style={{
        position: 'relative', zIndex: 1, width: '100%', maxWidth: 560,
        opacity: mounted ? 1 : 0,
        transition: 'opacity 0.5s ease',
      }}>
        {/* Central spinner */}
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '2rem' }}>
          <div style={{ position: 'relative', width: 100, height: 100 }}>
            {/* Outer ring */}
            <div style={{
              position: 'absolute', inset: 0,
              border: '2px solid rgba(0,212,224,0.1)',
              borderTop: '2px solid var(--cyan)',
              borderRadius: '50%',
              animation: 'spin 1.2s linear infinite',
            }} />
            {/* Middle ring */}
            <div style={{
              position: 'absolute', inset: 10,
              border: '2px solid rgba(124,111,247,0.1)',
              borderBottom: '2px solid var(--violet)',
              borderRadius: '50%',
              animation: 'spin 1.8s linear infinite reverse',
            }} />
            {/* Inner dot */}
            <div style={{
              position: 'absolute', inset: 22,
              background: 'radial-gradient(circle, rgba(0,212,224,0.3), transparent)',
              borderRadius: '50%',
              animation: 'pulse 2s ease-in-out infinite',
            }} />
            {/* Icon */}
            <div style={{
              position: 'absolute', inset: 0,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '1.4rem',
            }}>
              {STEPS[step]?.icon}
            </div>
          </div>
        </div>

        {/* Title */}
        <div style={{ textAlign: 'center', marginBottom: '0.5rem' }}>
          <h2 style={{
            fontFamily: 'var(--font-head)', fontSize: '1.6rem',
            fontWeight: 800, marginBottom: '0.4rem',
          }}>
            Analysing Your Security Posture
          </h2>
          <p style={{
            fontFamily: 'var(--font-mono)', fontSize: '0.75rem',
            color: 'var(--cyan)', minHeight: '1.4em',
            transition: 'opacity 0.3s',
          }}>
            {STEPS[step]?.detail}
          </p>
        </div>

        {/* Progress bar */}
        <div style={{ marginBottom: '2rem', padding: '0 0.5rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.62rem', color: 'var(--grey-dim)' }}>
              {STEPS[step]?.label}
            </span>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.62rem', color: 'var(--cyan)' }}>
              {pct}%
            </span>
          </div>
          <div style={{ height: 4, background: 'rgba(0,212,224,0.1)', borderRadius: 2, overflow: 'hidden' }}>
            <div style={{
              height: '100%', width: `${pct}%`,
              background: 'linear-gradient(90deg, var(--cyan), var(--violet))',
              borderRadius: 2,
              transition: 'width 1.6s cubic-bezier(0.22,1,0.36,1)',
              boxShadow: '0 0 12px rgba(0,212,224,0.5)',
            }} />
          </div>
        </div>

        {/* Step list */}
        <div style={{
          background: 'linear-gradient(135deg, var(--bg-card), var(--bg-2))',
          border: '1px solid var(--border-2)',
          borderRadius: 14, overflow: 'hidden',
          boxShadow: 'var(--shadow-card)',
        }}>
          {STEPS.map((s, i) => {
            const isDone    = done.includes(s.id)
            const isCurrent = step === i
            return (
              <div key={s.id} style={{
                display: 'flex', alignItems: 'center', gap: '0.85rem',
                padding: '0.75rem 1.2rem',
                background: isCurrent ? 'rgba(0,212,224,0.06)' : 'transparent',
                borderBottom: i < STEPS.length - 1 ? '1px solid rgba(255,255,255,0.04)' : 'none',
                transition: 'background 0.3s',
              }}>
                {/* Status indicator */}
                <div style={{
                  width: 22, height: 22, borderRadius: '50%', flexShrink: 0,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '0.7rem',
                  background: isDone
                    ? 'rgba(46,196,160,0.15)'
                    : isCurrent
                    ? 'rgba(0,212,224,0.15)'
                    : 'rgba(255,255,255,0.04)',
                  border: `1px solid ${isDone ? 'rgba(46,196,160,0.4)' : isCurrent ? 'rgba(0,212,224,0.4)' : 'rgba(255,255,255,0.08)'}`,
                  transition: 'all 0.3s',
                }}>
                  {isDone ? <span style={{ color: 'var(--green)' }}>✓</span>
                   : isCurrent ? <div style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--cyan)', animation: 'pulse 1s ease-in-out infinite' }} />
                   : <span style={{ color: 'var(--grey-dim)', fontSize: '0.55rem' }}>{i + 1}</span>}
                </div>

                {/* Label */}
                <span style={{
                  fontFamily: 'var(--font-body)', fontSize: '0.85rem',
                  color: isDone ? 'var(--green)' : isCurrent ? 'var(--white)' : 'var(--grey-dim)',
                  fontWeight: isCurrent ? 500 : 300,
                  transition: 'color 0.3s',
                  flex: 1,
                }}>
                  {s.label}
                </span>

                {/* Icon */}
                <span style={{ fontSize: '0.9rem', opacity: isDone || isCurrent ? 1 : 0.3 }}>
                  {isDone ? '✓' : s.icon}
                </span>
              </div>
            )
          })}
        </div>

        {/* Footer note */}
        <p style={{
          textAlign: 'center', marginTop: '1.5rem',
          fontFamily: 'var(--font-mono)', fontSize: '0.62rem',
          color: 'var(--grey-dim)', letterSpacing: '0.06em',
        }}>
          GENERATING YOUR REPORT · THIS MAY TAKE 15–30 SECONDS
        </p>
      </div>

      <style>{`
        @keyframes spin  { to { transform: translate(-50%,-50%) rotate(360deg); } }
        @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.3} }
      `}</style>
    </div>
  )
}
