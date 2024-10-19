const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const weatherRoutes = require('./routes/weatherRoutes');

dotenv.config();
connectDB();

const app = express();
const PORT = process.env.PORT || 5000;

app.use('/api/weather', weatherRoutes);

// Set interval for processing weather data every 5 minutes
const { processWeatherData } = require('./controllers/weatherController');
setInterval(processWeatherData, 300000); // 5 minutes

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
