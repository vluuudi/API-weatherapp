const apiKey = "dd99d66345318624ceae721d7af627f6";
const baseURL = `https://api.openweathermap.org/data/2.5/weather?appid=${apiKey}&units=metric`;

// Function to get the weather data based on the input city. 

async function getWeather(city) { // "async" allows the code to fetch data without "blocking" the rest of the code, even if the network is slow. This stops the code "freezing" while waiting for a response.  
    
    const apiURL = `${baseURL}&q=${city}`; //

    try {
        const response = await fetch(apiURL); //"await" helps the function to handle tasks that take time. "fetch" is a built in JS function that allows us to make network requests, like calling an API. "fetch", returns a Promise, which is a value that's not immediately available. 
         //"await" pauses the function, until "fetch" completes, and the data is returned. Once it's available, "fetch" provides the  "response" object, which is raw data from the API. This data is assigned to the "response" variable. 

        const data = await response.json(); // respnse.json() is a method, converting the raw "response" data into a JSON object, which JavaScript can understand. This is now assigned to the variable "data", which holds the weather data we need in a format we can use for the app. 

        displayWeather(data);

        //The code is wrapped in "try" & "catch". If nothing goes wrong, the code will run smoothly, but if there is an error, the "catch" block of code will run, and instead of the app crashing, the message below will be displayed. 

    } catch (error) {
        console.error("There's been an error:", error);
    }
};

// Function to actually display the weather data 

function displayWeather(data) {
    const weatherInfoDiv =  document.getElementById("weatherInfo"); //Accessing the "weather info" div in HTML file, so we can update it with the weather information. 

    if (data && data.main) { // if statement checks that data exists, and contains the  "main" property in the data structure from openweathermap. If the user types in an invalid city, the data may not contain weather information, so we check with "data && data.main" to ensure there is actual data to display. If not, we skip to the "else" block.

        const placeholderText = document.getElementById("placeholderText");
        if (placeholderText) {
            placeholderText.style.display = "none";
        }

        //Each line below updates one piece of info by setting the "textContent" of a specific element.
        document.getElementById("cityName").textContent = `Weather in ${data.name}:`;
        document.getElementById("temperature").textContent = `Temperature: ${data.main.temp} °C`;
        // document.getElementById("maxTemp").textContent = `Max: ${data.main.temp_max} °C`;
        // document.getElementById("minTemp").textContent = `Min: ${data.main.temp_min} °C`;
        document.getElementById("feelsLike").textContent = `Feels like: ${data.main.feels_like} °C`;
        document.getElementById("weatherDescription").textContent = `Weather: ${data.weather[0].description}`;
        document.getElementById("humidity").textContent = `Humidity: ${data.main.humidity}%`
        document.getElementById("windSpeed").textContent = `Wind Speed: ${data.wind.speed} m/s`;

        //What's the background class based on weather description?
        const weatherCondition = data.weather[0].main.toLowerCase();
        const emojiElement = document.getElementById("weatherEmoji");

        //Emoji based on weather condition

        if (weatherCondition.includes("clear")) {
            emojiElement.textContent = "☀️"; // Sun emoji for clear weather
        } else if (weatherCondition.includes("cloud")) {
            emojiElement.textContent = "☁️"; // Cloud emoji for cloudy weather
        } else if (weatherCondition.includes("rain")) {
            emojiElement.textContent = "🌧️"; // Rain emoji for rainy weather
        } else if (weatherCondition.includes("snow")) {
            emojiElement.textContent = "❄️"; // Snowflake emoji for snow
        } else if (weatherCondition.includes("thunderstorm")) {
            emojiElement.textContent = "🌩️"; // Lightning emoji for thunderstorms
        } else if (weatherCondition.includes("drizzle")) {
            emojiElement.textContent = "🌦️"; // Light rain or drizzle emoji
        } else {
            emojiElement.textContent = "🌈"; // Rainbow or default emoji
        }

        //Remove existing background classes
       document.body.classList.remove("sunny", "cloudy", "rainy", "clear-night");

        //Apply the relevant background class based on weather condition
        if (weatherCondition.includes("clear") && data.dt > data.sys.sunset) {
            document.body.classList.add("clear-night");
        } else if (weatherCondition.includes("cloud")) {
            document.body.classList.add("cloudy");
        } else if (weatherCondition.includes("rain")) {
            document.body.classList.add("rainy");
        } else {
            document.body.classList.add("sunny");
        }

    } else {
        //If there's an issue, the message "Weather data not found" will be displayed
        document.getElementById("cityName").textContent = "Weather data not found.";
        document.getElementById("temperature").textContent = "";
        document.getElementById("maxTemp").textContent = "";
        document.getElementById("minTemp").textContent = "";
        document.getElementById("feelsLike").textContent = "";
        document.getElementById("weatherDescription").textContent = "";
        document.getElementById("humidity").textContent = "";
        document.getElementById("windSpeed").textContent = "";
    }
};

document.getElementById("searchButton").addEventListener("click", () => {
    const city = document.getElementById("locationInput").value.trim();
    if (city) {
        getWeather(city);
    } else {
        alert("please enter a city name");
    }
});

