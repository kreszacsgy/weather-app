
const weatherCard = document.querySelector(".weather-card");
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


function getAPIUrl(word) {
    const apiKey = "7caac263c4ffcacc96e3258466553ebd";
    const API_URL= `https://api.openweathermap.org/data/2.5/weather?q=${word}&appid=${apiKey}&units=metric`;
    return API_URL;
}

function notFound() {
    weatherBox.classList.remove("active");
    detailsBox.classList.remove("active");
    errorBox.classList.add("active");
}


async function checkWeather(city){  
    try{const response = await fetch(getAPIUrl(city)); 
        const weatherData =  await response.json();           
        temperature.innerHTML= `${parseInt(weatherData.main.temp)}<span>&#8451;</span>`;
        description.innerHTML= `${weatherData.weather[0].description}`;
        humidity.innerHTML= `${weatherData.main.humidity}%`;
        wind.innerHTML= `${parseInt(weatherData.wind.speed)}Km/h`;

        if(weatherData.weather[0].main == "Clear") {
            weatherImage.src= 'assets/icons/clear.png';
            weatherBackground.style.backgroundImage = "url(./assets/background/clear.jpg)";
        }
        else if(weatherData.weather[0].main == "Rain") {
            weatherImage.src= 'assets/icons/rain.png';
            weatherBackground.style.backgroundImage = "url(./assets/background/rain.jpg)";
        }
        else if(weatherData.weather[0].main == "Snow") {
         weatherImage.src= 'assets/icons/snow.png';
            weatherBackground.style.backgroundImage = "url(./assets/background/snow.jpg)";
        }
        else if(weatherData.weather[0].main == "Clouds") { 
            weatherImage.src= 'assets/icons/clouds.png';
            weatherBackground.style.backgroundImage = "url(./assets/background/cloud.jpg)";
        }
        else if(weatherData.weather[0].main == "Mist") {
            weatherImage.src= 'assets/icons/mist.png';
            weatherBackground.style.backgroundImage = "url(./assets/background/mist.jpg)";
        }
        else if(weatherData.weather[0].main == "Haze") {
            weatherImage.src= 'assets/icons/mist.png';
            weatherBackground.style.backgroundImage = "url(./assets/background/mist.jpg)";
        }
        weatherBox.classList.add("active");
        detailsBox.classList.add("active");
        errorBox.classList.remove("active");  
    } catch(err) {
        notFound();
    } 
}
    



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