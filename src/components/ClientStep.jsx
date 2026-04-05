import React from 'react'
import { COMPANY_SIZES } from '../utils/questions'
import s from './Steps.module.css'

export default function ClientStep({ client, onChange, onNext }) {
  const valid =
    client.company_name.trim() &&
    client.contact_name.trim() &&
    client.contact_email.trim() &&
    client.company_size &&
    client.industry.trim()

  return (
    <div className={s.step}>
      <div className={s.stepTag}>Getting Started</div>
      <h2 className={s.stepTitle}>Tell us about your organisation</h2>
      <p className={s.stepDesc}>
        This information appears on your gap analysis report.
      </p>

      <div className={s.form}>
        <div className={s.row}>
          <label className={s.label}>Company Name</label>
          <input
            className={s.input}
            type="text"
            placeholder="Acme Ltd"
            value={client.company_name}
            onChange={e => onChange('company_name', e.target.value)}
          />
        </div>

        <div className={s.row}>
          <label className={s.label}>Your Full Name</label>
          <input
            className={s.input}
            type="text"
            placeholder="Jane Smith"
            value={client.contact_name}
            onChange={e => onChange('contact_name', e.target.value)}
          />
        </div>

        <div className={s.row}>
          <label className={s.label}>Email Address</label>
          <input
            className={s.input}
            type="email"
            placeholder="jane@company.co.uk"
            value={client.contact_email}
            onChange={e => onChange('contact_email', e.target.value)}
          />
        </div>

        <div className={s.row}>
          <label className={s.label}>Company Size</label>
          <div className={s.sizeGrid}>
            {COMPANY_SIZES.map(size => (
              <button
                key={size}
                className={`${s.sizeBtn} ${client.company_size === size ? s.sizeBtnActive : ''}`}
                onClick={() => onChange('company_size', size)}
                type="button"
              >
                {size}
              </button>
            ))}
          </div>
        </div>

        <div className={s.row}>
          <label className={s.label}>Industry</label>
          <input
            className={s.input}
            type="text"
            placeholder="e.g. Legal Services, Healthcare, Retail"
            value={client.industry}
            onChange={e => onChange('industry', e.target.value)}
          />
        </div>
      </div>

      <button
        className={s.nextBtn}
        onClick={onNext}
        disabled={!valid}
      >
        Begin Assessment →
      </button>
    </div>
  )
}
