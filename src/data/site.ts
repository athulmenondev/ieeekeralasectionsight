import siteData from '../../data/site.json';
import type { SiteConfig } from '../types';

export const getSiteConfig = (): SiteConfig => siteData as SiteConfig;