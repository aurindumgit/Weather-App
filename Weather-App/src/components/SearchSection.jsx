import React from 'react'

const SearchSection = () => {
  return (
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
  )
}

export default SearchSection