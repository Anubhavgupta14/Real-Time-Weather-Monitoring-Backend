const kelvinToCelsius = (temp) => {
    return (temp - 273.15).toFixed(2);
  };
  
  const getDominantCondition = (conditionFrequency) => {
    if (!conditionFrequency || conditionFrequency.length === 0) {
      return null;
    }
    return conditionFrequency.reduce((prev, current) =>
      current.count > prev.count ? current : prev
    ).condition;
  };
  
  module.exports = { kelvinToCelsius, getDominantCondition };
  