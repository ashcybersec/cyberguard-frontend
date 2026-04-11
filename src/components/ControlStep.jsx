import React, { useState } from 'react'
import s from './Steps.module.css'

const RISK_CONFIG = {
  critical: { label: 'Critical Risk', color: '#E63946', bg: 'rgba(230,57,70,0.08)', border: 'rgba(230,57,70,0.25)' },
  high:     { label: 'High Risk',     color: '#F4A261', bg: 'rgba(244,162,97,0.08)',  border: 'rgba(244,162,97,0.25)'  },
  medium:   { label: 'Medium Risk',   color: '#E9C46A', bg: 'rgba(233,196,106,0.08)', border: 'rgba(233,196,106,0.25)' },
}

function QuestionCard({ field, index, value, onChange }) {
  const [expanded, setExpanded] = useState(false)
  const risk = RISK_CONFIG[field.risk] || RISK_CONFIG.medium
  const answered = value !== null
  const isNo = value === false

  return (
    <div style={{
      border: `1px solid ${answered ? (isNo ? risk.border : 'rgba(42,157,143,0.3)') : 'rgba(0,194,203,0.1)'}`,
      borderRadius: 8,
      background: answered ? (isNo ? risk.bg : 'rgba(42,157,143,0.05)') : 'rgba(13,27,42,0.4)',
      transition: 'all 0.2s',
      overflow: 'hidden',
    }}>
      {/* Main row */}
      <div style={{ padding: '1rem 1.2rem', display: 'grid', gridTemplateColumns: '2rem 1fr auto', gap: '0.85rem', alignItems: 'start' }}>
        {/* Index */}
        <div style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '0.65rem',
          color: 'var(--grey-dim)',
          paddingTop: 3,
        }}>
          {String(index + 1).padStart(2, '0')}
        </div>

        {/* Question + meta */}
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '0.35rem' }}>
            {field.urgent && (
              <span style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.6rem',
                background: 'rgba(230,57,70,0.15)',
                color: '#E63946',
                border: '1px solid rgba(230,57,70,0.3)',
                padding: '1px 6px',
                borderRadius: 3,
                letterSpacing: '0.05em',
              }}>
                AUTO-FAIL APR 2026
              </span>
            )}
            <span style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.6rem',
              color: risk.color,
              background: risk.bg,
              border: `1px solid ${risk.border}`,
              padding: '1px 6px',
              borderRadius: 3,
            }}>
              {risk.label}
            </span>
          </div>

          <p style={{
            fontFamily: 'var(--font-body)',
            fontSize: '0.92rem',
            color: 'var(--white)',
            fontWeight: 300,
            lineHeight: 1.5,
            margin: 0,
          }}>
            {field.label}
          </p>

          {/* NCSC reference */}
          <div style={{ marginTop: '0.3rem' }}>
            <span style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.62rem',
              color: 'var(--grey-dim)',
            }}>
              {field.ce_ref}
            </span>
          </div>

          {/* Expand toggle */}
          <button
            onClick={() => setExpanded(!expanded)}
            style={{
              background: 'none',
              border: 'none',
              padding: '0.35rem 0 0',
              cursor: 'pointer',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.65rem',
              color: 'var(--cyan-dim)',
              display: 'flex',
              alignItems: 'center',
              gap: '0.3rem',
            }}
          >
            {expanded ? '▲ Hide detail' : '▼ Why this matters'}
          </button>
        </div>

        {/* Yes/No buttons */}
        <div style={{ display: 'flex', gap: '0.4rem', flexShrink: 0, paddingTop: 2 }}>
          <button
            type="button"
            onClick={() => onChange(true)}
            style={{
              padding: '0.4rem 0.9rem',
              borderRadius: 4,
              fontFamily: 'var(--font-mono)',
              fontSize: '0.72rem',
              fontWeight: 500,
              cursor: 'pointer',
              transition: 'all 0.15s',
              border: value === true ? '1px solid #2A9D8F' : '1px solid rgba(0,194,203,0.2)',
              background: value === true ? 'rgba(42,157,143,0.2)' : 'transparent',
              color: value === true ? '#2A9D8F' : 'var(--grey)',
            }}
          >
            Yes
          </button>
          <button
            type="button"
            onClick={() => onChange(false)}
            style={{
              padding: '0.4rem 0.9rem',
              borderRadius: 4,
              fontFamily: 'var(--font-mono)',
              fontSize: '0.72rem',
              fontWeight: 500,
              cursor: 'pointer',
              transition: 'all 0.15s',
              border: value === false ? `1px solid ${risk.color}` : '1px solid rgba(0,194,203,0.2)',
              background: value === false ? risk.bg : 'transparent',
              color: value === false ? risk.color : 'var(--grey)',
            }}
          >
            No
          </button>
        </div>
      </div>

      {/* Expanded detail panel */}
      {expanded && (
        <div style={{
          borderTop: '1px solid rgba(0,194,203,0.08)',
          padding: '0.9rem 1.2rem 0.9rem calc(2rem + 0.85rem + 1.2rem)',
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '1rem',
        }}>
          <div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.62rem', color: 'var(--cyan-dim)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '0.35rem' }}>
              Why it matters
            </div>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.83rem', color: 'var(--grey)', lineHeight: 1.6, margin: 0 }}>
              {field.why}
            </p>
          </div>
          <div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.62rem', color: risk.color, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '0.35rem' }}>
              If not in place
            </div>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.83rem', color: 'var(--grey)', lineHeight: 1.6, margin: 0 }}>
              {field.impact}
            </p>
          </div>
        </div>
      )}

      {/* No answer warning */}
      {isNo && !expanded && (
        <div style={{
          borderTop: `1px solid ${risk.border}`,
          padding: '0.6rem 1.2rem 0.6rem calc(2rem + 0.85rem + 1.2rem)',
          fontFamily: 'var(--font-mono)',
          fontSize: '0.7rem',
          color: risk.color,
        }}>
          ⚠ {field.impact}
        </div>
      )}
    </div>
  )
}

export default function ControlStep({ control, answers, onChange, onNext, onBack, isLast }) {
  const allAnswered = control.fields.every(f => answers[f.key] !== null)
  const noCount = control.fields.filter(f => answers[f.key] === false).length
  const criticalGaps = control.fields.filter(f => answers[f.key] === false && f.risk === 'critical').length

  return (
    <div className={s.step}>
      {/* Header */}
      <div style={{ marginBottom: '1.5rem' }}>
        <div className={s.stepTag}>{control.subtitle} · {control.ncsc}</div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', margin: '0.4rem 0 0.6rem' }}>
          <span style={{ fontSize: '1.4rem' }}>{control.icon}</span>
          <h2 className={s.stepTitle} style={{ margin: 0 }}>{control.title}</h2>
        </div>
        <p className={s.stepDesc} style={{ marginBottom: '0.5rem' }}>{control.description}</p>

        {/* Threat context box */}
        <div style={{
          background: 'rgba(230,57,70,0.05)',
          border: '1px solid rgba(230,57,70,0.15)',
          borderRadius: 6,
          padding: '0.65rem 0.9rem',
          display: 'flex',
          gap: '0.6rem',
          alignItems: 'flex-start',
        }}>
          <span style={{ fontSize: '0.85rem', flexShrink: 0, marginTop: 1 }}>⚡</span>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.8rem', color: 'rgba(244,162,97,0.9)', lineHeight: 1.5, margin: 0 }}>
            <strong>Threat context:</strong> {control.threat}
          </p>
        </div>
      </div>

      {/* Progress summary if any answered */}
      {allAnswered && noCount > 0 && (
        <div style={{
          background: 'rgba(0,194,203,0.05)',
          border: '1px solid rgba(0,194,203,0.15)',
          borderRadius: 6,
          padding: '0.6rem 0.9rem',
          marginBottom: '1rem',
          fontFamily: 'var(--font-mono)',
          fontSize: '0.72rem',
          color: 'var(--grey)',
          display: 'flex',
          gap: '1rem',
        }}>
          <span style={{ color: '#E63946' }}>{criticalGaps} critical gap{criticalGaps !== 1 ? 's' : ''}</span>
          <span>{noCount} remediation{noCount !== 1 ? 's' : ''} needed</span>
          <span style={{ color: '#2A9D8F' }}>{control.fields.length - noCount} control{control.fields.length - noCount !== 1 ? 's' : ''} passing</span>
        </div>
      )}

      {/* Question cards */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', marginBottom: '2rem' }}>
        {control.fields.map((field, i) => (
          <QuestionCard
            key={field.key}
            field={field}
            index={i}
            value={answers[field.key]}
            onChange={(val) => onChange(field.key, val)}
          />
        ))}
      </div>

      {/* Navigation */}
      <div className={s.navRow}>
        <button className={s.backBtn} onClick={onBack} type="button">← Back</button>
        <button
          className={s.nextBtn}
          onClick={() => { onNext(); setTimeout(() => window.scrollTo({ top: 0, behavior: "smooth" }), 50); }}
          disabled={!allAnswered}
          type="button"
        >
          {isLast ? 'Generate Reports →' : 'Next Control →'}
        </button>
      </div>
    </div>
  )
}
