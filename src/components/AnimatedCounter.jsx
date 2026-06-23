import { useEffect, useRef, useState } from 'react';

export default function AnimatedCounter({
  targetValue,
  duration = 1500,
  prefix = '$',
  className = '',
}) {
  const [displayValue, setDisplayValue] = useState(0);
  const frameRef = useRef(null);
  const startTimeRef = useRef(null);

  useEffect(() => {
    startTimeRef.current = null;

    const animate = (timestamp) => {
      if (!startTimeRef.current) startTimeRef.current = timestamp;
      const elapsed = timestamp - startTimeRef.current;
      const progress = Math.min(elapsed / duration, 1);

      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.round(eased * targetValue);
      setDisplayValue(current);

      if (progress < 1) {
        frameRef.current = requestAnimationFrame(animate);
      }
    };

    frameRef.current = requestAnimationFrame(animate);

    return () => {
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
    };
  }, [targetValue, duration]);

  const formatted = new Intl.NumberFormat('en-CA', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(displayValue);

  return (
    <span className={`font-mono ${className}`}>
      {prefix}{formatted}
    </span>
  );
}
