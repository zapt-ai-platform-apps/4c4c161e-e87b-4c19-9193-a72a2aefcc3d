import React from 'react';
import {
  VictoryChart,
  VictoryLine,
  VictoryAxis,
  VictoryTheme
} from 'victory';

const TimeSeries = ({ tempData, rhumData }) => (
  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
    <div>
      <h3 className="text-lg font-semibold mb-2">Temperature Over Time</h3>
      <VictoryChart theme={VictoryTheme.material}>
        <VictoryAxis
          label="Time Index"
          style={{
            tickLabels: { fontSize: 8 }
          }}
        />
        <VictoryAxis
          dependentAxis
          label="Temperature (°C)"
          style={{
            tickLabels: { fontSize: 8 }
          }}
        />
        <VictoryLine
          data={tempData}
          style={{
            data: { stroke: "#c43a31" },
          }}
        />
      </VictoryChart>
    </div>

    <div>
      <h3 className="text-lg font-semibold mb-2">Humidity Over Time</h3>
      <VictoryChart theme={VictoryTheme.material}>
        <VictoryAxis
          label="Time Index"
          style={{
            tickLabels: { fontSize: 8 }
          }}
        />
        <VictoryAxis
          dependentAxis
          label="Humidity (%)"
          style={{
            tickLabels: { fontSize: 8 }
          }}
        />
        <VictoryLine
          data={rhumData}
          style={{
            data: { stroke: "#00bcd4" },
          }}
        />
      </VictoryChart>
    </div>
  </div>
);

export default TimeSeries;