const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const weatherRoutes = require('./routes/weatherRoutes');
const getDataRoutes = require('./routes/getDataRoutes');
const { processWeatherData } = require('./controllers/weatherController');

dotenv.config();
connectDB();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use('/api/weather', weatherRoutes);
app.use('/api/getData', getDataRoutes);


setInterval(processWeatherData, 300000); // 5 minutes

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
