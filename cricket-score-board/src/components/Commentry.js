'use client';

const Commentary = ({ commentary }) => {
  return (
    <div className="p-6 bg-white shadow rounded-lg max-w-4xl mx-auto">
      <h2 className="text-2xl font-semibold mb-4 text-gray-800">Live Commentary</h2>
      <div className="max-h-96 overflow-y-auto">
        <ul className="space-y-4">
          {commentary.map((line, index) => (
            <li key={index} className="text-gray-700 text-lg">
              <p className="truncate">{line}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Commentary;
