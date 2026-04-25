import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

const pipeline = [
  { source: 'AngelOne API', model: 'FinBERT NLP', output: 'Sentiment Score', tech: 'HuggingFace' },
  { source: 'NSE Live Feed', model: 'Isolation Forest', output: 'Anomaly Alerts', tech: 'scikit-learn' },
  { source: 'News APIs', model: 'CNN Classifier', output: 'Pattern Labels', tech: 'TensorFlow' },
  { source: 'OHLCV History', model: 'Random Forest', output: 'Price Forecast', tech: 'FastAPI' },
  { source: '', model: 'LSTM Autoencoder', output: 'Trend Signal', tech: 'MongoDB' },
];

const principles = [
  { title: 'Sub-200ms Latency', desc: 'FastAPI async microservices with model caching', icon: '⚡' },
  { title: 'Broker-Agnostic', desc: 'OAuth adapter layer supports multiple broker APIs', icon: '🔗' },
  { title: 'Free Tier Infrastructure', desc: 'Vercel + Railway + Hugging Face Spaces', icon: '☁' },
  { title: 'NSE-Native', desc: 'Models fine-tuned on Indian market data, not US proxies', icon: '🇮🇳' },
];

const ease = [0.16, 1, 0.3, 1] as const;

export default function ArchitectureSection() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.15 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={ref} id="models" className="py-section bg-bg-primary relative overflow-hidden">
      {/* Subtle grid background */}
      <div className="absolute inset-0 grid-pattern opacity-40" />

      <div className="max-w-container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={visible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease }}
        >
          <div className="text-[11px] font-mono font-medium tracking-[0.08em] uppercase text-accent-primary mb-4">
            Technology
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-text-primary mb-3">
            What's under the hood
          </h2>
          <p className="text-text-secondary text-base max-w-xl mb-16">
            Five production AI models running in parallel, serving results in under 200ms.
          </p>
        </motion.div>

        {/* Pipeline diagram */}
        <div className="overflow-x-auto scrollbar-hide pb-8">
          <div className="min-w-[700px]">
            <div className="grid grid-cols-3 gap-8 mb-6">
              {['Data Sources', 'AI Models', 'Output'].map((header, i) => (
                <motion.div
                  key={header}
                  className="text-[11px] font-mono font-medium tracking-[0.08em] uppercase text-text-tertiary"
                  initial={{ opacity: 0, y: -10 }}
                  animate={visible ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.2 + i * 0.1, duration: 0.5, ease }}
                >
                  {header}
                </motion.div>
              ))}
            </div>

            {pipeline.map((row, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -30 }}
                animate={visible ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, ease, delay: 0.3 + i * 0.1 }}
                className="grid grid-cols-3 gap-8 items-center mb-3"
              >
                <div className="flex items-center gap-2">
                  {row.source && (
                    <motion.div
                      className="px-3 py-2 rounded border border-border-subtle bg-bg-tertiary text-xs font-mono text-text-secondary"
                      whileHover={{ borderColor: 'rgba(59,123,246,0.3)', y: -1 }}
                      transition={{ duration: 0.2 }}
                    >
                      {row.source}
                    </motion.div>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  {row.source && (
                    <svg width="24" height="2" className="flex-shrink-0">
                      <motion.line
                        x1="0" y1="1" x2="24" y2="1"
                        stroke="#3B7BF6" strokeWidth="1.5"
                        initial={{ pathLength: 0 }}
                        animate={visible ? { pathLength: 1 } : {}}
                        transition={{ duration: 0.5, delay: 0.5 + i * 0.1 }}
                      />
                    </svg>
                  )}
                  <motion.div
                    className="px-3 py-2 rounded border border-accent-primary/30 bg-accent-primary/5 text-xs font-mono text-accent-primary"
                    whileHover={{ scale: 1.03, borderColor: 'rgba(59,123,246,0.5)' }}
                    transition={{ duration: 0.2 }}
                  >
                    {row.model}
                  </motion.div>
                  <span className="text-[9px] font-mono text-text-tertiary px-1.5 py-0.5 rounded border border-border-subtle bg-bg-tertiary">
                    {row.tech}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <svg width="24" height="2" className="flex-shrink-0">
                    <motion.line
                      x1="0" y1="1" x2="24" y2="1"
                      stroke="#3B7BF6" strokeWidth="1.5"
                      initial={{ pathLength: 0 }}
                      animate={visible ? { pathLength: 1 } : {}}
                      transition={{ duration: 0.5, delay: 0.7 + i * 0.1 }}
                    />
                  </svg>
                  <motion.div
                    className="px-3 py-2 rounded border border-border-subtle bg-bg-tertiary text-xs font-mono text-text-secondary"
                    whileHover={{ borderColor: 'rgba(59,123,246,0.3)', y: -1 }}
                    transition={{ duration: 0.2 }}
                  >
                    {row.output}
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Architecture principles */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-12">
          {principles.map((p, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              animate={visible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, ease, delay: 0.8 + i * 0.08 }}
              className="p-5 rounded border border-border-subtle bg-bg-secondary group hover:border-accent-primary/30 transition-all duration-300"
              whileHover={{ y: -2, transition: { duration: 0.2 } }}
            >
              <div className="text-lg mb-2">{p.icon}</div>
              <div className="text-sm font-medium text-text-primary mb-1.5 group-hover:text-accent-primary transition-colors duration-300">{p.title}</div>
              <div className="text-xs text-text-secondary leading-relaxed">{p.desc}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
