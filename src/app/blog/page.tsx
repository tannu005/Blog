import connectDB from "@/lib/db"
import Post from "@/models/Post"
import PostCard from "@/components/PostCard"

export const dynamic = 'force-dynamic'

async function getPosts(searchQuery: string = "") {
  try {
    if (!process.env.MONGODB_URI) return []
    await connectDB()
    
    let query: any = { published: true }
    if (searchQuery) {
      query.$or = [
        { title: { $regex: searchQuery, $options: "i" } },
        { excerpt: { $regex: searchQuery, $options: "i" } }
      ]
    }

    const posts = await Post.find(query)
      .populate('categories', 'name slug')
      .sort({ createdAt: -1 })
      .lean()
    return JSON.parse(JSON.stringify(posts))
  } catch (error) {
    return []
  }
}

export default async function BlogListingPage({ searchParams }: { searchParams: { search?: string } }) {
  const posts = await getPosts(searchParams.search || "")
  
  return (
    <div className="bg-[#F5F1E8] min-h-screen py-20">
      <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col items-center text-center mb-16">
          <span className="font-mono text-[12px] tracking-[1px] text-[#0ECAD4] uppercase font-semibold mb-4">
            My Journal
          </span>
          <h1 className="font-serif text-5xl md:text-[64px] font-bold tracking-tight text-[#1B4F7C] mb-6">
            Latest Stories
          </h1>
          <div className="w-16 h-[3px] bg-[#0ECAD4] rounded-full mb-6"></div>
          <p className="font-sans text-[18px] text-[#1A1A1A] max-w-[600px] leading-[1.6]">
            Read my latest thoughts, stories, and experiences. Exploring life beyond the horizon, one post at a time.
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
            <p className="font-sans text-[#6B6B6B] text-[18px]">No stories published yet. Keep exploring and check back soon!</p>
          </div>
        )}
      </div>
    </div>
  )
}
