import React from 'react';
import {
  VictoryChart,
  VictoryScatter,
  VictoryAxis,
  VictoryTheme
} from 'victory';

const ScatterPlot = ({ scatterData }) => (
  <div>
    <h3 className="text-lg font-semibold mb-2">Temperature vs Humidity</h3>
    <VictoryChart theme={VictoryTheme.material}>
      <VictoryAxis label="Temperature (°C)" />
      <VictoryAxis dependentAxis label="Humidity (%)" />
      <VictoryScatter
        data={scatterData}
        size={3}
        style={{
          data: { fill: "#ff7300" }
        }}
      />
    </VictoryChart>
  </div>
);

export default ScatterPlot;