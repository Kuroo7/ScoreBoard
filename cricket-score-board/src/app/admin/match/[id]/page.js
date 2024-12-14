'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { use } from 'react'; // Import use to unwrap params
import TeamStats from '@/components/TeamStats';
import FeedingPanel from '@/components/FeedingPanel';
import { io } from 'socket.io-client';
import Commentary from '@/components/Commentry';

const SOCKET_URL = process.env.NEXT_PUBLIC_SOCKET_URL || 'http://localhost:4000';

const AdminMatchPanel = ({ params }) => {
  const { id } = use(params);  // Unwrap params with React.use()
  const [match, setMatch] = useState(null);
  const router = useRouter();

  // Fetch match details when the component mounts
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

  // WebSocket to receive real-time updates
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

  if (!match) return <div className="text-center text-xl font-semibold">Loading...</div>;

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-center mb-6">
        {match.team1} vs {match.team2}
      </h1>

      {/* Match Details Section */}
      <div className="flex gap-6 mb-6">
        {/* TeamStats and Commentary side by side */}
        <div className="flex-1">
          <TeamStats match={match} />
        </div>

        <div className="flex-1">
          
          <Commentary commentary={match?.commentary || []} />
        </div>
      </div>

      {/* Feeding Panel for Score Input */}
      <div className="mb-6">
        <FeedingPanel match={match} />
      </div>

      {/* Match Actions (Optional) */}
      <div className="text-center">
        <button
          onClick={() => router.push(`/admin/matches`)}
          className="bg-blue-500 text-white px-6 py-2 rounded-full hover:bg-blue-600 transition"
        >
          Back to Matches List
        </button>
      </div>
    </div>
  );
};

export default AdminMatchPanel;
