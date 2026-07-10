import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import Post from '@/models/Post';
import { adminMiddleware } from '@/lib/auth';
export async function GET(req: Request, { params }: { params: Promise<{ slug: string }> }) {
  try {
    await connectDB();
    const { slug } = await params;
    const post = await Post.findOne({ slug })
      .populate('author', 'name email')
      .populate('categories', 'name slug');
    if (!post) {
      return NextResponse.json({ error: 'Post not found' }, { status: 404 });
    }
    return NextResponse.json(post);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
export async function PUT(req: Request, { params }: { params: Promise<{ slug: string }> }) {
  try {
    const authResult = await adminMiddleware(req);
    if (authResult instanceof NextResponse) return authResult;
    await connectDB();
    const body = await req.json();
    const { title, reqSlug, content, excerpt, coverImage, categories, tags, published } = body;
    const { slug } = await params;
    const post = await Post.findOne({ slug });
    if (!post) {
      return NextResponse.json({ error: 'Post not found' }, { status: 404 });
    }
    post.title = title || post.title;
    post.slug = reqSlug || post.slug;
    post.content = content || post.content;
    post.excerpt = excerpt !== undefined ? excerpt : post.excerpt;
    post.coverImage = coverImage || post.coverImage;
    post.categories = categories || post.categories;
    post.tags = tags || post.tags;
    if (published !== undefined && post.published !== published) {
      post.published = published;
      if (published) {
        post.publishedAt = new Date();
      }
    }
    const updatedPost = await post.save();
    return NextResponse.json(updatedPost);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
export async function DELETE(req: Request, { params }: { params: Promise<{ slug: string }> }) {
  try {
    const authResult = await adminMiddleware(req);
    if (authResult instanceof NextResponse) return authResult;
    await connectDB();
    const { slug } = await params;
    const post = await Post.findOne({ slug });
    if (!post) {
      return NextResponse.json({ error: 'Post not found' }, { status: 404 });
    }
    await post.deleteOne();
    return NextResponse.json({ message: 'Post removed' });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
