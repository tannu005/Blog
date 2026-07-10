"use client"

import { useState } from "react"
import { X, Send, CheckCircle2 } from "lucide-react"

interface SubscribeModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function SubscribeModal({ isOpen, onClose }: SubscribeModalProps) {
  const [email, setEmail] = useState("")
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle")
  const [message, setMessage] = useState("")

  if (!isOpen) return null

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus("loading")
    setMessage("")

    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      })
      const data = await res.json()
      
      if (!res.ok) throw new Error(data.error)
      
      setStatus("success")
      setMessage(data.message)
      setTimeout(() => {
        onClose()
        setStatus("idle")
        setEmail("")
        setMessage("")
      }, 3000)
    } catch (err: any) {
      setStatus("error")
      setMessage(err.message)
    }
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm px-4">
      <div className="bg-white rounded-3xl w-full max-w-md p-8 relative shadow-2xl animate-fade-up">
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 text-gray-400 hover:text-black transition-colors"
        >
          <X size={24} />
        </button>

        {status === "success" ? (
          <div className="flex flex-col items-center justify-center py-10 text-center">
            <CheckCircle2 size={64} className="text-[#0ECAD4] mb-4" />
            <h3 className="font-serif text-3xl font-bold text-[#0B1C3C] mb-2">Thank You!</h3>
            <p className="font-sans text-gray-600">You have successfully subscribed to the Kuldeep Insights newsletter.</p>
          </div>
        ) : (
          <>
            <div className="text-center mb-8 pt-4">
              <span className="font-script text-3xl text-[#143B66]">Join the Journey</span>
              <h3 className="font-serif text-2xl font-bold text-[#0B1C3C] mt-2 mb-2">Subscribe to Newsletter</h3>
              <p className="font-sans text-sm text-gray-600">Get the latest stories, life lessons, and travel diaries delivered directly to your inbox.</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <input
                  type="email"
                  placeholder="Enter your email address"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-5 py-4 rounded-xl border border-gray-200 focus:outline-none focus:border-[#143B66] font-sans"
                />
              </div>
              
              {status === "error" && (
                <p className="text-red-500 text-sm font-sans">{message}</p>
              )}

              <button
                type="submit"
                disabled={status === "loading"}
                className="w-full bg-[#0B1C3C] text-white py-4 rounded-xl font-bold tracking-widest uppercase hover:bg-[#143B66] transition-colors disabled:opacity-70 flex items-center justify-center gap-2"
              >
                {status === "loading" ? "Subscribing..." : "SUBSCRIBE NOW"} <Send size={16} className="-rotate-45" />
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  )
}
