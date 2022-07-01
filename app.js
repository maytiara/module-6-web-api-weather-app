//Display for the current time and current search city

const timeEl = document.getElementById('time');
const dateEl = document.getElementById('date');

let days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
let months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

function setTimeWithTimeZone(timezone) {
    let time = new Date();
    if (timezone) {
        time = new Date(time.toLocaleString('en-US', {timeZone: timezone}))
    }
    let month = time.getMonth();
    let date = time.getDate();
    let day = time.getDay();
    let hour = time.getHours();
    let hoursIn12HrFormat = hour >= 13 ? hour %12: hour
    let minutes = time.getMinutes();
    let ampm = hour >=12 ? 'PM' : 'AM'

    timeEl.innerHTML = (hoursIn12HrFormat < 10? '0'+hoursIn12HrFormat : hoursIn12HrFormat) + ':' + (minutes < 10? '0'+minutes: minutes)+ ' ' + `<span id="am-pm">${ampm}</span>`
    dateEl.innerHTML = days[day] + ', ' + date+ ' ' + months[month]

}

//Function for Current time location => setTimeWithTimeZone(timezone)
let timer=setInterval(setTimeWithTimeZone, 1000);

// Assigned Variables for API CALL 
const currentWeatherItemsEl = document.getElementById('current-weather-items');
const timezone = document.getElementById('time-zone');

// Function for an API CALL to get the humidity, temp,, wind speed, Uvi
getWeatherData()
function getWeatherData () {
    navigator.geolocation.getCurrentPosition((success) => {
        
        let {latitude, longitude } = success.coords;

        fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=hourly,minutely&units=metric&appid=${weatherKey}`).then(res => res.json()).then(data => {

        console.log(data)
        showWeatherData(data);
        })

    })
}

function showWeatherData (data){
    let {humidity, temp, wind_speed, uvi} = data.current;

    //Placeholder for => function setTimeWithTimeZone(timezone)
    timezone.innerHTML = data.timezone;

    //Getting the current city data => timezone
    clearInterval(timer)
    timer=setInterval(() => setTimeWithTimeZone(data.timezone), 1000);

    //placeholder for => showWeatherData from the API
    currentWeatherItemsEl.innerHTML = 
    `
    <article class="weather-item">
        <section>Temperature:</section>
        <section id="temp">${temp} &#176;C</section>
    </article>
    <article class="weather-item">
        <section>Wind Speed:</section>
        <section id="wind">${wind_speed} mph</section>
    </article>
    <article class="weather-item">
        <section>Humidity:</section>
        <section id="humidity">${humidity} %</section>
    </article>
    <article class="weather-item">
        <section>UV index:</section>
        <section id="uv-index">${uvi}</section>
    </article>  
    `
}


//---LOCAL STORAGE-----Will change later
function getCitiesFromStorage() {
    if (localStorage.getItem("cities"))
        return JSON.parse(localStorage.getItem("cities"));
    return [];
}

//--Fetch the cities data from other API CALL
const app = {
    init: () => {
      document
        .getElementById('submit-btn')
        .addEventListener('click', app.fetchCoordinates);

        //get Item from local storage ---Will change later
        let cities = getCitiesFromStorage()
        // loop over cities and show them on html ---Will change later
    
    },
    fetchCoordinates: (ev) => {
        ev.preventDefault();
        var cityName = document.getElementById("search-bar").value;
        let url = `https://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=5&appid=${weatherKey}`
        
        //----In addition, to add local storage ---Will change later
        let cities = getCitiesFromStorage()
        cities.push(cityName)
        localStorage.setItem("cities", JSON.stringify(cities));
        
        fetch(url)
        .then((resp) => {
          if (!resp.ok) throw new Error(resp.statusText);
          return resp.json();
        })
        .then((data) => {
          app.fetchWeather(data[0]);
        })
        .catch(console.err);
    },
    fetchWeather: (data) => {
      //use the values from latitude and longitude to fetch the weather
      let lat = data.lat;
      let lon = data.lon;
      let lang = 'en';
      let units = 'metric';
      let url = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${weatherKey}&units=${units}&lang=${lang}`;

      //fetch the weather
      fetch(url)
        .then((resp) => {
          if (!resp.ok) throw new Error(resp.statusText);
          return resp.json();
        })
        .then((data) => {
            showWeatherData(data)
            app.showDailyWeather(data);
        })
        .catch(console.err);
    },
    
    showDailyWeather: (resp) => {
      console.log(resp);
      let row = document.getElementById('weather-forecast');
      //clear out the old weather and add the new
      // row.innerHTML = '';
      row.innerHTML = resp.daily
        .map((day, idx) => {
          if (idx <= 4) {
            let dt = new Date(day.dt * 1000); //timestamp * 1000
            return `<section class="weather-forecast-item">
                <h3 class="day">${dt.toDateString()}</h3>
                <img src="https://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png" alt="weather icon" class="w-icon">
                <h4 class="temp">High ${day.temp.max}&deg;C Low ${day.temp.min}&deg;C</h4>
                <h4 class="wind">Wind: ${day.wind_speed}m/s</h4>
                <h4 class="humidity">Humidity : ${day.humidity}%</h4>
            </section>`
          }
        })
        .join(' ');
    },
  };
  
  app.init();

