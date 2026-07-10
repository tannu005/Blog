import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import Category from '@/models/Category';
import { adminMiddleware } from '@/lib/auth';
export async function GET() {
  try {
    await connectDB();
    const categories = await Category.find({}).sort({ name: 1 });
    return NextResponse.json(categories);
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
    const { name, slug, description } = body;
    const categoryExists = await Category.findOne({ slug });
    if (categoryExists) {
      return NextResponse.json({ error: 'Category slug already exists' }, { status: 400 });
    }
    const category = await Category.create({ name, slug, description });
    return NextResponse.json(category, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
