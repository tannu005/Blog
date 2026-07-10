"use client"
import { useEffect, useState } from "react"
import PostEditor from "@/components/PostEditor"
export default function EditPostPage({ params }: { params: { slug: string } }) {
  const [post, setPost] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)
  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await fetch(`/api/posts/${params.slug}`)
        const data = await res.json()
        setPost(data)
      } catch (error) {
        console.error(error)
      } finally {
        setIsLoading(false)
      }
    }
    fetchPost()
  }, [params.slug])
  if (isLoading) return <div>Loading editor...</div>
  if (!post) return <div>Post not found</div>
  return <PostEditor initialData={post} isEdit={true} />
}
