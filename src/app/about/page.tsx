
import Image from "next/image"
import Link from "next/link"
import { Compass, Mountain, BookOpen } from "lucide-react"

export default function AboutPage() {
  return (
    <div className="bg-[#F5F1E8] min-h-screen py-20">
      <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col items-center text-center mb-20">
          <span className="font-mono text-[12px] tracking-[1px] text-[#0ECAD4] uppercase font-semibold mb-4">
            My Journey
          </span>
          <h1 className="font-serif text-5xl md:text-[64px] font-bold tracking-tight text-[#1B4F7C] mb-6">
            About Me
          </h1>
          <div className="w-16 h-[3px] bg-[#0ECAD4] rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center pb-12 lg:pb-16">
          
          <div className="relative">
            <div className="relative w-full aspect-[4/5] rounded-xl overflow-hidden shadow-[0_8px_24px_rgba(0,0,0,0.12)]">
              <Image 
                src="https://images.unsplash.com/photo-1506905925246-2670e171b9c9?auto=format&fit=crop&w=1200&q=80"
                alt="Kuldeep travelling"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
                priority
              />
            </div>
            <div className="absolute -bottom-8 -right-8 bg-white p-8 rounded-xl shadow-[0_8px_24px_rgba(0,0,0,0.12)] hidden md:block max-w-xs border border-[#E0E0E0]">
              <span className="font-serif text-[28px] font-semibold text-[#1B4F7C]">Keep Exploring.</span>
              <p className="font-sans text-[#6B6B6B] text-[16px] mt-2 leading-[1.6]">
                Life is an open book, and those who do not travel read only one page.
              </p>
            </div>
          </div>

          <div className="flex flex-col">
            <h2 className="font-serif text-[36px] font-bold text-[#1B4F7C] mb-6">
              Hello! I am Kuldeep.
            </h2>
            <p className="font-sans text-[18px] leading-[1.6] text-[#1A1A1A] mb-6">
              I am a passionate writer, traveler, and lifelong learner. This space is my digital garden where I document my journeys, share the lessons I've learned, and hopefully inspire others to explore life beyond the horizon.
            </p>
            <p className="font-sans text-[16px] leading-[1.6] text-[#6B6B6B] mb-12">
              From the majestic mountains of Jammu & Kashmir to the quiet moments of daily reflection, I believe that every experience holds a profound insight waiting to be discovered.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12">
              <div className="bg-white p-[32px_24px] rounded-xl shadow-[0_4px_12px_rgba(0,0,0,0.08)] border border-[#E0E0E0] text-center flex flex-col items-center">
                <Mountain className="text-[#1B4F7C] mb-4" size={32} strokeWidth={1.5} />
                <h3 className="font-sans text-[14px] font-semibold text-[#1B4F7C] uppercase tracking-[0.5px] mb-2">Travel</h3>
                <p className="font-sans text-[12px] text-[#6B6B6B]">Discovering the unknown.</p>
              </div>
              <div className="bg-white p-[32px_24px] rounded-xl shadow-[0_4px_12px_rgba(0,0,0,0.08)] border border-[#E0E0E0] text-center flex flex-col items-center">
                <Compass className="text-[#0ECAD4] mb-4" size={32} strokeWidth={1.5} />
                <h3 className="font-sans text-[14px] font-semibold text-[#1B4F7C] uppercase tracking-[0.5px] mb-2">Growth</h3>
                <p className="font-sans text-[12px] text-[#6B6B6B]">Evolving every single day.</p>
              </div>
              <div className="bg-white p-[32px_24px] rounded-xl shadow-[0_4px_12px_rgba(0,0,0,0.08)] border border-[#E0E0E0] text-center flex flex-col items-center">
                <BookOpen className="text-[#D4A574] mb-4" size={32} strokeWidth={1.5} />
                <h3 className="font-sans text-[14px] font-semibold text-[#1B4F7C] uppercase tracking-[0.5px] mb-2">Writing</h3>
                <p className="font-sans text-[12px] text-[#6B6B6B]">Sharing stories that matter.</p>
              </div>
            </div>

            <Link
              href="/blog"
              className="bg-[#1B4F7C] text-white hover:bg-[#0ECAD4] active:bg-[#154169] px-[32px] py-[14px] rounded-lg font-sans text-[16px] font-medium transition-colors duration-200 self-start inline-flex items-center justify-center"
            >
              Read My Journal
            </Link>
          </div>

        </div>
      </div>
    </div>
  )
}
