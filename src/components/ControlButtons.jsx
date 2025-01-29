import React from 'react';

const ControlButtons = ({ showEDA, setShowEDA, handleTrainModel, training }) => {
  return (
    <div className="space-y-4">
      <button
        onClick={() => setShowEDA(!showEDA)}
        className="bg-green-500 text-white px-4 py-2 rounded cursor-pointer hover:bg-green-600"
      >
        {showEDA ? 'Hide Visualizations' : 'Show Data Visualizations'}
      </button>

      <button
        onClick={handleTrainModel}
        disabled={training}
        className="bg-blue-500 text-white px-4 py-2 rounded cursor-pointer hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {training ? 'Training Model...' : 'Predict Next Week\'s Weather'}
      </button>
    </div>
  );
};

export default ControlButtons;