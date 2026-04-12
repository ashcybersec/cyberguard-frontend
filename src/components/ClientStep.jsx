import React, { useState, useEffect } from 'react'
import { COMPANY_SIZES, INDUSTRIES } from '../utils/questions'
import s from './Steps.module.css'

function FloatingInput({ label, type = 'text', placeholder, value, onChange, hint }) {
  const [focused, setFoc] = useState(false)
  const active = focused || value

  return (
    <div style={{ position: 'relative', marginBottom: '1.2rem' }}>
      <label style={{
        position: 'absolute', left: '0.9rem',
        top: active ? '0.35rem' : '50%',
        transform: active ? 'translateY(0) scale(0.78)' : 'translateY(-50%) scale(1)',
        transformOrigin: 'left',
        fontFamily: 'var(--font-mono)', fontSize: '0.78rem',
        color: focused ? 'var(--cyan)' : 'var(--grey-dim)',
        letterSpacing: '0.06em', textTransform: 'uppercase',
        transition: 'all 0.2s cubic-bezier(0.22,1,0.36,1)',
        pointerEvents: 'none', zIndex: 1,
      }}>
        {label}
      </label>
      <input
        type={type}
        placeholder={active ? placeholder : ''}
        value={value}
        onChange={e => onChange(e.target.value)}
        onFocus={() => setFoc(true)}
        onBlur={() => setFoc(false)}
        style={{
          width: '100%',
          background: focused ? 'rgba(0,212,224,0.04)' : 'var(--bg-card)',
          border: `1px solid ${focused ? 'var(--cyan)' : value ? 'rgba(0,212,224,0.25)' : 'var(--border-2)'}`,
          borderRadius: 10,
          padding: active ? '1.4rem 0.9rem 0.5rem' : '0.95rem 0.9rem',
          color: 'var(--white)',
          fontFamily: 'var(--font-body)', fontSize: '0.95rem',
          outline: 'none',
          transition: 'all 0.2s cubic-bezier(0.22,1,0.36,1)',
          boxShadow: focused ? '0 0 0 3px rgba(0,212,224,0.1)' : 'none',
        }}
      />
      {hint && value && (
        <div style={{ position: 'absolute', right: '0.9rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--green)', fontSize: '0.9rem' }}>✓</div>
      )}
    </div>
  )
}

export default function ClientStep({ client, onChange, onNext }) {
  const [mounted, setMounted] = useState(false)
  const [industryOpen, setIndustryOpen] = useState(false)

  useEffect(() => { const t = setTimeout(() => setMounted(true), 50); return () => clearTimeout(t) }, [])

  const valid =
    client.company_name.trim() &&
    client.contact_name.trim() &&
    client.contact_email.trim() &&
    client.company_size &&
    client.industry.trim()

  const completedFields = [
    client.company_name, client.contact_name, client.contact_email,
    client.company_size, client.industry
  ].filter(Boolean).length

  return (
    <div style={{
      width: '100%', maxWidth: 620, margin: '0 auto', padding: '2rem 0',
      opacity: mounted ? 1 : 0,
      transform: mounted ? 'translateY(0)' : 'translateY(20px)',
      transition: 'all 0.5s cubic-bezier(0.22,1,0.36,1)',
    }}>
      {/* Header */}
      <div style={{ marginBottom: '2rem' }}>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.68rem', letterSpacing: '0.2em', color: 'var(--cyan)', textTransform: 'uppercase', marginBottom: '0.6rem' }}>
          Getting Started
        </div>
        <h2 style={{ fontFamily: 'var(--font-head)', fontSize: '2.2rem', fontWeight: 800, lineHeight: 1.1, marginBottom: '0.5rem' }}>
          Tell us about your organisation
        </h2>
        <p style={{ fontFamily: 'var(--font-body)', color: 'var(--grey)', fontSize: '0.92rem', lineHeight: 1.6 }}>
          This information personalises your gap analysis report and evidence pack.
        </p>

        {/* Progress dots */}
        <div style={{ display: 'flex', gap: '0.4rem', marginTop: '1.2rem', alignItems: 'center' }}>
          {[0,1,2,3,4].map(i => (
            <div key={i} style={{
              height: 3, borderRadius: 2,
              width: i < completedFields ? 24 : 12,
              background: i < completedFields
                ? 'linear-gradient(90deg, var(--cyan), #a78bfa)'
                : 'var(--border-2)',
              transition: 'all 0.3s cubic-bezier(0.22,1,0.36,1)',
            }} />
          ))}
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6rem', color: 'var(--grey-dim)', marginLeft: '0.4rem' }}>
            {completedFields}/5
          </span>
        </div>
      </div>

      {/* Form card */}
      <div style={{
        background: 'linear-gradient(135deg, var(--bg-card), var(--bg-2))',
        border: '1px solid var(--border-2)',
        borderRadius: 16, padding: '1.8rem',
        boxShadow: 'var(--shadow-card)',
      }}>
        <FloatingInput
          label="Company Name"
          placeholder="Acme Ltd"
          value={client.company_name}
          onChange={v => onChange('company_name', v)}
          hint
        />
        <FloatingInput
          label="Your Full Name"
          placeholder="Jane Smith"
          value={client.contact_name}
          onChange={v => onChange('contact_name', v)}
          hint
        />
        <FloatingInput
          label="Email Address"
          type="email"
          placeholder="jane@company.co.uk"
          value={client.contact_email}
          onChange={v => onChange('contact_email', v)}
          hint
        />

        {/* Company size */}
        <div style={{ marginBottom: '1.2rem' }}>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.62rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--grey-dim)', marginBottom: '0.6rem' }}>
            Company Size
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem' }}>
            {COMPANY_SIZES.map(size => {
              const isActive = client.company_size === size
              return (
                <button
                  key={size}
                  type="button"
                  onClick={() => onChange('company_size', size)}
                  style={{
                    padding: '0.75rem 1rem',
                    background: isActive
                      ? 'linear-gradient(135deg, rgba(0,212,224,0.12), rgba(124,111,247,0.08))'
                      : 'transparent',
                    border: `1px solid ${isActive ? 'var(--cyan)' : 'var(--border-2)'}`,
                    borderRadius: 8, cursor: 'pointer',
                    fontFamily: 'var(--font-body)', fontSize: '0.88rem',
                    color: isActive ? 'var(--cyan)' : 'var(--grey)',
                    transition: 'all 0.2s cubic-bezier(0.22,1,0.36,1)',
                    textAlign: 'left',
                    transform: isActive ? 'scale(1.02)' : 'scale(1)',
                    boxShadow: isActive ? '0 0 0 1px rgba(0,212,224,0.2)' : 'none',
                  }}
                >
                  {isActive && <span style={{ marginRight: '0.4rem' }}>✓</span>}
                  {size}
                </button>
              )
            })}
          </div>
        </div>

        {/* Industry dropdown */}
        <div style={{ marginBottom: '0.5rem', position: 'relative' }}>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.62rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--grey-dim)', marginBottom: '0.6rem' }}>
            Industry Sector
          </div>
          <button
            type="button"
            onClick={() => setIndustryOpen(!industryOpen)}
            style={{
              width: '100%', padding: '0.9rem 1rem',
              background: industryOpen ? 'rgba(0,212,224,0.04)' : 'transparent',
              border: `1px solid ${client.industry ? 'rgba(0,212,224,0.25)' : 'var(--border-2)'}`,
              borderRadius: industryOpen ? '8px 8px 0 0' : 8,
              cursor: 'pointer', color: client.industry ? 'var(--white)' : 'var(--grey-dim)',
              fontFamily: 'var(--font-body)', fontSize: '0.92rem',
              textAlign: 'left', display: 'flex', justifyContent: 'space-between',
              transition: 'all 0.2s',
            }}
          >
            <span>{client.industry || 'Select your industry...'}</span>
            <span style={{ transform: industryOpen ? 'rotate(180deg)' : 'rotate(0)', transition: 'transform 0.2s', color: 'var(--grey-dim)' }}>▼</span>
          </button>
          {industryOpen && (
            <div style={{
              position: 'absolute', left: 0, right: 0, zIndex: 10,
              background: 'var(--bg-card)', border: '1px solid rgba(0,212,224,0.2)',
              borderTop: 'none', borderRadius: '0 0 8px 8px',
              maxHeight: 220, overflowY: 'auto',
              boxShadow: '0 12px 32px rgba(0,0,0,0.4)',
            }}>
              {INDUSTRIES.map(ind => (
                <div
                  key={ind}
                  onClick={() => { onChange('industry', ind); setIndustryOpen(false) }}
                  style={{
                    padding: '0.75rem 1rem', cursor: 'pointer',
                    fontFamily: 'var(--font-body)', fontSize: '0.88rem',
                    color: client.industry === ind ? 'var(--cyan)' : 'var(--grey)',
                    background: client.industry === ind ? 'rgba(0,212,224,0.08)' : 'transparent',
                    transition: 'all 0.15s',
                    borderBottom: '1px solid rgba(255,255,255,0.04)',
                  }}
                  onMouseEnter={e => e.currentTarget.style.background = 'rgba(0,212,224,0.06)'}
                  onMouseLeave={e => e.currentTarget.style.background = client.industry === ind ? 'rgba(0,212,224,0.08)' : 'transparent'}
                >
                  {ind}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* CTA */}
      <div style={{ marginTop: '1.5rem', display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '0.5rem' }}>
        {!valid && (
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6rem', color: 'var(--grey-dim)' }}>
            Complete all fields to continue
          </span>
        )}
        <button
          onClick={onNext}
          disabled={!valid}
          style={{
            padding: '0.95rem 2.5rem',
            background: valid
              ? 'linear-gradient(135deg, var(--cyan), #0099a8)'
              : 'var(--bg-3)',
            color: valid ? '#080f1a' : 'var(--grey-dim)',
            fontFamily: 'var(--font-head)', fontSize: '1rem', fontWeight: 700,
            border: 'none', borderRadius: 8, cursor: valid ? 'pointer' : 'not-allowed',
            transition: 'all 0.25s cubic-bezier(0.22,1,0.36,1)',
            boxShadow: valid ? '0 6px 24px rgba(0,212,224,0.25)' : 'none',
            letterSpacing: '0.03em',
          }}
          onMouseEnter={e => valid && (e.currentTarget.style.transform = 'translateY(-2px)')}
          onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}
        >
          Begin Assessment →
        </button>
      </div>
    </div>
  )
}
