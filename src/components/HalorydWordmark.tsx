// Reusable Haloryd wordmark — renders the canonical SVG INLINE so it
// inherits the parent document's Outfit font (loaded by next/font/google
// in layout.tsx). Loading via <img src="..."> sandboxes the SVG and
// blocks font inheritance, so the "hal" + "ryd" letters render in the
// browser's system fallback — visually wrong.
//
// Geometry is byte-identical to /public/brand/wordmark-lc-*.svg (the
// canonical files from Claude Design). Only the <text> font-family was
// changed to reference the CSS variable so next/font's self-host URL
// gets resolved automatically.

type Variant = 'charcoal' | 'cream' | 'green';

const COLORS: Record<Variant, string> = {
  charcoal: '#2C3A3A',
  cream:    '#F7F6F4',
  green:    '#568F7A',
};

export function HalorydWordmark({
  variant = 'charcoal',
  className,
  ariaLabel = 'Haloryd',
}: {
  variant?: Variant;
  className?: string;
  ariaLabel?: string;
}) {
  const color = COLORS[variant];
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 738.76 220.00"
      role="img"
      aria-label={ariaLabel}
      className={className}
    >
      <text
        x="8.80"
        y="171.60"
        style={{
          fontFamily: "var(--font-outfit), 'Outfit', system-ui, sans-serif",
          fontWeight: 500,
          fontSize: 220,
          letterSpacing: '-0.038em',
        }}
        fill={color}
      >
        hal
      </text>
      <circle cx="351.78" cy="114.40" r="61.38" fill="none" stroke={color} strokeWidth="13.64" />
      <path
        d="M 381.93 39.78 A 80.48 80.48 0 0 1 409.67 58.50"
        fill="none"
        stroke={color}
        strokeWidth="11.18"
        strokeLinecap="round"
      />
      <text
        x="411.62"
        y="171.60"
        style={{
          fontFamily: "var(--font-outfit), 'Outfit', system-ui, sans-serif",
          fontWeight: 500,
          fontSize: 220,
          letterSpacing: '-0.038em',
        }}
        fill={color}
      >
        ryd
      </text>
    </svg>
  );
}
