import connectDB from "@/lib/db"
import Post from "@/models/Post"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"

export const dynamic = 'force-dynamic'

async function getPost(slug: string) {
  try {
    if (!process.env.MONGODB_URI) return null
    await connectDB()
    const post = await Post.findOne({ slug, published: true })
      .populate('author', 'name')
      .populate('categories', 'name slug')
      .lean()
    
    if (!post) return null
    return JSON.parse(JSON.stringify(post))
  } catch (error) {
    return null
  }
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const post = await getPost(params.slug)
  if (!post) {
    return { title: 'Post Not Found' }
  }
  return {
    title: `${post.title} | Kuldeep Insights`,
    description: post.excerpt || `Read ${post.title}`,
    openGraph: {
      title: `${post.title} | Kuldeep Insights`,
      description: post.excerpt || `Read ${post.title}`,
      type: "article",
      url: `https://kuldeepinsights.in/blog/${params.slug}`,
      images: post.coverImage ? [post.coverImage] : [],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt || `Read ${post.title}`,
      images: post.coverImage ? [post.coverImage] : [],
    }
  }
}

export default async function BlogDetailsPage({ params }: { params: { slug: string } }) {
  const post = await getPost(params.slug)
  
  if (!post) {
    notFound()
  }

  const formattedDate = new Date(post.publishedAt || post.createdAt).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  })

  return (
    <article className="bg-[#f4f7f9] min-h-screen py-20">
      <div className="mx-auto max-w-3xl px-6 lg:px-8">
        
        <div className="mb-12 text-center">
          {post.categories && post.categories.length > 0 && (
            <Link
              href={`/category/${post.categories[0].slug}`}
              className="text-[10px] font-bold tracking-widest text-[#2a5b9e] uppercase hover:text-[#0b1c3c] mb-6 inline-block transition-colors bg-white px-4 py-2 rounded-full shadow-sm border border-gray-100"
            >
              {post.categories[0].name}
            </Link>
          )}
          
          <h1 className="text-4xl md:text-5xl font-serif font-bold tracking-tight text-[#0b1c3c] leading-[1.2] mb-8">
            {post.title}
          </h1>
          
          <div className="flex items-center justify-center space-x-3 text-sm text-gray-500 font-serif italic">
            <span>By <span className="font-bold text-[#0b1c3c] not-italic">{post.author?.name || 'Kuldeep'}</span></span>
            <span>&bull;</span>
            <time dateTime={post.publishedAt || post.createdAt}>{formattedDate}</time>
          </div>
        </div>

        {post.coverImage && (
          <div className="relative w-full aspect-video rounded-[2rem] overflow-hidden mb-16 shadow-2xl shadow-blue-900/10 border border-white">
            <Image
              src={post.coverImage}
              alt={post.title}
              fill
              className="object-cover"
              priority
              sizes="(max-width: 1024px) 100vw, 800px"
            />
          </div>
        )}

        <div className="bg-white rounded-[2.5rem] p-8 sm:p-12 shadow-xl shadow-gray-200/50 border border-gray-100">
          <div 
            className="prose prose-lg mx-auto prose-zinc prose-headings:font-serif prose-headings:text-[#0b1c3c] prose-p:font-serif prose-p:leading-relaxed prose-a:text-[#2a5b9e] hover:prose-a:text-[#0b1c3c] prose-a:transition-colors prose-img:rounded-2xl"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        </div>

      </div>
    </article>
  )
}
