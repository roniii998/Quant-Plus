import { useEffect, useState, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

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

const ease = [0.16, 1, 0.3, 1] as [number, number, number, number];

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
      animate={{ y: [0, -20, 0], opacity: [0.3, 0.6, 0.3] }}
      transition={{ duration: 6, delay, repeat: Infinity, ease: 'easeInOut' }}
    />
  );
}

function DataStreamParticles() {
  const particles = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    delay: Math.random() * 5,
    duration: 3 + Math.random() * 4,
    size: 1 + Math.random() * 2,
  }));

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full bg-accent-primary/20"
          style={{ left: `${p.x}%`, width: p.size, height: p.size }}
          animate={{ y: ['-10vh', '110vh'], opacity: [0, 0.6, 0.6, 0] }}
          transition={{ duration: p.duration, delay: p.delay, repeat: Infinity, ease: 'linear' }}
        />
      ))}
    </div>
  );
}

function DashboardMockup() {
  const [price, setPrice] = useState(2847.30);
  const [change] = useState({ value: 43.20, pct: 1.54 });

  useEffect(() => {
    const interval = setInterval(() => {
      setPrice((p) => Math.round((p + (Math.random() - 0.48) * 2.5) * 100) / 100);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  const minPrice = 2760;
  const maxPrice = 2960;
  const chartW = 900;
  const chartH = 380;
  const chartLeft = 90;
  const chartTop = 20;
  const candleW = 52;
  const gap = 22;

  const priceToY = (p: number) =>
    chartTop + chartH - ((p - minPrice) / (maxPrice - minPrice)) * chartH;

  const maPoints = candleData.map((_, i) => {
    const avg = candleData.slice(0, i + 1).reduce((s, d) => s + d.close, 0) / (i + 1);
    return { x: chartLeft + i * (candleW + gap) + candleW / 2, y: priceToY(avg) };
  });

  return (
    <div className="relative w-full mx-auto h-full">
      <div className="relative rounded-lg border border-border-default bg-bg-secondary overflow-visible h-full flex flex-col">
        {/* Animated border glow */}
        <div className="absolute -inset-px rounded-lg opacity-40" style={{
          background: 'conic-gradient(from var(--angle, 0deg), transparent 40%, #3B7BF6 50%, transparent 60%)',
          animation: 'border-rotate 4s linear infinite',
          pointerEvents: 'none',
        }} />

        {/* Side glow effect */}
        <div className="absolute -left-32 top-1/4 w-64 h-96 rounded-full pointer-events-none" style={{
          background: 'radial-gradient(ellipse, rgba(59,123,246,0.15) 0%, transparent 70%)',
          filter: 'blur(40px)',
        }} />
        <div className="absolute -right-32 bottom-1/4 w-64 h-96 rounded-full pointer-events-none" style={{
          background: 'radial-gradient(ellipse, rgba(59,123,246,0.15) 0%, transparent 70%)',
          filter: 'blur(40px)',
        }} />

        {/* Scan line effect */}
        <div className="absolute inset-0 overflow-visible rounded-lg pointer-events-none z-10">
          <div className="w-full h-px opacity-[0.04]" style={{
            background: 'linear-gradient(90deg, transparent, #3B7BF6, transparent)',
            animation: 'scan-line 8s linear infinite',
          }} />
        </div>

        <div className="relative rounded-lg bg-bg-secondary overflow-visible p-6 flex-1 flex flex-col">
          {/* Top bar */}
          <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-6 font-mono text-xs sm:text-sm">
            <span className="text-text-primary font-medium">RELIANCE.NS</span>
            <span className="text-text-primary">₹{price.toFixed(2)}</span>
            <span className="text-positive">▲ +{change.value.toFixed(2)} (+{change.pct.toFixed(2)}%)</span>
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
          <div className="relative flex-1 flex items-center justify-center overflow-visible">
            <svg viewBox={`0 0 ${chartW + 70} ${chartH + 50}`} className="w-full h-full" style={{ minHeight: 450 }}>
              {priceLabels.map((label, i) => {
                const y = priceToY(Number(label));
                return (
                  <g key={i}>
                    <line x1={chartLeft} y1={y} x2={chartW + chartLeft} y2={y} stroke="#1C1F2E" strokeWidth="0.5" />
                    <text x={chartLeft - 8} y={y + 4} textAnchor="end" fill="#4A4F66" fontSize="9" fontFamily="IBM Plex Mono, monospace">{label}</text>
                  </g>
                );
              })}
              {timeLabels.filter((_, i) => i % 2 === 0).map((label, i) => (
                <text key={i} x={chartLeft + i * 2 * (candleW + gap) + candleW} y={chartH + chartTop + 20} textAnchor="middle" fill="#4A4F66" fontSize="9" fontFamily="IBM Plex Mono, monospace">{label}</text>
              ))}
              {candleData.map((c, i) => {
                const vol = Math.abs(c.close - c.open) * 80 + 20;
                const barH = (vol / 60) * 30;
                const x = chartLeft + i * (candleW + gap);
                const isBull = c.close >= c.open;
                return (
                  <rect key={`vol-${i}`} x={x + 2} y={chartH + chartTop - barH} width={candleW - 4} height={barH} fill={i >= 8 ? (isBull ? 'rgba(34,211,164,0.3)' : 'rgba(244,63,94,0.3)') : '#1C1F2E'} rx="1" />
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
                    <rect x={x + 3} y={bodyTop} width={candleW - 6} height={bodyH} fill={isBull ? '#22D3A4' : '#F43F5E'} rx="1" style={isAnimated ? { animation: 'fade-in-up 0.6s ease-out forwards', animationDelay: `${(i - 8) * 200}ms` } : {}} />
                  </g>
                );
              })}
              <polyline points={maPoints.map((p) => `${p.x},${p.y}`).join(' ')} fill="none" stroke="#3B7BF6" strokeWidth="1.5" strokeDasharray="1000" strokeDashoffset="1000" style={{ animation: 'draw-line 2.5s ease-out 0.5s forwards' }} />
            </svg>

            {/* Floating cards - lg+ only */}
            <div className="hidden lg:block absolute top-8 left-6 glass-card p-3">
              <div className="text-[10px] font-mono uppercase tracking-widest text-text-tertiary mb-1">Sentiment Score</div>
              <div className="flex items-end gap-2">
                <span className="text-2xl font-mono font-semibold text-accent-primary animate-count-glow">87</span>
                <span className="text-xs font-mono text-positive mb-1">Bullish</span>
              </div>
              <div className="flex gap-0.5 mt-1.5">
                {[60, 75, 82, 87, 91, 85, 87].map((v, i) => (
                  <div key={i} className="w-1.5 rounded-sm" style={{ height: `${v / 4}px`, background: i === 6 ? '#3B7BF6' : '#1C1F2E' }} />
                ))}
              </div>
            </div>

            <div className="hidden lg:block absolute bottom-12 right-6 glass-card p-3">
              <div className="flex items-center gap-2">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-negative opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-negative" />
                </span>
                <span className="text-[10px] font-mono uppercase tracking-widest text-negative">Anomaly Alert</span>
              </div>
              <div className="text-xs font-mono text-text-secondary mt-1">Volume spike: 3.2× avg</div>
            </div>

            <div className="hidden lg:block absolute top-8 right-6 glass-card px-3 py-2">
              <div className="text-[10px] font-mono uppercase tracking-widest text-gold mb-0.5">Pattern Detected</div>
              <div className="text-xs font-mono text-gold">Cup & Handle · 91% confidence</div>
            </div>
          </div>
        </div>
      </div>

      {/* Ambient glow - persistent */}
      <div className="absolute -inset-40 -z-10 rounded-full pointer-events-none" style={{ background: 'radial-gradient(ellipse, rgba(59,123,246,0.12) 0%, transparent 70%)' }} />
    </div>
  );
}

function ScrollIndicator() {
  return (
    <motion.div
      className="flex flex-col items-center gap-2 mt-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 2.5, duration: 0.8 }}
    >
      <span className="text-[10px] font-mono uppercase tracking-widest text-text-tertiary">Scroll to explore</span>
      <motion.div
        className="w-5 h-8 rounded-full border border-border-default flex items-start justify-center p-1"
        animate={{ borderColor: ['rgba(37,40,54,1)', 'rgba(59,123,246,0.5)', 'rgba(37,40,54,1)'] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
      >
        <motion.div
          className="w-1 h-1.5 rounded-full bg-accent-primary"
          animate={{ y: [0, 12, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
        />
      </motion.div>
    </motion.div>
  );
}

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });

  // Heading: visible initially, fades out as you scroll
  const headingY = useTransform(scrollYProgress, [0, 0.3], [0, -80]);
  const headingOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0]);
  const headingScale = useTransform(scrollYProgress, [0, 0.2], [1, 0.95]);

  // Dashboard: visible initially (opacity 1), rises slightly into final position
  const dashY = useTransform(scrollYProgress, [0, 0.3], [40, 0]);
  const dashOpacity = useTransform(scrollYProgress, [0, 0.08], [0, 1]);
  const dashScale = useTransform(scrollYProgress, [0, 0.2], [0.96, 1]);

  // Background parallax
  const orbScale = useTransform(scrollYProgress, [0, 0.5], [1, 1.4]);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-visible noise-overlay"
      style={{ background: '#050508', minHeight: '160vh' }}
    >
      {/* Background layers */}
      <div className="absolute inset-0 grid-pattern opacity-60" />
      <DataStreamParticles />
      <FloatingOrb delay={0} x="10%" y="20%" size={300} />
      <FloatingOrb delay={2} x="70%" y="60%" size={200} />
      <FloatingOrb delay={4} x="40%" y="80%" size={250} />

      {/* Radial gradient bloom */}
      <motion.div
        className="absolute bottom-0 left-1/4 w-[800px] h-[600px]"
        style={{
          background: 'radial-gradient(ellipse, rgba(59,123,246,0.08) 0%, transparent 70%)',
          scale: orbScale,
        }}
      />

      {/* ── STICKY CONTAINER ── */}
      <div className="relative h-full flex flex-col items-center overflow-visible pt-20 pb-8">

        {/* ── HEADING LAYER ── */}
        <motion.div
          className="flex flex-col items-center px-6 z-20 text-center shrink-0"
          style={{
            y: headingY,
            opacity: headingOpacity,
            scale: headingScale,
          }}
        >
          {/* Label */}
          <motion.div
            className="text-[11px] font-mono font-medium tracking-[0.12em] uppercase text-accent-primary mb-4"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.7, ease }}
          >
            AI-Powered · NSE/BSE · Real-Time Analytics
          </motion.div>

          {/* Main heading - two lines */}
          <motion.h1
            className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-[72px] leading-[1.1] text-text-primary mb-5"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            {/* Line 1: Institutional Intelligence. */}
            <div className="overflow-hidden">
              <motion.div
                className="flex items-center justify-center flex-wrap"
                initial={{ y: '100%' }}
                animate={{ y: 0 }}
                transition={{ delay: 0.3, duration: 0.8, ease }}
              >
                {'Institutional'.split('').map((char, i) => (
                  <motion.span
                    key={i}
                    className="inline-block"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 + i * 0.025, duration: 0.5, ease }}
                  >
                    {char === ' ' ? '\u00A0' : char}
                  </motion.span>
                ))}
                <span className="inline-block w-[0.3em]" />
                {'Intelligence.'.split('').map((char, i) => (
                  <motion.span
                    key={`i${i}`}
                    className="inline-block"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.65 + i * 0.025, duration: 0.5, ease }}
                  >
                    {char}
                  </motion.span>
                ))}
              </motion.div>
            </div>

            {/* Line 2: For Every Investor. */}
            <div className="overflow-hidden">
              <motion.div
                className="flex items-center justify-center flex-wrap"
                initial={{ y: '100%' }}
                animate={{ y: 0 }}
                transition={{ delay: 0.8, duration: 0.8, ease }}
              >
                <span className="text-accent-primary">
                  {'For Every'.split('').map((char, i) => (
                    <motion.span
                      key={`f${i}`}
                      className="inline-block"
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.9 + i * 0.025, duration: 0.5, ease }}
                    >
                      {char === ' ' ? '\u00A0' : char}
                    </motion.span>
                  ))}
                </span>
                <span className="inline-block w-[0.3em]" />
                {'Investor.'.split('').map((char, i) => (
                  <motion.span
                    key={`v${i}`}
                    className="inline-block"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.1 + i * 0.025, duration: 0.5, ease }}
                  >
                    {char}
                  </motion.span>
                ))}
              </motion.div>
            </div>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            className="text-sm sm:text-base lg:text-lg text-text-secondary leading-relaxed max-w-[560px] mb-6"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.4, duration: 0.7, ease }}
          >
            Quant Plus gives Indian retail investors the same AI tools
            used by hedge funds — sentiment analysis, pattern recognition,
            anomaly detection, and price prediction. Free, forever.
          </motion.p>

          {/* CTAs */}
          <motion.div
            className="flex flex-col sm:flex-row gap-3 items-center mb-6"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.6, duration: 0.7, ease }}
          >
            <motion.a
              href="#broker"
              className="btn-primary inline-flex items-center justify-center gap-2 px-6 py-3 text-sm font-medium text-white bg-accent-primary rounded"
              whileHover={{ scale: 1.03, y: -1 }}
              whileTap={{ scale: 0.98 }}
            >
              Connect Your Broker →
            </motion.a>
            <motion.a
              href="#features"
              className="btn-ghost inline-flex items-center justify-center gap-2 px-6 py-3 text-sm font-medium text-text-secondary border border-border-subtle rounded hover:border-border-default hover:text-text-primary transition-colors duration-300"
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.98 }}
            >
              Explore Features
            </motion.a>
          </motion.div>

          {/* Trust bar */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.9, duration: 0.8 }}
          >
            <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 mb-2">
              {['AngelOne', 'NSE', 'BSE', 'HuggingFace', 'FastAPI', 'MongoDB'].map((name, i) => (
                <motion.span
                  key={name}
                  className="text-xs font-mono text-text-tertiary tracking-wide"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 2.0 + i * 0.08, duration: 0.5 }}
                >
                  {name}
                </motion.span>
              ))}
            </div>
            <div className="text-[10px] font-mono text-text-tertiary uppercase tracking-widest text-center">
              Built on trusted infrastructure
            </div>
          </motion.div>

          <ScrollIndicator />
        </motion.div>

        {/* ── DASHBOARD LAYER ── */}
        <motion.div
          className="flex-1 flex items-center justify-center px-2 sm:px-4 z-10 w-full min-h-0 overflow-visible"
          style={{
            y: dashY,
            opacity: dashOpacity,
            scale: dashScale,
          }}
        >
          <div className="w-full h-full max-w-full lg:max-w-[1400px]">
            <DashboardMockup />
          </div>
        </motion.div>

        {/* ── BOTTOM FADE ── */}
        <div className="absolute inset-x-0 bottom-0 h-24 z-20 pointer-events-none" style={{
          background: 'linear-gradient(to top, #050508, transparent)',
        }} />
      </div>
    </section>
  );
}
