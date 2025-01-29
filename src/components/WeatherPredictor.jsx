import React, { useState, useEffect } from 'react';
import { fetchWeatherData } from './fetchWeatherData';
import { trainModel } from './trainModel';

const WeatherPredictor = () => {
  const [data, setData] = useState(null);
  const [predictions, setPredictions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const mergedData = await fetchWeatherData();
        setData(mergedData);
        setLoading(false);
      } catch (error) {
        console.error('Error loading data:', error);
        Sentry.captureException(error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleTrainModel = () => {
    if (!data) return;
    const newPredictions = trainModel(data);
    setPredictions(newPredictions);
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="p-4">
      <button
        onClick={handleTrainModel}
        className="bg-blue-500 text-white px-4 py-2 rounded cursor-pointer"
      >
        Predict Next Week's Weather
      </button>

      {predictions.length > 0 && (
        <div className="mt-4">
          <h2 className="text-xl font-bold mb-2">Predictions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {predictions.map((pred, i) => (
              <div key={i} className="bg-white p-4 rounded-lg shadow">
                <h3 className="font-semibold">{pred.day.toLocaleDateString()}</h3>
                <p>Temperature: {pred.temp.toFixed(1)}°C</p>
                <p>Humidity: {pred.rhum.toFixed(1)}%</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default WeatherPredictor;