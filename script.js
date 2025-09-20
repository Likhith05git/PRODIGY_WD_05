document.getElementById('getWeather').addEventListener('click', function() {
    const location = document.getElementById('location').value;
    if (location) {
        fetchWeatherData(location);
    } else {
        alert('Please enter a location');
    }
});

document.getElementById('getWeatherByLocation').addEventListener('click', function() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            const { latitude, longitude } = position.coords;
            fetchWeatherDataByCoords(latitude, longitude);
        }, error => {
            alert('Unable to retrieve your location. Please enter a location manually.');
        });
    } else {
        alert('Geolocation is not supported by this browser. Please enter a location manually.');
    }
});

function fetchWeatherData(location) {
    const apiKey = `9c1df404ca47f273f9b42f5aa4c63725`; // Replace with your OpenWeather API key
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${apiKey}`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            if (data.cod === 200) {
                displayWeatherData(data);
            } else {
                alert('Location not found. Please try again.');
            }
        })
        .catch(error => console.error('Error fetching weather data:', error));
}

function fetchWeatherDataByCoords(lat, lon) {
    const apiKey = `9c1df404ca47f273f9b42f5aa4c63725`; // Replace with your OpenWeather API key
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            if (data.cod === 200) {
                displayWeatherData(data);
            } else {
                alert('Unable to retrieve weather data for your location.');
            }
        })
        .catch(error => console.error('Error fetching weather data:', error));
}

function displayWeatherData(data) {
    const weatherContainer = document.getElementById('weatherData');
    const { name, main, weather, wind, sys } = data;
    weatherContainer.innerHTML = `
        <h2>Weather in ${name}</h2>
        <p>Temperature: ${main.temp} °C</p>
        <p>Feels like: ${main.feels_like} °C</p>
        <p>Humidity: ${main.humidity}%</p>
        <p>Condition: ${weather[0].description}</p>
        <p>Wind Speed: ${wind.speed} m/s</p>
        <p>Pressure: ${main.pressure} hPa</p>
        <p>Sunrise: ${new Date(sys.sunrise * 1000).toLocaleTimeString()}</p>
        <p>Sunset: ${new Date(sys.sunset * 1000).toLocaleTimeString()}</p>
    `;
}