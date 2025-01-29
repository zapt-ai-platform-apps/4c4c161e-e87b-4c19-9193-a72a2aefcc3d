import React, { useState, useEffect } from 'react';
import { fetchWeatherData } from './fetchWeatherData';
import { trainModel } from './trainModel';
import * as Sentry from '@sentry/browser';
import WeatherVisualizations from './WeatherVisualizations';
import PredictionResults from './PredictionResults';
import ControlButtons from './ControlButtons';

const WeatherPredictor = () => {
  const [data, setData] = useState(null);
  const [predictions, setPredictions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [training, setTraining] = useState(false);
  const [showEDA, setShowEDA] = useState(false);

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

  const handleTrainModel = async () => {
    if (!data) return;
    setTraining(true);
    try {
      const newPredictions = trainModel(data);
      setPredictions(newPredictions);
    } catch (error) {
      console.error('Error training model:', error);
      Sentry.captureException(error);
    } finally {
      setTraining(false);
    }
  };

  if (loading) return <div className="text-center py-8">Loading historical data...</div>;

  return (
    <div className="p-4 space-y-6">
      <ControlButtons 
        showEDA={showEDA} 
        setShowEDA={setShowEDA} 
        handleTrainModel={handleTrainModel} 
        training={training}
      />
      {showEDA && data && <WeatherVisualizations data={data} />}
      {predictions.length > 0 && <PredictionResults predictions={predictions} />}
    </div>
  );
};

export default WeatherPredictor;