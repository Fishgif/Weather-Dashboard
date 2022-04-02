





const weatherApiKey = "ab431c4fb5b9ae044a66fbe2c7cbe3d4"

// call weather api to retrive data 

// wather data by city name https://api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}

// call current weather API

function getCurrentWeatherApi(city){

        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${weatherApiKey}&units=metric`;
       
        return fetch(url)
        .then(function(response){
            return response.json();
        });   

}

// getCurrentWeatherApi('perth')

// call onecall api

function getOneCallApi(lon, lat){


    const url = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${weatherApiKey}&units=metric`

    return fetch(url). then(function(res){
        return res.json();
    });
}

// https://api.openweathermap.org/data/2.5/onecall?lat={lat}&lon={lon}&exclude={part}&appid={API key}

function getWeather(city){
    return getCurrentWeatherApi(city)
    .then(function(data){
        console.log(data)
        const lon = data.coord.lon
        const lat = data.coord.lat;
        return getOneCallApi(lon, lat,);
    });

}

getWeather('Perth')
.then(function (data){
    console.log(data);
})
const searchForm = document.getElementById ('form-search');

function iconCodeToPic(iconCode){
return `http://openweathermap.org/img/wn/${iconCode}@2x.png`

}

searchForm.addEventListener('submit', function(event){
event.preventDefault();
// when teh user enters a city 
const userInput = document.getElementById('input-city').value;

 getWeather(userInput)
 .then(function(weatherData){
    // data for today:
// pic
const todayDate = moment().format(" dddd MMMM YYYY");

const tempToday = weatherData.current.temp;
const windToday = weatherData.current.wind_speed;
const humidityToday = weatherData.current.humidity;
const uvToday = weatherData.current.uvi;

  // data for today:

//   date 
document.getElementById('span-today-date').textContent = todayDate
// City


// Temp
document.getElementById('span-today-temp').textContent = tempToday
// Icon
document.getElementById('img-today-icon').src = iconCodeToPic(weatherData.current.weather[0].icon)
// Wind
document.getElementById('span-today-wind').textContent = windToday

// Hum
document.getElementById('span-today-humidity').textContent = humidityToday

// UV
document.getElementById('span-today-uv').textContent = uvToday

parseWeather(weatherData)

 })

})

// five day forecast

let parseWeather = function(weatherData){
    // let weatherJSON = JSON.parse(weatherText);
    // console.log(weatherJSON);
    let dailyForecast = weatherData.daily;
    console.log("daily forecast array", dailyForecast)

    for (x = 0; x < 5; x++) {
        console.log("day", dailyForecast[x]);
        let day = dailyForecast[x];
        let today = new Date().getDay() + x;
        if (today > 6) {
            today = today - 7;
        }
        let dayOfWeek = getDayOfWeek(x);
        // Date
        let dailyTemp = dailyForecast[x].temp.day;
        let dailyWindSpeed = dailyForecast[x].wind_speed;
        let dailyHumidity = dailyForecast[x].humidity;
        displayWeatherDay(dayOfWeek, dailyTemp, dailyWindSpeed, dailyHumidity )

    }
}
// Add amd Display Dynamicly 

let displayWeatherDay = function (dayOfWeek, dailyTemp, dailyWindSpeed, dailyHumidity){

let out = '<div class="weatherDay">';
out += "<h2>" + dayOfWeek + "</h2>";
out += "<p>Temperature: " + dailyTemp + "°C</p>";
out += "<p>Wind Speed: " + Math.round(dailyWindSpeed) + "km/h</p>";
out += "<p>Humidity: " + dailyHumidity + "%</p>";
document.getElementById("forecast").innerHTML += out;
}

// Calculate day of the week 
let getDayOfWeek = function(dayNum) {

var weekday = new Array (7)
weekday[0] = "Sunday";
weekday[1] = "Monday";
weekday[2] = "Tuesday";
weekday[3] = "Wednesday";
weekday[4] = "Thursday";
weekday[5] = "Friday";
weekday[6] = "Saturday";

return (weekday[dayNum])

}

const excuses = [];
excuse[0]= "Im sorry but you look exaclty like my ex and I cant handle it";
excuse[1]= "Constanly talk about your ex";
excuse[2]= "Fake an allergic reaction";
excuse[3]= "Behave in a way that makes your date leave first (act like a pervert)";
excuse[4]= "Spill a drink on yourself—sacrifice your clothes to get out of the date";
excuse[5]= "Say you hate sex";



