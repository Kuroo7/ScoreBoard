'use client';

import { useState } from 'react';

const FeedingPanel = ({ match }) => {
  const [runs, setRuns] = useState(0);
  const [feedback, setFeedback] = useState('');

  const handleSubmit = async (type, runs) => {
    const payload = {
      matchId: match?._id,
      runs: type === 'run' ? runs : 0,
      strikeChange: type === 'run' && runs % 2 !== 0,  // Change strike for odd runs
    };

    try {
      const response = await fetch('/api/match/updatescore', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (response.ok) {
        setFeedback('Score updated successfully!');
        setRuns(0);  // Reset the runs after successful submission
      } else {
        setFeedback('Error: ' + data.message);
      }
    } catch (error) {
      console.error('Error updating score:', error);
      setFeedback('Failed to update score. Please try again.');
    }
  };

  return (
    <div className="p-6 bg-white shadow rounded-lg">
      <h2 className="text-2xl font-semibold mb-6 text-gray-800">Feeding Panel</h2>
      
      <div className="space-y-4">
        <div className="grid grid-cols-3 gap-4">
          {/* Score Buttons for Runs */}
          {[0, 1, 2, 3, 4, 6].map((num) => (
            <button
              key={num}
              className="px-6 py-3 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 transition-all"
              onClick={() => {
                setRuns(num);
                handleSubmit('run', num);
              }}
            >
              {num}
            </button>
          ))}
        </div>

        <div className="flex justify-center space-x-4 mt-4">
          {/* Extra Buttons for Wides / No Balls */}
          <button
            className="px-6 py-3 bg-yellow-500 text-white rounded-lg shadow-md hover:bg-yellow-600 transition-all"
            onClick={() => handleSubmit('extra', runs)}
          >
            Add Extra (Wide/No Ball)
          </button>
        </div>

        <div className="mt-6">
          {/* Feedback or Success/Error Messages */}
          {feedback && (
            <p className="text-center text-lg font-medium text-green-600">{feedback}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default FeedingPanel;
