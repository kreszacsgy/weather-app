
const weatherCard = document.querySelector(".js-weather-card");
const $form = document.querySelector(".js-form");
const $searchInput = document.querySelector("[name=location");
const weatherBackground = document.querySelector(".js-weather-app");
const weatherImage = document.querySelector(".js-weather-picture");
const temperature = document.querySelector(".js-temperature");
const description = document.querySelector(".js-description");
const humidity = document.querySelector(".js-humidity");
const wind = document.querySelector(".js-wind");
const weatherBox = document.querySelector(".js-weather-box");
const errorBox= document.querySelector(".js-not-found");
const detailsBox= document.querySelector(".js-weather-details");

//fetch weather from openweathermap.com

function getAPIUrl(city) {
    const apiKey = "7caac263c4ffcacc96e3258466553ebd";
    const API_URL= `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    return API_URL;
}

//eror message if the city not found 

function notFound() {
    weatherBox.classList.remove("active");
    detailsBox.classList.remove("active");
    errorBox.classList.add("active");
}

//check the weather informations

async function checkWeather(city){  
    try{const response = await fetch(getAPIUrl(city)); 
        const weatherData =  await response.json();           
        temperature.innerHTML= `${parseInt(weatherData.main.temp)}<span>&#8451;</span>`;
        description.innerHTML= `${weatherData.weather[0].description}`;
        humidity.innerHTML= `${weatherData.main.humidity}%`;
        wind.innerHTML= `${parseInt(weatherData.wind.speed)}Km/h`;
        const timeStamp=Math.floor(Date.now() / 1000);

        // check day or night

        let timeOfDay="day";

        if (weatherData.sys.sunrise < timeStamp && timeStamp < weatherData.sys.sunset ){
            timeOfDay="day";
        }
        else{
            timeOfDay="night";
        };

        //change the background and the icon

        if(weatherData.weather[0].main == "Clear") {
            weatherImage.src= `assets/icons/${timeOfDay}/clear.png`;
            weatherBackground.style.backgroundImage = `url(./assets/background/${timeOfDay}/clear.jpg)`;
        }
        else if(weatherData.weather[0].main == "Rain") {
            weatherImage.src= `assets/icons/${timeOfDay}/rain.png`;
            weatherBackground.style.backgroundImage = `url(./assets/background/${timeOfDay}/rain.jpg)`;
        }
        else if(weatherData.weather[0].main == "Snow") {
         weatherImage.src= `assets/icons/${timeOfDay}/snow.png`;
            weatherBackground.style.backgroundImage = `url(./assets/background/${timeOfDay}/snow.jpg)`;
        }
        else if(weatherData.weather[0].main == "Clouds") { 
            weatherImage.src= `assets/icons/${timeOfDay}/clouds.png`;
            weatherBackground.style.backgroundImage = `url(./assets/background/${timeOfDay}/cloud.jpg)`;
        }
        else if(weatherData.weather[0].main == "Mist") {
            weatherImage.src= `assets/icons/${timeOfDay}/mist.png`;
            weatherBackground.style.backgroundImage = `url(./assets/background/${timeOfDay}/mist.jpg)`;
        }
        else if(weatherData.weather[0].main == "Haze") {
            weatherImage.src= `assets/icons/${timeOfDay}/mist.png`;
            weatherBackground.style.backgroundImage = `url(./assets/background/${timeOfDay}/mist.jpg)`;
        };
        weatherBox.classList.add("active");
        detailsBox.classList.add("active");
        errorBox.classList.remove("active");  
    } catch(err) {
        notFound();
    } 
}
    

// submit the form

function formSubmitted(event){    
    event.preventDefault();
    let city = $searchInput.value.trim();
    if (city.length == 0) {
        notFound();
    } else {
        checkWeather(city);
        weatherBackground.style.opacity= "0";
    }
    weatherBackground.style.opacity= "1";
}

$form.addEventListener("submit",formSubmitted)