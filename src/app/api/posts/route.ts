import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import Post from '@/models/Post';
import Category from '@/models/Category';
import { adminMiddleware } from '@/lib/auth';
export async function GET(req: Request) {
  try {
    await connectDB();
    const { searchParams } = new URL(req.url);
    const published = searchParams.get('published');
    let query: any = {};
    if (published === 'true') {
      query.published = true;
    } else if (published === 'false') {
      query.published = false;
    }
    const posts = await Post.find(query)
      .populate('author', 'name email')
      .populate('categories', 'name slug')
      .sort({ createdAt: -1 });
    return NextResponse.json(posts);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
export async function POST(req: Request) {
  try {
    const authResult = await adminMiddleware(req);
    if (authResult instanceof NextResponse) return authResult;
    await connectDB();
    const body = await req.json();
    const { title, slug, content, excerpt, coverImage, categories, tags, published } = body;
    const postExists = await Post.findOne({ slug });
    if (postExists) {
      return NextResponse.json({ error: 'Post slug already exists' }, { status: 400 });
    }
    const post = await Post.create({
      title,
      slug,
      content,
      excerpt,
      coverImage,
      author: authResult.id,
      categories,
      tags,
      published,
      publishedAt: published ? new Date() : undefined,
    });
    return NextResponse.json(post, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
