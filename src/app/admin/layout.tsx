"use client"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { LayoutDashboard, FileText, Folder, LogOut, Settings } from "lucide-react"
export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const router = useRouter()
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const publicPaths = ["/admin/login", "/admin/register", "/admin/forgot-password"]

  useEffect(() => {
    const token = localStorage.getItem("adminToken")
    if (!token && !publicPaths.includes(pathname)) {
      router.push("/admin/login")
    } else {
      setIsAuthenticated(true)
    }
    setIsLoading(false)
  }, [pathname, router])
  
  if (isLoading) return null
  
  if (publicPaths.includes(pathname)) {
    return <>{children}</>
  }
  const handleLogout = () => {
    localStorage.removeItem("adminToken")
    router.push("/admin/login")
  }
  const navItems = [
    { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
    { name: "Posts", href: "/admin/posts", icon: FileText },
    { name: "Categories", href: "/admin/categories", icon: Folder },
    { name: "Settings", href: "/admin/settings", icon: Settings },
  ]
  return (
    <div className="flex h-screen bg-zinc-50 ">
      <aside className="w-64 border-r border-zinc-200  bg-white  hidden md:block">
        <div className="flex h-16 items-center border-b border-zinc-200  px-6">
          <span className="text-lg font-bold tracking-tight">KULDEEP <span className="text-blue-600 ">ADMIN</span></span>
        </div>
        <nav className="p-4 space-y-1">
          {navItems.map((item) => {
            const isActive = pathname === item.href
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  isActive 
                    ? "bg-blue-50 text-blue-600  " 
                    : "text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900   "
                }`}
              >
                <item.icon size={18} />
                {item.name}
              </Link>
            )
          })}
          <button
            onClick={handleLogout}
            className="flex w-full items-center gap-3 px-3 py-2 rounded-md text-sm font-medium text-red-600 hover:bg-red-50   transition-colors mt-8"
          >
            <LogOut size={18} />
            Logout
          </button>
        </nav>
      </aside>
      <main className="flex-1 overflow-auto">
        <div className="p-8 max-w-6xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  )
}
