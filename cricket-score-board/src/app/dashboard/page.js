'use client';

import ProtectedRoute from '@/app/utils/ProtectedRoute';
import CreateMatchForm from '@/components/CreateMatchForm';
import MatchList from '@/components/MatchList';
import TeamStats from '@/components/TeamStats';
import { useState, useEffect } from 'react';
import { io } from 'socket.io-client';
const SOCKET_URL = process.env.NEXT_PUBLIC_SOCKET_URL || 'http://localhost:4000';

const AdminDashboard = () => {
  const [match, setMatch] = useState(null);

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

  return (
    <ProtectedRoute adminOnly={true}>
      <div className="min-h-screen bg-gray-100 p-6">
        <h1 className="text-3xl font-bold text-center mb-8">Admin Dashboard</h1>

        {/* Create Match and Match List Side by Side */}
        <div className="flex gap-6 mb-6">
          {/* Create Match Form */}
          <div className="flex-1">
            <CreateMatchForm />
          </div>

          {/* Match List */}
          <div className="flex-1">
            <MatchList />
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default AdminDashboard;
