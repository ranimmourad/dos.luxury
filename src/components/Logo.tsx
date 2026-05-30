type Props = { className?: string; variant?: "dark" | "light" };

export default function Logo({ className = "", variant = "dark" }: Props) {
  const color = variant === "dark" ? "#0A0A0A" : "#FFFFFF";
  return (
    <div className={`flex items-baseline ${className}`}>
      <span
        className="font-display font-bold tracking-[0.18em] text-2xl"
        style={{ color }}
      >
        D.O.S
      </span>
      <span
        className="ml-2 text-[10px] tracking-[0.35em] uppercase"
        style={{ color: "#C9A961" }}
      >
        Luxury
      </span>
    </div>
  );
}
