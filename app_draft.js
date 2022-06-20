const weatherApiKey = "byoapikey";
const uvcolor = "span-today-uv";


function getCurrentWeatherApi(city) {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${weatherApiKey}`;

    return fetch(url).then(function (response) {
        return response.json();
    });
}

// call onecall api
function getOneCallApi(lon, lat) {
    const url = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=hourly,daily&appid=${weatherApiKey}`;

    return fetch(url).then(function (res) {
        return res.json();
    });
}

function getWeather(city) {
    return getCurrentWeatherApi(city)
        .then(function (data) {
            
            const lon = data.coord.lon;
            const lat = data.coord.lat;

            return getOneCallApi(lon, lat);
        });
}

const searchForm = document.getElementById('form-search');


function kelvinToCelcius(kelvin){
    return kelvin - 273.15;
}


function iconCodeToPic(iconCode){
    return `http://openweathermap.org/img/wn/${iconCode}@2x.png`;
}

searchForm.addEventListener('submit', function(event){

    event.preventDefault();
    // when the user enter a city
    const userInput = document.getElementById('input-city').value;

    // call weather api to retrieve weather data by city name
    // call the current weather api
    getWeather(userInput)
        .then(function(weatherData){
            console.log(weatherData, 'aaaa');
            // data that we need:
            
            // for today
            const tempToday = kelvinToCelcius(weatherData.current.temp);


            document.getElementById('span-today-temp').textContent = tempToday.toFixed(2)
            document.getElementById('span-today-city').textContent = weatherData.current.name;
            document.getElementById('img-today-icon').src = iconCodeToPic(weatherData.current.weather[0].icon);
            // temp
            // pretty pic
            // wind
            // humidity
            // uvi
            
            // next 5 days
            // date
            // pretty pic
            // temp
            // wind
            // humidity



        })


})

const x = 11
uvcolor = x > 10 ? 'red' : 'blue';


// put the searched city into localstorage

// display in a list (search city list)
