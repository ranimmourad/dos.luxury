"use client";

export default function AnnouncementBar() {
  const items = [
    "FREE SHIPPING ACROSS TUNISIA",
    "NEW DROP · SUMMER 2026",
    "320 GSM PREMIUM EMBROIDERY",
    "LUXURY IN EVERY DETAIL",
    "CRAFTED IN TUNISIA",
  ];
  return (
    <div className="bg-dos-black text-white border-b border-dos-gold/30 overflow-hidden">
      <div className="flex whitespace-nowrap animate-marquee py-2 text-[11px] tracking-[0.3em] uppercase">
        {[...items, ...items, ...items].map((t, i) => (
          <span key={i} className="mx-8 flex items-center">
            <span className="inline-block w-1 h-1 bg-dos-gold rounded-full mr-8" />
            {t}
          </span>
        ))}
      </div>
    </div>
  );
}
