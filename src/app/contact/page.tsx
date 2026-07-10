import { Send, MapPin, Mail, Phone } from "lucide-react"

export default function ContactPage() {
  return (
    <div className="bg-[#F5F1E8] min-h-screen py-20">
      <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col items-center text-center mb-16">
          <span className="font-mono text-[12px] tracking-[1px] text-[#0ECAD4] uppercase font-semibold mb-4">
            Get In Touch
          </span>
          <h1 className="font-serif text-5xl md:text-[64px] font-bold tracking-tight text-[#1B4F7C] mb-6">
            Contact Me
          </h1>
          <div className="w-16 h-[3px] bg-[#0ECAD4] rounded-full mb-6"></div>
          <p className="font-sans text-[18px] text-[#1A1A1A] max-w-[600px] leading-[1.6]">
            Whether you have a story to share, a question to ask, or just want to say hello—I'd love to hear from you.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
          
          <div className="flex flex-col justify-center space-y-10 bg-[#1B4F7C] p-12 rounded-[2rem] text-white shadow-xl relative overflow-hidden">
            <div className="absolute -top-24 -right-24 w-64 h-64 bg-[#0ECAD4] rounded-full opacity-10 blur-3xl"></div>
            <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-[#D4A574] rounded-full opacity-10 blur-3xl"></div>
            
            <h2 className="font-serif text-[32px] font-bold relative z-10">Let's Connect</h2>
            <p className="font-sans text-white/80 leading-[1.6] relative z-10">
              I am always open to discussing new projects, creative ideas, or opportunities to be part of your visions.
            </p>
            
            <div className="space-y-6 relative z-10">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center">
                  <Mail className="text-[#0ECAD4]" size={20} />
                </div>
                <div>
                  <p className="font-sans text-sm text-white/60">Email Me</p>
                  <p className="font-sans font-medium">hello@kuldeepinsights.in</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center">
                  <MapPin className="text-[#0ECAD4]" size={20} />
                </div>
                <div>
                  <p className="font-sans text-sm text-white/60">Location</p>
                  <p className="font-sans font-medium">Jammu & Kashmir, India</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white p-10 rounded-[2rem] shadow-[0_8px_30px_rgba(0,0,0,0.04)] border border-[#E0E0E0]">
            <form className="flex flex-col space-y-6">
              <div className="flex flex-col sm:flex-row gap-6">
                <div className="flex-1">
                  <label className="font-sans text-sm font-semibold text-[#1B4F7C] block mb-2">First Name</label>
                  <input type="text" className="w-full bg-[#F5F1E8]/50 border border-[#E0E0E0] rounded-lg px-4 py-3 font-sans text-[#1A1A1A] focus:outline-none focus:border-[#0ECAD4] focus:ring-2 focus:ring-[#0ECAD4]/20 transition-all" />
                </div>
                <div className="flex-1">
                  <label className="font-sans text-sm font-semibold text-[#1B4F7C] block mb-2">Last Name</label>
                  <input type="text" className="w-full bg-[#F5F1E8]/50 border border-[#E0E0E0] rounded-lg px-4 py-3 font-sans text-[#1A1A1A] focus:outline-none focus:border-[#0ECAD4] focus:ring-2 focus:ring-[#0ECAD4]/20 transition-all" />
                </div>
              </div>
              
              <div>
                <label className="font-sans text-sm font-semibold text-[#1B4F7C] block mb-2">Email Address</label>
                <input type="email" className="w-full bg-[#F5F1E8]/50 border border-[#E0E0E0] rounded-lg px-4 py-3 font-sans text-[#1A1A1A] focus:outline-none focus:border-[#0ECAD4] focus:ring-2 focus:ring-[#0ECAD4]/20 transition-all" />
              </div>

              <div>
                <label className="font-sans text-sm font-semibold text-[#1B4F7C] block mb-2">Message</label>
                <textarea rows={5} className="w-full bg-[#F5F1E8]/50 border border-[#E0E0E0] rounded-lg px-4 py-3 font-sans text-[#1A1A1A] focus:outline-none focus:border-[#0ECAD4] focus:ring-2 focus:ring-[#0ECAD4]/20 transition-all resize-none"></textarea>
              </div>

              <button type="button" className="bg-[#1B4F7C] text-white hover:bg-[#0ECAD4] hover:shadow-[0_8px_24px_rgba(14,202,212,0.3)] active:scale-95 w-full py-4 rounded-lg font-sans text-[16px] font-bold tracking-wider uppercase transition-all duration-300 flex items-center justify-center gap-2 group">
                Send Message <Send size={18} className="-rotate-45 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </button>
            </form>
          </div>

        </div>

      </div>
    </div>
  )
}
