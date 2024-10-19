const mongoose = require('mongoose');

const WeatherSummarySchema = new mongoose.Schema({
  city: { type: String, required: true },
  date: { type: Date, required: true },
  avgTemp: Number,
  maxTemp: Number,
  minTemp: Number,
  count: Number,
  dominantCondition: String,
});

module.exports = mongoose.model('WeatherSummary', WeatherSummarySchema);
