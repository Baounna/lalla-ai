type Props = {
  size?: number;
  className?: string;
};

export function Logo({ size = 28, className = "" }: Props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 32 32"
      width={size}
      height={size}
      className={className}
      aria-label="Lalla AI"
    >
      <defs>
        <linearGradient id="lallaGradient" x1="0" y1="0" x2="32" y2="32" gradientUnits="userSpaceOnUse">
          <stop stopColor="#f43f5e" />
          <stop offset="1" stopColor="#ec4899" />
        </linearGradient>
      </defs>
      <rect width="32" height="32" rx="8" fill="url(#lallaGradient)" />
      <path
        d="M22 6.5 L22 18 Q22 24 16 24 L9 24"
        stroke="white"
        strokeWidth="3.2"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      <circle cx="22" cy="6.5" r="1.6" fill="white" />
    </svg>
  );
}
