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

const drawerListVariants = {
  closed: { transition: { staggerChildren: 0.04, staggerDirection: -1 } },
  open: { transition: { staggerChildren: 0.07, delayChildren: 0.12 } },
};

const drawerLinkVariants = {
  closed: { opacity: 0, x: 18, filter: 'blur(6px)' },
  open: {
    opacity: 1,
    x: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.35, ease: [0.16, 1, 0.3, 1] },
  },
};

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [hoveredNavPath, setHoveredNavPath] = useState<string | null>(null);
  const location = useLocation();
  const siteConfig = getSiteConfig();
  const pillPath = hoveredNavPath ?? location.pathname;

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
        className={`mx-auto max-w-7xl rounded-full border border-hairline/70 bg-paper/90 text-text backdrop-blur-2xl transition-all duration-500 dark:border-hairline/80 ${
          isScrolled
            ? 'shadow-lg shadow-ink/[0.08] dark:shadow-black/30'
            : 'shadow-sm shadow-ink/[0.04] dark:shadow-black/20'
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
          <div className="hidden md:flex items-center gap-1" onMouseLeave={() => setHoveredNavPath(null)}>
            {siteConfig.nav.map((item) => {
              const isActive = location.pathname === item.path;
              const isHighlighted = pillPath === item.path;

              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onMouseEnter={() => setHoveredNavPath(item.path)}
                  className={`relative isolate overflow-hidden px-4 py-2 text-xs font-bold uppercase tracking-wider rounded-full transition-colors duration-200 ${
                    isActive || isHighlighted ? 'text-primary' : 'text-muted hover:text-text'
                  }`}
                >
                  {isHighlighted && (
                    <motion.span
                      layoutId="navbar-active-pill"
                      className="absolute inset-0 -z-10 rounded-full border border-primary/25 bg-primary/10 shadow-sm shadow-primary/10"
                      transition={{ type: 'spring', stiffness: 420, damping: 34 }}
                    />
                  )}
                  <span className="relative z-10">{item.label}</span>
                </Link>
              );
            })}
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
              onClick={() => setIsMobileMenuOpen((open) => !open)}
              className="md:hidden rounded-xl p-2 text-text transition-all hover:bg-cloud/70 active:scale-95 dark:hover:bg-white/5"
              aria-label="Open menu"
              aria-expanded={isMobileMenuOpen}
            >
              <span className="relative block h-5 w-5">
                <motion.span
                  className="absolute left-0 top-[4px] h-0.5 w-5 rounded-full bg-current"
                  animate={isMobileMenuOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
                  transition={{ type: 'spring', stiffness: 420, damping: 28 }}
                />
                <motion.span
                  className="absolute left-0 top-[10px] h-0.5 w-5 rounded-full bg-current"
                  animate={isMobileMenuOpen ? { opacity: 0, x: 8 } : { opacity: 1, x: 0 }}
                  transition={{ duration: 0.2 }}
                />
                <motion.span
                  className="absolute left-0 top-[16px] h-0.5 w-5 rounded-full bg-current"
                  animate={isMobileMenuOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
                  transition={{ type: 'spring', stiffness: 420, damping: 28 }}
                />
              </span>
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
              className="fixed inset-0 z-40 bg-ink/45 backdrop-blur-md md:hidden"
              onClick={() => setIsMobileMenuOpen(false)}
            />
            <motion.div
              variants={drawerVariants}
              initial="closed"
              animate="open"
              exit="closed"
              className="fixed top-0 right-0 bottom-0 z-50 flex w-80 max-w-[85vw] flex-col border-l border-hairline/70 bg-paper/95 text-text shadow-2xl backdrop-blur-2xl md:hidden dark:border-hairline/80"
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
                  className="rounded-xl p-2 text-text transition-all hover:bg-cloud/70 active:scale-95 dark:hover:bg-white/5"
                  aria-label="Close menu"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              <motion.div variants={drawerListVariants} initial="closed" animate="open" exit="closed" className="flex-1 p-5 space-y-1.5">
                {siteConfig.nav.map((item) => (
                  <motion.div key={item.path} variants={drawerLinkVariants}>
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`block px-4 py-3 text-sm font-bold uppercase tracking-wider rounded-xl transition-all ${
                      location.pathname === item.path
                        ? 'border border-primary/25 bg-primary/10 text-primary shadow-sm shadow-primary/10'
                        : 'text-muted hover:bg-cloud/70 hover:text-text dark:hover:bg-white/5'
                    }`}
                  >
                    {item.label}
                  </Link>
                  </motion.div>
                ))}
              </motion.div>
              
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
