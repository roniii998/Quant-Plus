import { motion } from 'framer-motion';

const row1 = [
  { text: 'Finally caught a pump-and-dump before it happened.', author: 'Retail investor, Mumbai' },
  { text: 'The sentiment feature changed how I read earnings season.', author: 'Options trader, Pune' },
  { text: 'Feels like having a quant analyst on my team.', author: 'Long-term investor, Delhi' },
];

const row2 = [
  { text: 'Pattern recognition saved me from a terrible trade.', author: 'Day trader, Bangalore' },
  { text: "I didn't believe AI could do this. Then I tried it.", author: 'Engineering student, Chennai' },
  { text: "This should cost money. I'm confused why it doesn't.", author: 'Freelancer, Hyderabad' },
];

function TestimonialCard({ text, author }: { text: string; author: string }) {
  return (
    <div className="flex-shrink-0 w-80 p-5 rounded border border-border-default bg-bg-secondary/80 backdrop-blur-sm group hover:border-accent-primary/20 transition-all duration-300">
      <p className="text-sm text-text-secondary leading-relaxed mb-3 group-hover:text-text-primary transition-colors duration-300">"{text}"</p>
      <p className="text-xs font-mono text-gold">— {author}</p>
    </div>
  );
}

export default function Testimonials() {
  return (
    <section className="py-section bg-bg-primary overflow-hidden relative">
      <div className="max-w-container mx-auto px-6 mb-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="text-[11px] font-mono font-medium tracking-[0.08em] uppercase text-accent-primary mb-4">
            Community
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-text-primary">
            What investors say
          </h2>
        </motion.div>
      </div>

      {/* Row 1 - left to right */}
      <div className="overflow-hidden mb-4 ticker-fade">
        <div className="ticker-track flex gap-4">
          {[...row1, ...row1, ...row1, ...row1].map((item, i) => (
            <TestimonialCard key={i} text={item.text} author={item.author} />
          ))}
        </div>
      </div>

      {/* Row 2 - right to left */}
      <div className="overflow-hidden ticker-fade">
        <div className="ticker-track-reverse flex gap-4">
          {[...row2, ...row2, ...row2, ...row2].map((item, i) => (
            <TestimonialCard key={i} text={item.text} author={item.author} />
          ))}
        </div>
      </div>
    </section>
  );
}
