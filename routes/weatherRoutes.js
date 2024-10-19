const express = require('express');
const router = express.Router();
const { processWeatherData } = require('../controllers/weatherController');

// Route to trigger weather data processing manually
router.get('/process', async (req, res) => {
  await processWeatherData();
  res.send('Weather data processed successfully');
});

module.exports = router;
