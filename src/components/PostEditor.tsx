"use client"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
interface PostEditorProps {
  initialData?: any
  isEdit?: boolean
}
export default function PostEditor({ initialData, isEdit = false }: PostEditorProps) {
  const router = useRouter()
  const [title, setTitle] = useState(initialData?.title || "")
  const [slug, setSlug] = useState(initialData?.slug || "")
  const [content, setContent] = useState(initialData?.content || "")
  const [excerpt, setExcerpt] = useState(initialData?.excerpt || "")
  const [published, setPublished] = useState(initialData?.published || false)
  const [isLoading, setIsLoading] = useState(false)
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    try {
      const token = localStorage.getItem("adminToken")
      const url = isEdit ? `/api/posts/${initialData.slug}` : "/api/posts"
      const method = isEdit ? "PUT" : "POST"
      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({ title, slug, content, excerpt, published })
      })
      if (!res.ok) {
        const data = await res.json()
        throw new Error(data.error || "Something went wrong")
      }
      router.push("/admin/posts")
    } catch (error) {
      console.error(error)
      alert("Error saving post")
    } finally {
      setIsLoading(false)
    }
  }
  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value)
    if (!isEdit) {
      setSlug(e.target.value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)+/g, ""))
    }
  }
  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight text-zinc-900 ">
          {isEdit ? "Edit Post" : "New Post"}
        </h1>
        <div className="flex items-center gap-4">
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={published}
              onChange={(e) => setPublished(e.target.checked)}
              className="rounded border-zinc-300 text-blue-600 focus:ring-blue-600"
            />
            <span className="text-sm font-medium text-zinc-900 ">Published</span>
          </label>
          <button
            type="submit"
            disabled={isLoading}
            className="rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 disabled:opacity-50"
          >
            {isLoading ? "Saving..." : "Save Post"}
          </button>
        </div>
      </div>
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white  p-6 rounded-2xl shadow-sm border border-zinc-200  space-y-4">
            <div>
              <label className="block text-sm font-medium text-zinc-900  mb-1">Title</label>
              <input
                type="text"
                required
                value={title}
                onChange={handleTitleChange}
                className="block w-full rounded-md border-0 py-1.5 text-zinc-900  shadow-sm ring-1 ring-inset ring-zinc-300  bg-transparent px-3"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-zinc-900  mb-1">Content (HTML or Markdown)</label>
              <textarea
                required
                value={content}
                onChange={(e) => setContent(e.target.value)}
                rows={15}
                className="block w-full rounded-md border-0 py-1.5 text-zinc-900  shadow-sm ring-1 ring-inset ring-zinc-300  bg-transparent px-3 font-mono text-sm"
              />
            </div>
          </div>
        </div>
        <div className="space-y-6">
          <div className="bg-white  p-6 rounded-2xl shadow-sm border border-zinc-200  space-y-4">
            <div>
              <label className="block text-sm font-medium text-zinc-900  mb-1">Slug</label>
              <input
                type="text"
                required
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
                className="block w-full rounded-md border-0 py-1.5 text-zinc-900  shadow-sm ring-1 ring-inset ring-zinc-300  bg-transparent px-3"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-zinc-900  mb-1">Excerpt</label>
              <textarea
                value={excerpt}
                onChange={(e) => setExcerpt(e.target.value)}
                rows={4}
                className="block w-full rounded-md border-0 py-1.5 text-zinc-900  shadow-sm ring-1 ring-inset ring-zinc-300  bg-transparent px-3"
              />
            </div>
          </div>
        </div>
      </div>
    </form>
  )
}
