import Link from "next/link"

export default function Logo() {
  return (
    <Link href="/" className="flex items-center gap-3">
      <div className="relative w-12 h-12 flex items-center justify-center">
        <svg viewBox="0 0 100 100" className="w-full h-full text-[#0b1c3c]" fill="currentColor">
          <path d="M 20 20 L 40 20 L 40 45 L 65 20 L 90 20 L 55 50 L 90 90 L 65 90 L 40 60 L 40 90 L 20 90 Z" />
          <path d="M 15 90 L 40 45 L 60 80 L 70 70 L 95 90 Z" fill="#6b93d6" opacity="0.8" />
        </svg>
      </div>
      <div className="flex flex-col">
        <span className="font-serif font-bold text-xl leading-none text-[#0b1c3c] tracking-wide uppercase">
          Kuldeep
        </span>
        <span className="font-serif font-bold text-xl leading-none text-[#0b1c3c] tracking-widest uppercase mt-0.5">
          Insights
        </span>
        <span className="text-[7px] font-sans font-bold tracking-[0.15em] uppercase text-gray-500 mt-1">
          Explore. Learn. Inspire.
        </span>
      </div>
    </Link>
  )
}
