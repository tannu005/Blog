import Link from "next/link"
import Image from "next/image"
import { Globe, PenLine, Mountain, Camera, Lightbulb, TreePine, Target, BookOpen, Compass, Sun, MountainSnow } from "lucide-react"

export default function Home() {
  const categoryCards = [
    { icon: <Mountain size={28} className="text-[#143B66]" />, title: "TRAVEL\nDIARIES", path: "/categories/travel" },
    { icon: <Camera size={28} className="text-[#143B66]" />, title: "DAILY LIFE\nUPDATES", path: "/categories/daily" },
    { icon: <Lightbulb size={28} className="text-[#143B66]" />, title: "LIFE LESSONS &\nINSIGHTS", path: "/categories/lessons" },
    { icon: <TreePine size={28} className="text-[#143B66]" />, title: "JAMMU &\nKASHMIR CHRONICLES", path: "/categories/jk" },
    { icon: <Target size={28} className="text-[#143B66]" />, title: "MOTIVATION &\nPERSONAL GROWTH", path: "/categories/motivation" },
    { icon: <BookOpen size={28} className="text-[#143B66]" />, title: "BLOGS &\nEXPERIENCES", path: "/blog" },
  ]

  return (
    <div className="flex flex-col min-h-screen bg-[#F4F7F9]">
      
      <section className="relative w-full h-[95vh] min-h-[700px] flex flex-col justify-between pt-[100px]">
        <div className="absolute inset-0 z-0">
          <Image 
            src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=2500&q=80" 
            alt="Mountain landscape reflecting personal journey themes" 
            fill 
            className="object-cover object-top opacity-80"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#F4F7F9]/80 via-[#F4F7F9]/20 to-[#F4F7F9]"></div>
        </div>
        <div className="relative z-10 w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center text-center mt-12">
          <span className="font-script text-[42px] md:text-[54px] text-[#143B66] mb-[-10px] drop-shadow-sm">
            Welcome to
          </span>
          <h1 className="font-serif text-[36px] sm:text-[60px] lg:text-[90px] font-bold text-[#0B1C3C] leading-[1.1] mb-6 drop-shadow-md break-words w-full px-2">
            KuldeepInsights.in
          </h1>
          <span className="font-sans text-[13px] md:text-[15px] font-medium tracking-[4px] uppercase text-[#143B66] mb-4">
            EXPLORING LIFE BEYOND THE HORIZON
          </span>
          <div className="flex items-center gap-4 mb-6 opacity-70">
            <div className="h-[1px] w-16 bg-[#143B66]"></div>
            <MountainSnow size={20} className="text-[#143B66]" strokeWidth={1.5} />
            <div className="h-[1px] w-16 bg-[#143B66]"></div>
          </div>
          <p className="font-sans text-[#1A1A1A] text-[15px] md:text-[16px] leading-[1.6] mb-8 max-w-[400px] font-medium opacity-90">
            Travel. Life. Lessons. Motivation.<br />
            Real stories from real experiences,<br />
            shared to inspire your journey.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/about"
              className="bg-[#0B1C3C] text-white hover:bg-[#143B66] px-[24px] py-[14px] rounded-full font-sans text-[12px] font-bold tracking-widest uppercase transition-colors flex items-center justify-center gap-2 shadow-lg"
            >
              <Globe size={16} /> EXPLORE MY JOURNEY
            </Link>
            <Link
              href="/blog"
              className="bg-white text-[#0B1C3C] hover:bg-[#f0f0f0] px-[24px] py-[14px] rounded-full font-sans text-[12px] font-bold tracking-widest uppercase transition-colors flex items-center justify-center gap-2 shadow-lg"
            >
              <PenLine size={16} /> READ LATEST STORIES
            </Link>
          </div>
        </div>
        <div className="absolute right-[5%] top-1/2 -translate-y-1/2 hidden xl:block z-10">
          <div className="bg-white/30 backdrop-blur-md border border-white/60 p-8 rounded-3xl max-w-xs shadow-xl relative">
            <span className="absolute -top-4 -left-2 text-6xl text-[#0B1C3C] font-serif opacity-80 leading-none">“</span>
            <p className="font-serif text-[#0B1C3C] text-xl font-medium leading-relaxed relative z-10 pl-2">
              Collect moments, create memories, and share insights that <span className="font-script text-3xl font-normal ml-1">inspire.</span>
            </p>
            <span className="absolute -bottom-6 right-2 text-6xl text-[#0B1C3C] font-serif opacity-80 leading-none rotate-180">“</span>
          </div>
        </div>
        <div className="relative z-20 w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 translate-y-1/2">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
            {categoryCards.map((card, idx) => (
              <Link key={idx} href={card.path} className="bg-white/95 backdrop-blur-sm rounded-2xl p-5 shadow-[0_10px_30px_rgba(0,0,0,0.08)] hover:-translate-y-2 hover:shadow-[0_15px_40px_rgba(0,0,0,0.12)] transition-all duration-300 flex items-center gap-4 group">
                <div className="shrink-0">{card.icon}</div>
                <div className="flex flex-col">
                  <span className="font-sans text-[11px] font-bold text-[#0B1C3C] leading-[1.3]">
                    {card.title.split('\n').map((line, i) => (
                      <span key={i} className="block">{line}</span>
                    ))}
                  </span>
                  <div className="h-[2px] w-4 bg-[#143B66] mt-1 transition-all duration-300 group-hover:w-full"></div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="relative z-10 max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 mt-[350px] sm:mt-[250px] md:mt-[180px] lg:mt-[120px] mb-20 w-full">
        <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-[0_10px_40px_rgba(0,0,0,0.05)] border border-[#E0E0E0] p-8 lg:p-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 items-center">
            
            <div className="flex gap-4">
              <span className="text-[#143B66] text-4xl font-serif font-bold leading-none mt-1 opacity-80">“</span>
              <p className="font-sans text-[13px] text-[#1A1A1A] font-medium leading-relaxed pt-2">
                Life isn't measured by destinations reached, but by the stories we choose to tell.
              </p>
            </div>

            <div className="flex items-center gap-4">
              <Compass size={42} strokeWidth={1} className="text-[#143B66]" />
              <p className="font-sans text-[13px] text-[#1A1A1A] font-medium leading-relaxed">
                Discover places.<br/>Embrace experiences.<br/>Inspire lives.
              </p>
            </div>

            <div className="flex items-center gap-4">
              <Sun size={42} strokeWidth={1} className="text-[#D4A574]" />
              <p className="font-sans text-[13px] text-[#1A1A1A] font-medium leading-relaxed">
                Every sunrise brings<br/>a new perspective;<br/>every journey reveals<br/>a new version of yourself.
              </p>
            </div>

            <div className="flex items-center gap-4">
              <Mountain size={42} strokeWidth={1} className="text-[#143B66]" />
              <p className="font-sans text-[13px] text-[#1A1A1A] font-medium leading-relaxed">
                Where passion meets<br/>purpose, and every<br/>insight sparks<br/>inspiration.
              </p>
            </div>

            <div className="flex flex-col items-start lg:items-end justify-center">
              <span className="font-script text-[26px] text-[#143B66] leading-none mb-1">
                Keep Exploring.
              </span>
              <span className="font-script text-[26px] text-[#143B66] leading-none mb-1">
                Keep Inspiring.
              </span>
              <span className="font-script text-[36px] text-[#143B66] leading-none ml-10">
                -Kuldeep
              </span>
            </div>

          </div>
        </div>
      </section>

    </div>
  )
}
