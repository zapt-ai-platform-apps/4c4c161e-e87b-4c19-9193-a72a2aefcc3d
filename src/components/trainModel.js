import { LinearRegression } from 'ml-regression';

const trainModel = (data) => {
  const x = data.map((d, i) => i);
  const yTemp = data.map(d => d.temp);
  const yRhum = data.map(d => d.rhum);

  const modelTemp = new LinearRegression(x, yTemp);
  const modelRhum = new LinearRegression(x, yRhum);

  const nextDays = Array.from({ length: 7 }, (_, i) => data.length + i);
  const predictedTemp = nextDays.map(day => modelTemp.predict(day));
  const predictedRhum = nextDays.map(day => modelRhum.predict(day));

  return nextDays.map((day, i) => ({
    day: new Date(data[data.length - 1].time.getTime() + (i + 1) * 86400000),
    temp: predictedTemp[i],
    rhum: predictedRhum[i]
  }));
};

export { trainModel };