interface KeralaWaveProps {
  depth?: 'deep' | 'mid' | 'surface';
}

const waves: Record<string, { d: string; className: string; opacity: string }> = {
  deep: {
    d: 'M0,192 C360,260 720,100 1080,192 C1440,284 1440,0 1440,0 L0,0 Z',
    className: 'animate-wave-slow',
    opacity: '0.08',
  },
  mid: {
    d: 'M0,160 C360,240 720,80 1080,160 C1440,240 1440,0 1440,0 L0,0 Z',
    className: 'animate-wave-reverse',
    opacity: '0.12',
  },
  surface: {
    d: 'M0,128 C360,200 720,60 1080,128 C1440,196 1440,0 1440,0 L0,0 Z',
    className: 'animate-wave',
    opacity: '0.15',
  },
};

export function KeralaWave({ depth = 'surface' }: KeralaWaveProps) {
  const cfg = waves[depth];
  return (
    <svg
      className={`absolute inset-0 w-full h-full ${cfg.className}`}
      viewBox="0 0 1440 320"
      preserveAspectRatio="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fill="currentColor"
        d={cfg.d}
        className="text-primary"
        opacity={cfg.opacity}
      />
    </svg>
  );
}
