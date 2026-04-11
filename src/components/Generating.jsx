import React, { useEffect, useState } from 'react'

const MESSAGES = [
  'Analysing firewall configuration...',
  'Reviewing access control posture...',
  'Scanning for configuration gaps...',
  'Assessing malware protection...',
  'Evaluating patch management...',
  'Calculating risk scores...',
  'Generating NCSC-aligned recommendations...',
  'Compiling your PDF report...',
]

export default function Generating() {
  const [msgIdx, setMsgIdx] = useState(0)
  const [dots, setDots] = useState('')

  useEffect(() => {
    const msgTimer = setInterval(() => {
      setMsgIdx(i => (i + 1) % MESSAGES.length)
    }, 1800)
    const dotTimer = setInterval(() => {
      setDots(d => d.length >= 3 ? '' : d + '.')
    }, 400)
    return () => { clearInterval(msgTimer); clearInterval(dotTimer) }
  }, [])

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '2rem',
      padding: '2rem',
    }}>
      {/* Spinner */}
      <div style={{ position: 'relative', width: 80, height: 80 }}>
        <div style={{
          position: 'absolute',
          inset: 0,
          border: '2px solid rgba(0,194,203,0.1)',
          borderTop: '2px solid var(--cyan)',
          borderRadius: '50%',
          animation: 'spin 1s linear infinite',
        }} />
        <div style={{
          position: 'absolute',
          inset: 12,
          border: '2px solid rgba(0,194,203,0.05)',
          borderBottom: '2px solid rgba(0,194,203,0.4)',
          borderRadius: '50%',
          animation: 'spin 1.5s linear infinite reverse',
        }} />
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>

      <div style={{ textAlign: 'center' }}>
        <div style={{
          fontFamily: 'var(--font-head)',
          fontSize: '1.5rem',
          fontWeight: 700,
          color: 'var(--white)',
          marginBottom: '0.5rem',
        }}>
          Analysing your security posture
        </div>
        <div style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '0.8rem',
          color: 'var(--cyan)',
          minHeight: '1.4em',
        }}>
          {MESSAGES[msgIdx]}{dots}
        </div>
      </div>

      <div style={{
        fontFamily: 'var(--font-mono)',
        fontSize: '0.65rem',
        color: 'var(--grey-dim)',
        letterSpacing: '0.1em',
        textTransform: 'uppercase',
      }}>
        Analysing your responses · This may take 10–20 seconds
      </div>
    </div>
  )
}
