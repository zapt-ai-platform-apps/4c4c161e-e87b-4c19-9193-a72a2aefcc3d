import React from 'react';
import * as Sentry from '@sentry/browser';
import BoxPlots from './WeatherVisualizations/BoxPlots';
import Histograms from './WeatherVisualizations/Histograms';
import ScatterPlot from './WeatherVisualizations/ScatterPlot';
import TimeSeries from './WeatherVisualizations/TimeSeries';

const WeatherVisualizations = ({ data }) => {
  try {
    const tempData = data.map((d, i) => ({ x: i, y: d.temp }));
    const rhumData = data.map((d, i) => ({ x: i, y: d.rhum }));

    // Prepare data for boxplots
    const boxplotData = [
      { x: 'Temperature', y: data.map(d => d.temp) },
      { x: 'Humidity', y: data.map(d => d.rhum) }
    ];

    // Prepare scatter plot data
    const scatterData = data.map(d => ({
      x: d.temp,
      y: d.rhum
    }));

    return (
      <div className="space-y-8">
        <BoxPlots boxplotData={boxplotData} />
        <Histograms data={data} />
        <ScatterPlot scatterData={scatterData} />
        <TimeSeries tempData={tempData} rhumData={rhumData} />
      </div>
    );
  } catch (error) {
    console.error('Error rendering visualizations:', error);
    Sentry.captureException(error);
    return <div className="text-red-500">Error loading visualizations. Please try again later.</div>;
  }
};

export default WeatherVisualizations;