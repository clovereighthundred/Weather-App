const weatherForm = document.querySelector(".weatherForm");
const cityInput = document.querySelector(".cityInput");
const weatherCard = document.querySelector(".weatherCard");
const apiKey = "8dee600906b606ab865ec3ae64c64f86";

weatherForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  const city = cityInput.value;

  if (city) {
    //Gets weather data from city that's passed in
    try {
      const weatherData = await getWeatherData(city);
      displayWeatherInfo(weatherData);
    } catch (error) {
      console.error(error);
      displayError(error);
    }
  } else {
    displayError("Please enter a city.");
  }
});

async function getWeatherData(city) {
  //API URL GOES HERE
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  const response = await fetch(apiUrl);

  if (!response.ok) {
    throw new Error("Could not fetch the weather data");
  }
  return await response.json();
}

function displayWeatherInfo(data) {
  // Fetch weatherData variables from OpenweatherMap API
  const {
    name: city,
    main: { temp, humidity },
    weather: [{ description, id }],
  } = data;

  weatherCard.textContent = "";
  weatherCard.style.display = "flex";

  const cityDisplay = document.createElement("h1");
  const tempDisplay = document.createElement("p");
  const humidityDisplay = document.createElement("p");
  const descDisplay = document.createElement("p");
  const weatherEmoji = document.createElement("p");

  cityDisplay.textContent = city;
  tempDisplay.textContent = `${temp.toFixed(1)}ºC`;
  humidityDisplay.textContent = `Humidity: ${humidity}`;
  descDisplay.textContent = description;
  weatherEmoji.textContent = getWeatherEmoji(id);

  cityDisplay.classList.add("cityDisplay");
  tempDisplay.classList.add("tempDisplay");
  humidityDisplay.classList.add("humidityDisplay");
  descDisplay.classList.add("descDisplay");
  weatherEmoji.classList.add("weatherEmoji");

  weatherCard.appendChild(cityDisplay);
  weatherCard.appendChild(tempDisplay);
  weatherCard.appendChild(humidityDisplay);
  weatherCard.appendChild(descDisplay);
  weatherCard.appendChild(weatherEmoji);
}

function getWeatherEmoji(weatherId) {
  // Return an emoji based on the weather code
  switch (true) {
    case weatherId >= 200 && weatherId < 300: // Thunderstorm
      return "⛈️";
    case weatherId >= 300 && weatherId < 400: // Drizzle
      return "🌦️";
    case weatherId >= 500 && weatherId < 600: // Rain
      return "🌧️";
    case weatherId >= 600 && weatherId < 700: // Snow
      return "❄️";
    case weatherId >= 700 && weatherId < 800: // Atmosphere
      return "🌫️";
    case weatherId === 800: // Clear Sky
      return "☀️";
    case weatherId >= 801 && weatherId < 810: // Clouds
      return "☁️";
    default:
      return "❓";
  }
}

function displayError(message) {
  // Displays an error message
  const errorDisplay = document.createElement("p");
  errorDisplay.textContent = message;
  errorDisplay.classList.add("errorDisplay");

  weatherCard.textContent = "";
  weatherCard.style.display = "flex";
  weatherCard.appendChild(errorDisplay);
}
