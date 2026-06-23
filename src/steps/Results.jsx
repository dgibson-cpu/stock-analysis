import { useEffect, useState } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import AnimatedCounter from '../components/AnimatedCounter.jsx';
import LeadForm from './LeadForm.jsx';
import { calculateResults } from '../utils/calculations.js';
import { formatCurrency, formatPercent } from '../utils/formatting.js';

function CustomTooltip({ active, payload, label }) {
  if (!active || !payload || !payload.length) return null;
  return (
    <div className="bg-surface border border-border rounded p-3 shadow-xl">
      <p className="text-text-secondary text-xs font-inter mb-2">{label}</p>
      {payload.map((entry) => (
        <div key={entry.name} className="flex items-center gap-2 text-sm font-inter">
          <span className="w-2.5 h-2.5 rounded-sm" style={{ background: entry.fill }} />
          <span className="text-text-secondary">{entry.name}:</span>
          <span className="text-text-primary font-semibold">
            {formatCurrency(entry.value)}
          </span>
        </div>
      ))}
    </div>
  );
}

function DataRow({ label, value, valueClass = '' }) {
  return (
    <div className="flex items-center justify-between py-2 border-b border-border last:border-0">
      <span className="text-text-secondary font-inter text-sm">{label}</span>
      <span className={`font-mono text-sm font-semibold ${valueClass || 'text-text-primary'}`}>
        {value}
      </span>
    </div>
  );
}

export default function Results({ formData, onChange, onSubmit }) {
  const [results, setResults] = useState(null);

  useEffect(() => {
    const r = calculateResults(formData);
    setResults(r);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  if (!results) return null;

  const {
    annualGrossReturn,
    annualTaxPaid,
    annualNetReturn,
    effectiveYield,
    fvTaxed,
    totalTaxDrag,
    fvWholeLife,
    wholeLifeGap,
    sbdAtRisk,
    sbdClawback,
    sbdAdditionalAnnualTax,
    annualPassiveIncome,
    yearsUntilSBDThreshold,
    comparisonData,
    passiveTaxRate,
  } = results;

  const { horizonYears, returnRate } = formData;
  const sbdExcess = Math.max(0, annualPassiveIncome - 50000);

  return (
    <div className="step-fade max-w-5xl mx-auto px-6 py-12">
      {/* Hero */}
      <div className="text-center mb-12">
        <p className="text-text-secondary font-inter text-base mb-3">
          Over {horizonYears} years, passive income tax will consume an estimated
        </p>
        <div className="text-danger font-bold font-mono" style={{ fontSize: 'clamp(2.5rem, 6vw, 4rem)' }}>
          <AnimatedCounter targetValue={totalTaxDrag} />
        </div>
        <p className="text-text-primary font-inter text-lg mt-3">from your retained earnings.</p>
        <p className="text-text-secondary font-inter text-sm mt-2">
          That's money your family and your business will never see.
        </p>
      </div>

      {/* Three Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        {/* Card 1 — Annual Tax Drag */}
        <div className="bg-surface border border-border border-t-[3px] border-t-accent rounded p-6">
          <h3 className="text-text-primary font-playfair font-semibold text-lg mb-4">
            Your Annual Tax Drag
          </h3>
          <DataRow label="Annual gross return" value={formatCurrency(annualGrossReturn)} />
          <DataRow
            label={`Passive income tax (${formatPercent(passiveTaxRate)})`}
            value={`−${formatCurrency(annualTaxPaid)}`}
            valueClass="text-danger"
          />
          <div className="my-3 border-t border-border" />
          <DataRow label="Annual after-tax return" value={formatCurrency(annualNetReturn)} />
          <DataRow
            label="Effective yield"
            value={`${formatPercent(effectiveYield)} (vs. ${formatPercent(returnRate)} gross)`}
          />
          <p className="text-text-secondary font-inter text-xs mt-4 leading-relaxed border-t border-border pt-3">
            50 cents of every dollar earned goes directly to CRA.
          </p>
        </div>

        {/* Card 2 — SBD Clawback Risk */}
        <div
          className={`bg-surface border border-border rounded p-6 ${
            sbdAtRisk ? 'border-t-[3px] border-t-danger' : 'border-t-[3px] border-t-success'
          }`}
        >
          <h3 className="text-text-primary font-playfair font-semibold text-lg mb-4">
            SBD Clawback Risk
          </h3>

          {!sbdAtRisk ? (
            <>
              <div className="flex items-center gap-2 mb-3">
                <span className="w-2.5 h-2.5 rounded-full bg-success" />
                <span className="text-success font-inter text-sm font-medium">
                  Below the SBD threshold
                </span>
              </div>
              <p className="text-text-secondary font-inter text-sm leading-relaxed mb-3">
                Your passive income of {formatCurrency(annualPassiveIncome)}/year is currently
                below the $50,000 threshold.
              </p>
              {yearsUntilSBDThreshold ? (
                <p className="text-text-secondary font-inter text-sm leading-relaxed">
                  At your current growth rate, you may cross this threshold in approximately{' '}
                  <strong className="text-accent">{yearsUntilSBDThreshold} years</strong>.
                </p>
              ) : (
                <p className="text-text-secondary font-inter text-sm leading-relaxed">
                  Your passive income is unlikely to reach the threshold within your{' '}
                  {horizonYears}-year horizon.
                </p>
              )}
            </>
          ) : (
            <>
              <div className="flex items-center gap-2 mb-3">
                <span className="w-2.5 h-2.5 rounded-full bg-danger" />
                <span className="text-danger font-inter text-sm font-medium">SBD at risk</span>
              </div>
              <p className="text-text-secondary font-inter text-sm leading-relaxed mb-3">
                Your corporation earns {formatCurrency(annualPassiveIncome)}/year in passive
                income — {formatCurrency(sbdExcess)} above the $50,000 threshold.
              </p>
              <DataRow label="SBD reduced by" value={formatCurrency(sbdClawback)} />
              <DataRow
                label="Additional annual tax on active income"
                value={formatCurrency(sbdAdditionalAnnualTax)}
                valueClass="text-danger"
              />
              <p className="text-text-secondary font-inter text-xs mt-3 leading-relaxed border-t border-border pt-3">
                This is the tax cost most business owners never see.
              </p>
            </>
          )}
        </div>

        {/* Card 3 — Corporate Whole Life Alternative */}
        <div className="bg-surface border border-border border-t-[3px] border-t-accent rounded p-6">
          <h3 className="text-text-primary font-playfair font-semibold text-lg mb-4">
            Corporate Whole Life Alternative
          </h3>
          <DataRow label="Policy growth rate (net)" value="4.0% (illustrative)" />
          <DataRow
            label={`Estimated CSV after ${horizonYears} years`}
            value={formatCurrency(fvWholeLife)}
            valueClass="text-success"
          />
          <DataRow label="vs. taxed portfolio" value={formatCurrency(fvTaxed)} />
          <div className="my-3 border-t border-border" />
          <DataRow
            label={`${horizonYears}-year advantage`}
            value={formatCurrency(wholeLifeGap)}
            valueClass="text-accent"
          />
          <p className="text-text-secondary font-inter text-xs mt-3 leading-relaxed border-t border-border pt-3">
            CSV grows tax-sheltered. Death benefit flows through CDA — receivable by
            shareholders tax-free.
          </p>
          <p className="text-text-secondary font-inter text-xs mt-2 italic">
            Illustrative only. Actual performance depends on age, health, carrier, and dividend
            scale.
          </p>
        </div>
      </div>

      {/* Chart Section */}
      <div className="mb-12">
        <h3 className="font-playfair text-text-primary font-bold text-2xl mb-6 text-center">
          Your Retained Earnings: Two Paths
        </h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart
            data={comparisonData}
            margin={{ top: 5, right: 20, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#1E3157" />
            <XAxis
              dataKey="year"
              tick={{ fill: '#8A9BB5', fontSize: 12, fontFamily: 'Inter' }}
              axisLine={{ stroke: '#1E3157' }}
              tickLine={false}
            />
            <YAxis
              tickFormatter={(v) => formatCurrency(v, true)}
              tick={{ fill: '#8A9BB5', fontSize: 11, fontFamily: 'Inter' }}
              axisLine={false}
              tickLine={false}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend
              wrapperStyle={{ fontSize: '13px', fontFamily: 'Inter', color: '#8A9BB5', paddingTop: '12px' }}
            />
            <Bar dataKey="Taxed in Corp" fill="#8A9BB5" radius={[3, 3, 0, 0]} />
            <Bar dataKey="Corporate Whole Life" fill="#C9A84C" radius={[3, 3, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>

        <div className="text-center mt-6">
          <p className="text-text-secondary font-inter text-base">
            The {horizonYears}-year difference:{' '}
            <span className="text-accent font-semibold font-mono">
              {formatCurrency(wholeLifeGap)}
            </span>
          </p>
          <p className="text-text-secondary font-inter text-sm mt-2 max-w-lg mx-auto leading-relaxed">
            This additional wealth flows through your Capital Dividend Account — receivable
            by shareholders entirely tax-free.
          </p>
        </div>
      </div>

      {/* Lead Form */}
      <LeadForm
        formData={formData}
        onChange={onChange}
        results={results}
        onSubmit={onSubmit}
      />
    </div>
  );
}
