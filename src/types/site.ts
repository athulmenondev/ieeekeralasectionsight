export interface NavItem {
  label: string;
  path: string;
}

export interface SocialLink {
  platform: string;
  url: string;
  icon: string;
}

export interface SiteConfig {
  title: string;
  description: string;
  nav: NavItem[];
  social: SocialLink[];
  footer: {
    copyright: string;
    privacyUrl: string;
    termsUrl: string;
  };
}