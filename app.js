//Display for the current time

const timeEl = document.getElementById('time');
const dateEl = document.getElementById('date');

let days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
let months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];


//Function for Current time location
setInterval(() => {
    let time = new Date();
    let month = time.getMonth();
    let date = time.getDate();
    let day = time.getDay();
    let hour = time.getHours();
    let hoursIn12HrFormat = hour >= 13 ? hour %12: hour
    let minutes = time.getMinutes();
    let ampm = hour >=12 ? 'PM' : 'AM'

    timeEl.innerHTML = (hoursIn12HrFormat < 10? '0'+hoursIn12HrFormat : hoursIn12HrFormat) + ':' + (minutes < 10? '0'+minutes: minutes)+ ' ' + `<span id="am-pm">${ampm}</span>`
    dateEl.innerHTML = days[day] + ', ' + date+ ' ' + months[month]

}, 1000);

// API CALL 
const currentWeatherItemsEl = document.getElementById('current-weather-items');
const timezone = document.getElementById('time-zone');
//const countryEl = document.getElementById('country');
const weatherForecastEl = document.getElementById('weather-forecast');
const currentTempEl = document.getElementById('current-temp');


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

    timezone.innerHTML = data.timezone;
    //countryEl.innerHTML = data.lat + 'N ' + data.lon+'E'

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
    `;

    let otherDayForecast = ''
    data.daily.forEach((day, idx) => {
        if(idx == 0){
            currentTempEl.innerHTML = 
            `<section class="future-forecast">
                <img src="http://openweathermap.org/img/wn//${day.weather[0].icon}@2x.png" alt="weather icon" class="w-icon">
                <h3 class="day">${window.moment(day.dt*1000).format('dddd')}</h3>
                <h4 class="temp">Night : ${day.temp.night}&#176; C</h4>
                <h4 class="temp">Day : ${day.temp.day}&#176; C</h4>
                <h4 class="wind">Wind : ${data.current.wind_speed}mph</h4>
                <h4 class="humidity">Humidity : ${data.current.humidity}%</h4>
            </section>
            `
        }else{
            otherDayForecast += 
            `
                <img src="http://openweathermap.org/img/wn//${day.weather[0].icon}@2x.png" alt="weather icon" class="w-icon">
                <h3 class="day">${window.moment(day.dt*1000).format('dddd')}</h3>
                <h4 class="temp">Night : ${day.temp.night}&#176; C</h4>
                <h4 class="temp">Day : ${day.temp.day}&#176; C</h4>
                <h4 class="wind">Wind : ${data.current.wind_speed}mph</h4>
                <h4 class="humidity">Humidity : ${data.current.humidity}%</h4>
            `
        }
    })


    weatherForecastEl.innerHTML = otherDayForecast;
}