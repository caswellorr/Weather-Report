// Q's for Dane: how to display a day  per card? UV index? why does it keep appending per search?

// the UV index should present a color that indicates whether the conditions are favorable, moderate, or severe

// 3 fetch urls - current, forecast, UV Index

let searchBtn = document.getElementById('search-button');

let apiKey = "081f0c01ecb95def63580bda10ad1a00";

// ============== SEARCH BAR AND BUTTON =================

searchBtn.addEventListener('click', getCityWeather);

function getCityWeather () {

  let city = document.getElementById('search-input').value;
    console.log(city);
  
  getLatLon (city);

  // getCurrentWeather (city);

  // getFiveDayForecast (latLon);


}

function getLatLon (coordinates) {

  fetch (`https://api.openweathermap.org/data/2.5/weather?q=${coordinates}&appid=${apiKey}&units=imperial`)
  .then (function (response) {
    return response.json();
  })
  .then (function(coordinates) {
    // console.log(coordinates);

    let latLon = [coordinates.coord.lat, coordinates.coord.lon]
    
    getCurrentWeather (latLon);

    getFiveDayForecast (latLon);
  

  })
};

// ============ CURRENT WEATHER =====================

function getCurrentWeather (latLon) {

  fetch (`https://api.openweathermap.org/data/2.5/onecall?lat=${latLon[0]}&lon=${latLon[1]}&exclude={part}&appid=${apiKey}&units=imperial`)
  .then (function (response) {
    return response.json();
  })
  .then (function(weather) {
    console.log(weather);

    const currentWeather = document.getElementById('current-weather');

      // Format: City Name, Date, Weather Icon(??)
    let cityName = document.createElement('h1');
    cityName.textContent = weather.name;

    currentWeather.prepend(cityName);

      // Temperature
    let temperature = document.createElement('p');
    temperature.textContent = 'Temp: ' + Math.floor(weather.current.temp) + ' °F';

    currentWeather.append(temperature);

      // Humidity
    let humidity = document.createElement('p');
    humidity.textContent = 'Humidity: ' + Math.floor(weather.current.humidity) + '%';

    currentWeather.append(humidity);

      // Wind Speed
    let windSpeed = document.createElement('p');
    windSpeed.textContent = 'Wind: ' + Math.floor(weather.current.weather.wind_speed) + ' Mph';

    currentWeather.append(windSpeed);

    getUvIndex()
    
  })
}

// ================== UV Index ==================

      // the UV index should present a color that indicates whether the conditions are favorable, moderate, or severe

function getUvIndex (uv) {

  fetch (`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude={part}&appid=${apiKey}&units=imperial`)
  .then (function (response){
    return response.json();
  })
  .then (function (uvIndex) {
    console.log(uvIndex);
  })
}

// ================= FIVE DAY FORECAST ==================


function getFiveDayForecast (latLon) {

  fetch (`https://api.openweathermap.org/data/2.5/onecall?lat=${latLon[0]}&lon=${latLon[1]}&exclude={part}&appid=${apiKey}&units=imperial`)
  .then(function (response){
    return response.json();
  })
  .then (function (weather) {
    console.log(weather);

    const fiveDayForecast = document.getElementById('five-day-container');

        // need every 24 hours for the forecast**
    for (let i = 0; i < 5; i++) {
      console.log(weather.list[i]);
      
        // Date : How do I attach the date with the forecast?
      let fiveDayDate = document.createElement('h5');
      fiveDayDate.textContent = weather.list[i].dt_txt;
        console.log (fiveDayDate);

      fiveDayForecast.prepend(fiveDayDate);
      
      // Weather Icon ??

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

// localStorage?

