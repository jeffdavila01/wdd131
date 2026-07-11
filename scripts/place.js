function updateWeatherDisplay(data) {
    const { tempF, condition, windMph } = data;

    document.getElementById('temperature').textContent = `${tempF}°F`;
    document.getElementById('condition').textContent = condition;
    document.getElementById('wind').textContent = `${windMph} mph`;
    document.getElementById('windchill').textContent = `${calculateWindChill(tempF, windMph)}°F`;
}

function calculateWindChill(tempF, windMph) {
    if (tempF > 50 || windMph < 3) {
        return tempF;
    }
    const windChill = 35.74 + (0.6215 * tempF)
        - (35.75 * Math.pow(windMph, 0.16))
        + (0.4275 * tempF * Math.pow(windMph, 0.16));
    return Math.round(windChill);
}

async function fetchWeatherData(apiUrl) {
    try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error(`Weather API error: ${response.status}`);
        }
        const data = await response.json();

        const weatherData = {
            tempF: data.temperature,
            condition: data.condition,
            windMph: data.windSpeed
        };

        updateWeatherDisplay(weatherData);
    } catch (error) {
        console.error('Failed to fetch weather data:', error);
    }  
}

function startLiveWeatherUpdates(apiUrl, intervalMs = 600000) {
    fetchWeatherData(apiUrl);
    setInterval(() => fetchWeatherData(apiUrl), intervalMs);
}

updateWeatherDisplay({ tempF: 28, condition: 'Partly Cloudy', windMph: 15});

const currentYear = document.getElementById("currentyear");
const full = document.getElementById("full");
const clock = document.getElementById("clock");

function updateDateTime(){
    const lastModified = new Date(document.lastModified);
    full.innerHTML = `Last Modified: <span>${lastModified.toLocaleDateString()}</span>`;
}

function updateYear(){
    currentYear.textContent = new Date().getFullYear();
}

function updateClock(){
    const now = new Date();
    clock.textContent = now.toLocaleTimeString();
}

updateDateTime();
updateYear();
updateClock();

setInterval(updateClock, 1000);