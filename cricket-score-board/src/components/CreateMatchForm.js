'use client';

import { useState } from 'react';

const CreateMatchForm = () => {
  const [team1, setTeam1] = useState('');
  const [team2, setTeam2] = useState('');
  const [team1Score, setTeam1Score] = useState(0);
  const [team2Score, setTeam2Score] = useState(0);
  const [currentBatsman, setCurrentBatsman] = useState('');
  const [currentBowler, setCurrentBowler] = useState('');
  const [message, setMessage] = useState('');

  const handleCreateMatch = async (e) => {
    e.preventDefault();

    const matchData = {
      team1,
      team2,
      team1Score,
      team2Score,
      currentBatsman,
      currentBowler,
      batsmanStats: [],
      bowlerStats: [],
      commentary: [],
    };
console.log(matchData);

    try {
      const response = await fetch('/api/match/creatematch', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(matchData),
      });

      const data = await response.json();

      console.log(data);
      

      if (response.ok) {
        setMessage(`Match created successfully! Match ID: ${data.matchId}`);
        // Reset form after success
        setTeam1('');
        setTeam2('');
        setTeam1Score(0);
        setTeam2Score(0);
        setCurrentBatsman('');
        setCurrentBowler('');
      } else {
        setMessage(data.message);
      }
    } catch (error) {
      console.error('Error creating match:', error);
      setMessage('Failed to create match. Please try again later.');
    }
  };

  return (
    <form onSubmit={handleCreateMatch} className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold text-center mb-6">Create New Match</h2>
      
      <div className="mb-4">
        <label className="block mb-2 text-sm font-medium text-gray-700">Team 1</label>
        <input
          type="text"
          value={team1}
          onChange={(e) => setTeam1(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>

      <div className="mb-4">
        <label className="block mb-2 text-sm font-medium text-gray-700">Team 2</label>
        <input
          type="text"
          value={team2}
          onChange={(e) => setTeam2(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>

      <div className="mb-4">
        <label className="block mb-2 text-sm font-medium text-gray-700">Team 1 Score</label>
        <input
          type="number"
          value={team1Score}
          onChange={(e) => setTeam1Score(Number(e.target.value))}
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          min="0"
        />
      </div>

      <div className="mb-4">
        <label className="block mb-2 text-sm font-medium text-gray-700">Team 2 Score</label>
        <input
          type="number"
          value={team2Score}
          onChange={(e) => setTeam2Score(Number(e.target.value))}
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          min="0"
        />
      </div>

      <div className="mb-4">
        <label className="block mb-2 text-sm font-medium text-gray-700">Current Batsman</label>
        <input
          type="text"
          value={currentBatsman}
          onChange={(e) => setCurrentBatsman(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="mb-6">
        <label className="block mb-2 text-sm font-medium text-gray-700">Current Bowler</label>
        <input
          type="text"
          value={currentBowler}
          onChange={(e) => setCurrentBowler(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <button type="submit" className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 transition">
        Create Match
      </button>

      {message && <p className="mt-4 text-center text-sm text-gray-700">{message}</p>}
    </form>
  );
};

export default CreateMatchForm;
