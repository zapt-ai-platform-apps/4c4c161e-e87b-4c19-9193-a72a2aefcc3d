import Papa from 'papaparse';

const fetchWeatherData = async () => {
  const [makkah, jeddah, almadinah] = await Promise.all([
    fetch('/data/makkah.csv').then(response => response.text()),
    fetch('/data/jeddah.csv').then(response => response.text()),
    fetch('/data/almadinah.csv').then(response => response.text())
  ]);

  const parseCSV = (csv) => Papa.parse(csv, { header: true }).data;

  return [...parseCSV(makkah), ...parseCSV(jeddah), ...parseCSV(almadinah)]
    .filter(row => row.temp && row.rhum && row.time)
    .map(row => ({
      temp: parseFloat(row.temp),
      rhum: parseFloat(row.rhum),
      time: new Date(row.time)
    }));
};

export { fetchWeatherData };