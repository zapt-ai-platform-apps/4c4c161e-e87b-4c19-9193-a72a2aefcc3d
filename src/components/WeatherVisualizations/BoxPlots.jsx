import React from 'react';
import {
  VictoryChart,
  VictoryBoxPlot,
  VictoryAxis,
  VictoryTheme
} from 'victory';

const BoxPlots = ({ boxplotData }) => (
  <div>
    <h3 className="text-lg font-semibold mb-2">Temperature & Humidity Distribution</h3>
    <VictoryChart
      theme={VictoryTheme.material}
      domainPadding={20}
    >
      <VictoryAxis />
      <VictoryAxis dependentAxis />
      <VictoryBoxPlot
        boxWidth={20}
        data={boxplotData}
        style={{
          min: { stroke: "blue" },
          max: { stroke: "blue" },
          median: { stroke: "red" },
          box: { fill: "#b3cde0" }
        }}
      />
    </VictoryChart>
  </div>
);

export default BoxPlots;