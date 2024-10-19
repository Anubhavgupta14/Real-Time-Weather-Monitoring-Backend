const axios = require('axios');
const WeatherSummary = require('../models/WeatherSummary');
const { kelvinToCelsius, getDominantCondition } = require('../utils/helpers');

const cities = ['Delhi', 'Mumbai', 'Chennai', 'Bangalore', 'Kolkata', 'Hyderabad'];

// Fetch and process weather data for all cities
const processWeatherData = async () => {
  try {
    for (const city of cities) {
      const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.API_KEY}`);
      const data = response.data;

      const tempCelsius = kelvinToCelsius(data.main.temp);
      const condition = data.weather[0].main;

      console.log(`City: ${city}, Temp: ${tempCelsius}°C, Condition: ${condition}`);

      // Add logic for rollups and aggregate summaries (you can track daily max/min/average)
      await updateDailySummary(city, tempCelsius, condition);
    }
  } catch (error) {
    console.error('Error fetching weather data:', error.message);
  }
};

// Update the daily weather summary in the database
const updateDailySummary = async (city, temp, condition) => {
    const today = new Date().setHours(0, 0, 0, 0);
    let summary = await WeatherSummary.findOne({ city, date: today });
    // console.log(summary,"Summary")
  
    if (!summary) {
      summary = new WeatherSummary({
        city,
        date: today,
        avgTemp: temp,
        maxTemp: temp,
        minTemp: temp,
        count: 1,
        dominantCondition: condition,
      });
    } else {
      const currentAvgTemp = summary.avgTemp || 0;
      const currentCount = summary.count || 1;

      console.log(currentAvgTemp, currentCount, temp,"currentAvg")
      
      // Update average temperature
      let k = ((currentAvgTemp * currentCount) + temp) / (currentCount + 1);
      console.log(k,"Temp")
      summary.avgTemp = k;
      // Update the count for the next calculation
      summary.count = currentCount + 1;
      
      // Update max and min temperatures
      summary.maxTemp = Math.max(summary.maxTemp, temp);
      summary.minTemp = Math.min(summary.minTemp, temp);
  
      // Update dominant condition
    //   const conditions = [...summary.dominantCondition.split(','), condition];
      summary.dominantCondition = condition;

      console.log(summary,"New data")
    }
  
    // Save the updated or new summary to the database
    await summary.save();
  };
  

// Check for temperature alerts
const checkAlerts = async (city, temp) => {
  const threshold = 35; // Example threshold
  if (temp > threshold) {
    console.log(`Alert! Temperature in ${city} exceeded ${threshold}°C`);
    // Add email alert logic here
  }
};

module.exports = { processWeatherData, checkAlerts };