// const weatherApiKey = "ab431c4fb5b9ae044a66fbe2c7cbe3d4"
const weatherApiKey = "fab29c92ec01ada5bf2e365a936b9378";
// Saves Searches

// set to local storage item

// Put the object into storage
// localStorage.setItem('form-search', JSON.stringify(searchForm));

// // Retrieve the object from storage
// var retrievedObject = localStorage.getItem('form-search');

// console.log('retrievedObject: ', JSON.parse(retrievedObject));

// When I click on Button Primary the searched city is saved to local storage

// The Recent searches are displayed in the recent search list

// call current weather API

function getCurrentWeatherApi(city) {
  document.getElementById("forecast").innerHTML = "";
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${weatherApiKey}&units=metric`;

  return fetch(url).then(function (response) {
    return response.json();
  });
}

// getCurrentWeatherApi('perth')

// call onecall api

function getOneCallApi(lon, lat) {
  const url = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${weatherApiKey}&units=metric`;

  return fetch(url).then(function (res) {
    return res.json();
  });
}

// https://api.openweathermap.org/data/2.5/onecall?lat={lat}&lon={lon}&exclude={part}&appid={API key}

function getWeather(city) {
  return getCurrentWeatherApi(city).then(function (data) {
    console.log(data);
    const lon = data.coord.lon;
    const lat = data.coord.lat;
    return getOneCallApi(lon, lat);
  });
}

// getWeather('Perth')
// .then(function (data){
//     console.log(data);
// })
const searchForm = document.getElementById("form-search");

function iconCodeToPic(iconCode) {
  return `http://openweathermap.org/img/wn/${iconCode}@2x.png`;
}

function searchWeather(city){


    getWeather(city).then(function (weatherData) {
      console.log(weatherData, "aaaa");
      // data for today:
      // pic
      const todayDate = moment().format(" dddd MMMM YYYY");
    
      const tempToday = weatherData.current.temp;
      // const cityName = weatherData.current.name;
    
      const windToday = weatherData.current.wind_speed;
      const humidityToday = weatherData.current.humidity;
      const uvToday = weatherData.current.uvi;
    
      // data for today:
    
      //   date
      document.getElementById("span-today-date").textContent = todayDate;
    
      document.getElementById("span-today-city").textContent = city;
      // City
    
      // Temp
      document.getElementById("span-today-temp").textContent = tempToday;
      // Icon
      document.getElementById("img-today-icon").src = iconCodeToPic(
        weatherData.current.weather[0].icon
      );
      // Wind
      document.getElementById("span-today-wind").textContent = windToday;
    
      // Hum
      document.getElementById("span-today-humidity").textContent = humidityToday;
    
      // UV
      const uvSpan = document.getElementById('span-today-uv');

      uvSpan.textContent = uvToday;

     

      uvSpan.style.backgroundColor = Number(uvToday) > 10 ? 'red' : '#92ff92'
    
      parseWeather(weatherData);
    });
}

searchForm.addEventListener("submit", function (event) {
  event.preventDefault();
  // when the user enters a city
  const userInput = document.getElementById("input-city").value;
  var searchHistory = JSON.parse(localStorage.getItem("form-search")) || [];
  searchHistory.push(userInput);

  localStorage.setItem("form-search", JSON.stringify(searchHistory));
searchWeather(userInput);
});

// five day forecast

let parseWeather = function (weatherData) {
  // let weatherJSON = JSON.parse(weatherText);
  // console.log(weatherJSON);
  let dailyForecast = weatherData.daily;
  console.log("daily forecast array", dailyForecast);

  for (x = 0; x < 5; x++) {
    console.log("day", dailyForecast[x]);
    let day = dailyForecast[x];
    let today = new Date().getDay() + x;
    if (today > 6) {
      today = today - 7;
    }
    let dayOfWeek = getDayOfWeek(today + 1);
    // Date
    let dailyTemp = dailyForecast[x].temp.day;
    let dailyWindSpeed = dailyForecast[x].wind_speed;
    let dailyHumidity = dailyForecast[x].humidity;
    displayWeatherDay(dayOfWeek, dailyTemp, dailyWindSpeed, dailyHumidity);
  }
};
// Add amd Display Dynamicly

let displayWeatherDay = function (
  dayOfWeek,
  dailyTemp,
  dailyWindSpeed,
  dailyHumidity
) {
  let out = '<div class="weatherDay">';
  out += "<h2>" + dayOfWeek + "</h2>";
  out += "<p>Temperature: " + dailyTemp + "°C</p>";
  out += "<p>Wind Speed: " + Math.round(dailyWindSpeed) + "km/h</p>";
  out += "<p>Humidity: " + dailyHumidity + "%</p>";
  document.getElementById("forecast").innerHTML += out;
};

// Calculate day of the week
let getDayOfWeek = function (dayNum) {
  var weekday = new Array(7);
  weekday[0] = "Sunday";
  weekday[1] = "Monday";
  weekday[2] = "Tuesday";
  weekday[3] = "Wednesday";
  weekday[4] = "Thursday";
  weekday[5] = "Friday";
  weekday[6] = "Saturday";

  return weekday[dayNum];
};

// Save Local Storage results

var searchResults = JSON.parse(localStorage.getItem("form-search")) || [];
console.log(searchResults);
for (let i = 0; i < searchResults.length; i++) {
  var btn = document.createElement("button");
  btn.classList.add("history-button");
  btn.textContent = searchResults[i];

  btn.addEventListener('click', function(event){
      event.preventDefault();
      searchWeather(event.target.textContent);
  })
  var li = document.createElement("li");
  li.appendChild(btn);

  document.getElementById("search-history").appendChild(li);
}
