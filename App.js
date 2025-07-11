// App.js

import React, { useState } from 'react';
import './App.css';

function App() {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState('');

  const fetchWeather = async () => {
    if (!city) {
      setError('Please enter a city name.');
      return;
    }

    const apiKey = '9e263327ff42503c141721364ebde5b6'; 
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    try {
      const response = await fetch(url);
      const data = await response.json();

      if (data.cod === 200) {
        setWeather(data);
        setError('');
      } else {
        setError('City not found.');
        setWeather(null);
      }
    } catch (err) {
      setError('Failed to fetch weather.');
      setWeather(null);
    }
  };

  return (
    <div className="app">
      <h1>☁️ Asfar's Weather App</h1>

      <div className="input-section">
        <input
          type="text"
          placeholder="Enter city name"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <button onClick={fetchWeather}>Get Weather</button>
      </div>

      {error && <p className="error">{error}</p>}

      {weather && (
        <div className="weather-box">
          <h2>{weather.name}, {weather.sys.country}</h2>
          <p>🌡️ Temp: {weather.main.temp} °C</p>
          <p>💧 Humidity: {weather.main.humidity}%</p>
          <p>🌥️ Condition: {weather.weather[0].description}</p>
        </div>
      )}

      <footer>Made with 🌤️ by Asfar</footer>
    </div>
  );
}

export default App;
