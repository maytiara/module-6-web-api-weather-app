const timeEl = document.getElementById ('time'); // var for city current time
const dateEl = document.getElementById ('date'); // var for city current time
const currentWeatherItemsel = document.getElementById ('current-weather-items'); // var for placeholder to show the current weather data
const timezoneEl = document.getElementById ('time-zone'); // var for placeholder to show the current time in the search city

//----The beginning of the app----//

const weatherForecastApp = {

    //------(1) Create add event listener, once the user enter the city in search form----//
    function fetchBegin () {
        document.getElementById('submit-btn').addEventListener('click', fetchCoordinates);
    },

    //-----(2) How to call the city? by fetching the Data from an Open Source API url link
    function fetchCoordinates (event) {
        event.preventDefault (); //---> optional 
        let cityName = document.getElementById('search-bar').value;
        let url = `https://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=5&appid=0cc20eb061ce1f620419a27e3dc314a7` //API url, to call a city name

        //--Fetch function to call city name
        return fetch (url)
        .then(function(response) {
            if (response.ok) {
                return response.json ();
            }
            throw new Error ('404 not found');
        })
        .then ((data) => {
            weatherForecastApp.fetchWeather(data);
        })
        .catch ((error) => {   //---Statement to catch the Error if its not OK
            console.log(error);
        });
    }

    //-----(3)
    function fetchWeather (data) {
        let latitude = data.lat;
        let longitude = data.lon;
        let language = 'en';
        let url = `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&appid=0cc20eb061ce1f620419a27e3dc314a7}&units=metric&lang=${language}`; //API url, to call other parameters

        //-----Repeated fetch function to catch error
        return fetch (url)
        .then(function(response) {
            if (response.ok) {
                return response.json ();
            }
            throw new Error ('something went wrong');
        })
        .then ((data) => {
            showWeatherData(data)
            weatherForecastApp.showDailyWeather(data);
        })
        .catch ((error) => {   //---Statement to catch the Error if its not OK
            console.log(error);
        });
    }
};

weatherForecastApp.fetchBegin();

//create an 
