// Q's for Dane: how to display a day  per card? UV index? why does it keep appending per search?

// the UV index should present a color that indicates whether the conditions are favorable, moderate, or severe

// 3 fetch urls - current, forecast, UV Index

let searchBtn = document.getElementById('search-button');

let apiKey = "081f0c01ecb95def63580bda10ad1a00";
let history = document.getElementById('history')

const currentWeather = document.getElementById('current-weather');
const fiveDayContainer = document.getElementById('five-day-container')

// ============== SEARCH BAR AND BUTTON =================

searchBtn.addEventListener('click', getCityWeather);

function getCityWeather() {
  currentWeather.textContent = ''
  fiveDayContainer.textContent = ''
  let city = document.getElementById('search-input').value;
  console.log(city);

  // getLatLon (city);

  getCurrentWeather(city);

  searchHistory(city)


}

function searchHistory(city){

  let storage = JSON.parse(localStorage.getItem('history'))

  if(storage === null){
    storage = []
  }
  storage.push(city)

  localStorage.setItem('history', JSON.stringify(storage))

  getSearchHistory()
}

getSearchHistory()

function getSearchHistory() {
  history.textContent = ''
  let currentStorage = JSON.parse(localStorage.getItem('history'))
  if(currentStorage === null){
    let nullHistory = document.createElement('h5');
    nullHistory.textContent = 'no history'
    history.append(nullHistory)
  } else {
    for (let i = 0; i < currentStorage.length; i++) {
      let historyBtn  = document.createElement('button')
      historyBtn.setAttribute('id', currentStorage[i])
      historyBtn.textContent = currentStorage[i]
      history.append(historyBtn)

      historyBtn.addEventListener('click', function(event) {
        history.textContent = ''
        fiveDayContainer.textContent = ''
        currentWeather.textContent = ''
        getCurrentWeather(event.target.id)
      })
    }
  }
}

function getUvIndex(lat, lon) {

  fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude={part}&appid=${apiKey}&units=imperial`)

    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      
      console.log(data);
      var uv = document.createElement('p')
      uv.textContent = data.current.uvi
      currentWeather.append(uv)
    })
};

// ============ CURRENT WEATHER =====================

function getCurrentWeather(city) {

  fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`)
    .then(function (response) {
      return response.json();
    })
    .then(function (weather) {
      console.log(weather);

      var lat = weather.coord.lat
      var lon = weather.coord.lon
      getUvIndex(lat, lon)
      getFiveDayForecast(lat, lon)

      // Format: City Name, Date, Weather Icon(??)
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

    })
}

// ================== UV Index ==================

// the UV index should present a color that indicates whether the conditions are favorable, moderate, or severe

// function getUvIndex (latLon) {

//   fetch (`https://api.openweathermap.org/data/2.5/onecall?lat=${latLon[0]}&lon=${latLon[1]}&exclude={part}&appid=${apiKey}&units=imperial`)
//   .then (function (response){
//     return response.json();
//   })
//   .then (function (uvIndex) {
//     console.log(uvIndex);

//     let uv = document.createElement('p');
//     uvIndex.textContent = 'UV Index: ' + Math.floor(uvIndex.current.uvi);
//   })
// }

// ================= FIVE DAY FORECAST ==================


function getFiveDayForecast(lat, lon) {

  fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude={part}&appid=${apiKey}&units=imperial`)
    .then(function (response) {
      return response.json();
    })
    .then(function (weather) {
      console.log(weather);

      // need every 24 hours for the forecast**
      for (let i = 0; i < 5; i++) {
        console.log(weather.daily[i]);

        let card = document.createElement('div')
        card.setAttribute('class', 'card text-white bg-primary mb-3');
        card.setAttribute('style', 'max-width: 18rem;');

        fiveDayContainer.append(card)

        // Date : How do I attach the date with the forecast?
        let fiveDayDate = document.createElement('h5');
        fiveDayDate.textContent = weather.daily[i].dt_txt;
        console.log(fiveDayDate);

        card.prepend(fiveDayDate);

        // Weather Icon ??

        // Temperature
        let fiveDayTemp = document.createElement('p');
        fiveDayTemp.textContent = 'Temp: ' + Math.floor(weather.daily[i].temp.day) + ' °F';
        console.log(fiveDayTemp);

        card.append(fiveDayTemp);

        // Wind Speed
        let fiveDayWindSpeed = document.createElement('p');
        fiveDayWindSpeed.textContent = 'Wind: ' + Math.floor(weather.daily[i].wind_speed) + ' Mph';
        console.log(fiveDayWindSpeed);

        card.append(fiveDayWindSpeed);

        // Humidity
        let fiveDayHumidity = document.createElement('p');
        fiveDayHumidity.textContent = 'Humidity: ' + Math.floor(weather.daily[i].humidity) + '%';
        console.log(fiveDayHumidity);

        card.append(fiveDayHumidity);



      }
    })

}

// localStorage?

