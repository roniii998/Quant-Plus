import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

const rows = [
  { feature: 'Real-time Sentiment', bloomberg: '✓ (₹50K/yr)', broker: '✗', quantplus: '✓ Free' },
  { feature: 'Anomaly Detection', bloomberg: '✓ (₹50K/yr)', broker: '✗', quantplus: '✓ Free' },
  { feature: 'Chart Pattern AI', bloomberg: '✓ (₹50K/yr)', broker: '✗', quantplus: '✓ Free' },
  { feature: 'Price Prediction', bloomberg: '✓ (₹50K/yr)', broker: '✗', quantplus: '✓ Free' },
  { feature: 'Indian Market Native', bloomberg: '✗', broker: 'Partial', quantplus: '✓ Full NSE/BSE' },
];

const ease = [0.16, 1, 0.3, 1] as const;

export default function ComparisonTable() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.2 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={ref} id="pricing" className="py-section bg-bg-primary relative">
      <div className="absolute inset-0 grid-pattern opacity-20" />

      <div className="max-w-container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={visible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease }}
        >
          <div className="text-[11px] font-mono font-medium tracking-[0.08em] uppercase text-accent-primary mb-4">
            Comparison
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-text-primary mb-3">
            Why analysts pay ₹50,000/year
          </h2>
          <p className="text-text-secondary text-base mb-12">
            for tools you get free
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={visible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease, delay: 0.2 }}
          className="overflow-x-auto scrollbar-hide"
        >
          <table className="w-full min-w-[600px] border-collapse">
            <thead>
              <tr>
                <th className="text-left text-[11px] font-mono font-medium tracking-[0.08em] uppercase text-text-tertiary py-4 px-4 border-b border-border-subtle">
                  Feature
                </th>
                <th className="text-left text-[11px] font-mono font-medium tracking-[0.08em] uppercase text-text-tertiary py-4 px-4 border-b border-border-subtle">
                  Bloomberg Terminal
                </th>
                <th className="text-left text-[11px] font-mono font-medium tracking-[0.08em] uppercase text-text-tertiary py-4 px-4 border-b border-border-subtle">
                  Traditional Broker
                </th>
                <th className="text-left text-[11px] font-mono font-medium tracking-[0.08em] uppercase text-white py-4 px-4 border-b border-accent-primary bg-accent-primary/10">
                  Quant Plus
                </th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row, i) => (
                <motion.tr
                  key={i}
                  className="border-b border-border-subtle group"
                  initial={{ opacity: 0, x: -20 }}
                  animate={visible ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.4 + i * 0.08, duration: 0.5, ease }}
                >
                  <td className="py-4 px-4 text-sm text-text-primary font-medium group-hover:text-accent-primary transition-colors duration-300">
                    {row.feature}
                  </td>
                  <td className="py-4 px-4 text-sm font-mono text-text-secondary">{row.bloomberg}</td>
                  <td className="py-4 px-4 text-sm font-mono text-text-secondary">{row.broker}</td>
                  <td className="py-4 px-4 text-sm font-mono bg-accent-primary/5 group-hover:bg-accent-primary/10 transition-colors duration-300">
                    <span className="text-positive">{row.quantplus}</span>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </motion.div>

        <motion.div
          className="text-[10px] font-mono text-text-tertiary mt-4"
          initial={{ opacity: 0 }}
          animate={visible ? { opacity: 1 } : {}}
          transition={{ delay: 1, duration: 0.5 }}
        >
          Bloomberg Terminal pricing approximate. For illustrative purposes.
        </motion.div>
      </div>
    </section>
  );
}
