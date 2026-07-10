"use client"
import { useEffect, useState } from "react"
import { FileText, Folder, Users } from "lucide-react"
export default function AdminDashboard() {
  const [stats, setStats] = useState({ posts: 0, categories: 0 })
  const [isLoading, setIsLoading] = useState(true)
  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [postsRes, catRes] = await Promise.all([
          fetch("/api/posts?published=true"),
          fetch("/api/categories")
        ])
        const posts = await postsRes.json()
        const categories = await catRes.json()
        setStats({
          posts: Array.isArray(posts) ? posts.length : 0,
          categories: Array.isArray(categories) ? categories.length : 0
        })
      } catch (error) {
        console.error("Failed to fetch stats", error)
      } finally {
        setIsLoading(false)
      }
    }
    fetchStats()
  }, [])
  const statCards = [
    { name: "Total Posts", value: stats.posts, icon: FileText, color: "text-blue-500" },
    { name: "Categories", value: stats.categories, icon: Folder, color: "text-purple-500" },
    { name: "Admins", value: 1, icon: Users, color: "text-emerald-500" },
  ]
  if (isLoading) return <div>Loading dashboard...</div>
  return (
    <div>
      <h1 className="text-2xl font-bold tracking-tight text-zinc-900  mb-8">Dashboard Overview</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {statCards.map((stat) => (
          <div key={stat.name} className="bg-white  p-6 rounded-2xl shadow-sm border border-zinc-200  flex items-center gap-4">
            <div className={`p-3 rounded-lg bg-zinc-50  ${stat.color}`}>
              <stat.icon size={24} />
            </div>
            <div>
              <p className="text-sm font-medium text-zinc-500 ">{stat.name}</p>
              <p className="text-2xl font-bold text-zinc-900 ">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
