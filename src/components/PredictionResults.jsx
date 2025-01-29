import React from 'react';

const PredictionResults = ({ predictions }) => {
  return (
    <div className="mt-6">
      <h2 className="text-xl font-bold mb-4">7-Day Weather Forecast</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {predictions.map((pred, i) => (
          <div key={i} className="bg-white p-4 rounded-lg shadow">
            <h3 className="font-semibold mb-2">{pred.day.toLocaleDateString()}</h3>
            <p>Temperature: {pred.temp.toFixed(1)}°C</p>
            <p>Humidity: {pred.rhum.toFixed(1)}%</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PredictionResults;