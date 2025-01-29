import { LinearRegression } from 'scikit-learn';
import * as Sentry from '@sentry/browser';

const trainModel = (data) => {
  try {
    if (!data || data.length === 0) {
      throw new Error('No data available for training');
    }

    const x = data.map((d, i) => [i]);
    const yTemp = data.map(d => d.temp);
    const yRhum = data.map(d => d.rhum);

    // Train models
    const modelTemp = new LinearRegression();
    modelTemp.fit(x, yTemp);

    const modelRhum = new LinearRegression();
    modelRhum.fit(x, yRhum);

    // Generate predictions for next 7 days
    const nextDays = Array.from({ length: 7 }, (_, i) => [data.length + i]);
    const predictedTemp = modelTemp.predict(nextDays);
    const predictedRhum = modelRhum.predict(nextDays);

    // Create prediction objects
    return nextDays.map((day, i) => ({
      day: new Date(data[data.length - 1].time.getTime() + (i + 1) * 86400000),
      temp: Math.max(0, parseFloat(predictedTemp[i].toFixed(1))),
      rhum: Math.max(0, Math.min(100, parseFloat(predictedRhum[i].toFixed(1))))
    }));
  } catch (error) {
    console.error('Error in model training:', error);
    Sentry.captureException(error);
    throw error;
  }
};

export { trainModel };