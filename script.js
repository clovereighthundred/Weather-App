const apiKey = "8dee600906b606ab865ec3ae64c64f86";
const city = "Lagos";
const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=Lagos&appid=8dee600906b606ab865ec3ae64c64f86&units=metric`;

const weatherForm = document.querySelector(".weatherForm");
const cityInput = document.querySelector(".cityInput");
const weatherCard = document.querySelector(".weatherCard");

weatherForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  const city = cityInput.value;

  // if (city) {
  //   try {
  //     const weatherData = await getWeatherData(city);
  //     getWeatherInfo(weatherData);
  //   } catch (error) {
  //     console.error(error);
  //     displayError(error);
  //   }
  // } else {
  //   displayError("Please enter a city");
  // }
});

async function getWeatherData(city) {
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=Lagos&appid=8dee600906b606ab865ec3ae64c64f86&units=metric`; // This makes the API call

  const response = await fetch(apiUrl);
  console.log(response);
}

function getWeatherInfo(data) {
  // Parse and Display weather data.
  const city = data.name;
  const temperature = Math.round(data.main.temp);
  const description = data.weather[0].description;
  const weatherId = data.weather[0].id;
  const emoji = getWeatherEmoji(weatherId);

  const weatherContainer = document.getElementById("weather");
  weatherContainer.innerHTML = `
    <h2>${emoji} Weather in ${city}</h2>
    <p><strong>${temperature}°C</strong></p>
    <p>${description}</p>
  `;
}

function getWeatherEmoji(weatherId) {
  // Return an Emoji based on the weather code
  if (weatherId >= 200 && weatherId < 300) return "⛈️"; // Thunderstorm
  if (weatherId >= 300 && weatherId < 400) return "🌦️"; // Drizzle
  if (weatherId >= 500 && weatherId < 600) return "🌧️"; // Rain
  if (weatherId >= 600 && weatherId < 700) return "❄️"; // Snow
  if (weatherId >= 700 && weatherId < 800) return "🌫️"; // Atmosphere (fog, mist, etc.)
  if (weatherId === 800) return "☀️"; // Clear
  if (weatherId > 800 && weatherId < 900) return "☁️"; // Clouds
  return "🌈"; // Fallback
}

function displayError(message) {
  const errorDisplay = document.createElement("p");
  errorDisplay.textContent = message;
  errorDisplay.classList.add("errorDisplay");

  weatherCard.textContent = "";
  weatherCard.style.display = "flex";
  weatherCard.appendChild(errorDisplay).style.fontWeight = "bold";
}
