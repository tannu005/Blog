import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import Category from '@/models/Category';
import { adminMiddleware } from '@/lib/auth';
export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const authResult = await adminMiddleware(req);
    if (authResult instanceof NextResponse) return authResult;
    await connectDB();
    const body = await req.json();
    const { name, slug, description } = body;
    const { id } = await params;
    const category = await Category.findById(id);
    if (!category) {
      return NextResponse.json({ error: 'Category not found' }, { status: 404 });
    }
    category.name = name || category.name;
    category.slug = slug || category.slug;
    category.description = description || category.description;
    const updatedCategory = await category.save();
    return NextResponse.json(updatedCategory);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const authResult = await adminMiddleware(req);
    if (authResult instanceof NextResponse) return authResult;
    await connectDB();
    const { id } = await params;
    const category = await Category.findById(id);
    if (!category) {
      return NextResponse.json({ error: 'Category not found' }, { status: 404 });
    }
    await category.deleteOne();
    return NextResponse.json({ message: 'Category removed' });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
