import { NextResponse } from 'next/server';
import cloudinary from '@/lib/cloudinary';
import { adminMiddleware } from '@/lib/auth';
import { Readable } from 'stream';
export async function POST(req: Request) {
  try {
    const authResult = await adminMiddleware(req);
    if (authResult instanceof NextResponse) return authResult;
    const formData = await req.formData();
    const file = formData.get('file') as File;
    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const result = await new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        { folder: 'personal-blog' },
        (error, result) => {
          if (error) reject(error);
          else resolve(result);
        }
      );
      const stream = Readable.from(buffer);
      stream.pipe(uploadStream);
    });
    return NextResponse.json(result);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
