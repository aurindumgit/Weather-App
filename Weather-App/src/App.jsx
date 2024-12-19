const App = () => {
  return (
    <div className="container">

      <div className="search-section">
        <form action="#" className="search-form">
        <span className="material-symbols-rounded">
          search
        </span>
        
          <input type="search" className="search-input" placeholder="enter city name" required/>
        </form>
        <button className="location-button">
          <span class="material-symbols-rounded">
              my_location
          </span>
        
        </button>
      </div>


      <div className="weather-section">
        <div className="current-weather">
          <img src="icons/clouds.svg" className="weather-icon" />
          <h2 className="temperature">20 <span>°C</span></h2>
          <p className="description">
            Partly Cloudy
          </p>

        </div>

        <div className="hourly-forcast">
          <ul className="weather-list">
            <li className="weather-item">
              <p className="time">00:00</p>
              
            </li>
          </ul>
        </div>
      </div>


    </div>
  )
}

export default App