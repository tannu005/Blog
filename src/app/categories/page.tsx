import Link from "next/link"
import { Mountain, Camera, Lightbulb, TreePine, Target, BookOpen, ArrowRight } from "lucide-react"

export default function CategoriesPage() {
  const categories = [
    { slug: "travel", icon: <Mountain size={40} strokeWidth={1.5} />, title: "Travel Diaries", desc: "Adventures across the globe." },
    { slug: "daily", icon: <Camera size={40} strokeWidth={1.5} />, title: "Daily Life", desc: "Moments from the everyday." },
    { slug: "lessons", icon: <Lightbulb size={40} strokeWidth={1.5} />, title: "Life Lessons", desc: "Insights gained through experience." },
    { slug: "jk", icon: <TreePine size={40} strokeWidth={1.5} />, title: "J&K Chronicles", desc: "Stories from the mountains of Jammu & Kashmir." },
    { slug: "motivation", icon: <Target size={40} strokeWidth={1.5} />, title: "Motivation", desc: "Fuel for your personal growth journey." },
    { slug: "tech", icon: <BookOpen size={40} strokeWidth={1.5} />, title: "Tech & Code", desc: "Thoughts on software and development." },
  ]

  return (
    <div className="bg-[#F5F1E8] min-h-screen py-20">
      <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col items-center text-center mb-16">
          <span className="font-mono text-[12px] tracking-[1px] text-[#0ECAD4] uppercase font-semibold mb-4">
            Explore Topics
          </span>
          <h1 className="font-serif text-5xl md:text-[64px] font-bold tracking-tight text-[#1B4F7C] mb-6">
            Categories
          </h1>
          <div className="w-16 h-[3px] bg-[#0ECAD4] rounded-full mb-6"></div>
          <p className="font-sans text-[18px] text-[#1A1A1A] max-w-[600px] leading-[1.6]">
            Navigate through my thoughts by exploring the topics that resonate with you the most.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((cat, i) => (
            <Link 
              key={i} 
              href={`/categories/${cat.slug}`}
              className="group relative bg-white p-10 rounded-[2rem] shadow-[0_4px_12px_rgba(0,0,0,0.04)] border border-[#E0E0E0] hover:border-[#0ECAD4] hover:shadow-[0_12px_40px_rgba(14,202,212,0.15)] hover:-translate-y-2 transition-all duration-300 overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#F5F1E8] rounded-bl-full -mr-8 -mt-8 group-hover:bg-[#0ECAD4]/10 transition-colors duration-500"></div>
              
              <div className="text-[#1B4F7C] group-hover:text-[#0ECAD4] transition-colors duration-300 mb-6 relative z-10">
                {cat.icon}
              </div>
              
              <h2 className="font-serif text-[24px] font-bold text-[#1B4F7C] mb-3 relative z-10">
                {cat.title}
              </h2>
              
              <p className="font-sans text-[#6B6B6B] text-[15px] mb-8 relative z-10">
                {cat.desc}
              </p>
              
              <div className="flex items-center text-[#1B4F7C] group-hover:text-[#0ECAD4] font-sans font-bold text-sm tracking-widest uppercase transition-colors relative z-10">
                Browse <ArrowRight size={16} className="ml-2 group-hover:translate-x-2 transition-transform duration-300" />
              </div>
            </Link>
          ))}
        </div>

      </div>
    </div>
  )
}
