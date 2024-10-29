
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
