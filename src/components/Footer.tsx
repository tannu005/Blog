"use client"

import Link from "next/link"
import { useEffect, useState } from "react"

export default function Footer() {
  const [isAdmin, setIsAdmin] = useState(false)

  useEffect(() => {
    if (typeof window !== "undefined" && localStorage.getItem("adminToken")) {
      setIsAdmin(true)
    }
  }, [])

  return (
    <footer className="bg-[#0B1C3C] text-white pt-10 pb-6 relative overflow-hidden">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-3">
            {[
              { 
                icon: <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>, 
                link: "#" 
              },
              { 
                icon: <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>, 
                link: "#" 
              },
              { 
                icon: <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"/><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"/></svg>, 
                link: "#" 
              },
              { 
                icon: <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>, 
                link: "#" 
              },
            ].map((social, idx) => (
              <a 
                key={idx} 
                href={social.link} 
                className="w-8 h-8 rounded-full border border-white/30 flex items-center justify-center hover:bg-white hover:text-[#0B1C3C] transition-colors"
              >
                {social.icon}
              </a>
            ))}
          </div>

          <div className="flex flex-col items-center justify-center text-center">
            <span className="font-sans text-[12px] tracking-[2px] uppercase text-[#6B6B6B] mb-2 block">
              &copy; {new Date().getFullYear()} Kuldeep Insights
            </span>
            {isAdmin && (
              <Link href="/admin/login" className="font-sans text-[10px] tracking-[1px] text-[#6B6B6B] hover:text-[#0ECAD4] transition-colors uppercase">
                Admin Access
              </Link>
            )}
          </div>

          <div className="hidden md:flex items-center opacity-40">
             <svg width="200" height="40" viewBox="0 0 200 40" fill="none" stroke="currentColor" strokeWidth="1">
                <path d="M10 40 L40 10 L60 30 L90 5 L120 35 L140 20 L160 40" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M50 20 L75 40 M100 15 L125 40" strokeLinecap="round" strokeLinejoin="round" opacity="0.5"/>
             </svg>
          </div>

        </div>
      </div>
    </footer>
  )
}
