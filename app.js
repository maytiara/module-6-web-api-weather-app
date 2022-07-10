const timeEl = document.getElementById ('time'); // var for city current time
const dateEl = document.getElementById ('date'); // var for city current time
const currentWeatherItemsel = document.getElementById ('current-weather-items'); // var for placeholder to show the current weather data


const domainURL = `https://api.openweathermap.org`;



let cities [] //for local storage
let citySearch = document.getElementById ('search-bar').value; //for local storage

//----The beginning of the app----//

//User, have to enter the city using search bar
document.getElementById('submit-btn').addEventListener('click', fetchCoordinates); {//Create an add event listener to search the city 
    localStorage.setItem('cities', JSON.stringify(citySearch.value())); //for local storage
    citySearch = localStorage.getItem ('cities'); //for local storage
}

//User see the current information of the search city using this placeholder
function renderWeather(data) { //this renders the fetch data from the open-source API
    // print all the values to html
    let humidity = data.current.humidity; // assigned object/s to print data
    let temp = data.current.temp;
    let wind_speed = data.current.wind_speed;
    let uvi = data.current.uvi;
    let dt = new Date(data.current.dt * 1000);
    let city = data.timezone; // to fetch the city using timezone parameter

    document.getElementById("temp").innerHTML = `${temp} &#176;C`; // html element as the placeholder of the print values from fetch data
    document.getElementById("wind_speed").innerHTML = wind_speed;
    document.getElementById("humidity").innerHTML = humidity;
    document.getElementById("uvi").innerHTML = uvi;

    document.getElementById("date").innerHTML = `${dt.getDate()}/${dt.getMonth() + 1}/${dt.getFullYear()}`; // html element as the placeholder of the print values from fetch data, using the current ES6 syntax
    document.getElementById("time").innerHTML = city; // placeholder for current search city
}

// User will see the 5 day forecast data
function renderFutureForecast(data) {
    const daily = data.daily;
    // loop till 5
    const row = document.getElementById('weather-forecast');

    const rowEls = []

    for (let index = 0; index < 5; index++) {
        // create sections
        let dt = new Date(daily[index].dt * 1000); //timestamp * 1000
        const sectionEl = `<section class="weather-forecast-item">
            <h3 class="day">${dt.getDate()}/${dt.getMonth() + 1}/${dt.getFullYear()}</h3>
            <img src="http://openweathermap.org/img/wn/${daily[index].weather[0].icon}@2x.png" alt="weather icon" class="w-icon">
            <h4 class="temp">High ${daily[index].temp.max}&deg;C Low ${daily[index].temp.min}&deg;C</h4>
            <h4 class="wind">Wind: ${daily[index].wind_speed}m/s</h4>
            <h4 class="humidity">Humidity : ${daily[index].humidity}%</h4>
        </section>`;
        
        rowEls.push(sectionEl); // this properties will create an additional elements for that specific object
    }

    row.innerHTML = rowEls.join(' '); // adds the strings of data to that specific html elements
    
}

//Call the data from the open source APIs
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
        renderWeather(data);
        renderFutureForecast(data);
    })
}

//Call the data from the open source APIs
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

