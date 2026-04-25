import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

const topRow = [
  { value: 94.2, suffix: '%', label: 'Model Accuracy' },
  { value: 500, suffix: '+', label: 'Active Users' },
  { value: 1800, suffix: '+', label: 'Stocks Covered' },
  { value: 200, prefix: '<', suffix: 'ms', label: 'Response Time' },
];

const bottomRow = [
  { value: 5, label: 'AI Models Live' },
  { value: 3, label: 'Broker APIs' },
  { value: 20, suffix: '+', label: 'Chart Patterns' },
  { value: '∞' as const, label: 'Free Forever' },
];

function AnimatedCounter({ value, prefix, suffix, started }: {
  value: number; prefix?: string; suffix?: string; started: boolean;
}) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!started) return;
    const duration = 1800;
    const startTime = Date.now();
    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(value * eased * 10) / 10);
      if (progress < 1) requestAnimationFrame(animate);
      else setCount(value);
    };
    requestAnimationFrame(animate);
  }, [started, value]);

  const display = value >= 1000
    ? Math.round(count).toLocaleString()
    : count % 1 === 0 ? Math.round(count) : count.toFixed(1);

  return (
    <span className="font-mono text-5xl sm:text-6xl lg:text-[72px] text-accent-primary leading-none animate-count-glow">
      {prefix}{display}{suffix}
    </span>
  );
}

const ease = [0.16, 1, 0.3, 1] as const;

export default function MetricsSection() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={ref} className="py-section relative overflow-hidden" style={{ background: '#050508' }}>
      {/* Subtle blue radial gradient */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px]" style={{
        background: 'radial-gradient(ellipse, rgba(59,123,246,0.06) 0%, transparent 70%)',
      }} />

      {/* Grid pattern */}
      <div className="absolute inset-0 grid-pattern opacity-30" />

      <div className="max-w-container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={visible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease }}
          className="text-[11px] font-mono font-medium tracking-[0.08em] uppercase text-text-tertiary mb-16 text-center"
        >
          Platform Metrics · Updated Daily
        </motion.div>

        {/* Top row */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {topRow.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              animate={visible ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={{ duration: 0.6, ease, delay: i * 0.1 }}
              className="text-center group"
            >
              <motion.div
                className="inline-block"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2 }}
              >
                <AnimatedCounter
                  value={item.value}
                  prefix={item.prefix}
                  suffix={item.suffix}
                  started={visible}
                />
              </motion.div>
              <motion.div
                className="text-sm font-medium text-text-secondary mt-3"
                initial={{ opacity: 0 }}
                animate={visible ? { opacity: 1 } : {}}
                transition={{ delay: 0.5 + i * 0.1, duration: 0.5 }}
              >
                {item.label}
              </motion.div>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="h-px mb-8"
          style={{ background: 'linear-gradient(90deg, transparent, rgba(59,123,246,0.3), transparent)' }}
          initial={{ scaleX: 0 }}
          animate={visible ? { scaleX: 1 } : {}}
          transition={{ delay: 0.5, duration: 0.8, ease }}
        />

        {/* Bottom row */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {bottomRow.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              animate={visible ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={{ duration: 0.6, ease, delay: 0.6 + i * 0.1 }}
              className="text-center group"
            >
              <motion.div
                className="inline-block"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2 }}
              >
                {typeof item.value === 'string' ? (
                  <span className="font-mono text-5xl sm:text-6xl lg:text-[72px] text-accent-primary leading-none animate-count-glow">{item.value}</span>
                ) : (
                  <AnimatedCounter value={item.value} suffix={item.suffix} started={visible} />
                )}
              </motion.div>
              <motion.div
                className="text-sm font-medium text-text-secondary mt-3"
                initial={{ opacity: 0 }}
                animate={visible ? { opacity: 1 } : {}}
                transition={{ delay: 1 + i * 0.1, duration: 0.5 }}
              >
                {item.label}
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
