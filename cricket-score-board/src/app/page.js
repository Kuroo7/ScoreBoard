'use client';

// import Image from "next/image";
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
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
       
        <h1 className="text-3xl font-semibold text-gray-900 text-center mb-6">
          Welcome to the Cricket Scoring App
        </h1>

        {/* Live Match Overview */}
        {match ? (
          <div className="bg-white p-6 shadow-lg rounded-lg mb-6 w-full max-w-xl">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Current Match</h2>
            {
              match.map((m)=>(
                <div key={m._id} > 
            <p className="text-lg text-gray-700 mb-2">
              <span className="font-semibold">{m.team1}</span> vs <span className="font-semibold">{m.team2}</span>
            </p>
            <p className="text-md text-gray-600">
              Current Score: {m.team1Score} - {m.team2Score}
            </p>
            <button
              onClick={() => handleViewMatch(m._id)}
              className="mt-4 bg-blue-500 text-white py-2 px-6 rounded-lg hover:bg-blue-600 transition-colors"
              >
              View Match Details
            </button>
              </div>
             ))
            }
          </div>
        ) : (
          <div className="bg-gray-200 p-6 shadow-lg rounded-lg mb-6 w-full max-w-xl text-center">
            <p className="text-lg text-gray-600">No active match currently</p>
            {/* Option for users to go to the match page if there is no active match */}
            <button
              onClick={() => router.push('/match')}
              className="mt-4 bg-gray-500 text-white py-2 px-6 rounded-lg hover:bg-gray-600 transition-colors"
            >
              Go to Match Page
            </button>
          </div>
        )}

        {/* Instructions or Quick Links */}
        
      </main>

      {/* Footer Section */}
      
    </div>
  );
}
