import Link from "next/link";

export default function NotFound() {
  return (
    <section className="min-h-[60vh] flex items-center justify-center px-5 py-20 text-center">
      <div>
        <p className="text-[11px] tracking-[0.4em] uppercase text-dos-gold">404</p>
        <h1 className="font-display text-5xl mt-3">Lost in the collection.</h1>
        <p className="mt-4 text-neutral-500 max-w-md mx-auto">
          The page you're looking for doesn't exist or has moved.
        </p>
        <Link href="/" className="inline-block mt-8 btn-gold px-8 py-4 text-xs">
          Return Home
        </Link>
      </div>
    </section>
  );
}
