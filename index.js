const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const weatherRoutes = require("./routes/weatherRoutes");
const getDataRoutes = require("./routes/getDataRoutes");
const { processWeatherData } = require("./controllers/weatherController");
const cors = require("cors");

dotenv.config();
connectDB();

const app = express();
const PORT = process.env.PORT || 3001;
app.use(cors());
app.use(express.json());
app.use("/api/weather", weatherRoutes);
app.use("/api/getData", getDataRoutes);

const checkAndFetchOnHour = () => {
  const now = new Date();
  const minutes = now.getMinutes();

  if (minutes === 0) {
    processWeatherData();
  }
};

setInterval(checkAndFetchOnHour, 60000); // To fetch data for each time when minutes gets 0
setInterval(processWeatherData, 300000); // 5 minutes

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
