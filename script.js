// ======= Global Variables ==========

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

  getCurrentWeather(city);

  searchHistory(city)


}

// ========= SEARCH HISTORY: LOCAL STORAGE =============

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
        fiveDayContainer.textContent = ''
        currentWeather.textContent = ''
        getCurrentWeather(event.target.id)

      })
    }
  }
}

// ============= UV INDEX ===============

function getUvIndex(lat, lon) {

  fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude={part}&appid=${apiKey}&units=imperial`)

    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      
      console.log(data);
      var uv = document.createElement('p')
      uv.textContent = data.current.uvi;
      currentWeather.append(uv)

      if(data.current.uvi <= 3){
        uv.style.backgroundColor= 'green';
      } else if (data.current.uv > 3 && data.current.uv < 7) {
        uv.style.backgroundColor= 'orange';
    
      } else {
        uv.style.backgroundColor= 'red';
      }
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

      // City Name + Date
      let cityName = document.createElement('h1');
      let currentDate = moment().format('MMMM Do YYYY');
      cityName.textContent = weather.name + " " + currentDate;

      currentWeather.prepend(cityName);
      // Weather Icon
      let weatherIconContainer = document.createElement('div');
        currentWeather.append(weatherIconContainer);
        let icon = weather.weather[0].icon;
        let weatherIcon = document.createElement('img');
        weatherIcon.setAttribute('src' , `http://openweathermap.org/img/wn/${icon}.png` );
        weatherIconContainer.appendChild(weatherIcon);


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

// ================= FIVE DAY FORECAST ==================

function getFiveDayForecast(lat, lon) {

  fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude={part}&appid=${apiKey}&units=imperial`)
    .then(function (response) {
      return response.json();
    })
    .then(function (weather) {
      console.log(weather);

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

        // Weather Icon
        let weatherIconContainer = document.createElement('div');
        card.append(weatherIconContainer);
        let weatherIcon = document.createElement('img');
        let icon = weather.daily[i].weather[0].icon
        weatherIcon.setAttribute('src' ,`http://openweathermap.org/img/wn/${icon}.png` );

        weatherIconContainer.appendChild(weatherIcon);

        console.log(weatherIcon); 

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

};

