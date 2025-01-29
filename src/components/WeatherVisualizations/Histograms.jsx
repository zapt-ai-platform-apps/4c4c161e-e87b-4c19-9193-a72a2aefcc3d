import React from 'react';
import { VictoryHistogram } from 'victory';

const Histograms = ({ data }) => (
  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
    <div>
      <h3 className="text-lg font-semibold mb-2">Temperature Distribution</h3>
      <VictoryHistogram
        data={data.map(d => d.temp)}
        style={{
          data: { fill: "#8884d8" }
        }}
      />
    </div>

    <div>
      <h3 className="text-lg font-semibold mb-2">Humidity Distribution</h3>
      <VictoryHistogram
        data={data.map(d => d.rhum)}
        style={{
          data: { fill: "#82ca9d" }
        }}
      />
    </div>
  </div>
);

export default Histograms;