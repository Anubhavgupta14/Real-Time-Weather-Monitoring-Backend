// Converts temperature from Kelvin to Celsius
const kelvinToCelsius = (temp) => {
    return (temp - 273.15).toFixed(2);
  };
  
  // Get dominant weather condition based on frequency
  const getDominantCondition = (conditions) => {
    return conditions.sort((a, b) =>
      conditions.filter(v => v === a).length - conditions.filter(v => v === b).length
    ).pop();
  };
  
  module.exports = { kelvinToCelsius, getDominantCondition };
  