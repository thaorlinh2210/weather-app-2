let celciusTemperature = null;

function displayTemperature(response) {
  console.log(response.data);
  celciusTemperature = response.data.main.temp;
  console.log(celciusTemperature);
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(celciusTemperature);

  let cityElement = document.querySelector("#city");
  cityElement.innerHTML = response.data.name;

  let descriptionElement = document.querySelector("#description");
  descriptionElement.innerHTML = response.data.weather[0].description;

  let pressureElement = document.querySelector("#pressure");
  pressureElement.innerHTML = response.data.main.pressure;

  let humidityElement = document.querySelector("#humidity");
  humidityElement.innerHTML = response.data.main.humidity;

  let windElement = document.querySelector("#wind");
  windElement.innerHTML = Math.round(response.data.wind.speed);

  let dateElement = document.querySelector("#date");
  dateElement.innerHTML = formatDate(response.data.dt * 1000);

  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);

  getForecast(response.data.coord);
}

function formatDate(timestamp) {
  let date = new Date(timestamp);
  console.log(date);
  let hours = date.getHours();

  if (hours < 10) {
    hours = `0${hours}`;
  }

  let minutes = date.getMinutes();

  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];
  return `${day} ${hours}:${minutes}`;
}

function handleSubmit(event) {
  event.preventDefault();
  let cityInputElement = document.querySelector("#city-input");
  console.log(cityInputElement.value);
  search(cityInputElement.value);
}
//
function search(city) {
  let apiKey = "a5acb752426cd8188485c35694980e3a";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  console.log(apiUrl);
  axios.get(apiUrl).then(displayTemperature);
}

// Unit conversion
let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", displayFahrenheitTemperature);

function displayFahrenheitTemperature(event) {
  event.preventDefault();
  let fahrenheitTemperature = (celciusTemperature * 9) / 5 + 12;
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
  // Remove Celcius link
  fahrenheitLink.classList.add("active");
  celciusLink.classList.remove("active");
}

let celciusLink = document.querySelector("#celcius-link");
console.log(celciusLink);
celciusLink.addEventListener("click", displayCelciusTemperature);

function displayCelciusTemperature(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(celciusTemperature);
  //Remove Fahrenheit link
  fahrenheitLink.classList.remove("active");
  celciusLink.classList.add("active");
}

// Form control
let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);

//Forcast
function getForecast(coordinates) {
  console.log(coordinates);
  let apiKey = "a5acb752426cd8188485c35694980e3a";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  console.log(apiUrl);
  axios.get(apiUrl).then(displayForecast);
}

function displayForecast(response) {
  console.log(response.data.daily);
  let forecastElement = document.querySelector("#forecast");
  let forecastHTML = `<div class="row">`;
  let days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  days.forEach(function (day) {
    forecastHTML =
      forecastHTML +
      `<div class="col-2">
                <div class="weather-forecast-date">${day}</div>
                <img
                  src="http://openweathermap.org/img/wn/03n@2x.png"
                  alt=""
                  width="36"
                />
                <div class="weather-forecast-temperatures">
                  <spand class="weather-forecast-temperature-max">18°</spand>
                  <span class="weather-forecast-temperature-min">23°</span>
                </div>
              </div>         
  `;
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

search("Melbourne");
displayForecast();
