// When i search a city in the search bar, the current weather should appear in the JUMBOTRON and the 5 day forecast to appear in the cards - one day per card

// The information in the cards should include: the date, an icon representation of weather conditions, the temperature, the wind speed, and the humidity

// the jumbotron should include: the city name, the date, an icon representation of weather conditions, the temperature, the humidity, the wind speed, and the UV index

// the UV index should present a color that indicates whether the conditions are favorable, moderate, or severe

// How difficult would it be to display a photo (or more simply a color) in the header that matches the day or weather

// 3 fetch urls - current, forecast, UV Index

let searchBtn = document.getElementById('search-button');

let apiKey = "081f0c01ecb95def63580bda10ad1a00";

// ============== SEARCH BAR AND BUTTON =================

searchBtn.addEventListener('click', getCity);

function getCity () {

  let city = document.getElementById('search-input').value;
    console.log(city);

  getCurrentWeather (city);

  getFiveDayForecast (city);

}

// ============ CURRENT WEATHER =====================

function getCurrentWeather (weather) {

  fetch (`https://api.openweathermap.org/data/2.5/weather?q=${weather}&appid=${apiKey}&units=imperial`)
  .then (function (response) {
    return response.json();
  })
  .then (function(weather) {
    console.log(weather);

    const currentWeather = document.getElementById('current-weather');

      // City Name, Date, Weather Icon
    let cityName = document.createElement('h1');
    cityName.textContent = weather.name;

    currentWeather.prepend(cityName);

      // Temperature
    let temperature = document.createElement('p');
    temperature.textContent = 'Temp: ' + Math.floor(weather.main.temp) + ' °F';

    currentWeather.append(temperature);

      // Humidity
    let humidity = document.createElement('p');
    humidity.textContent = 'Humidity: ' + Math.floor(weather.main.humidity) + '%';

    currentWeather.append(humidity);

      // Wind Speed
    let windSpeed = document.createElement('p');
    windSpeed.textContent = 'Wind: ' + Math.floor(weather.wind.speed) + ' Mph';

    currentWeather.append(windSpeed);

    // UV index function
    
  })
}

// function getUvIndex (uv)

// ================= FIVE DAY FORECAST ==================


function getFiveDayForecast (forecast) {

  fetch (`https://api.openweathermap.org/data/2.5/forecast?q=${forecast}&appid=${apiKey}&units=imperial`)
  .then(function (response){
    return response.json();
  })
  .then (function (weather) {
    console.log(weather);

    const fiveDayForecast = document.getElementById('five-day-container');

    for (let i = 0; i < 5; i++) {
      console.log(weather.list[i]);
      
        // Date : How do I attach the date with the forecast?
      let fiveDayDate = document.createElement('h5');
      fiveDayDate.textContent = weather.list[i].dt_txt;
        console.log (fiveDayDate);

      fiveDayForecast.prepend(fiveDayDate);
      
      // Weather Icon - conditional??

        // Temperature
      let fiveDayTemp = document.createElement('p');
      fiveDayTemp.textContent = 'Temp: ' + Math.floor(weather.list[i].main.temp) + ' °F';
        console.log(fiveDayTemp);

      fiveDayForecast.append(fiveDayTemp);

      // Wind Speed
      let fiveDayWindSpeed = document.createElement('p');
      fiveDayWindSpeed.textContent = 'Wind: ' + Math.floor(weather.list[i].wind.speed) + ' Mph';
        console.log(fiveDayWindSpeed);

      fiveDayForecast.append(fiveDayWindSpeed);
      
      // Humidity
      let fiveDayHumidity = document.createElement('p');
      fiveDayHumidity.textContent = 'Humidity: ' + Math.floor(weather.list[i].main.humidity) + '%';
        console.log(fiveDayHumidity);

      fiveDayForecast.append(fiveDayHumidity);

      
      

    }
  })
   
}



