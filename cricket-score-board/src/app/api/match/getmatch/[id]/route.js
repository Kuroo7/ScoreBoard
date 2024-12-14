import Match from '@/app/models/Match';
import connectDB from '@/app/utils/db';
import { NextResponse } from 'next/server';

export async function GET(req, { params }) {

  
  
  const { id } = params;

  try {
    await connectDB();
    const match = await Match.findById(id);

    if (!match) {
      return NextResponse.json({ message: 'Match not found.' }, { status: 404 });
    }

    return NextResponse.json(match, { status: 200 });
  } catch (error) {
    console.error('Error fetching match:', error);
    return NextResponse.json({ message: 'Server error. Please try again later.' }, { status: 500 });
  }
}
