export default function Footer() {
  return (
    <footer className="w-full px-6 md:px-10 py-8 border-t border-border mt-16">
      <p className="text-center font-inter text-text-secondary leading-relaxed" style={{ fontSize: '11px' }}>
        This calculator provides estimates for illustrative purposes only and does not constitute financial, tax, or legal advice.
        Tax rates reflect Ontario combined federal/provincial rates as of 2024 and are subject to change. Whole life projections
        assume a 4.0% net annual growth rate for illustrative purposes only — actual policy performance varies by carrier, product,
        age, health, and dividend scale. CDA treatment applies to CCPCs and depends on corporate structure and ACB. Consult a
        qualified financial advisor, tax advisor, and insurance professional before making any financial decisions.{' '}
        <strong className="text-text-secondary font-medium">Consilium Wealth &amp; Advisory Inc.</strong> | Toronto, Ontario |
        Not intended for use outside Canada.
      </p>
    </footer>
  );
}
