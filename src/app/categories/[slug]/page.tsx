import connectDB from "@/lib/db"
import Post from "@/models/Post"
import Category from "@/models/Category"
import PostCard from "@/components/PostCard"
import Link from "next/link"
import { notFound } from "next/navigation"

export const dynamic = 'force-dynamic'

async function getCategoryData(slug: string) {
  try {
    if (!process.env.MONGODB_URI) return { category: null, posts: [] }
    await connectDB()
    const category = await Category.findOne({ slug }).lean()
    
    if (!category) return { category: null, posts: [] }

    const posts = await Post.find({ categories: category._id, published: true })
      .populate('categories', 'name slug')
      .sort({ createdAt: -1 })
      .lean()
      
    return { 
      category: JSON.parse(JSON.stringify(category)), 
      posts: JSON.parse(JSON.stringify(posts)) 
    }
  } catch (error) {
    return { category: null, posts: [] }
  }
}

export default async function CategoryPage(props: { params: Promise<{ slug: string }> }) {
  const params = await props.params;
  const { category, posts } = await getCategoryData(params.slug)

  const displayTitle = category ? category.name : params.slug.toUpperCase()
  const displayDesc = category ? category.description : `Exploring stories about ${params.slug}.`

  return (
    <div className="bg-[#F5F1E8] min-h-screen py-20">
      <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8">
        
        <div className="mb-8">
          <Link href="/categories" className="font-sans text-sm font-semibold text-[#0ECAD4] hover:text-[#1B4F7C] transition-colors">
            &larr; Back to Categories
          </Link>
        </div>

        <div className="flex flex-col items-start mb-16">
          <span className="font-mono text-[12px] tracking-[1px] text-[#0ECAD4] uppercase font-semibold mb-4">
            Category
          </span>
          <h1 className="font-serif text-5xl md:text-[64px] font-bold tracking-tight text-[#1B4F7C] mb-6">
            {displayTitle}
          </h1>
          <div className="w-16 h-[3px] bg-[#0ECAD4] rounded-full mb-6"></div>
          <p className="font-sans text-[18px] text-[#1A1A1A] max-w-[600px] leading-[1.6]">
            {displayDesc}
          </p>
        </div>

        {posts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post: any) => (
              <PostCard key={post._id} post={post} />
            ))}
          </div>
        ) : (
          <div className="mt-16 text-center py-20 bg-white rounded-xl border border-[#E0E0E0] shadow-[0_4px_12px_rgba(0,0,0,0.08)]">
            <p className="font-sans text-[#6B6B6B] text-[18px]">No stories published in this category yet. Keep exploring!</p>
          </div>
        )}
      </div>
    </div>
  )
}
