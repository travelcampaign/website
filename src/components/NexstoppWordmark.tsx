// Nexstopp wordmark — renders "nexstopp" as inline SVG text so it inherits the
// document's Outfit font (loaded by next/font/google in layout.tsx). Rendering
// via <img src="..."> would sandbox the SVG and fall back to system fonts.
//
// Interim mark: a clean Outfit lowercase wordmark. (The previous brand's
// halo-replaces-the-"o" device was specific to "haloryd" and does not carry
// over to "nexstopp"; a dedicated Nexstopp logo is still to be designed.)

type Variant = 'charcoal' | 'cream' | 'green';

const COLORS: Record<Variant, string> = {
  charcoal: '#2C3A3A',
  cream:    '#F7F6F4',
  green:    '#568F7A',
};

export function NexstoppWordmark({
  variant = 'charcoal',
  className,
  ariaLabel = 'Nexstopp',
}: {
  variant?: Variant;
  className?: string;
  ariaLabel?: string;
}) {
  const color = COLORS[variant];
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 920 220"
      role="img"
      aria-label={ariaLabel}
      className={className}
    >
      <text
        x="8"
        y="171.60"
        style={{
          fontFamily: "var(--font-outfit), 'Outfit', system-ui, sans-serif",
          fontWeight: 600,
          fontSize: 220,
          letterSpacing: '-0.04em',
        }}
        fill={color}
      >
        nexstopp
      </text>
    </svg>
  );
}
