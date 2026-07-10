import Link from "next/link"
import Image from "next/image"
import { ArrowRight } from "lucide-react"

interface PostCardProps {
  post: {
    title: string
    slug: string
    excerpt?: string
    coverImage?: string
    createdAt: string
    categories?: { name: string }[]
  }
}

export default function PostCard({ post }: PostCardProps) {
  const formattedDate = new Date(post.createdAt).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  })

  return (
    <article className="group relative flex flex-col items-start justify-between rounded-[2rem] bg-zinc-50 border border-zinc-100 p-8 transition-all duration-500 hover:shadow-2xl hover:shadow-black/5 hover:-translate-y-2 h-full">
      {post.coverImage && (
        <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden mb-8 bg-zinc-200">
          <Image
            src={post.coverImage}
            alt={post.title}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
      )}
      <div className="flex items-center gap-x-4 text-xs mb-6">
        <time dateTime={post.createdAt} className="text-zinc-500 font-sans tracking-wide">
          {formattedDate}
        </time>
        {post.categories && post.categories.length > 0 && (
          <span className="relative z-10 rounded-full bg-white border border-zinc-200 px-4 py-1.5 font-bold tracking-widest uppercase text-[9px] text-black">
            {post.categories[0].name}
          </span>
        )}
      </div>
      <div className="flex-1 flex flex-col justify-between w-full">
        <div>
          <h3 className="text-2xl font-bold font-serif leading-tight text-black group-hover:text-zinc-600 transition-colors duration-300">
            <Link href={`/blog/${post.slug}`}>
              <span className="absolute inset-0 z-20" />
              {post.title}
            </Link>
          </h3>
          {post.excerpt && (
            <p className="mt-4 line-clamp-3 text-sm leading-relaxed text-zinc-500 font-sans">
              {post.excerpt}
            </p>
          )}
        </div>
        
        <div className="mt-10 flex items-center gap-2 text-[10px] font-bold tracking-[0.2em] uppercase text-black group-hover:text-zinc-500 transition-colors duration-300">
          Read Story <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
        </div>
      </div>
    </article>
  )
}
