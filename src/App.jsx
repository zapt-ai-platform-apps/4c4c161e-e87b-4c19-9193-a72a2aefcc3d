import React from 'react';
import WeatherPredictor from './components/WeatherPredictor';

export default function App() {
  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-blue-600 text-white p-4">
        <div className="container mx-auto">
          <h1 className="text-2xl font-bold">Weather Predictor</h1>
        </div>
      </header>
      
      <main className="container mx-auto p-4">
        <WeatherPredictor />
      </main>

      <footer className="mt-8 p-4 bg-gray-800 text-white text-center">
        <a 
          href="https://www.zapt.ai" 
          target="_blank" 
          rel="noopener noreferrer"
          className="underline"
        >
          Made on ZAPT
        </a>
      </footer>
    </div>
  );
}