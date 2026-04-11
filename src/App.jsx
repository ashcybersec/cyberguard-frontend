import React, { useState, useEffect } from 'react'
import Landing from './pages/Landing'
import ClientStep from './components/ClientStep'
import ControlStep from './components/ControlStep'
import ProgressBar from './components/ProgressBar'
import Generating from './components/Generating'
import { CONTROLS, initialAnswers } from './utils/questions'

const API_BASE = import.meta.env.VITE_API_URL || ''

const RISK_COLOURS = {
  low:      { color: '#2A9D8F', bg: 'rgba(42,157,143,0.1)',  label: 'LOW RISK'      },
  medium:   { color: '#E9C46A', bg: 'rgba(233,196,106,0.1)', label: 'MEDIUM RISK'   },
  high:     { color: '#F4A261', bg: 'rgba(244,162,97,0.1)',  label: 'HIGH RISK'     },
  critical: { color: '#E63946', bg: 'rgba(230,57,70,0.1)',   label: 'CRITICAL RISK' },
}

function ResultsPage({ result, payload, onReset }) {
  const [downloading, setDownloading] = useState({ report: false, pack: false })
  const [downloaded, setDownloaded] = useState({ report: false, pack: false })

  const risk = RISK_COLOURS[result.overall_risk] || RISK_COLOURS.medium

  const downloadFile = async (key, url, filename) => {
  setDownloading(d => ({ ...d, [key]: true }))
  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'accept': 'application/json' },
      body: JSON.stringify(payload),
    })
    const blob = await res.blob()
    const a = document.createElement('a')
    a.href = URL.createObjectURL(blob)
    a.download = filename
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    setDownloaded(d => ({ ...d, [key]: true }))
  } finally {
    setDownloading(d => ({ ...d, [key]: false }))
  }
}

  const buyEvidencePack = async () => {
    setDownloading(d => ({ ...d, pack: true }))
    try {
      const res = await fetch(`${API_BASE}/api/v1/checkout`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ payload }),
      })
      const data = await res.json()
      if (data.checkout_url) window.location.href = data.checkout_url
      else throw new Error('No checkout URL')
    } catch (e) {
      alert('Payment setup failed: ' + e.message)
      setDownloading(d => ({ ...d, pack: false }))
    }
  }

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '3rem 1.5rem' }}>
      <div style={{ maxWidth: 680, width: '100%' }}>

        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: 'var(--cyan)', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: '0.5rem' }}>
            Assessment Complete
          </div>
          <h2 style={{ fontFamily: 'var(--font-head)', fontSize: '2rem', fontWeight: 800, margin: '0 0 0.5rem' }}>
            {result.client.company_name}
          </h2>
          <p style={{ fontFamily: 'var(--font-body)', color: 'var(--grey)', fontSize: '0.9rem' }}>
            {result.client.industry} · {result.client.company_size}
          </p>
        </div>

        {/* Score card */}
        <div style={{
          background: risk.bg,
          border: `1px solid ${risk.color}40`,
          borderRadius: 12,
          padding: '1.5rem',
          marginBottom: '1.5rem',
          display: 'grid',
          gridTemplateColumns: '1fr auto',
          gap: '1rem',
          alignItems: 'center',
        }}>
          <div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: 'var(--grey)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '0.4rem' }}>
              Overall Security Score
            </div>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.5rem' }}>
              <span style={{ fontFamily: 'var(--font-head)', fontSize: '3rem', fontWeight: 800, color: risk.color, lineHeight: 1 }}>
                {result.overall_score}
              </span>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.9rem', color: 'var(--grey)' }}>/100</span>
            </div>
            <div style={{ marginTop: '0.4rem' }}>
              <span style={{
                fontFamily: 'var(--font-mono)', fontSize: '0.68rem',
                background: risk.bg, color: risk.color,
                border: `1px solid ${risk.color}40`,
                padding: '2px 8px', borderRadius: 3,
              }}>
                {risk.label}
              </span>
              <span style={{
                marginLeft: '0.5rem',
                fontFamily: 'var(--font-mono)', fontSize: '0.68rem',
                color: result.cyber_essentials_ready ? '#2A9D8F' : 'var(--grey)',
              }}>
                {result.cyber_essentials_ready ? '✅ CE Ready' : '❌ Not CE Ready'}
              </span>
            </div>
          </div>

          {/* Mini control scores */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
            {result.controls.map(ctrl => {
              const cr = RISK_COLOURS[ctrl.risk_level] || RISK_COLOURS.medium
              return (
                <div key={ctrl.control_name} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <div style={{ width: 60, height: 4, background: 'rgba(255,255,255,0.05)', borderRadius: 2, overflow: 'hidden' }}>
                    <div style={{ width: `${ctrl.score}%`, height: '100%', background: cr.color, borderRadius: 2 }} />
                  </div>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6rem', color: cr.color, minWidth: 28 }}>
                    {ctrl.score}
                  </span>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6rem', color: 'var(--grey-dim)', maxWidth: 100, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {ctrl.control_name.split(' ').slice(0,2).join(' ')}
                  </span>
                </div>
              )
            })}
          </div>
        </div>

        {/* Executive summary */}
        <div style={{
          background: 'rgba(13,27,42,0.6)',
          border: '1px solid rgba(0,194,203,0.1)',
          borderRadius: 8,
          padding: '1.2rem',
          marginBottom: '1.5rem',
        }}>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: 'var(--cyan)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '0.6rem' }}>
            Executive Summary
          </div>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.88rem', color: 'var(--grey)', lineHeight: 1.7, margin: 0 }}>
            {result.executive_summary}
          </p>
        </div>

        {/* Download cards */}
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: 'var(--grey)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '0.75rem' }}>
          Your deliverables
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', marginBottom: '2rem' }}>
          {/* PDF Report */}
          <div style={{
            background: 'rgba(13,27,42,0.6)',
            border: '1px solid rgba(0,194,203,0.15)',
            borderRadius: 8,
            padding: '1.2rem',
          }}>
            <div style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>📄</div>
            <div style={{ fontFamily: 'var(--font-head)', fontSize: '0.95rem', fontWeight: 700, marginBottom: '0.35rem' }}>
              Gap Analysis Report
            </div>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.78rem', color: 'var(--grey)', lineHeight: 1.5, margin: '0 0 1rem' }}>
              Branded PDF with risk scores, detailed gap findings, and step-by-step remediation for each control.
            </p>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: 'var(--grey-dim)', marginBottom: '0.75rem' }}>
              PDF · ~7 pages · Share with IT team
            </div>
            <button
              onClick={() => downloadFile('report', `${API_BASE}/api/v1/assess/report`, `CyberGuard_Report_${result.client.company_name.replace(/ /g,'_')}.pdf`)}
              disabled={downloading.report}
              style={{
                width: '100%', padding: '0.7rem',
                background: downloaded.report ? 'rgba(42,157,143,0.15)' : 'rgba(0,194,203,0.1)',
                border: `1px solid ${downloaded.report ? '#2A9D8F' : 'rgba(0,194,203,0.3)'}`,
                borderRadius: 4, cursor: downloading.report ? 'wait' : 'pointer',
                fontFamily: 'var(--font-mono)', fontSize: '0.72rem',
                color: downloaded.report ? '#2A9D8F' : 'var(--cyan)',
                transition: 'all 0.2s',
              }}
            >
              {downloading.report ? 'Generating...' : downloaded.report ? '✓ Downloaded' : 'Download PDF Report'}
            </button>
          </div>

          {/* Evidence Pack */}
          <div style={{
            background: 'rgba(13,27,42,0.6)',
            border: '1px solid rgba(83,74,183,0.3)',
            borderRadius: 8,
            padding: '1.2rem',
            position: 'relative',
            overflow: 'hidden',
          }}>
            <div style={{
              position: 'absolute', top: 0, right: 0,
              background: 'rgba(83,74,183,0.9)',
              fontFamily: 'var(--font-mono)', fontSize: '0.58rem', color: '#fff',
              padding: '3px 10px', borderRadius: '0 8px 0 6px',
            }}>
              PRO
            </div>
            <div style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>📦</div>
            <div style={{ fontFamily: 'var(--font-head)', fontSize: '0.95rem', fontWeight: 700, marginBottom: '0.35rem' }}>
              Evidence Pack
            </div>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.78rem', color: 'var(--grey)', lineHeight: 1.5, margin: '0 0 1rem' }}>
              7 submission-ready Word policy documents, pre-filled with your organisation's details. Aligned to NCSC v3.3.
            </p>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: 'var(--grey-dim)', marginBottom: '0.75rem' }}>
              ZIP · 7 Word docs · Submit to assessor
            </div>
            <button
              onClick={buyEvidencePack}
              disabled={downloading.pack}
              style={{
                width: '100%', padding: '0.7rem',
                background: downloaded.pack ? 'rgba(42,157,143,0.15)' : 'rgba(83,74,183,0.15)',
                border: `1px solid ${downloaded.pack ? '#2A9D8F' : 'rgba(83,74,183,0.4)'}`,
                borderRadius: 4, cursor: downloading.pack ? 'wait' : 'pointer',
                fontFamily: 'var(--font-mono)', fontSize: '0.72rem',
                color: downloaded.pack ? '#2A9D8F' : '#9B8FE8',
                transition: 'all 0.2s',
              }}
            >
              {downloading.pack ? 'Redirecting to payment...' : 'Buy Evidence Pack — £49'}
            </button>
          </div>
        </div>

        {/* Top priorities */}
        {result.top_priorities?.length > 0 && (
          <div style={{
            background: 'rgba(13,27,42,0.4)',
            border: '1px solid rgba(0,194,203,0.08)',
            borderRadius: 8,
            padding: '1.2rem',
            marginBottom: '2rem',
          }}>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: 'var(--cyan)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '0.75rem' }}>
              Top Remediation Priorities
            </div>
            {result.top_priorities.map((p, i) => (
              <div key={i} style={{ display: 'flex', gap: '0.75rem', marginBottom: '0.5rem', alignItems: 'flex-start' }}>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: 'var(--cyan)', flexShrink: 0, paddingTop: 2 }}>
                  {String(i + 1).padStart(2, '0')}
                </span>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.85rem', color: 'var(--grey)', lineHeight: 1.5, margin: 0 }}>
                  {p}
                </p>
              </div>
            ))}
          </div>
        )}

        <button
          onClick={onReset}
          style={{
            width: '100%', padding: '0.75rem',
            background: 'transparent',
            border: '1px solid rgba(0,194,203,0.15)',
            borderRadius: 6, cursor: 'pointer',
            fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: 'var(--grey)',
          }}
        >
          Run assessment for another organisation
        </button>
      </div>
    </div>
  )
}
export default function App() {
  const [step, setStep]       = useState('landing')
  const [client, setClient]   = useState({ company_name: '', contact_name: '', contact_email: '', company_size: '', industry: '' })
  const [answers, setAnswers] = useState(initialAnswers())
  const [result, setResult]   = useState(null)
  const [errorMsg, setErrorMsg] = useState('')
  const [payload, setPayload]  = useState(null)

  // Stripe success redirect
  if (window.location.pathname === '/success') {
    const sid = new URLSearchParams(window.location.search).get('session_id')
    if (sid) {
      fetch(`${API_BASE}/api/v1/download-pack?session_id=${sid}`)
        .then(r => r.blob())
        .then(blob => {
          const a = document.createElement("a")
          a.href = URL.createObjectURL(blob)
          a.download = "CyberGuard_EvidencePack.zip"
          document.body.appendChild(a)
          a.click()
          document.body.removeChild(a)
          setTimeout(() => window.location.href = "/", 2000)
        })
    }
    return <Landing onStart={() => window.location.href = '/'} />
  }
  useEffect(() => { window.scrollTo({ top: 0, behavior: "smooth" }) }, [step])

  const controlIndex = step.startsWith('control_') ? parseInt(step.split('_')[1]) : -1
  const progressStep = step === 'client' ? 0 : step.startsWith('control_') ? controlIndex + 1 : 6

  const handleClientChange = (key, val) => setClient(c => ({ ...c, [key]: val }))
  const handleAnswerChange = (controlId, key, val) => setAnswers(a => ({ ...a, [controlId]: { ...a[controlId], [key]: val } }))

  const submit = async () => {
    setStep('generating')
    const p = { client, ...answers }
    setPayload(p)
    try {
      const res = await fetch(`${API_BASE}/api/v1/assess`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(p),
      })
      if (!res.ok) {
        const err = await res.json()
        throw new Error(err.detail || 'Server error')
      }
      const data = await res.json()
      setResult(data)
      setStep('results')
    } catch (e) {
      setErrorMsg(e.message)
      setStep('error')
    }
  }

  const reset = () => {
    setStep('landing')
    setResult(null)
    setPayload(null)
    setAnswers(initialAnswers())
    setClient({ company_name: '', contact_name: '', contact_email: '', company_size: '', industry: '' })
  }

  if (step === 'landing') return <Landing onStart={() => setStep('client')} />
  if (step === 'generating') return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '2rem', padding: '2rem' }}>
      <div style={{ position: 'relative', width: 80, height: 80 }}>
        <div style={{ position: 'absolute', inset: 0, border: '2px solid rgba(0,194,203,0.1)', borderTop: '2px solid var(--cyan)', borderRadius: '50%', animation: 'spin 1s linear infinite' }} />
        <div style={{ position: 'absolute', inset: 12, border: '2px solid rgba(0,194,203,0.05)', borderBottom: '2px solid rgba(0,194,203,0.4)', borderRadius: '50%', animation: 'spin 1.5s linear infinite reverse' }} />
        <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
      </div>
      <div style={{ textAlign: 'center' }}>
        <div style={{ fontFamily: 'var(--font-head)', fontSize: '1.5rem', fontWeight: 700, marginBottom: '0.5rem' }}>Analysing your security posture</div>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', color: 'var(--cyan)' }}>AI agent running gap analysis...</div>
      </div>
    </div>
  )

  if (step === 'results') return <ResultsPage result={result} payload={payload} onReset={reset} />

  if (step === 'error') return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '1.5rem', padding: '2rem', textAlign: 'center' }}>
      <div style={{ fontSize: '3rem' }}>⚠️</div>
      <h2 style={{ fontFamily: 'var(--font-head)', fontSize: '2rem', fontWeight: 800, color: '#E63946' }}>Something went wrong</h2>
      <p style={{ fontFamily: 'var(--font-mono)', color: 'var(--grey)', fontSize: '0.8rem', maxWidth: 480 }}>{errorMsg}</p>
      <button onClick={() => setStep('control_4')} style={{ padding: '0.85rem 2rem', background: 'transparent', color: 'var(--grey)', fontFamily: 'var(--font-body)', border: '1px solid rgba(0,194,203,0.2)', borderRadius: 4, cursor: 'pointer' }}>
        ← Go Back
      </button>
    </div>
  )

  return (
    <div style={{ minHeight: '100vh', padding: '3rem 1.5rem' }}>
      <ProgressBar currentStep={progressStep} />
      {step === 'client' && (
        <ClientStep client={client} onChange={handleClientChange} onNext={() => setStep('control_0')} />
      )}
      {controlIndex >= 0 && (
        <ControlStep
          control={CONTROLS[controlIndex]}
          answers={answers[CONTROLS[controlIndex].id]}
          onChange={(key, val) => handleAnswerChange(CONTROLS[controlIndex].id, key, val)}
          onNext={() => controlIndex < CONTROLS.length - 1 ? setStep(`control_${controlIndex + 1}`) : submit()}
          onBack={() => controlIndex === 0 ? setStep('client') : setStep(`control_${controlIndex - 1}`)}
          isLast={controlIndex === CONTROLS.length - 1}
        />
      )}
    </div>
  )
}
