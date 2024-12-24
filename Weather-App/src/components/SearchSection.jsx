import React from 'react'

const SearchSection = ({getWeatherDetails, searchInputRef}) => {

    const API_KEY = import.meta.env.VITE_API_KEY;

    const handleCitySearch = (e) => {
        e.preventDefault();
        const searchInput = e.target.querySelector('.search-input');
        const API_URL = `http://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${searchInput.value}&days=2`;        ;
        getWeatherDetails(API_URL);
    }

    const handleLocationSearch =() => {
        navigator.geolocation.getCurrentPosition((position) => {
            const API_URL = `http://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${position.coords.latitude},${position.coords.longitude}&days=2`;
            getWeatherDetails(API_URL);
        })
    }


  return (
    <div className="search-section">
        <form action="#" className="search-form" onSubmit={handleCitySearch}>
        <span className="material-symbols-rounded">
          search
        </span>
        
          <input type="search" className="search-input" placeholder="enter city name" ref={searchInputRef} required/>
        </form>
        <button className="location-button" onClick={handleLocationSearch}>
          <span className="material-symbols-rounded">
              my_location
          </span>
        
        </button>
      </div>
  )
}

export default SearchSection