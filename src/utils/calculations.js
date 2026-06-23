export const PASSIVE_TAX_RATES = {
  ON: 0.5017,
  BC: 0.4967,
  AB: 0.4667,
  QC: 0.5027,
  MB: 0.5067,
  SK: 0.5067,
};

export const SBD_RATE_DIFFERENTIAL = {
  ON: 0.143,
  BC: 0.120,
  AB: 0.080,
  QC: 0.155,
  MB: 0.140,
  SK: 0.130,
};

export const PROVINCE_LABELS = {
  ON: 'Ontario',
  BC: 'British Columbia',
  AB: 'Alberta',
  QC: 'Quebec',
  MB: 'Manitoba',
  SK: 'Saskatchewan',
};

export function calculateResults({
  retainedEarnings,
  returnRate,
  horizonYears,
  province,
}) {
  const T = PASSIVE_TAX_RATES[province];
  const netRate = returnRate * (1 - T);

  const annualGrossReturn = retainedEarnings * returnRate;
  const annualTaxPaid = annualGrossReturn * T;
  const annualNetReturn = annualGrossReturn - annualTaxPaid;

  const fvGross = retainedEarnings * Math.pow(1 + returnRate, horizonYears);
  const fvTaxed = retainedEarnings * Math.pow(1 + netRate, horizonYears);
  const totalTaxDrag = fvGross - fvTaxed;

  const WL_RATE = 0.04;
  const fvWholeLife = retainedEarnings * Math.pow(1 + WL_RATE, horizonYears);
  const wholeLifeGap = fvWholeLife - fvTaxed;

  const SBD_THRESHOLD = 50000;
  const SBD_LIMIT = 500000;
  const sbdAtRisk = annualGrossReturn > SBD_THRESHOLD;

  let sbdClawback = 0;
  let sbdAdditionalAnnualTax = 0;
  let yearsUntilSBDThreshold = null;

  if (sbdAtRisk) {
    const excess = annualGrossReturn - SBD_THRESHOLD;
    sbdClawback = Math.min(excess * 5, SBD_LIMIT);
    const rateDiff = SBD_RATE_DIFFERENTIAL[province];
    sbdAdditionalAnnualTax = (sbdClawback / SBD_LIMIT) * SBD_LIMIT * rateDiff;
  } else {
    if (annualGrossReturn > 0) {
      const t =
        Math.log(SBD_THRESHOLD / annualGrossReturn) / Math.log(1 + netRate);
      if (t > 0 && t <= horizonYears) {
        yearsUntilSBDThreshold = Math.ceil(t);
      }
    }
  }

  const chartYears = [...new Set([10, 20, horizonYears])].filter((y) => y > 0);
  const comparisonData = chartYears.map((year) => ({
    year: `${year} yrs`,
    yearNum: year,
    'Taxed in Corp': Math.round(
      retainedEarnings * Math.pow(1 + netRate, year)
    ),
    'Corporate Whole Life': Math.round(
      retainedEarnings * Math.pow(1 + WL_RATE, year)
    ),
  }));

  return {
    annualGrossReturn,
    annualTaxPaid,
    annualNetReturn,
    effectiveYield: netRate,
    fvGross,
    fvTaxed,
    totalTaxDrag,
    fvWholeLife,
    wholeLifeGap,
    sbdAtRisk,
    sbdClawback,
    sbdAdditionalAnnualTax,
    annualPassiveIncome: annualGrossReturn,
    yearsUntilSBDThreshold,
    comparisonData,
    passiveTaxRate: T,
  };
}
