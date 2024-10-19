const express = require('express');
const router = express.Router();
const { processWeatherData } = require('../controllers/weatherController');

router.get('/', async (req, res) => {
  await processWeatherData();
  res.send('Weather data processed successfully');
});

module.exports = router;
