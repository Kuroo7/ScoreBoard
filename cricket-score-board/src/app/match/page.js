import ProtectedRoute from '@/app/utils/ProtectedRoute';
import MatchList from '@/components/MatchList';
import TeamStats from '@/components/TeamStats';

const Matches = () => {
  return (
    <ProtectedRoute>
      <div className="matches-page max-w-6xl mx-auto p-6">
        {/* Page Header */}
        <h1 className="text-3xl font-semibold text-gray-900 mb-6">Match Information</h1>

        {/* Match List Section */}
        <div className="bg-white shadow-lg rounded-lg p-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Upcoming Matches</h2>
          <MatchList />
        </div>

        {/* Optional: Team Stats (commented out for now) */}
        {/* <TeamStats match={matchData} /> */}
      </div>
    </ProtectedRoute>
  );
};

export default Matches;
