"use client"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
export default function AdminLogin() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      })
      const data = await res.json()
      if (!res.ok) {
        throw new Error(data.error || "Login failed")
      }
      localStorage.setItem("adminToken", data.token)
      router.push("/admin")
    } catch (err: any) {
      setError(err.message)
    } finally {
      setIsLoading(false)
    }
  }
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50  px-4">
      <div className="w-full max-w-md space-y-8 bg-white  p-8 rounded-2xl shadow-sm border border-zinc-200 ">
        <div className="text-center">
          <h2 className="text-2xl font-bold tracking-tight text-zinc-900 ">
            Admin Login
          </h2>
          <p className="mt-2 text-sm text-zinc-600 ">
            Sign in to access your dashboard.
          </p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleLogin}>
          {error && (
            <div className="p-3 bg-red-50 text-red-600   rounded-md text-sm text-center">
              {error}
            </div>
          )}
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-zinc-900  mb-1">
                Email address
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="block w-full rounded-md border-0 py-1.5 text-zinc-900  shadow-sm ring-1 ring-inset ring-zinc-300  bg-transparent placeholder:text-zinc-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6 px-3"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-zinc-900  mb-1">
                Password
              </label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="block w-full rounded-md border-0 py-1.5 text-zinc-900  shadow-sm ring-1 ring-inset ring-zinc-300  bg-transparent placeholder:text-zinc-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6 px-3"
              />
            </div>
          </div>
          <button
            type="submit"
            disabled={isLoading}
            className="flex w-full justify-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 disabled:opacity-50 transition-colors"
          >
            {isLoading ? "Signing in..." : "Sign in"}
          </button>
          <div className="text-center mt-6 flex flex-col gap-2">
            <Link href="/admin/register" className="text-sm font-medium text-emerald-600 hover:underline">
              First time setup? Create Master Admin Account
            </Link>
            <Link href="/" className="text-sm font-medium text-blue-600 hover:underline mt-2">
              &larr; Back to website
            </Link>
          </div>
        </form>
      </div>
    </div>
  )
}
