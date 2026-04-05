import React from 'react'

const STEPS = ['Details', 'Firewalls', 'Secure Config', 'Access Control', 'Malware', 'Patching']

export default function ProgressBar({ currentStep }) {
  // currentStep: 0=client, 1-5=controls
  const progress = (currentStep / 6) * 100

  return (
    <div style={{ width: '100%', maxWidth: 680, margin: '0 auto 2.5rem', padding: '0 1rem' }}>
      {/* Step labels */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        marginBottom: '0.6rem',
      }}>
        {STEPS.map((label, i) => (
          <span key={label} style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.6rem',
            letterSpacing: '0.05em',
            color: i <= currentStep ? 'var(--cyan)' : 'var(--grey-dim)',
            textTransform: 'uppercase',
            transition: 'color 0.3s',
          }}>
            {label}
          </span>
        ))}
      </div>

      {/* Bar */}
      <div style={{
        width: '100%',
        height: '2px',
        background: 'rgba(0,194,203,0.1)',
        borderRadius: '2px',
        overflow: 'hidden',
      }}>
        <div style={{
          height: '100%',
          width: `${progress}%`,
          background: 'var(--cyan)',
          borderRadius: '2px',
          transition: 'width 0.4s ease',
          boxShadow: '0 0 8px rgba(0,194,203,0.6)',
        }} />
      </div>
    </div>
  )
}
