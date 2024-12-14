import Match from '@/app/models/Match';
import connectDB from '@/app/utils/db';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    await connectDB();
    const matches = await Match.find(); // Fetch all matches
    return NextResponse.json(matches, { status: 200 });
  } catch (error) {
    console.error('Error fetching matches:', error);
    return NextResponse.json({ message: 'Server error. Please try again later.' }, { status: 500 });
  }
}
