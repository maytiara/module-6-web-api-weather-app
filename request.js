//API CALL for this Module
//Source: https://api.openweathermap.org/data/2.5/onecall?lat=33.44&lon=-94.04&unit=metric&appid={API key}
//Source to get location: http://api.openweathermap.org/geo/1.0/direct?q={city name}&limit={limit}&appid={API key}
//Source to get icon: https://openweathermap.org/weather-conditions

const weatherKey = '0cc20eb061ce1f620419a27e3dc314a7';
const currentWeatherUrl = 'https://api.openweathermap.org/data/2.5/onecall?lat=-31.95224&lon=115.8614&unit=metric&appid=0dd5c652307a249518a0bb1731562de8';

//Fetch data from the given url
//fetch(currentWeatherUrl).
//    then((data) => { 
//        console.log ('response',data.json()) })
//
//catching the error, in case the call rejected
//    .catch((error) => {
//        console.log(error);
//    });
