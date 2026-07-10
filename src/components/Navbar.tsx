"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, X, Search, Send, ChevronDown } from "lucide-react"
import { useState, useEffect } from "react"
import SubscribeModal from "./SubscribeModal"
import SearchModal from "./SearchModal"

export default function Navbar() {
  const pathname = usePathname()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isSubscribeModalOpen, setIsSubscribeModalOpen] = useState(false)
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-white/95 backdrop-blur-md shadow-sm py-2" : "bg-transparent py-4"
      }`}>
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-[60px]">
            
            <Link href="/" className="flex items-center gap-2 group">
              <div className="relative flex items-center justify-center">
                <span className="font-serif text-[42px] font-bold text-[#143B66]">K</span>
                <svg className="absolute -bottom-1 -right-2 w-8 h-8 text-[#0B1C3C]" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2L2 22h20L12 2zm0 4l6 12H6l6-12z" opacity="0.9"/>
                </svg>
              </div>
              <div className="flex flex-col ml-2">
                <span className="font-serif font-bold text-[18px] tracking-wide text-[#0B1C3C] leading-none mb-[2px]">
                  KULDEEP
                </span>
                <span className="font-sans font-medium text-[15px] tracking-[4px] text-[#0B1C3C] leading-none">
                  INSIGHTS
                </span>
                <span className="font-sans text-[7px] tracking-[2px] font-bold text-[#6B6B6B] leading-none mt-1 uppercase">
                  Explore. Learn. Inspire.
                </span>
              </div>
            </Link>

            <div className="hidden lg:flex items-center space-x-10">
              {[
                { name: "HOME", path: "/" },
                { name: "ABOUT ME", path: "/about" },
                { name: "BLOG", path: "/blog" },
                { name: "CATEGORIES", path: "/categories", hasDropdown: true },
                { name: "GALLERY", path: "/gallery" },
                { name: "CONTACT", path: "/contact" },
              ].map((item) => (
                <Link
                  key={item.name}
                  href={item.path}
                  className={`text-[13px] font-bold tracking-widest flex items-center gap-1 group relative py-2 ${
                    pathname === item.path ? "text-[#143B66]" : "text-[#143B66] hover:text-[#000000]"
                  }`}
                >
                  {item.name}
                  {item.hasDropdown && <ChevronDown size={14} className="opacity-70" />}
                  <span className={`absolute bottom-0 left-1/2 -translate-x-1/2 h-[2px] bg-[#143B66] transition-all duration-300 ${
                    pathname === item.path ? "w-8" : "w-0 group-hover:w-8"
                  }`}></span>
                </Link>
              ))}
            </div>

            <div className="hidden lg:flex items-center gap-6">
              <button 
                onClick={() => setIsSubscribeModalOpen(true)}
                className="bg-[#0B1C3C] text-white px-[24px] py-[10px] rounded-full text-[11px] font-bold tracking-widest flex items-center gap-2 hover:bg-[#143B66] transition-colors"
              >
                SUBSCRIBE <Send size={12} className="-rotate-45" />
              </button>
              <button 
                onClick={() => setIsSearchModalOpen(true)}
                className="text-[#0B1C3C] hover:text-black"
              >
                <Search size={20} strokeWidth={2.5} />
              </button>
            </div>

            <div className="lg:hidden flex items-center">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="text-[#0B1C3C] p-2"
              >
                {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-white pt-[100px] flex flex-col lg:hidden">
          <div className="px-6 py-8 flex flex-col space-y-6">
            <Link href="/" onClick={() => setIsMobileMenuOpen(false)} className="text-2xl font-serif font-bold text-[#0B1C3C]">HOME</Link>
            <Link href="/about" onClick={() => setIsMobileMenuOpen(false)} className="text-2xl font-serif font-bold text-[#0B1C3C]">ABOUT ME</Link>
            <Link href="/blog" onClick={() => setIsMobileMenuOpen(false)} className="text-2xl font-serif font-bold text-[#0B1C3C]">BLOG</Link>
            <Link href="/categories" onClick={() => setIsMobileMenuOpen(false)} className="text-2xl font-serif font-bold text-[#0B1C3C]">CATEGORIES</Link>
            <Link href="/gallery" onClick={() => setIsMobileMenuOpen(false)} className="text-2xl font-serif font-bold text-[#0B1C3C]">GALLERY</Link>
            <Link href="/contact" onClick={() => setIsMobileMenuOpen(false)} className="text-2xl font-serif font-bold text-[#0B1C3C]">CONTACT</Link>
          </div>
        </div>
      )}

      <SubscribeModal 
        isOpen={isSubscribeModalOpen} 
        onClose={() => setIsSubscribeModalOpen(false)} 
      />

      <SearchModal 
        isOpen={isSearchModalOpen}
        onClose={() => setIsSearchModalOpen(false)}
      />
    </>
  )
}
