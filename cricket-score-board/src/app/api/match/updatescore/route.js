import Match from '@/app/models/Match';
import connectDB from '@/app/utils/db';
import { NextResponse } from 'next/server';

const SOCKET_SERVER_URL = process.env.SOCKET_SERVER_URL || 'http://localhost:4000';

export async function POST(req) {
  const { matchId, runs, strikeChange } = await req.json();

  if (!matchId || runs === undefined || strikeChange === undefined) {
    return NextResponse.json(
      { message: 'Please provide matchId, runs, and strikeChange.' },
      { status: 400 }
    );
  }

  try {
    await connectDB();

    const match = await Match.findById(matchId);
    if (!match) {
      return NextResponse.json({ message: 'Match not found.' }, { status: 404 });
    }

    if (strikeChange) {
      match.currentBatsman = match.currentBatsman === match.team1 ? match.team2 : match.team1;
    }
    if (match.currentBatsman === match.team1) {
      match.team1Score += runs;
    } else {
      match.team2Score += runs;
    }
    match.commentary.push(`${runs} runs to ${match.currentBatsman === match.team1 ? match.team1 : match.team2}`);
    await match.save();

    // Forward updated match data to the Socket.IO server
    await fetch(`${SOCKET_SERVER_URL}/emit-score`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(match),
    });

    return NextResponse.json({ message: 'Score updated successfully.', match }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'Server error.' }, { status: 500 });
  }
}
