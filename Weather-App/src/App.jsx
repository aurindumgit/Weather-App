import React, { useRef, useState, useEffect } from "react";
import SearchSection from "./components/SearchSection";
import CurrentWeather from "./components/CurrentWeather";
import HourlyWeatherItem from "./components/HourlyWeatherItem";
import { weatherCodes } from "./constants";

const App = () => {
  const [currentWeather, setCurrentWeather] = useState({});
  const [hourlyForcasts, setHourlyForcasts] = useState([]);
  const searchInputRef = useRef(null);

  const filterHourlyForecast = (hourlyData) => {
    const currentHour = new Date().setMinutes(0, 0, 0);
    const next24Hours = currentHour + 24 * 60 * 60 * 1000;

    const next24HoursData = hourlyData.filter(({ time }) => {
      const forecastTime = new Date(time).getTime();
      return forecastTime >= currentHour && forecastTime <= next24Hours;
    });

    setHourlyForcasts(next24HoursData);
  };

  const getWeatherDetails = async (API_URL) => {
    try {
      const response = await fetch(API_URL);
      const data = await response.json();

      const temperature = data.current.temp_c;
      const description = data.current.condition.text;
      const weatherIcon = Object.keys(weatherCodes).find((icon) =>
        weatherCodes[icon].includes(data.current.condition.code)
      );

      setCurrentWeather({ temperature, description, weatherIcon });

      const combinedHourlyData = [
        ...data.forecast.forecastday[0].hour,
        ...data.forecast.forecastday[1].hour,
      ];

      searchInputRef.current.value = data.location.name;

      filterHourlyForecast(combinedHourlyData);
    } catch (error) {
      console.log("Error fetching weather details:", error);
    }
  };

  useEffect(() => {
    // Get user's current location on app load
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const API_KEY = import.meta.env.VITE_API_KEY;
        const API_URL = `http://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${position.coords.latitude},${position.coords.longitude}&days=2`;
        getWeatherDetails(API_URL);
      },
      (error) => {
        console.error("Error fetching location:", error);
        alert("Unable to fetch location. Please enter a city manually.");
      }
    );
  }, []);

  return (
    <>
      <div className="container">
        <SearchSection getWeatherDetails={getWeatherDetails} searchInputRef={searchInputRef} />

        <div className="weather-section">
          <CurrentWeather currentWeather={currentWeather} />

          <div className="hourly-forecast">
            <ul className="weather-list">
              {hourlyForcasts.map((hourlyWeather) => (
                <HourlyWeatherItem
                  key={hourlyWeather.time_epoch}
                  hourlyWeather={hourlyWeather}
                />
              ))}
            </ul>
          </div>
        </div>
        
        
      </div>
      <div className="footer">
        <p>Made with ❤️ by <span>Auri </span></p>
      </div>
    </>
  );
};

export default App;
