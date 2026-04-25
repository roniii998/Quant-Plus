import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

const brokers = [
  { name: 'AngelOne', status: 'LIVE', connected: true, cta: 'Connect →' },
  { name: 'Zerodha', status: 'Coming Q3 2025', connected: false, cta: 'Notify Me' },
  { name: 'Upstox', status: 'Coming Q3 2025', connected: false, cta: 'Notify Me' },
];

const securityBadges = ['OAuth 2.0', 'Read-Only', 'No Credential Storage', 'HTTPS Encrypted'];

const ease = [0.16, 1, 0.3, 1] as const;

export default function BrokerConnection() {
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
    <section id="broker" ref={ref} className="py-section bg-bg-primary relative overflow-hidden">
      {/* Ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px]" style={{
        background: 'radial-gradient(ellipse, rgba(59,123,246,0.04) 0%, transparent 70%)',
      }} />

      <div className="max-w-container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={visible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease }}
          className="text-center mb-16"
        >
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-text-primary mb-4">
            Your portfolio.<br />Amplified by AI.
          </h2>
          <p className="text-text-secondary text-base max-w-lg mx-auto">
            Connect your AngelOne account in under 30 seconds. OAuth secured. Read-only access. We never see your credentials.
          </p>
        </motion.div>

        {/* Broker cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
          {brokers.map((broker, i) => (
            <motion.div
              key={broker.name}
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              animate={visible ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={{ duration: 0.6, ease, delay: 0.2 + i * 0.1 }}
              whileHover={broker.connected ? { y: -4, scale: 1.02 } : {}}
              className={`p-6 rounded border text-center transition-all duration-300 ${
                broker.connected
                  ? 'border-accent-primary/50 bg-accent-primary/5 animate-border-glow'
                  : 'border-border-subtle bg-bg-secondary opacity-40'
              }`}
            >
              <div className="text-lg font-mono font-semibold text-text-primary mb-2">{broker.name}</div>
              <div className="flex items-center justify-center gap-2 mb-4">
                {broker.connected && (
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-positive opacity-75" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-positive" />
                  </span>
                )}
                <span className={`text-xs font-mono ${broker.connected ? 'text-positive' : 'text-text-tertiary'}`}>
                  {broker.status}
                </span>
              </div>
              <motion.button
                className={`px-4 py-2 text-sm font-medium rounded transition-all duration-300 ${
                  broker.connected
                    ? 'btn-primary bg-accent-primary text-white'
                    : 'border border-border-subtle text-text-tertiary hover:text-text-secondary'
                }`}
                whileHover={broker.connected ? { scale: 1.05 } : {}}
                whileTap={broker.connected ? { scale: 0.97 } : {}}
              >
                {broker.cta}
              </motion.button>
            </motion.div>
          ))}
        </div>

        {/* Primary CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={visible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease, delay: 0.5 }}
          className="text-center"
        >
          <motion.button
            className="btn-primary px-8 py-4 text-base font-medium text-white bg-accent-primary rounded"
            whileHover={{ scale: 1.03, y: -2 }}
            whileTap={{ scale: 0.98 }}
          >
            Connect AngelOne & Get Started →
          </motion.button>
          <motion.div
            className="flex flex-wrap items-center justify-center gap-3 mt-6"
            initial={{ opacity: 0 }}
            animate={visible ? { opacity: 1 } : {}}
            transition={{ delay: 0.8, duration: 0.5 }}
          >
            {securityBadges.map((badge, i) => (
              <motion.span
                key={badge}
                className="text-[10px] font-mono text-text-tertiary uppercase tracking-widest px-2.5 py-1 border border-border-subtle rounded"
                initial={{ opacity: 0, y: 10 }}
                animate={visible ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.9 + i * 0.08, duration: 0.4, ease }}
              >
                {badge}
              </motion.span>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
