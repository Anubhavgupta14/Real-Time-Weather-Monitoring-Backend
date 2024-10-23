The backend of this application is hosted on Render and serves weather data for Indian metro cities. It provides a reliable data feed that the frontend uses to display updated weather conditions every 5 minutes.

Backend URL: https://real-time-weather-monitoring-backend.onrender.com (Render is free platform that's why it may take some time during loading application first time)

Technologies Used

Node.js/Express: For handling API requests and providing weather data to the frontend.
Weather API: Integrated to fetch real-time weather data.

Testing
The application has been tested rigorously for more than 3 days, ensuring accurate data fetching and smooth functionality. During testing, all weather metrics, including temperature, wind speed, and dominant conditions, have been validated to be in sync with real-world data.

How to Run Locally
Clone the repository:

git clone "https://github.com/Anubhavgupta14/Real-Time-Weather-Monitoring-Backend.git"

Install dependencies:
npm install

Run the development server:
npm start
Server will listen on http://localhost:3001