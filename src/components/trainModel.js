import { SimpleLinearRegression } from 'ml-regression';
import * as Sentry from '@sentry/browser';

const trainModel = (data) => {
  try {
    if (!data || data.length === 0) {
      throw new Error('No data available for training');
    }

    const x = data.map((d, i) => i);
    const yTemp = data.map(d => d.temp);
    const yRhum = data.map(d => d.rhum);

    // Train models
    const modelTemp = new SimpleLinearRegression(x, yTemp);
    const modelRhum = new SimpleLinearRegression(x, yRhum);

    // Generate predictions for next 7 days
    const nextDays = Array.from({ length: 7 }, (_, i) => data.length + i);
    const predictedTemp = nextDays.map(day => {
      const prediction = modelTemp.predict(day);
      return Math.max(0, prediction); // Ensure temperature isn't negative
    });
    const predictedRhum = nextDays.map(day => {
      const prediction = modelRhum.predict(day);
      return Math.max(0, Math.min(100, prediction)); // Keep humidity between 0-100
    });

    // Create prediction objects
    return nextDays.map((day, i) => ({
      day: new Date(data[data.length - 1].time.getTime() + (i + 1) * 86400000),
      temp: parseFloat(predictedTemp[i].toFixed(1)),
      rhum: parseFloat(predictedRhum[i].toFixed(1))
    }));
  } catch (error) {
    console.error('Error in model training:', error);
    Sentry.captureException(error);
    throw error;
  }
};

export { trainModel };