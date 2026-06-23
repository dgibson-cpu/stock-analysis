import { useState } from 'react';

const inputClass =
  'w-full bg-bg text-text-primary rounded-sm px-3 py-3 border border-border focus:outline-none focus:ring-2 focus:ring-accent font-inter text-base';
const labelClass = 'block text-text-secondary text-sm font-medium mb-1.5 font-inter';

export default function LeadForm({ formData, onChange, results, onSubmit }) {
  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState({});

  const validate = () => {
    const errs = {};
    if (!formData.lastName.trim()) errs.lastName = 'Last name is required.';
    if (!formData.email.trim()) errs.email = 'Email is required.';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
      errs.email = 'Please enter a valid email address.';
    return errs;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    setSubmitting(true);

    const payload = {
      first_name: formData.firstName,
      last_name: formData.lastName,
      email: formData.email,
      phone: formData.phone,
      province: formData.province,
      age: parseInt(formData.age),
      horizon_years: formData.horizonYears,
      retained_earnings: formData.retainedEarnings,
      return_rate: formData.returnRate,
      annual_passive_income: results.annualPassiveIncome,
      total_tax_drag: results.totalTaxDrag,
      sbd_at_risk: results.sbdAtRisk,
      sbd_clawback_amount: results.sbdClawback,
      whole_life_fv: results.fvWholeLife,
      taxed_corp_fv: results.fvTaxed,
      gap_amount: results.wholeLifeGap,
      wants_email_copy: formData.wantsEmailCopy,
      best_time: formData.bestTime,
      submitted_at: new Date().toISOString(),
    };

    const webhookUrl = import.meta.env.VITE_ZOHO_WEBHOOK_URL;

    if (webhookUrl) {
      try {
        await fetch(webhookUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });
      } catch (err) {
        console.error('Webhook failed:', err);
      }
    }

    onSubmit();
  };

  return (
    <div className="bg-surface border-t-[3px] border-accent rounded p-8 mt-12">
      <h3 className="font-playfair text-text-primary font-bold mb-3" style={{ fontSize: '1.4rem' }}>
        See Your Exact Numbers — With a Real Carrier Illustration
      </h3>
      <p className="text-text-secondary font-inter text-sm leading-relaxed mb-6">
        This calculator uses illustrative assumptions. A personalized corporate illustration
        from Canada Life, Equitable Life, or Sun Life will show your specific CSV growth
        curve, premium schedule, and death benefit.
        <br /><br />
        Daniel Gibson will review your inputs and return a no-obligation corporate insurance
        analysis within 2 business days.
      </p>

      <form onSubmit={handleSubmit} noValidate>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          {/* First Name */}
          <div>
            <label className={labelClass}>First Name</label>
            <input
              type="text"
              className={inputClass}
              value={formData.firstName}
              onChange={(e) => onChange('firstName', e.target.value)}
            />
          </div>

          {/* Last Name */}
          <div>
            <label className={labelClass}>Last Name *</label>
            <input
              type="text"
              className={inputClass}
              value={formData.lastName}
              onChange={(e) => onChange('lastName', e.target.value)}
            />
            {errors.lastName && (
              <p className="text-danger text-xs mt-1 font-inter">{errors.lastName}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <label className={labelClass}>Email Address *</label>
            <input
              type="email"
              className={inputClass}
              value={formData.email}
              onChange={(e) => onChange('email', e.target.value)}
            />
            {errors.email && (
              <p className="text-danger text-xs mt-1 font-inter">{errors.email}</p>
            )}
          </div>

          {/* Phone */}
          <div>
            <label className={labelClass}>Phone (optional)</label>
            <input
              type="tel"
              className={inputClass}
              value={formData.phone}
              onChange={(e) => onChange('phone', e.target.value)}
              placeholder="(416) 000-0000"
            />
          </div>

          {/* Best Time */}
          <div className="md:col-span-2">
            <label className={labelClass}>Best Time to Connect</label>
            <select
              className={inputClass}
              value={formData.bestTime}
              onChange={(e) => onChange('bestTime', e.target.value)}
            >
              <option value="">Select a time...</option>
              <option value="morning">Morning (8am–12pm)</option>
              <option value="afternoon">Afternoon (12pm–5pm)</option>
              <option value="either">Either</option>
            </select>
          </div>
        </div>

        {/* Email copy checkbox */}
        <label className="flex items-start gap-3 cursor-pointer mb-6">
          <input
            type="checkbox"
            className="mt-0.5 w-4 h-4 accent-accent cursor-pointer"
            checked={formData.wantsEmailCopy}
            onChange={(e) => onChange('wantsEmailCopy', e.target.checked)}
          />
          <span className="text-text-secondary font-inter text-sm">
            Send me a copy of my results by email
          </span>
        </label>

        <button
          type="submit"
          disabled={submitting}
          className="w-full bg-accent hover:bg-accent-light disabled:opacity-60 text-bg font-semibold font-inter py-4 rounded transition-colors duration-150 text-base"
        >
          {submitting ? 'Submitting…' : 'Request My Corporate Insurance Analysis →'}
        </button>

        <p className="text-text-secondary font-inter text-xs text-center mt-3 leading-relaxed">
          No sales pressure. No commitment. Daniel will send a personalized analysis and
          you decide if a conversation makes sense.
        </p>
      </form>
    </div>
  );
}
