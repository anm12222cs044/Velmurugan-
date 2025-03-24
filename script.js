function searchWeather() {
    const city = document.getElementById("cityInput").value;
    const apiKey = 'bd5e378503939ddaee76f12ad7a97608'; // Replace with your OpenWeatherMap API key
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            if (data.cod === "404") {
                alert("City not found! Please enter a valid city name.");
                return;
            }

            document.getElementById("cityName").textContent = data.name;
            document.getElementById("temperature").textContent = `Temperature: ${data.main.temp}°C`;
            document.getElementById("description").textContent = `Weather: ${data.weather[0].description}`;
            document.getElementById("humidity").textContent = `Humidity: ${data.main.humidity}%`;
            document.getElementById("wind").textContent = `Wind Speed: ${data.wind.speed} m/s`;

            // Updating icons section
            document.getElementById("tempValue").textContent = `${data.main.temp}°C`;
            document.getElementById("humidityValue").textContent = `${data.main.humidity}%`;
        })
        .catch(error => {
            console.error("Error fetching weather data:", error);
            alert("Error retrieving weather data. Please try again.");
        });
}
