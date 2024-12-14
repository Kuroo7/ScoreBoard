'use client';

const TeamStats = ({ match }) => {
  if (!match) return <p>Loading...</p>;

  const { 
    team1Score, 
    team2Score, 
    currentBatsman, 
    currentBowler, 
    batsmanStats, 
    bowlerStats 
  } = match;

  // Find the current batsman and bowler stats
  const currentBatsmanStats = batsmanStats.find(batsman => batsman.batsmanName === currentBatsman);
  const currentBowlerStats = bowlerStats.find(bowler => bowler.bowlerName === currentBowler);

  return (
    <div className="p-6 bg-white shadow-lg rounded-lg max-w-4xl mx-auto">
      <h2 className="text-2xl font-semibold mb-6 text-gray-800">Team Stats</h2>
      
      {/* Team Scores */}
      <div className="mb-4">
        <p className="text-lg text-gray-700"><strong>Team 1 Score:</strong> {team1Score}</p>
        <p className="text-lg text-gray-700"><strong>Team 2 Score:</strong> {team2Score}</p>
      </div>
      
      {/* Current Batsman Stats */}
      <div className="mb-4">
        <p className="text-lg text-gray-700"><strong>Current Batsman:</strong> {currentBatsman}</p>
        {currentBatsmanStats ? (
          <div className="space-y-2">
            <p><strong>Runs:</strong> {currentBatsmanStats.runs}</p>
            <p><strong>Balls Faced:</strong> {currentBatsmanStats.balls}</p>
            <p><strong>Status:</strong> {currentBatsmanStats.isOut ? 'Out' : 'Not Out'}</p>
          </div>
        ) : (
          <p className="text-gray-500">No stats available for current batsman</p>
        )}
      </div>

      {/* Current Bowler Stats */}
      <div className="mb-4">
        <p className="text-lg text-gray-700"><strong>Current Bowler:</strong> {currentBowler}</p>
        {currentBowlerStats ? (
          <div className="space-y-2">
            <p><strong>Overs Bowled:</strong> {currentBowlerStats.overs}</p>
            <p><strong>Runs Conceded:</strong> {currentBowlerStats.runsConceded}</p>
            <p><strong>Wickets Taken:</strong> {currentBowlerStats.wickets}</p>
          </div>
        ) : (
          <p className="text-gray-500">No stats available for current bowler</p>
        )}
      </div>
    </div>
  );
};

export default TeamStats;
