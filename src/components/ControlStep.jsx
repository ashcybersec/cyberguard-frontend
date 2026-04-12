import React, { useState, useEffect, useRef } from 'react'
import s from './Steps.module.css'

const RISK_CONFIG = {
  critical: { label: 'Critical Risk', color: '#E63946', bg: 'rgba(230,57,70,0.08)', border: 'rgba(230,57,70,0.3)', glow: 'rgba(230,57,70,0.15)' },
  high:     { label: 'High Risk',     color: '#F4A261', bg: 'rgba(244,162,97,0.08)',  border: 'rgba(244,162,97,0.3)',  glow: 'rgba(244,162,97,0.12)'  },
  medium:   { label: 'Medium Risk',   color: '#E9C46A', bg: 'rgba(233,196,106,0.08)', border: 'rgba(233,196,106,0.3)', glow: 'rgba(233,196,106,0.1)' },
}

function QuestionCard({ field, index, value, onChange, animDelay }) {
  const [expanded, setExpanded] = useState(false)
  const [mounted, setMounted] = useState(false)
  const risk = RISK_CONFIG[field.risk] || RISK_CONFIG.medium
  const answered = value !== null
  const isYes = value === true
  const isNo  = value === false

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), animDelay)
    return () => clearTimeout(t)
  }, [animDelay])

  return (
    <div style={{
      opacity: mounted ? 1 : 0,
      transform: mounted ? 'translateX(0)' : 'translateX(24px)',
      transition: 'opacity 0.45s cubic-bezier(0.22,1,0.36,1), transform 0.45s cubic-bezier(0.22,1,0.36,1)',
    }}>
      <div style={{
        border: `1px solid ${
          isYes ? 'rgba(42,157,143,0.35)' :
          isNo  ? risk.border :
          'rgba(0,194,203,0.1)'
        }`,
        borderRadius: 10,
        background: isYes
          ? 'rgba(42,157,143,0.05)'
          : isNo
          ? risk.bg
          : 'rgba(8,15,26,0.6)',
        backdropFilter: 'blur(8px)',
        transition: 'all 0.25s cubic-bezier(0.22,1,0.36,1)',
        overflow: 'hidden',
        boxShadow: isNo ? `0 0 20px ${risk.glow}` : 'none',
      }}>
        {/* Main row */}
        <div style={{
          padding: '1rem 1.25rem',
          display: 'grid',
          gridTemplateColumns: '1.8rem 1fr auto',
          gap: '0.85rem',
          alignItems: 'start',
        }}>
          {/* Index */}
          <div style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.62rem',
            color: isYes ? '#2A9D8F' : isNo ? risk.color : 'var(--grey-dim)',
            paddingTop: 4,
            fontWeight: 600,
            transition: 'color 0.2s',
          }}>
            {String(index + 1).padStart(2, '0')}
          </div>

          {/* Question content */}
          <div>
            {/* Badges */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', flexWrap: 'wrap', marginBottom: '0.4rem' }}>
              {field.urgent && (
                <span style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.58rem',
                  background: 'rgba(230,57,70,0.15)',
                  color: '#E63946',
                  border: '1px solid rgba(230,57,70,0.35)',
                  padding: '2px 7px',
                  borderRadius: 3,
                  letterSpacing: '0.06em',
                  fontWeight: 600,
                }}>
                  ⚠ AUTO-FAIL APR 2026
                </span>
              )}
              <span style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.58rem',
                color: risk.color,
                background: risk.bg,
                border: `1px solid ${risk.border}`,
                padding: '2px 7px',
                borderRadius: 3,
                letterSpacing: '0.04em',
              }}>
                {risk.label}
              </span>
            </div>

            {/* Question text */}
            <p style={{
              fontFamily: 'var(--font-body)',
              fontSize: '0.9rem',
              color: answered ? '#ffffff' : 'rgba(255,255,255,0.85)',
              fontWeight: answered ? 400 : 300,
              lineHeight: 1.55,
              margin: 0,
              transition: 'color 0.2s',
            }}>
              {field.label}
            </p>

            {/* CE ref + expand */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginTop: '0.35rem' }}>
              <span style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.6rem',
                color: 'var(--grey-dim)',
              }}>
                {field.ce_ref}
              </span>
              <button
                onClick={() => setExpanded(!expanded)}
                style={{
                  background: 'none',
                  border: 'none',
                  padding: 0,
                  cursor: 'pointer',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.6rem',
                  color: expanded ? 'var(--cyan)' : 'var(--cyan-dim)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.25rem',
                  transition: 'color 0.15s',
                }}
              >
                <span style={{
                  display: 'inline-block',
                  transition: 'transform 0.2s',
                  transform: expanded ? 'rotate(180deg)' : 'rotate(0)',
                }}>▼</span>
                {expanded ? 'Hide detail' : 'Why this matters'}
              </button>
            </div>
          </div>

          {/* Yes/No buttons */}
          <div style={{ display: 'flex', gap: '0.4rem', flexShrink: 0, paddingTop: 2 }}>
            {[
              { val: true,  label: 'Yes', activeColor: '#2A9D8F', activeBg: 'rgba(42,157,143,0.18)', activeBorder: 'rgba(42,157,143,0.5)' },
              { val: false, label: 'No',  activeColor: risk.color, activeBg: risk.bg, activeBorder: risk.border },
            ].map(btn => {
              const isActive = value === btn.val
              return (
                <button
                  key={btn.label}
                  type="button"
                  onClick={() => onChange(btn.val)}
                  style={{
                    padding: '0.45rem 1rem',
                    borderRadius: 5,
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.7rem',
                    fontWeight: 600,
                    cursor: 'pointer',
                    transition: 'all 0.18s cubic-bezier(0.22,1,0.36,1)',
                    border: isActive ? `1px solid ${btn.activeBorder}` : '1px solid rgba(0,194,203,0.15)',
                    background: isActive ? btn.activeBg : 'rgba(0,194,203,0.03)',
                    color: isActive ? btn.activeColor : 'var(--grey)',
                    transform: isActive ? 'scale(1.05)' : 'scale(1)',
                    letterSpacing: '0.05em',
                  }}
                >
                  {btn.label}
                </button>
              )
            })}
          </div>
        </div>

        {/* Expanded detail */}
        <div style={{
          maxHeight: expanded ? '300px' : 0,
          overflow: 'hidden',
          transition: 'max-height 0.3s cubic-bezier(0.22,1,0.36,1)',
        }}>
          <div style={{
            borderTop: '1px solid rgba(0,194,203,0.08)',
            padding: '0.9rem 1.25rem 0.9rem calc(1.8rem + 0.85rem + 1.25rem)',
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '1.2rem',
          }}>
            <div>
              <div style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.58rem',
                color: 'var(--cyan-dim)',
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                marginBottom: '0.4rem',
              }}>
                Why it matters
              </div>
              <p style={{
                fontFamily: 'var(--font-body)',
                fontSize: '0.8rem',
                color: 'var(--grey)',
                lineHeight: 1.65,
                margin: 0,
              }}>
                {field.why}
              </p>
            </div>
            <div>
              <div style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.58rem',
                color: risk.color,
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                marginBottom: '0.4rem',
              }}>
                Risk if not in place
              </div>
              <p style={{
                fontFamily: 'var(--font-body)',
                fontSize: '0.8rem',
                color: 'var(--grey)',
                lineHeight: 1.65,
                margin: 0,
              }}>
                {field.impact}
              </p>
            </div>
          </div>
        </div>

        {/* No warning */}
        {isNo && !expanded && (
          <div style={{
            borderTop: `1px solid ${risk.border}`,
            padding: '0.55rem 1.25rem 0.55rem calc(1.8rem + 0.85rem + 1.25rem)',
            fontFamily: 'var(--font-mono)',
            fontSize: '0.65rem',
            color: risk.color,
            display: 'flex',
            alignItems: 'center',
            gap: '0.4rem',
          }}>
            <span>⚠</span>
            <span>{field.impact}</span>
          </div>
        )}

        {/* Yes confirmed */}
        {isYes && (
          <div style={{
            borderTop: '1px solid rgba(42,157,143,0.15)',
            padding: '0.4rem 1.25rem 0.4rem calc(1.8rem + 0.85rem + 1.25rem)',
            fontFamily: 'var(--font-mono)',
            fontSize: '0.6rem',
            color: '#2A9D8F',
            display: 'flex',
            alignItems: 'center',
            gap: '0.4rem',
          }}>
            <span>✓</span>
            <span>Control confirmed</span>
          </div>
        )}
      </div>
    </div>
  )
}

export default function ControlStep({ control, answers, onChange, onNext, onBack, isLast, controlIndex }) {
  const [mounted, setMounted] = useState(false)
  const prevIndex = useRef(controlIndex)

  useEffect(() => {
    setMounted(false)
    const t = setTimeout(() => setMounted(true), 30)
    prevIndex.current = controlIndex
    return () => clearTimeout(t)
  }, [control.id])

  const allAnswered  = control.fields.every(f => answers[f.key] !== null)
  const noCount      = control.fields.filter(f => answers[f.key] === false).length
  const yesCount     = control.fields.filter(f => answers[f.key] === true).length
  const criticalGaps = control.fields.filter(f => answers[f.key] === false && f.risk === 'critical').length
  const pct          = Math.round((yesCount / control.fields.length) * 100)

  return (
    <div className={s.step} style={{
      opacity: mounted ? 1 : 0,
      transform: mounted ? 'translateX(0)' : 'translateX(32px)',
      transition: 'opacity 0.4s cubic-bezier(0.22,1,0.36,1), transform 0.4s cubic-bezier(0.22,1,0.36,1)',
    }}>

      {/* Header */}
      <div style={{ marginBottom: '1.6rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
          <div className={s.stepTag}>{control.subtitle} · {control.ncsc}</div>
          {yesCount > 0 && (
            <div style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.65rem',
              color: pct >= 80 ? '#2A9D8F' : pct >= 50 ? '#E9C46A' : '#E63946',
              background: pct >= 80 ? 'rgba(42,157,143,0.1)' : pct >= 50 ? 'rgba(233,196,106,0.1)' : 'rgba(230,57,70,0.1)',
              border: `1px solid ${pct >= 80 ? 'rgba(42,157,143,0.3)' : pct >= 50 ? 'rgba(233,196,106,0.3)' : 'rgba(230,57,70,0.3)'}`,
              padding: '3px 10px',
              borderRadius: 100,
            }}>
              {pct}% passing
            </div>
          )}
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', margin: '0.3rem 0 0.6rem' }}>
          <span style={{ fontSize: '1.6rem' }}>{control.icon}</span>
          <h2 className={s.stepTitle} style={{ margin: 0 }}>{control.title}</h2>
        </div>

        <p className={s.stepDesc} style={{ marginBottom: '0.75rem' }}>{control.description}</p>

        {/* Threat context */}
        <div style={{
          background: 'rgba(230,57,70,0.04)',
          border: '1px solid rgba(230,57,70,0.12)',
          borderLeft: '3px solid rgba(230,57,70,0.5)',
          borderRadius: '0 6px 6px 0',
          padding: '0.65rem 0.9rem',
          display: 'flex',
          gap: '0.5rem',
          alignItems: 'flex-start',
        }}>
          <span style={{ fontSize: '0.85rem', flexShrink: 0, marginTop: 1 }}>⚡</span>
          <p style={{
            fontFamily: 'var(--font-body)',
            fontSize: '0.78rem',
            color: 'rgba(244,162,97,0.85)',
            lineHeight: 1.55,
            margin: 0,
          }}>
            <strong>Threat context:</strong> {control.threat}
          </p>
        </div>

        {/* Progress bar */}
        {yesCount > 0 && (
          <div style={{ marginTop: '0.9rem' }}>
            <div style={{
              height: 3,
              background: 'rgba(0,194,203,0.1)',
              borderRadius: 2,
              overflow: 'hidden',
            }}>
              <div style={{
                height: '100%',
                width: `${pct}%`,
                background: pct >= 80
                  ? 'linear-gradient(90deg, #2A9D8F, #00c2cb)'
                  : pct >= 50
                  ? 'linear-gradient(90deg, #E9C46A, #F4A261)'
                  : 'linear-gradient(90deg, #E63946, #F4A261)',
                borderRadius: 2,
                transition: 'width 0.5s cubic-bezier(0.22,1,0.36,1)',
              }} />
            </div>
          </div>
        )}
      </div>

      {/* Summary bar when all answered */}
      {allAnswered && (
        <div style={{
          background: noCount === 0 ? 'rgba(42,157,143,0.08)' : 'rgba(0,194,203,0.05)',
          border: `1px solid ${noCount === 0 ? 'rgba(42,157,143,0.25)' : 'rgba(0,194,203,0.15)'}`,
          borderRadius: 8,
          padding: '0.65rem 1rem',
          marginBottom: '1rem',
          display: 'flex',
          gap: '1.5rem',
          flexWrap: 'wrap',
        }}>
          {noCount === 0 ? (
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: '#2A9D8F' }}>
              ✓ All checks passing for this control
            </span>
          ) : (
            <>
              {criticalGaps > 0 && (
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: '#E63946' }}>
                  ⚠ {criticalGaps} critical gap{criticalGaps !== 1 ? 's' : ''}
                </span>
              )}
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: 'var(--grey)' }}>
                {noCount} remediation{noCount !== 1 ? 's' : ''} needed
              </span>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: '#2A9D8F' }}>
                {yesCount} of {control.fields.length} passing
              </span>
            </>
          )}
        </div>
      )}

      {/* Question cards */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem', marginBottom: '2rem' }}>
        {control.fields.map((field, i) => (
          <QuestionCard
            key={field.key}
            field={field}
            index={i}
            value={answers[field.key]}
            onChange={(val) => onChange(field.key, val)}
            animDelay={i * 55}
          />
        ))}
      </div>

      {/* Navigation */}
      <div className={s.navRow}>
        <button
          className={s.backBtn}
          onClick={onBack}
          type="button"
        >
          ← Back
        </button>

        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '0.4rem' }}>
          {!allAnswered && (
            <span style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.6rem',
              color: 'var(--grey-dim)',
            }}>
              {control.fields.filter(f => answers[f.key] === null).length} question{control.fields.filter(f => answers[f.key] === null).length !== 1 ? 's' : ''} remaining
            </span>
          )}
          <button
            className={s.nextBtn}
            onClick={() => { onNext(); setTimeout(() => window.scrollTo({ top: 0, behavior: 'smooth' }), 50) }}
            disabled={!allAnswered}
            type="button"
            style={{
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            {isLast ? 'Generate Report →' : 'Next Control →'}
          </button>
        </div>
      </div>
    </div>
  )
}
