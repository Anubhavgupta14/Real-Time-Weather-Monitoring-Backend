const mongoose = require('mongoose');

const WeatherSummarySchema = new mongoose.Schema({
  city: { type: String, required: true },
  date: { type: Date, required: true },
  avgTemp: Number,
  maxTemp: Number,
  minTemp: Number,
  count: Number,
  main: String,
  feels_like:String,
  dt:Number,
  humidity:Number,
  wind_speed:Number,
  conditionFrequency: { type: Map, of: Number, default: {} },
  dominantCondition: String,
});

module.exports = mongoose.model('WeatherSummary', WeatherSummarySchema);
