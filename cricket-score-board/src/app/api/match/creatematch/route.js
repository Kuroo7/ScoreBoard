import Match from '@/app/models/Match';
import connectDB from '@/app/utils/db';
import { NextResponse } from 'next/server';

// Create new match (POST /api/match)
export async function POST(req) {
  const { team1, team2,currentBatsman,currentBowler } = await req.json();

  if (!team1 || !team2) {
    return NextResponse.json({ message: 'Please provide both teams.' }, { status: 400 });
  }

  try {
    await connectDB();

    // Create the match document
    const match = new Match({
      team1,
      team2,
      team1Score: 0,
      team2Score: 0,
      currentBatsman,  // Empty or placeholder batsman name
      currentBowler,   // Empty or placeholder bowler name
      batsmanStats: [],
      bowlerStats: [],
      commentary: [],
    });

    // Save the match to the database
    await match.save();

    // Return the match with the generated _id (matchId) in the response
    return NextResponse.json({ message: 'Match created successfully.', matchId: match._id }, { status: 201 });
  } catch (error) {
    console.error('Error creating match:', error);
    return NextResponse.json({ message: 'Server error. Please try again later.' }, { status: 500 });
  }
}
