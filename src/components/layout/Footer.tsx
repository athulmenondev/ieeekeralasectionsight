import { Link } from 'react-router-dom';
import { getSiteConfig } from '../../data';

export function Footer() {
  const siteConfig = getSiteConfig();

  return (
    <footer className="relative bg-ink/95 backdrop-blur-md text-on-ink border-t border-white/5 overflow-hidden z-10">
      {/* Decorative localized structural backing shadow effect */}
      <div className="absolute bottom-[-20%] left-[-10%] w-[350px] h-[350px] bg-primary-deep/20 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 lg:px-14 py-16 md:py-20 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          {/* Brand Info */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5 select-none">
              <div className="w-8 h-8 bg-primary rounded-xl flex items-center justify-center shadow-md shadow-primary/20 border border-primary-bright/20">
                <span className="text-white font-black text-xs">S</span>
              </div>
              <span className="font-bold text-on-ink tracking-tight text-base">IEEE SIGHT Kerala</span>
            </div>
            <p className="text-xs md:text-sm text-on-ink/60 max-w-sm leading-relaxed font-medium">
              {siteConfig.description}
            </p>
          </div>

          {/* Quick Links Nav Mapping */}
          <div>
            <h4 className="text-on-ink/40 font-bold text-[10px] md:text-xs mb-5 tracking-widest uppercase">
              Navigation
            </h4>
            <ul className="space-y-3 font-semibold text-xs md:text-sm uppercase tracking-wider">
              <li>
                <Link to="/projects" className="text-on-ink/60 hover:text-primary-bright transition-colors duration-200">Projects</Link>
              </li>
              <li>
                <Link to="/about" className="text-on-ink/60 hover:text-primary-bright transition-colors duration-200">About</Link>
              </li>
              <li>
                <Link to="/events" className="text-on-ink/60 hover:text-primary-bright transition-colors duration-200">Events</Link>
              </li>
              <li>
                <Link to="/field-notes" className="text-on-ink/60 hover:text-primary-bright transition-colors duration-200">Field Notes</Link>
              </li>
            </ul>
          </div>

          {/* Social Connect Handlers */}
          <div>
            <h4 className="text-on-ink/40 font-bold text-[10px] md:text-xs mb-5 tracking-widest uppercase">
              Connect Channels
            </h4>
            <div className="flex flex-wrap gap-2.5">
              {siteConfig.social.map((link) => (
                <a
                  key={link.platform}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-xl bg-white/5 hover:bg-primary border border-white/5 hover:border-primary-bright/30 flex items-center justify-center transition-all duration-300 hover:-translate-y-1 active:scale-95 text-on-ink/80 hover:text-white group"
                  aria-label={link.platform}
                >
                  <div className="transform group-hover:scale-105 transition-transform duration-200">
                    <SocialIcon platform={link.platform} />
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Dynamic Matrix Legals Footer Block */}
        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-[11px] md:text-xs font-semibold tracking-wide text-on-ink/40">
          <p className="text-center md:text-left">{siteConfig.footer.copyright}</p>
          <div className="flex gap-6">
            <a href={siteConfig.footer.privacyUrl} target="_blank" rel="noopener noreferrer" className="hover:text-on-ink transition-colors">
              IEEE Privacy Policy
            </a>
            <a href={siteConfig.footer.termsUrl} target="_blank" rel="noopener noreferrer" className="hover:text-on-ink transition-colors">
              IEEE Terms
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

function SocialIcon({ platform }: { platform: string }) {
  const icons: Record<string, React.ReactNode> = {
    LinkedIn: (
      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
        <path d="M20.5 2h-17A1.5 1.5 0 002 3.5v17A1.5 1.5 0 003.5 22h17a1.5 1.5 0 001.5-1.5v-17A1.5 1.5 0 0020.5 2zM8 19H5v-9h3zM6.5 8.25A1.75 1.75 0 118.3 6.5a1.78 1.78 0 01-1.8 1.75zM19 19h-3v-4.74c0-1.42-.6-1.93-1.38-1.93A1.74 1.74 0 0013 14.19a.66.66 0 000 .14V19h-3v-9h2.9v1.3a3.11 3.11 0 012.7-1.4c1.55 0 3.36.86 3.36 3.66z"/>
      </svg>
    ),
    Twitter: (
      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
      </svg>
    ),
    GitHub: (
      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2A10 10 0 002 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0012 2z"/>
      </svg>
    ),
  };

  return <>{icons[platform] || null}</>;
}