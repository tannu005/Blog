"use client"
import { useEffect, useState } from "react"
import Link from "next/link"
import { Plus, Edit, Trash2 } from "lucide-react"
export default function AdminPosts() {
  const [posts, setPosts] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)
  useEffect(() => {
    fetchPosts()
  }, [])
  const fetchPosts = async () => {
    try {
      const res = await fetch("/api/posts")
      const data = await res.json()
      if (Array.isArray(data)) {
        setPosts(data)
      }
    } catch (error) {
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  }
  const handleDelete = async (slug: string) => {
    if (!confirm("Are you sure you want to delete this post?")) return
    try {
      const token = localStorage.getItem("adminToken")
      await fetch(`/api/posts/${slug}`, {
        method: "DELETE",
        headers: {
          "Authorization": `Bearer ${token}`
        }
      })
      setPosts(posts.filter(p => p.slug !== slug))
    } catch (error) {
      console.error(error)
    }
  }
  if (isLoading) return <div>Loading posts...</div>
  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold tracking-tight text-zinc-900 ">Posts</h1>
        <Link 
          href="/admin/posts/new"
          className="flex items-center gap-2 rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 transition-colors"
        >
          <Plus size={16} />
          New Post
        </Link>
      </div>
      <div className="bg-white  rounded-2xl shadow-sm border border-zinc-200  overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-zinc-200 ">
            <thead className="bg-zinc-50 ">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-zinc-500  uppercase tracking-wider">Title</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-zinc-500  uppercase tracking-wider">Status</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-zinc-500  uppercase tracking-wider">Date</th>
                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-zinc-500  uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-200  bg-white ">
              {posts.map((post) => (
                <tr key={post._id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-zinc-900 ">{post.title}</div>
                    <div className="text-sm text-zinc-500 ">{post.slug}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${post.published ? 'bg-green-100 text-green-800  ' : 'bg-yellow-100 text-yellow-800  '}`}>
                      {post.published ? 'Published' : 'Draft'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-zinc-500 ">
                    {new Date(post.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <Link href={`/admin/posts/${post.slug}`} className="text-blue-600 hover:text-blue-900   mr-4 inline-block">
                      <Edit size={18} />
                    </Link>
                    <button onClick={() => handleDelete(post.slug)} className="text-red-600 hover:text-red-900  ">
                      <Trash2 size={18} />
                    </button>
                  </td>
                </tr>
              ))}
              {posts.length === 0 && (
                <tr>
                  <td colSpan={4} className="px-6 py-8 text-center text-zinc-500 ">
                    No posts found. Create your first post!
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
