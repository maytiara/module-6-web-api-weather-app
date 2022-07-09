const timeEl = document.getElementById ('time'); // var for city current time
const dateEl = document.getElementById ('date'); // var for city current time
const currentWeatherItemsel = document.getElementById ('current-weather-items'); // var for placeholder to show the current weather data
const timezoneEl = document.getElementById ('time-zone'); // var for placeholder to show the current time in the search city


const domainURL = `https://api.openweathermap.org`;

//----The beginning of the app----//
document.getElementById('submit-btn').addEventListener('click', fetchCoordinates);

function fetchWeather (data) {
    let latitude = data.lat;
    let longitude = data.lon;
    let language = 'en';
    let url = `${domainURL}/data/2.5/onecall?lat=${latitude}&lon=${longitude}&appid=0cc20eb061ce1f620419a27e3dc314a7&units=metric&lang=${language}`; //API url, to call other parameters

    return fetch (url)
    .then(function(response) {
        return response.json ();
    })
    .then ((data) => {
        //showWeatherData(data)
        //weatherForecastApp.showDailyWeather(data);
    })
}

function fetchCoordinates () { 
    let cityName = document.getElementById('search-bar').value;
    let url = `${domainURL}/geo/1.0/direct?q=${cityName}&limit=1&appid=0cc20eb061ce1f620419a27e3dc314a7` //API url, to call a city name

    //--Fetch function to call city name
    return fetch (url)
    .then(function(response) {
        return response.json ();
    })
    .then ((data) => {
        fetchWeather(data[0]);
    })
}



//create an 
