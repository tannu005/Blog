"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Eye, EyeOff } from "lucide-react"

export default function RegisterPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({ 
    name: "", 
    email: "", 
    password: "",
    securityQuestion: "What is your favorite color?",
    securityAnswer: ""
  })
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })
      const data = await res.json()
      
      if (!res.ok) throw new Error(data.error || "Registration failed")
      
      localStorage.setItem("adminToken", data.token)
      router.push("/admin")
    } catch (err: any) {
      setError(err.message)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F4F7F9] px-4 py-12">
      <div className="max-w-md w-full bg-white p-8 rounded-2xl shadow-[0_10px_40px_rgba(0,0,0,0.08)]">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-serif font-bold text-[#0B1C3C] mb-2">Admin Setup</h1>
          <p className="text-sm text-[#6B6B6B]">Create your master admin account for the blog.</p>
        </div>

        {error && (
          <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm mb-6 border border-red-100">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-[#1A1A1A] mb-1">Name</label>
            <input
              type="text"
              required
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#143B66]"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-[#1A1A1A] mb-1">Email</label>
            <input
              type="email"
              required
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#143B66]"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-[#1A1A1A] mb-1">Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                required
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#143B66] pr-10"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-600"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-[#1A1A1A] mb-1">Security Question</label>
            <select
              required
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#143B66] bg-white"
              value={formData.securityQuestion}
              onChange={(e) => setFormData({ ...formData, securityQuestion: e.target.value })}
            >
              <option value="What is your favorite color?">What is your favorite color?</option>
              <option value="What was your childhood nickname?">What was your childhood nickname?</option>
              <option value="What city were you born in?">What city were you born in?</option>
              <option value="What is your mother's maiden name?">What is your mother's maiden name?</option>
            </select>
            <p className="text-xs text-gray-500 mt-1">Required for password resets</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-[#1A1A1A] mb-1">Security Answer</label>
            <input
              type="text"
              required
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#143B66]"
              value={formData.securityAnswer}
              onChange={(e) => setFormData({ ...formData, securityAnswer: e.target.value })}
            />
          </div>
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-[#0B1C3C] text-white py-3 rounded-xl font-bold tracking-widest uppercase hover:bg-[#143B66] transition-colors disabled:opacity-70 mt-6 block"
          >
            {isLoading ? "Creating..." : "Create Admin Account"}
          </button>
        </form>
      </div>
    </div>
  )
}
