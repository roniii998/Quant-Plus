import { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';

const chapters = [
  {
    label: '01 / SENTIMENT ANALYSIS',
    title: 'The market has a mood.\nWe measure it.',
    body: 'Our FinBERT model — trained specifically on financial news — reads hundreds of articles per stock in real time. You see the signal, not the noise. Bullish, Bearish, or Neutral — in milliseconds.',
    stats: '94.2% accuracy  ·  Real-time  ·  NSE/BSE coverage',
  },
  {
    label: '02 / ANOMALY DETECTION',
    title: 'Catch manipulation\nbefore it catches you.',
    body: 'Our Isolation Forest model monitors volume, price velocity, and order flow patterns across 1,800+ NSE stocks. When something unusual happens — you\'re the first to know.',
    stats: '<200ms detection  ·  1,800+ stocks  ·  Real-time alerts',
  },
  {
    label: '03 / PATTERN RECOGNITION',
    title: '20+ patterns.\nZero guesswork.',
    body: 'Our CNN model identifies classical technical patterns — Head & Shoulders, Double Top, Bull Flag, Cup & Handle — with confidence scores. Know what the chart is telling you.',
    stats: '20+ patterns  ·  CNN architecture  ·  Confidence scoring',
  },
  {
    label: '04 / PRICE PREDICTION',
    title: 'Not a guess.\nA probability.',
    body: 'Random Forest trained on 40+ technical indicators gives you a 5-day price forecast with a confidence interval. See the range of outcomes, not just a single number.',
    stats: '5-day horizon  ·  40+ features  ·  Confidence intervals',
  },
  {
    label: '05 / AI SCREENER',
    title: '1,800 stocks.\nFive worth your time.',
    body: 'Define your criteria — momentum, value, breakout setup. Our screener ranks every NSE stock using multi-factor AI scoring and surfaces the ones that match your strategy.',
    stats: '1,800+ stocks  ·  Multi-factor ranking  ·  Daily refresh',
  },
];

const ease = [0.16, 1, 0.3, 1] as const;

const chapterVariants = {
  enter: { opacity: 0, x: 40, filter: 'blur(4px)' },
  center: { opacity: 1, x: 0, filter: 'blur(0px)', transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] as const } },
  exit: { opacity: 0, x: -40, filter: 'blur(4px)', transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1] as const } },
};

const dashboardVariants = {
  enter: { opacity: 0, scale: 0.97, y: 10 },
  center: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] as const } },
  exit: { opacity: 0, scale: 0.97, y: -10, transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1] as const } },
};

function ChapterDashboard({ chapter }: { chapter: number }) {
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

  const minPrice = 2760;
  const maxPrice = 2960;
  const chartW = 440;
  const chartH = 180;
  const chartLeft = 45;
  const chartTop = 10;
  const candleW = 24;
  const gap = 10;

  const priceToY = (p: number) =>
    chartTop + chartH - ((p - minPrice) / (maxPrice - minPrice)) * chartH;

  const maPoints = candleData.map((_, i) => {
    const avg = candleData.slice(0, i + 1).reduce((s, d) => s + d.close, 0) / (i + 1);
    return { x: chartLeft + i * (candleW + gap) + candleW / 2, y: priceToY(avg) };
  });

  const newsItems = [
    { text: 'RIL beats Q3 estimates, EBITDA up 18%', sentiment: 'Bullish' },
    { text: 'FII inflows surge for third consecutive week', sentiment: 'Bullish' },
    { text: 'Crude oil concerns cap upside for OMCs', sentiment: 'Neutral' },
  ];

  const screenerStocks = [
    { name: 'RELIANCE', score: 94, signal: 'Breakout setup' },
    { name: 'TCS', score: 89, signal: 'Momentum' },
    { name: 'HDFCBANK', score: 86, signal: 'Value play' },
    { name: 'INFY', score: 82, signal: 'Reversal' },
    { name: 'BAJFINANCE', score: 79, signal: 'Breakout setup' },
  ];

  return (
    <div className="relative rounded-lg border border-border-default bg-bg-secondary overflow-hidden">
      <div className="p-4">
        <div className="flex items-center gap-3 mb-3 font-mono text-sm">
          <span className="text-text-primary font-medium">RELIANCE.NS</span>
          <span className="text-text-primary">₹2,847.30</span>
          <span className="text-positive">▲ +43.20 (+1.54%)</span>
          <span className="text-text-tertiary">|</span>
          <span className="text-text-tertiary">NSE</span>
        </div>

        <div className="relative" style={{ minHeight: 240 }}>
          {chapter === 0 && (
            <div className="flex gap-4">
              <div className="flex-1 opacity-40">
                <ChartSVG candleData={candleData} chartW={chartW} chartH={chartH} chartLeft={chartLeft} chartTop={chartTop} candleW={candleW} gap={gap} priceToY={priceToY} maPoints={maPoints} dimmed />
              </div>
              <div className="w-48 space-y-2">
                {newsItems.map((item, i) => (
                  <motion.div key={i} className="glass-card p-2.5" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.1, duration: 0.4, ease }}>
                    <div className="text-[10px] text-text-secondary leading-snug">{item.text}</div>
                    <div className={`text-[10px] font-mono mt-1 ${item.sentiment === 'Bullish' ? 'text-positive' : 'text-text-tertiary'}`}>
                      {item.sentiment === 'Bullish' ? '↑' : '→'} {item.sentiment}
                    </div>
                  </motion.div>
                ))}
                <motion.div className="glass-card p-2.5 text-center" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.4, duration: 0.4, ease }}>
                  <div className="text-2xl font-mono font-semibold text-accent-primary animate-count-glow">87</div>
                  <div className="text-[10px] font-mono text-positive uppercase tracking-widest">Bullish</div>
                </motion.div>
              </div>
            </div>
          )}

          {chapter === 1 && (
            <div className="relative">
              <ChartSVG candleData={candleData} chartW={chartW} chartH={chartH} chartLeft={chartLeft} chartTop={chartTop} candleW={candleW} gap={gap} priceToY={priceToY} maPoints={maPoints} />
              <motion.div
                className="absolute w-10 h-10 rounded-full border-2 border-negative"
                style={{
                  left: `${chartLeft + 8 * (candleW + gap) + candleW / 2 - 20}px`,
                  top: `${priceToY(candleData[8].close) - 20}px`,
                }}
                animate={{ scale: [1, 2.5], opacity: [0.6, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: 'easeOut' }}
              />
              <motion.div
                className="absolute bottom-2 right-2 glass-card p-3 border-negative/30"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.4, ease }}
              >
                <div className="flex items-center gap-2 mb-1">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-negative opacity-75" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-negative" />
                  </span>
                  <span className="text-[10px] font-mono uppercase tracking-widest text-negative">Abnormal Volume</span>
                </div>
                <div className="text-xs font-mono text-text-secondary">3.2× 30-day avg · Possible institutional activity</div>
              </motion.div>
            </div>
          )}

          {chapter === 2 && (
            <div className="relative">
              <ChartSVG candleData={candleData} chartW={chartW} chartH={chartH} chartLeft={chartLeft} chartTop={chartTop} candleW={candleW} gap={gap} priceToY={priceToY} maPoints={maPoints} />
              <svg className="absolute inset-0" viewBox={`0 0 ${chartW + 70} ${chartH + 50}`} style={{ width: '100%', maxHeight: 240 }}>
                <motion.path
                  d={`M ${chartLeft + 2 * (candleW + gap) + candleW / 2},${priceToY(2830)} Q ${chartLeft + 5 * (candleW + gap) + candleW / 2},${priceToY(2810)} ${chartLeft + 8 * (candleW + gap) + candleW / 2},${priceToY(2855)} Q ${chartLeft + 9.5 * (candleW + gap) + candleW / 2},${priceToY(2870)} ${chartLeft + 11 * (candleW + gap) + candleW / 2},${priceToY(2910)}`}
                  fill="none"
                  stroke="#C9A84C"
                  strokeWidth="2"
                  strokeDasharray="6 3"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 0.8 }}
                  transition={{ duration: 1, ease: 'easeOut' }}
                />
              </svg>
              <motion.div
                className="absolute top-2 right-2 glass-card px-3 py-2 border-gold/30"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5, duration: 0.4, ease }}
              >
                <div className="text-[10px] font-mono uppercase tracking-widest text-gold">CUP & HANDLE</div>
                <div className="text-xs font-mono text-gold">91.3% CONF · Target: ₹2,940</div>
              </motion.div>
            </div>
          )}

          {chapter === 3 && (
            <div className="relative">
              <ChartSVG candleData={candleData} chartW={chartW} chartH={chartH} chartLeft={chartLeft} chartTop={chartTop} candleW={candleW} gap={gap} priceToY={priceToY} maPoints={maPoints} />
              <svg className="absolute inset-0" viewBox={`0 0 ${chartW + 120} ${chartH + 50}`} style={{ width: '100%', maxHeight: 240 }}>
                <motion.line
                  x1={chartLeft + 11 * (candleW + gap) + candleW / 2}
                  y1={priceToY(2945)}
                  x2={chartW + chartLeft + 60}
                  y2={priceToY(2968)}
                  stroke="#3B7BF6"
                  strokeWidth="2"
                  strokeDasharray="6 4"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 0.8, ease: 'easeOut' }}
                />
                <motion.path
                  d={`M ${chartLeft + 11 * (candleW + gap) + candleW / 2},${priceToY(2945)} L ${chartW + chartLeft + 60},${priceToY(2968)} L ${chartW + chartLeft + 60},${priceToY(2920)} L ${chartLeft + 11 * (candleW + gap) + candleW / 2},${priceToY(2945)} Z`}
                  fill="rgba(59,123,246,0.1)"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3, duration: 0.5 }}
                />
                <text x={chartW + chartLeft + 65} y={priceToY(2891) + 4} fill="#3B7BF6" fontSize="9" fontFamily="IBM Plex Mono, monospace">Day 1: ₹2,891</text>
                <text x={chartW + chartLeft + 65} y={priceToY(2934) + 4} fill="#3B7BF6" fontSize="9" fontFamily="IBM Plex Mono, monospace">Day 3: ₹2,934</text>
                <text x={chartW + chartLeft + 65} y={priceToY(2968) + 4} fill="#22D3A4" fontSize="9" fontFamily="IBM Plex Mono, monospace">Day 5: ₹2,968 ↑</text>
              </svg>
              <motion.div
                className="absolute bottom-2 right-2 glass-card p-2.5"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.4, ease }}
              >
                <div className="text-[10px] font-mono uppercase tracking-widest text-text-tertiary mb-1.5">Feature Importance</div>
                {[
                  { name: 'RSI', pct: 34 },
                  { name: 'MACD', pct: 28 },
                  { name: 'Volume', pct: 21 },
                  { name: 'Other', pct: 17 },
                ].map((f, i) => (
                  <div key={f.name} className="flex items-center gap-2 mb-1">
                    <span className="text-[9px] font-mono text-text-tertiary w-12">{f.name}</span>
                    <div className="flex-1 h-1.5 bg-bg-tertiary rounded-sm overflow-hidden">
                      <motion.div
                        className="h-full bg-accent-primary rounded-sm"
                        initial={{ width: 0 }}
                        animate={{ width: `${f.pct}%` }}
                        transition={{ delay: 0.5 + i * 0.1, duration: 0.5, ease }}
                      />
                    </div>
                    <span className="text-[9px] font-mono text-text-tertiary">{f.pct}%</span>
                  </div>
                ))}
              </motion.div>
            </div>
          )}

          {chapter === 4 && (
            <div className="space-y-3">
              <div className="flex gap-4 mb-3">
                {['RSI', 'Volume', 'Momentum'].map((filter, i) => (
                  <div key={filter} className="flex-1">
                    <div className="text-[10px] font-mono uppercase tracking-widest text-text-tertiary mb-1">{filter}</div>
                    <div className="h-1.5 bg-bg-tertiary rounded-sm overflow-hidden">
                      <motion.div
                        className="h-full bg-accent-primary rounded-sm"
                        initial={{ width: 0 }}
                        animate={{ width: `${40 + Math.random() * 40}%` }}
                        transition={{ delay: i * 0.1, duration: 0.6, ease }}
                      />
                    </div>
                  </div>
                ))}
              </div>
              <div className="space-y-1.5">
                {screenerStocks.map((stock, i) => (
                  <motion.div
                    key={stock.name}
                    className="flex items-center gap-3 p-2 rounded border border-border-subtle bg-bg-tertiary/50"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.08, duration: 0.4, ease }}
                  >
                    <span className="font-mono text-sm text-text-primary font-medium w-24">{stock.name}</span>
                    <div className="flex-1 flex items-center gap-2">
                      <div className="h-1.5 bg-bg-primary rounded-sm overflow-hidden flex-1">
                        <motion.div
                          className="h-full bg-accent-primary rounded-sm"
                          initial={{ width: 0 }}
                          animate={{ width: `${stock.score}%` }}
                          transition={{ delay: 0.3 + i * 0.08, duration: 0.6, ease }}
                        />
                      </div>
                      <span className="font-mono text-xs text-accent-primary w-8">{stock.score}</span>
                    </div>
                    <span className="text-xs font-mono text-positive">▲ {stock.signal}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function ChartSVG({
  candleData, chartW, chartH, chartLeft, chartTop, candleW, gap, priceToY, maPoints, dimmed,
}: {
  candleData: { open: number; close: number; high: number; low: number }[];
  chartW: number; chartH: number; chartLeft: number; chartTop: number;
  candleW: number; gap: number; priceToY: (p: number) => number;
  maPoints: { x: number; y: number }[]; dimmed?: boolean;
}) {
  const priceLabels = ['2780', '2820', '2860', '2900', '2940'];
  const timeLabels = ['09:15', '09:45', '10:15', '10:45', '11:15', '11:45'];

  return (
    <svg viewBox={`0 0 ${chartW + 70} ${chartH + 50}`} className="w-full" style={{ maxHeight: 240, opacity: dimmed ? 0.4 : 1 }}>
      {priceLabels.map((label, i) => {
        const y = priceToY(Number(label));
        return (
          <g key={i}>
            <line x1={chartLeft} y1={y} x2={chartW + chartLeft} y2={y} stroke="#1C1F2E" strokeWidth="0.5" />
            <text x={chartLeft - 8} y={y + 4} textAnchor="end" fill="#4A4F66" fontSize="9" fontFamily="IBM Plex Mono, monospace">{label}</text>
          </g>
        );
      })}
      {timeLabels.map((label, i) => (
        <text key={i} x={chartLeft + i * 2 * (candleW + gap) + candleW} y={chartH + chartTop + 20} textAnchor="middle" fill="#4A4F66" fontSize="9" fontFamily="IBM Plex Mono, monospace">{label}</text>
      ))}
      {candleData.map((c, i) => {
        const x = chartLeft + i * (candleW + gap);
        const isBull = c.close >= c.open;
        const bodyTop = priceToY(Math.max(c.open, c.close));
        const bodyBot = priceToY(Math.min(c.open, c.close));
        const bodyH = Math.max(bodyBot - bodyTop, 2);
        const wickTop = priceToY(c.high);
        const wickBot = priceToY(c.low);
        return (
          <g key={i}>
            <line x1={x + candleW / 2} y1={wickTop} x2={x + candleW / 2} y2={wickBot} stroke={isBull ? '#22D3A4' : '#F43F5E'} strokeWidth="1" />
            <rect x={x + 3} y={bodyTop} width={candleW - 6} height={bodyH} fill={isBull ? '#22D3A4' : '#F43F5E'} rx="1" />
          </g>
        );
      })}
      <polyline points={maPoints.map((p) => `${p.x},${p.y}`).join(' ')} fill="none" stroke="#3B7BF6" strokeWidth="1.5" />
    </svg>
  );
}

export default function FeatureSequence() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  const [activeChapter, setActiveChapter] = useState(0);

  useEffect(() => {
    const unsubscribe = scrollYProgress.on('change', (v) => {
      const idx = Math.min(Math.floor(v * 5), 4);
      setActiveChapter(idx);
    });
    return () => unsubscribe();
  }, [scrollYProgress]);

  return (
    <section id="features" ref={containerRef} className="relative" style={{ height: '500vh' }}>
      <div className="sticky top-0 h-screen flex items-center overflow-hidden" style={{ background: '#050508', zIndex: 1 }}>
        <div className="max-w-container mx-auto px-6 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-center">
            {/* Dashboard */}
            <div className="lg:col-span-3">
              <motion.div style={{
                scale: useTransform(scrollYProgress, [0, 0.1], [0.95, 1]),
                opacity: useTransform(scrollYProgress, [0, 0.05], [0.5, 1]),
              }}>
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeChapter}
                    variants={dashboardVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                  >
                    <ChapterDashboard chapter={activeChapter} />
                  </motion.div>
                </AnimatePresence>
              </motion.div>
            </div>

            {/* Text */}
            <div className="lg:col-span-2 relative" style={{ minHeight: 300 }}>
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeChapter}
                  variants={chapterVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  className="absolute inset-0 flex flex-col justify-center"
                >
                  <div className="text-[11px] font-mono font-medium tracking-[0.08em] uppercase text-accent-primary mb-4">
                    {chapters[activeChapter].label}
                  </div>
                  <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl leading-[1.1] text-text-primary mb-4 whitespace-pre-line">
                    {chapters[activeChapter].title}
                  </h2>
                  <p className="text-sm lg:text-base text-text-secondary leading-relaxed max-w-[380px] mb-4">
                    {chapters[activeChapter].body}
                  </p>
                  <div className="text-xs font-mono text-text-tertiary">
                    {chapters[activeChapter].stats}
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* Progress indicator */}
          <div className="fixed right-8 top-1/2 -translate-y-1/2 hidden lg:flex flex-col items-center gap-3 z-10">
            {chapters.map((_, i) => (
              <div key={i} className="relative flex items-center justify-center">
                <motion.div
                  className="w-2.5 h-2.5 rounded-full"
                  animate={{
                    background: activeChapter >= i ? '#3B7BF6' : 'transparent',
                    border: `1.5px solid ${activeChapter >= i ? '#3B7BF6' : '#252836'}`,
                    scale: activeChapter === i ? 1.3 : 1,
                  }}
                  transition={{ duration: 0.3, ease }}
                />
                {activeChapter === i && (
                  <motion.div
                    className="absolute w-5 h-5 rounded-full border border-accent-primary/30"
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
