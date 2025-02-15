const weatherForm = document.querySelector(".weatherForm");
const cityInput = document.querySelector(".cityInput");
const weatherCard = document.querySelector(".weatherCard");
const apiKey = "8dee600906b606ab865ec3ae64c64f86";

weatherForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const city = cityInput.value;

  if (city) {
  } else {
    displayError("Please enter a city");
  }
});

async function getWeatherData() {}

function getWeatherInfo(data) {}

function getWeatherEmoji(weatherId) {}

function displayError(message) {
  const errorDisplay = document.createElement("p");
  errorDisplay.textContent = message;
  errorDisplay.classList.add("errorDisplay");

  weatherCard.textContent = "";
  weatherCard.style.display = "flex";
  weatherCard.appendChild(errorDisplay).style.fontWeight = "bold";
}
