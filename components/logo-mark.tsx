export function LogoMark({ className = "size-14" }: { className?: string }) {
  return (
    <svg
      viewBox="20 20 160 160"
      className={className}
      role="img"
      aria-label="MentorLagbe"
    >
      <defs>
        <linearGradient id="ml-bg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#4338CA" />
          <stop offset="1" stopColor="#0EA5E9" />
        </linearGradient>
        <linearGradient id="ml-gold" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#FDE68A" />
          <stop offset="1" stopColor="#F59E0B" />
        </linearGradient>
      </defs>
      <rect x="20" y="20" width="160" height="160" rx="40" fill="url(#ml-bg)" />
      <path
        d="M56 142 V90 L100 124 L144 90 V142"
        fill="none"
        stroke="#FFFFFF"
        strokeWidth="16"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M80 62 V76 Q100 88 120 76 V62" fill="#D97706" />
      <path d="M100 34 L142 54 L100 74 L58 54 Z" fill="url(#ml-gold)" />
      <path
        d="M132 58 V76"
        stroke="#FDE68A"
        strokeWidth="4"
        strokeLinecap="round"
      />
      <circle cx="132" cy="80" r="5" fill="#FDE68A" />
    </svg>
  );
}
