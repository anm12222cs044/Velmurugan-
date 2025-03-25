// OpenWeatherMap API Key (Replace with your own)
const API_KEY = "bd5e378503939ddaee76f12ad7a97608";

// Function to get weather data
async function getWeather() {
    const city = document.getElementById("cityInput").value;

    if (city === "") {
        alert("Please enter a city name!");
        return;
    }

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error("City not found");
        }

        const data = await response.json();
        updateWeatherUI(data);
    } catch (error) {
        alert(error.message);
    }
}

// Function to update UI with fetched weather data
function updateWeatherUI(data) {
    document.getElementById("cityName").textContent = data.name;
    document.getElementById("temperature").textContent = `${Math.round(data.main.temp)}°C`;
    document.getElementById("description").textContent = `Weather: ${data.weather[0].description}`;
    document.getElementById("windSpeed").textContent = `Wind: ${data.wind.speed} m/s`;
    document.getElementById("humidity").textContent = `Humidity: ${data.main.humidity}%`;

    // Update weather icon
    const iconCode = data.weather[0].icon;
    document.getElementById("weatherIcon").src = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;

    // Update last updated time
    const now = new Date();
    document.getElementById("lastUpdate").textContent = `Last Update: ${now.toLocaleTimeString()}`;
}

// Trigger search on pressing "Enter" key
document.getElementById("cityInput").addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        getWeather();
    }
});
