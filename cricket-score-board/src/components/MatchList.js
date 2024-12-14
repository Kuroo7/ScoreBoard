'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/app/context/authcontext';
import { useRouter } from 'next/navigation';

const MatchList = () => {
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    const fetchMatches = async () => {
      try {
        const response = await fetch('/api/match/getmatch');
        const data = await response.json();
        setMatches(data);
      } catch (error) {
        console.error('Error fetching matches:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMatches();
  }, []);

  const handleMatchClick = (id) => {
    if (user?.role === 'admin') {
      router.push(`/admin/match/${id}`);
    } else {
      router.push(`/match/${id}`);
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Available Matches</h1>
      {matches.map((match) => (
        <div
          key={match._id}
          onClick={() => handleMatchClick(match._id)}
          className="p-4 hover:bg-white mb-2 bg-gray-100 rounded shadow cursor-pointer"
        >
          <h2>{match.team1} vs {match.team2}</h2>
        </div>
      ))}
    </div>
  );
};

export default MatchList;
