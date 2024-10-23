The backend of this application is hosted on Render and serves weather data for Indian metro cities. It provides a reliable data feed that the frontend uses to display updated weather conditions every 5 minutes.

Backend URL: https://real-time-weather-monitoring-backend.onrender.com (Render is free platform that's why it may take some time during loading application first time)

Technologies Used
Frontend:
Next.js: For building a performant, SEO-friendly, server-side rendered application.
CSS/SCSS: Custom styles to create a clean, responsive, and user-friendly interface.
Backend:
Node.js/Express: For handling API requests and providing weather data to the frontend.
Weather API: Integrated to fetch real-time weather data.
Testing
The application has been tested rigorously for more than 3 days, ensuring accurate data fetching and smooth functionality. During testing, all weather metrics, including temperature, wind speed, and dominant conditions, have been validated to be in sync with real-world data.

How to Run Locally
Clone the repository:

bash
Copy code
git clone <repository-url>
cd real-time-weather-monitoring-frontend
Install dependencies:

bash
Copy code
npm install
Run the development server:

bash
Copy code
npm run dev
Open http://localhost:3000 in your browser to view the application.