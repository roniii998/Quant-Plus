import { motion } from 'framer-motion';

const tickerItems = [
  { name: 'RELIANCE', price: '2,847', change: '+1.54%', positive: true },
  { name: 'TCS', price: '3,920', change: '+0.87%', positive: true },
  { name: 'HDFC', price: '1,672', change: '-0.43%', positive: false },
  { name: 'NIFTY 50', price: '22,350', change: '+0.62%', positive: true },
  { name: 'INFY', price: '1,489', change: '+1.12%', positive: true },
  { name: 'WIPRO', price: '456', change: '-0.28%', positive: false },
  { name: 'SENSEX', price: '73,840', change: '+0.71%', positive: true },
  { name: 'BAJFINANCE', price: '7,245', change: '+0.93%', positive: true },
  { name: 'SBIN', price: '812', change: '-0.15%', positive: false },
  { name: 'ITC', price: '467', change: '+0.34%', positive: true },
];

function TickerRow({ items }: { items: typeof tickerItems }) {
  return (
    <>
      {items.map((item, i) => (
        <span key={i} className="inline-flex items-center gap-2 whitespace-nowrap font-mono text-sm group cursor-default">
          <span className="text-text-primary font-medium transition-colors duration-300 group-hover:text-accent-primary">
            {item.name}
          </span>
          <span className="text-text-secondary">₹{item.price}</span>
          <span className={`transition-all duration-300 ${item.positive ? 'text-positive group-hover:text-positive' : 'text-negative group-hover:text-negative'}`}>
            {item.positive ? '▲' : '▼'} {item.change}
          </span>
          <span className="text-border-default mx-3">·</span>
        </span>
      ))}
    </>
  );
}

export default function LiveTicker() {
  const doubled = [...tickerItems, ...tickerItems];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.5, duration: 0.8 }}
      className="w-full border-t border-b border-border-subtle bg-bg-secondary overflow-hidden mt-16"
    >
      <div className="flex items-center">
        <div className="flex-shrink-0 px-4 flex items-center gap-2 border-r border-border-subtle bg-bg-tertiary">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-negative opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-negative" />
          </span>
          <span className="text-[10px] font-mono font-medium uppercase tracking-widest text-text-tertiary">Live</span>
        </div>
        <div className="overflow-hidden flex-1 py-3 ticker-fade">
          <div className="ticker-track flex items-center whitespace-nowrap">
            <TickerRow items={doubled} />
            <TickerRow items={doubled} />
          </div>
        </div>
      </div>
    </motion.div>
  );
}
