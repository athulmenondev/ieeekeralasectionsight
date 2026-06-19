import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { getSiteConfig } from '../../data';
import { Button } from '../ui/Button';
import { ThemeToggle } from '../ui/ThemeToggle';

const drawerVariants = {
  closed: {
    x: '100%',
    transition: { type: 'spring', damping: 30, stiffness: 300 },
  },
  open: {
    x: 0,
    transition: { type: 'spring', damping: 30, stiffness: 300 },
  },
};

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const siteConfig = getSiteConfig();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-4 md:px-6 lg:px-10 pt-4 md:pt-5">
      <motion.nav
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className={`mx-auto max-w-7xl rounded-full border transition-all duration-500 ${
          isScrolled
            ? 'bg-paper/85 backdrop-blur-2xl border-hairline/60 shadow-md shadow-black/[0.04] dark:shadow-black/[0.25]'
            : 'bg-paper/55 backdrop-blur-xl border-white/30 dark:border-white/5'
        }`}
      >
        <div className="flex items-center justify-between h-14 md:h-16 px-4 sm:px-5 md:px-6 lg:px-8">
          {/* Brand Logo Group */}
          <Link to="/" className="flex items-center gap-2.5 shrink-0 select-none">
            <div className="w-7 h-7 md:w-8 md:h-8 bg-primary rounded-lg flex items-center justify-center shadow-sm shadow-primary/20">
              <span className="text-white font-bold text-[10px] md:text-xs">S</span>
            </div>
            <span className="font-bold text-sm md:text-base text-text tracking-tight">
              IEEE <span className="hidden xs:inline">SIGHT</span> Kerala
            </span>
          </Link>

          {/* Center Links (Desktop only) */}
          <div className="hidden md:flex items-center gap-1">
            {siteConfig.nav.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`px-4 py-2 text-xs font-bold uppercase tracking-wider rounded-full transition-all duration-200 ${
                  location.pathname === item.path
                    ? 'text-primary bg-primary/10 border border-primary/20'
                    : 'text-charcoal hover:text-text hover:bg-cloud/60'
                }`}
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* Actions Menu Group (Edge Padding Adjusted) */}
          <div className="flex items-center gap-1 sm:gap-2 md:gap-3">
            <ThemeToggle />
            
            {/* Desktop Action (Completely ignored on Mobile Layout calculation) */}
            <div className="hidden md:block">
              <Link to="/about">
                <Button size="sm" variant="primary" className="rounded-full font-bold uppercase tracking-wider text-[11px]">
                  Contact Us
                </Button>
              </Link>
            </div>

            {/* Mobile Hamburger Anchor Switch */}
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="md:hidden p-2 rounded-xl hover:bg-cloud/60 active:scale-95 transition-all"
              aria-label="Open menu"
            >
              <svg className="w-5 h-5 text-text" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Drawer Overlay Menu Navigation */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-ink/40 backdrop-blur-md z-40 md:hidden"
              onClick={() => setIsMobileMenuOpen(false)}
            />
            <motion.div
              variants={drawerVariants}
              initial="closed"
              animate="open"
              exit="closed"
              className="fixed top-0 right-0 bottom-0 w-80 max-w-[85vw] z-50 bg-paper/90 dark:bg-card-dark/90 backdrop-blur-2xl border-l border-hairline/20 shadow-2xl md:hidden flex flex-col"
            >
              <div className="flex items-center justify-between p-5 border-b border-hairline/20">
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 bg-primary rounded-lg flex items-center justify-center">
                    <span className="text-white font-bold text-[10px]">S</span>
                  </div>
                  <span className="font-bold text-sm text-text tracking-tight">SIGHT Kerala</span>
                </div>
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-2 rounded-xl hover:bg-cloud/60 transition-all active:scale-95"
                  aria-label="Close menu"
                >
                  <svg className="w-5 h-5 text-text" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              <div className="flex-1 p-5 space-y-1.5">
                {siteConfig.nav.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`block px-4 py-3 text-sm font-bold uppercase tracking-wider rounded-xl transition-all ${
                      location.pathname === item.path
                        ? 'text-primary bg-primary/10 border border-primary/20'
                        : 'text-charcoal hover:text-text hover:bg-cloud/60'
                    }`}
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
              
              <div className="p-5 border-t border-hairline/20">
                <Link to="/about" onClick={() => setIsMobileMenuOpen(false)}>
                  <Button fullWidth className="!rounded-xl text-xs uppercase font-extrabold tracking-widest py-3.5">
                    Contact Us
                  </Button>
                </Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}