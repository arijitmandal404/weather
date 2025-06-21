const axios = require('axios');
const apiKey = "367d3f77518e79f2da0ae67ffb8adce2";
// const zipCode = "722121";
const countryCode = "in";

const fetchWeather = async (zipCode) => {
    const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?zip=${zipCode},${countryCode}&appid=${apiKey}&units=metric`);
    try {
        const data = response.data;
        // console.log(response);  // Log the data for debugging
        return data;  // Return the data so it can be used elsewhere
    } catch (error) {
        console.error("Error fetching weather data:", error);
        return null;
    }
}

module.exports = {fetchWeather};