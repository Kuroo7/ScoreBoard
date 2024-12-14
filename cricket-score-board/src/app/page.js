'use client';

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const [match, setMatch] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const fetchMatch = async () => {
      try {
        const response = await fetch('/api/match/getmatch');  // Update with the actual endpoint to fetch live match data
        const data = await response.json();
        setMatch(data);
      } catch (error) {
        console.error('Error fetching match data:', error);
      }
    };

    fetchMatch();
  }, []);

  console.log(match);

  const handleViewMatch = (id) => {
    if (match) {
      router.push(`/match/${id}`);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-t from-gray-100 via-gray-200 to-gray-300 p-8 pb-20 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <button
        onClick={() => router.push('/login')}
        className="absolute top-8 right-8 bg-gray-800 text-white py-2 px-6 rounded-lg hover:bg-gray-700 transition-colors shadow-md"
      >
        Login
      </button>

      <main className="flex flex-col gap-12 sm:gap-16 row-start-2 items-center sm:items-start relative max-w-5xl mx-auto text-center sm:text-left">
        {/* Hero Section */}
        <h1 className="text-4xl font-extrabold text-gray-900 mb-6 sm:mb-10 leading-tight tracking-tight">
          Welcome to the Cricket Scoring App
        </h1>

        {/* Live Match Overview */}
        {match ? (
          <div className="w-full max-w-lg sm:max-w-3xl mx-auto space-y-8">
            {match.map((m) => (
              <div key={m._id} className="bg-white p-6 shadow-lg rounded-xl space-y-4">
                {/* View Match Button moved to top-right */}
               
                <div>
                  <p className="text-lg text-gray-700 mb-2">
                    <span className="font-semibold text-blue-600">{m.team1}</span> vs <span className="font-semibold text-blue-600">{m.team2}</span>
                  </p>
                  <p className="text-md text-gray-600 mb-4">
                    Current Score: <span className="font-bold text-green-500">{m.team1Score}</span> - <span className="font-bold text-red-500">{m.team2Score}</span>
                  </p>
                </div>
                <button
                  onClick={() => handleViewMatch(m._id)}
                  className=" bg-blue-500 text-white py-1.5 px-4 rounded-md hover:bg-blue-600 transition-colors shadow-md"
                >
                  View Match Details
                </button>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-gray-200 p-6 shadow-lg rounded-xl mb-6 w-full max-w-lg sm:max-w-3xl mx-auto text-center">
            <p className="text-lg text-gray-600 mb-4">No active match currently</p>
            {/* Option for users to go to the match page if there is no active match */}
            <button
              onClick={() => router.push('/match')}
              className="mt-4 bg-gray-600 text-white py-2 px-6 rounded-lg hover:bg-gray-700 transition-colors shadow-md"
            >
              Go to Match Page
            </button>
          </div>
        )}
      </main>

      {/* Footer Section */}
      {/* <footer className="absolute bottom-0 w-full text-center text-sm text-gray-600 py-4">
        <p>&copy; 2024 Cricket Scoring App. All rights reserved.</p>
      </footer> */}
    </div>
  );
}
