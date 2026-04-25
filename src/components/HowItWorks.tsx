import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

const steps = [
  {
    num: '01',
    title: 'Connect',
    desc: 'Link your AngelOne account via OAuth. Your portfolio syncs in seconds.',
    icon: '🔌',
  },
  {
    num: '02',
    title: 'Analyze',
    desc: 'Type any NSE ticker. Get sentiment, patterns, prediction, and anomaly alerts instantly.',
    icon: '📊',
  },
  {
    num: '03',
    title: 'Decide',
    desc: 'Act on AI-graded signals, not emotions. Your edge. Every day.',
    icon: '🎯',
  },
];

const ease = [0.16, 1, 0.3, 1] as const;

function AnimatedArrow() {
  return (
    <div className="hidden lg:flex items-center justify-center w-16 relative">
      <div className="h-px w-full border-t border-dashed border-border-default" />
      <motion.div
        className="absolute w-2 h-2 rounded-full bg-accent-primary"
        animate={{ left: ['0%', '100%'] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut', repeatType: 'loop' }}
        style={{ top: '-3px' }}
      />
    </div>
  );
}

export default function HowItWorks() {
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
    <section id="how-it-works" ref={ref} className="py-section bg-bg-primary relative overflow-hidden">
      <div className="absolute inset-0 grid-pattern opacity-20" />

      <div className="max-w-container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={visible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease }}
          className="text-center mb-16"
        >
          <div className="text-[11px] font-mono font-medium tracking-[0.08em] uppercase text-accent-primary mb-4">
            How It Works
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-text-primary">
            From zero to AI-powered in 3 steps
          </h2>
        </motion.div>

        <div className="flex flex-col lg:flex-row items-center lg:items-start justify-center gap-8 lg:gap-0">
          {steps.map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              animate={visible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, ease, delay: 0.2 + i * 0.15 }}
              className="relative text-center lg:text-left flex-1 max-w-xs mx-auto lg:mx-0"
            >
              {/* Watermark number */}
              <motion.div
                className="font-mono text-[120px] lg:text-[160px] font-semibold leading-none absolute -top-8 -left-4 select-none pointer-events-none"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={visible ? { opacity: 0.06, scale: 1 } : {}}
                transition={{ delay: 0.4 + i * 0.15, duration: 0.8, ease }}
              >
                {step.num}
              </motion.div>

              <div className="relative pt-16 lg:pt-20">
                <motion.div
                  className="h-px w-12 bg-accent-primary mb-6 mx-auto lg:mx-0"
                  initial={{ scaleX: 0 }}
                  animate={visible ? { scaleX: 1 } : {}}
                  transition={{ delay: 0.5 + i * 0.15, duration: 0.5, ease }}
                  style={{ transformOrigin: 'left' }}
                />
                <motion.div
                  className="text-2xl mb-3"
                  initial={{ scale: 0 }}
                  animate={visible ? { scale: 1 } : {}}
                  transition={{ delay: 0.6 + i * 0.15, duration: 0.4, type: 'spring', stiffness: 200 }}
                >
                  {step.icon}
                </motion.div>
                <h3 className="text-xl font-semibold text-text-primary mb-3">{step.title}</h3>
                <p className="text-sm text-text-secondary leading-relaxed">
                  {step.desc}
                </p>
              </div>

              {/* Arrow between steps */}
              {i < 2 && <AnimatedArrow />}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
