import { motion } from 'framer-motion';

const productLinks = ['Features', 'How It Works', 'Models', 'API Docs'];
const companyLinks = ['About', 'Team', 'GitHub', 'Contact'];
const legalLinks = ['Disclaimer', 'Privacy Policy', 'Terms of Use'];

export default function Footer() {
  return (
    <footer className="border-t border-border-subtle bg-bg-primary relative">
      <div className="max-w-container mx-auto px-6 py-16">
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <span className="font-sans font-bold text-lg text-text-primary">QUANT</span>
              <span className="w-px h-4 bg-border-default" />
              <span className="font-sans font-bold text-lg text-accent-primary">PLUS</span>
            </div>
            <p className="text-sm text-text-secondary mb-6">
              Institutional AI for every investor.
            </p>
            <div className="flex gap-4">
              {['GitHub', 'LinkedIn', 'X'].map((social) => (
                <motion.a
                  key={social}
                  href="#"
                  className="text-xs text-text-tertiary hover:text-accent-primary transition-colors duration-300 font-mono"
                  whileHover={{ y: -1 }}
                >
                  {social}
                </motion.a>
              ))}
            </div>
          </div>

          {/* Product */}
          <div>
            <div className="text-[11px] font-mono font-medium tracking-[0.08em] uppercase text-text-tertiary mb-4">
              Product
            </div>
            <div className="space-y-2.5">
              {productLinks.map((link) => (
                <a key={link} href="#" className="block text-sm text-text-secondary hover:text-text-primary transition-colors duration-300">
                  {link}
                </a>
              ))}
            </div>
          </div>

          {/* Company */}
          <div>
            <div className="text-[11px] font-mono font-medium tracking-[0.08em] uppercase text-text-tertiary mb-4">
              Company
            </div>
            <div className="space-y-2.5">
              {companyLinks.map((link) => (
                <a key={link} href="#" className="block text-sm text-text-secondary hover:text-text-primary transition-colors duration-300">
                  {link}
                </a>
              ))}
            </div>
          </div>

          {/* Legal */}
          <div>
            <div className="text-[11px] font-mono font-medium tracking-[0.08em] uppercase text-text-tertiary mb-4">
              Legal
            </div>
            <div className="space-y-2.5">
              {legalLinks.map((link) => (
                <a key={link} href="#" className="block text-sm text-text-secondary hover:text-text-primary transition-colors duration-300">
                  {link}
                </a>
              ))}
            </div>
          </div>

          {/* Newsletter */}
          <div>
            <div className="text-[11px] font-mono font-medium tracking-[0.08em] uppercase text-text-tertiary mb-4">
              Newsletter
            </div>
            <p className="text-sm text-text-secondary mb-3">
              Get weekly AI market insights
            </p>
            <div className="flex">
              <input
                type="email"
                placeholder="your@email.com"
                className="flex-1 px-3 py-2 text-sm bg-bg-tertiary border border-border-subtle rounded-l text-text-primary placeholder:text-text-tertiary focus:outline-none focus:border-accent-primary transition-colors duration-300"
              />
              <motion.button
                className="btn-primary px-4 py-2 text-sm font-medium text-white bg-accent-primary rounded-r"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Subscribe
              </motion.button>
            </div>
          </div>
        </motion.div>

        {/* Bottom bar */}
        <motion.div
          className="mt-16 pt-6 border-t border-border-subtle"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          <p className="text-[10px] font-mono text-text-tertiary leading-relaxed">
            © 2025 Quant Plus · Built at VESIT Mumbai · Powered by AngelOne SmartAPI · Not SEBI registered · Not financial advice
          </p>
        </motion.div>
      </div>
    </footer>
  );
}
