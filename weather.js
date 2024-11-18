
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
    weatherCard.classList.add("expanded");
    errorBox.classList.add("active");
}

//reset the animation

function resetAnimations() {
    weatherBox.classList.remove("active");
    detailsBox.classList.remove("active");
    errorBox.classList.remove("active");
    weatherCard.classList.remove("expanded");
    weatherBackground.style.opacity= "0"; 
    void weatherCard.offsetWidth;
}

//check the weather informations

async function checkWeather(city){  
    try{const response = await fetch(getAPIUrl(city)); 
        if (!response.ok) {
            throw new Error("City not found");
        }
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

        const weatherType = weatherData.weather[0].main.toLowerCase();
        const validTypes = ["clear", "rain", "snow", "clouds", "mist"];
        const type = validTypes.includes(weatherType) ? weatherType : "mist";

        weatherImage.src = `assets/icons/${timeOfDay}/${type}.png`;
        weatherBackground.style.backgroundImage = `url(./assets/background/${timeOfDay}/${type}.jpg)`;

        // display the weather

        weatherCard.classList.add("expanded");
        weatherBox.classList.add("active");
        detailsBox.classList.add("active");          
    } catch(err) {
        resetAnimations();
        notFound();
        weatherBackground.style.opacity= "1";
    } 
}

// submit the form

function formSubmitted(event){    
    event.preventDefault();
    let city = $searchInput.value.trim();
    if (city.length == 0) {
        resetAnimations();
        weatherBackground.style.opacity= "1";
        setTimeout(()=>{notFound()},1000);
    } else {
        resetAnimations();
        weatherBackground.style.opacity= "1";
        setTimeout(()=>{checkWeather(city)},1000);        
    }
}

$form.addEventListener("submit",formSubmitted)