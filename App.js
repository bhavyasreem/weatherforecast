import React, { useState, useEffect } from "react";
import "./App.css";

const API_KEY = process.env.REACT_APP_WEATHER_API_KEY;

function App() {
  const [city, setCity] = useState("Hyderabad");
  const [forecast, setForecast] = useState([]);
  const [error, setError] = useState("");

  const fetchForecast = async () => {
    try {
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&cnt=40&appid=${API_KEY}`
      );
      const data = await res.json();

      if (data.cod !== "200") {
        setError("City not found");
        return;
      }

      const daily = data.list.filter((item, index) => index % 8 === 0);
      setForecast(daily);
      setError("");
    } catch (err) {
      setError("Failed to fetch data");
    }
  };

  useEffect(() => {
    fetchForecast();
  }, []);

  return (
    <div className="App">
      <h1>Weather Forecast</h1>
      <input
        value={city}
        onChange={(e) => setCity(e.target.value)}
        placeholder="Enter City"
      />
      <button onClick={fetchForecast}>Get Forecast</button>
      {error && <p>{error}</p>}

      <div className="weather-container">
        {forecast.map((day, index) => (
          <div key={index} className="weather-card">
            <h3>{new Date(day.dt_txt).toDateString()}</h3>
            <p>Temp: {day.main.temp}°C</p>
            <p>{day.weather[0].description}</p>
            <img
              src={`http://openweathermap.org/img/wn/${day.weather[0].icon}.png`}
              alt="icon"
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
