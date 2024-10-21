const axios = require("axios");
const WeatherSummary = require("../models/WeatherSummary");
const { kelvinToCelsius, getDominantCondition } = require("../utils/helpers");
const moment = require("moment-timezone");

const cities = [
  "Delhi",
  "Mumbai",
  "Chennai",
  "Bangalore",
  "Kolkata",
  "Hyderabad",
];

// Fetch and process weather data for all cities
const processWeatherData = async () => {
  try {
    for (const city of cities) {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.API_KEY}`
      );
      console.log(`Fetched for city: ${city}`)
      const data = response.data;
      const tempCelsius = kelvinToCelsius(data?.main?.temp);
      const condition = data.weather[0]?.main;
      const feels_like = kelvinToCelsius(data?.main?.feels_like);
      const dt = data?.dt;
      const humidity = data?.main?.humidity;
      const wind_speed = data?.wind?.speed;

      const currentTime = moment().tz("Asia/Kolkata");
      const currentMinutes = currentTime.minutes();
      const hour = currentTime.hours();

      // console.log(currentMinutes, currentTime)

      //console.log(`City: ${city}, Temp: ${tempCelsius}°C, Condition: ${condition}, Humidity: ${humidity}`);

      // Add logic for rollups and aggregate summaries (you can track daily max/min/average)
      await updateDailySummary(
        city,
        tempCelsius,
        condition,
        feels_like,
        dt,
        humidity,
        wind_speed,
        currentMinutes,
        hour
      );
    }
  } catch (error) {
    console.error("Error fetching weather data:", error.message);
  }
};

// Update the daily weather summary in the database
const updateDailySummary = async (
  city,
  temp,
  condition,
  feels_like,
  dt,
  humidity,
  wind_speed,
  currentMinutes,
  hour
) => {
  const today = moment().tz("Asia/Kolkata").startOf("day").toDate();
  // console.log(today, "Today in IST");
  let summary = await WeatherSummary.findOne({ city, date: today });
  // console.log(summary,"Summary")

  if (!summary) {
    if (currentMinutes == 0) {
      summary = new WeatherSummary({
        city,
        date: today,
        temp: temp,
        avgTemp: temp,
        maxTemp: temp,
        minTemp: temp,
        temp_list: [{ temp: temp, time: hour }],
        count: 1,
        main: condition,
        feels_like: feels_like,
        dt: dt,
        humidity: humidity,
        wind_speed: wind_speed,
        dominantCondition: condition,
        conditionFrequency: [{ condition, count: 1 }],
      });
    } else {
      summary = new WeatherSummary({
        city,
        date: today,
        temp: temp,
        avgTemp: temp,
        maxTemp: temp,
        minTemp: temp,
        count: 1,
        main: condition,
        feels_like: feels_like,
        dt: dt,
        humidity: humidity,
        wind_speed: wind_speed,
        dominantCondition: condition,
        conditionFrequency: [{ condition, count: 1 }],
      });
    }
  } else {
    const currentAvgTemp = summary.avgTemp || 0;
    const currentCount = summary.count || 1;

    //   console.log(currentAvgTemp, currentCount, temp,"currentAvg")

    // Update average temperature
    summary.avgTemp =
      (parseInt(currentAvgTemp * currentCount) + parseInt(temp)) /
      parseInt(currentCount + 1);
    //   console.log(k,"Temp")
    //   summary.avgTemp = k/parseInt(currentCount+1);
    // Update the count for the next calculation
    summary.count = currentCount + 1;

    // Update max and min temperatures
    summary.maxTemp = Math.max(summary.maxTemp, temp);
    summary.minTemp = Math.min(summary.minTemp, temp);

    // Update dominant condition
    //   const conditions = [...summary.dominantCondition.split(','), condition];
    summary.main = condition;
    summary.temp = temp;
    summary.feels_like = feels_like;
    summary.dt = dt;
    summary.humidity = humidity;
    summary.wind_speed = wind_speed;

    summary.conditionFrequency = summary.conditionFrequency || [];
    const conditionIndex = summary.conditionFrequency.findIndex(
      (entry) => entry.condition === condition
    );

    if (conditionIndex !== -1) {
      // If condition already exists, increment its count
      summary.conditionFrequency[conditionIndex].count += 1;
    } else {
      // If condition does not exist, add a new entry
      summary.conditionFrequency.push({ condition, count: 1 });
    }

    // Determine the new dominant condition
    if (Array.isArray(summary.conditionFrequency)) {
      // Determine the new dominant condition
      summary.dominantCondition = getDominantCondition(
        summary.conditionFrequency
      );
    } else {
      console.error(
        "Condition frequency is not an array:",
        summary.conditionFrequency
      );
    }
    if (currentMinutes == 0) {
      summary.temp_list.push({ temp: temp, time: hour });
    }

    //   console.log(summary,"New data")
  }

  await summary.save();
};

module.exports = { processWeatherData };
