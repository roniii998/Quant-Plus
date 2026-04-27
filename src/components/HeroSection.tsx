import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const candleData = [
  { open: 2780, close: 2810, high: 2820, low: 2770 },
  { open: 2810, close: 2795, high: 2825, low: 2785 },
  { open: 2795, close: 2830, high: 2840, low: 2790 },
  { open: 2830, close: 2815, high: 2845, low: 2805 },
  { open: 2815, close: 2850, high: 2860, low: 2810 },
  { open: 2850, close: 2835, high: 2865, low: 2825 },
  { open: 2835, close: 2870, high: 2880, low: 2830 },
  { open: 2870, close: 2855, high: 2885, low: 2845 },
  { open: 2855, close: 2890, high: 2900, low: 2850 },
  { open: 2890, close: 2875, high: 2905, low: 2865 },
  { open: 2875, close: 2910, high: 2920, low: 2870 },
  { open: 2910, close: 2945, high: 2955, low: 2905 },
];

const timeLabels = ['09:15', '09:45', '10:15', '10:45', '11:15', '11:45', '12:15', '12:45', '13:15', '13:45', '14:15', '14:45'];
const priceLabels = ['2780', '2820', '2860', '2900', '2940'];

const ease = [0.16, 1, 0.3, 1] as const;

function GridBackground() {
  return (
    <div className="absolute inset-0 grid-pattern opacity-60" />
  );
}

function FloatingOrb({ delay, x, y, size }: { delay: number; x: string; y: string; size: number }) {
  return (
    <motion.div
      className="absolute rounded-full"
      style={{
        left: x,
        top: y,
        width: size,
        height: size,
        background: `radial-gradient(circle, rgba(59,123,246,0.12) 0%, transparent 70%)`,
      }}
      animate={{
        y: [0, -20, 0],
        opacity: [0.3, 0.6, 0.3],
      }}
      transition={{
        duration: 6,
        delay,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
    />
  );
}

function DashboardMockup() {
  const [price, setPrice] = useState(2847.30);
  const [change] = useState({ value: 43.20, pct: 1.54 });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const interval = setInterval(() => {
      setPrice((p) => {
        const delta = (Math.random() - 0.48) * 2.5;
        return Math.round((p + delta) * 100) / 100;
      });
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  const minPrice = 2760;
  const maxPrice = 2960;
  const chartW = 480;
  const chartH = 220;
  const chartLeft = 50;
  const chartTop = 10;
  const candleW = 28;
  const gap = 12;

  const priceToY = (p: number) =>
    chartTop + chartH - ((p - minPrice) / (maxPrice - minPrice)) * chartH;

  const maPoints = candleData.map((_, i) => {
    const avg = candleData.slice(0, i + 1).reduce((s, d) => s + d.close, 0) / (i + 1);
    return { x: chartLeft + i * (candleW + gap) + candleW / 2, y: priceToY(avg) };
  });

  return (
    <div className="relative w-full">
      <motion.div
        className="relative rounded-lg border border-border-default bg-bg-secondary overflow-hidden"
        initial={{ opacity: 0, scale: 0.96 }}
        animate={mounted ? { opacity: 1, scale: 1 } : {}}
        transition={{ duration: 1, ease }}
      >
        {/* Animated border glow */}
        <div className="absolute -inset-px rounded-lg opacity-30" style={{
          background: 'conic-gradient(from var(--angle, 0deg), transparent 40%, #3B7BF6 50%, transparent 60%)',
          animation: 'border-rotate 4s linear infinite',
        }} />

        {/* Scan line effect */}
        <div className="absolute inset-0 overflow-hidden rounded-lg pointer-events-none z-10">
          <div
            className="w-full h-px opacity-[0.04]"
            style={{
              background: 'linear-gradient(90deg, transparent, #3B7BF6, transparent)',
              animation: 'scan-line 8s linear infinite',
            }}
          />
        </div>

        <div className="relative rounded-lg bg-bg-secondary overflow-hidden p-4">
          {/* Top bar */}
          <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-4 font-mono text-xs sm:text-sm">
            <motion.span
              className="text-text-primary font-medium"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              RELIANCE.NS
            </motion.span>
            <motion.span
              className="text-text-primary"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              ₹{price.toFixed(2)}
            </motion.span>
            <motion.span
              className="text-positive"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              ▲ +{change.value.toFixed(2)} (+{change.pct.toFixed(2)}%)
            </motion.span>
            <span className="text-text-tertiary hidden sm:inline">|</span>
            <span className="text-text-tertiary hidden sm:inline">NSE</span>
            <span className="text-text-tertiary hidden sm:inline">|</span>
            <span className="hidden sm:flex items-center gap-1.5">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-negative opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-negative" />
              </span>
              <span className="text-text-tertiary">Live</span>
            </span>
          </div>

          {/* Chart */}
          <div className="relative">
            <svg viewBox={`0 0 ${chartW + 70} ${chartH + 50}`} className="w-full" style={{ maxHeight: 280 }}>
              {priceLabels.map((label, i) => {
                const y = priceToY(Number(label));
                return (
                  <g key={i}>
                    <line x1={chartLeft} y1={y} x2={chartW + chartLeft} y2={y} stroke="#1C1F2E" strokeWidth="0.5" />
                    <text x={chartLeft - 8} y={y + 4} textAnchor="end" fill="#4A4F66" fontSize="9" fontFamily="IBM Plex Mono, monospace">
                      {label}
                    </text>
                  </g>
                );
              })}

              {timeLabels.filter((_, i) => i % 2 === 0).map((label, i) => (
                <text
                  key={i}
                  x={chartLeft + i * 2 * (candleW + gap) + candleW}
                  y={chartH + chartTop + 20}
                  textAnchor="middle"
                  fill="#4A4F66"
                  fontSize="9"
                  fontFamily="IBM Plex Mono, monospace"
                >
                  {label}
                </text>
              ))}

              {candleData.map((c, i) => {
                const vol = Math.abs(c.close - c.open) * 80 + 20;
                const barH = (vol / 60) * 30;
                const x = chartLeft + i * (candleW + gap);
                const isBull = c.close >= c.open;
                return (
                  <rect
                    key={`vol-${i}`}
                    x={x + 2}
                    y={chartH + chartTop - barH}
                    width={candleW - 4}
                    height={barH}
                    fill={i >= 8 ? (isBull ? 'rgba(34,211,164,0.3)' : 'rgba(244,63,94,0.3)') : '#1C1F2E'}
                    rx="1"
                  />
                );
              })}

              {candleData.map((c, i) => {
                const x = chartLeft + i * (candleW + gap);
                const isBull = c.close >= c.open;
                const bodyTop = priceToY(Math.max(c.open, c.close));
                const bodyBot = priceToY(Math.min(c.open, c.close));
                const bodyH = Math.max(bodyBot - bodyTop, 2);
                const wickTop = priceToY(c.high);
                const wickBot = priceToY(c.low);
                const isAnimated = i >= 8;

                return (
                  <g key={i} opacity={isAnimated ? 1 : 0.7}>
                    <line x1={x + candleW / 2} y1={wickTop} x2={x + candleW / 2} y2={wickBot} stroke={isBull ? '#22D3A4' : '#F43F5E'} strokeWidth="1" />
                    <rect
                      x={x + 3}
                      y={bodyTop}
                      width={candleW - 6}
                      height={bodyH}
                      fill={isBull ? '#22D3A4' : '#F43F5E'}
                      rx="1"
                      style={isAnimated ? { animation: 'fade-in-up 0.6s ease-out forwards', animationDelay: `${(i - 8) * 200}ms` } : {}}
                    />
                  </g>
                );
              })}

              <polyline
                points={maPoints.map((p) => `${p.x},${p.y}`).join(' ')}
                fill="none"
                stroke="#3B7BF6"
                strokeWidth="1.5"
                strokeDasharray="1000"
                strokeDashoffset="1000"
                style={{ animation: 'draw-line 2.5s ease-out 0.5s forwards' }}
              />
            </svg>

            {/* Floating cards - lg+ only */}
            <motion.div
              className="hidden lg:block absolute top-8 left-6 glass-card p-3"
              initial={{ opacity: 0, x: -20, y: 10 }}
              animate={{ opacity: 1, x: 0, y: 0 }}
              transition={{ delay: 1.2, duration: 0.6, ease }}
            >
              <div className="text-[10px] font-mono uppercase tracking-widest text-text-tertiary mb-1">Sentiment Score</div>
              <div className="flex items-end gap-2">
                <span className="text-2xl font-mono font-semibold text-accent-primary animate-count-glow">87</span>
                <span className="text-xs font-mono text-positive mb-1">Bullish</span>
              </div>
              <div className="flex gap-0.5 mt-1.5">
                {[60, 75, 82, 87, 91, 85, 87].map((v, i) => (
                  <motion.div
                    key={i}
                    className="w-1.5 rounded-sm"
                    initial={{ height: 0 }}
                    animate={{ height: `${v / 4}px` }}
                    transition={{ delay: 1.4 + i * 0.05, duration: 0.4, ease }}
                    style={{ background: i === 6 ? '#3B7BF6' : '#1C1F2E' }}
                  />
                ))}
              </div>
            </motion.div>

            <motion.div
              className="hidden lg:block absolute bottom-12 right-6 glass-card p-3"
              initial={{ opacity: 0, x: 20, y: -10 }}
              animate={{ opacity: 1, x: 0, y: 0 }}
              transition={{ delay: 1.5, duration: 0.6, ease }}
            >
              <div className="flex items-center gap-2">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-negative opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-negative" />
                </span>
                <span className="text-[10px] font-mono uppercase tracking-widest text-negative">Anomaly Alert</span>
              </div>
              <div className="text-xs font-mono text-text-secondary mt-1">Volume spike: 3.2× avg</div>
            </motion.div>

            <motion.div
              className="hidden lg:block absolute top-8 right-6 glass-card px-3 py-2"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.3, duration: 0.6, ease }}
            >
              <div className="text-[10px] font-mono uppercase tracking-widest text-gold mb-0.5">Pattern Detected</div>
              <div className="text-xs font-mono text-gold">Cup & Handle · 91% confidence</div>
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Ambient glow */}
      <div className="absolute -inset-20 -z-10 rounded-full" style={{ background: 'radial-gradient(ellipse, rgba(59,123,246,0.08) 0%, transparent 70%)' }} />
    </div>
  );
}

const heroTextVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08 },
  },
};

const heroItem = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] } },
};

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden noise-overlay" style={{ background: '#050508' }}>
      <GridBackground />

      {/* Floating orbs */}
      <FloatingOrb delay={0} x="10%" y="20%" size={300} />
      <FloatingOrb delay={2} x="70%" y="60%" size={200} />
      <FloatingOrb delay={4} x="40%" y="80%" size={250} />

      {/* Radial gradient bloom */}
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px]" style={{
        background: 'radial-gradient(ellipse, rgba(59,123,246,0.08) 0%, transparent 70%)',
      }} />

      <div className="max-w-container mx-auto px-6 pt-28 pb-20 w-full relative z-10">
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12 items-center"
          variants={heroTextVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Left - Dashboard (60%) */}
          <div className="lg:col-span-3 order-2 lg:order-1">
            <motion.div variants={heroItem}>
              <DashboardMockup />
            </motion.div>
          </div>

          {/* Right - Text (40%) */}
          <div className="lg:col-span-2 order-1 lg:order-2">
            <motion.div variants={heroItem}>
              <motion.div
                className="text-[11px] font-mono font-medium tracking-[0.08em] uppercase text-accent-primary mb-6"
                variants={heroItem}
              >
                AI-Powered · NSE/BSE · Real-Time Analytics
              </motion.div>

              <motion.h1
                className="font-serif text-5xl sm:text-6xl lg:text-[72px] leading-[1.1] text-text-primary mb-6"
                variants={heroItem}
              >
                {'Institutional'.split('').map((char, i) => (
                  <motion.span
                    key={i}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 + i * 0.02, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  >
                    {char}
                  </motion.span>
                ))}
                <br />
                {'Intelligence.'.split('').map((char, i) => (
                  <motion.span
                    key={i}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 + i * 0.02, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  >
                    {char}
                  </motion.span>
                ))}
                <br />
                <span className="text-accent-primary">{'For Every'.split('').map((char, i) => (
                  <motion.span
                    key={i}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8 + i * 0.02, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  >
                    {char}
                  </motion.span>
                ))}</span>
                <br />
                {'Investor.'.split('').map((char, i) => (
                  <motion.span
                    key={i}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.0 + i * 0.02, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  >
                    {char}
                  </motion.span>
                ))}
              </motion.h1>

              <motion.p
                className="text-base lg:text-lg text-text-secondary leading-relaxed max-w-[380px] mb-8"
                variants={heroItem}
              >
                Quant Plus gives Indian retail investors the same AI tools
                used by hedge funds — sentiment analysis, pattern recognition,
                anomaly detection, and price prediction. Free, forever.
              </motion.p>

              <motion.div className="flex flex-col gap-3" variants={heroItem}>
                <motion.a
                  href="#broker"
                  className="btn-primary inline-flex items-center justify-center gap-2 px-6 py-3 text-sm font-medium text-white bg-accent-primary rounded w-fit"
                  whileHover={{ scale: 1.03, y: -1 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Connect Your Broker →
                </motion.a>
                <motion.a
                  href="#features"
                  className="btn-ghost inline-flex items-center justify-center gap-2 px-6 py-3 text-sm font-medium text-text-secondary border border-border-subtle rounded w-fit hover:border-border-default hover:text-text-primary transition-colors duration-300"
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Explore Features
                </motion.a>
              </motion.div>

              {/* Trust bar */}
              <motion.div className="mt-12" variants={heroItem}>
                <div className="flex flex-wrap items-center gap-4 sm:gap-6 mb-2">
                  {['AngelOne', 'NSE', 'BSE', 'HuggingFace', 'FastAPI', 'MongoDB'].map((name, i) => (
                    <motion.span
                      key={name}
                      className="text-xs font-mono text-text-tertiary tracking-wide"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 1.5 + i * 0.1, duration: 0.5 }}
                    >
                      {name}
                    </motion.span>
                  ))}
                </div>
                <div className="text-[10px] font-mono text-text-tertiary uppercase tracking-widest">
                  Built on trusted infrastructure
                </div>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32" style={{
        background: 'linear-gradient(to top, #050508, transparent)',
      }} />
    </section>
  );
}
