'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { use } from 'react'; // Import use to unwrap params
import TeamStats from '@/components/TeamStats';
import FeedingPanel from '@/components/FeedingPanel';
import { io } from 'socket.io-client';
import Commentary from '@/components/Commentry';

const SOCKET_URL = process.env.NEXT_PUBLIC_SOCKET_URL || 'http://localhost:4000';

const MatchPanel = ({ params }) => {
  const { id } = use(params);  // Unwrap params with React.use()
  const [match, setMatch] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const fetchMatch = async () => {
      try {
        const response = await fetch(`/api/match/getmatch/${id}`);
        const data = await response.json();
        setMatch(data);
      } catch (error) {
        console.error('Error fetching match details:', error);
      }
    };

    fetchMatch();
  }, [id]);

  useEffect(() => {
    const socket = io(SOCKET_URL);

    socket.on('connect', () => {
      console.log('Connected to WebSocket server');
    });

    socket.on('score-updated', (updatedMatch) => {
      console.log('Score update received:', updatedMatch);
      setMatch(updatedMatch);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  console.log(match);

  const handleUpdateMatch = async () => {
    // Logic for updating the match stats
  };

  if (!match) return <div className="text-center p-8">Loading match data...</div>;

  return (
    <div className="max-w-6xl mx-auto p-6">
      {/* Match Header */}
      <h1 className="text-3xl font-semibold text-gray-900 mb-6 text-center">
        {match.team1} vs {match.team2}
      </h1>

      {/* Team Stats Section */}
      <div className="mb-6 bg-white p-6 shadow-lg rounded-lg">
        <TeamStats match={match} />
      </div>

      {/* Commentary Section */}
      <div className="mb-6 bg-white p-6 shadow-lg rounded-lg">
        <Commentary commentary={match?.commentary || []} />
      </div>


      {/* Optional: Button for updating the match */}
      {/* <button 
        onClick={handleUpdateMatch}
        className="bg-green-500 text-white px-6 py-3 rounded-lg w-full md:w-auto"
      >
        Update Match
      </button> */}
    </div>
  );
};

export default MatchPanel;
