const kelvinToCelsius = (temp) => {
    return (temp - 273.15).toFixed(2);
  };
  
  const getDominantCondition = (conditionFrequency) => {
    if (!conditionFrequency || Object.keys(conditionFrequency).length === 0) {
      return null;
    }
    
    // Convert the object to a Map
    const conditionMap = new Map(Object.entries(conditionFrequency));
    
    // Find the condition with the highest frequency
    let dominantCondition = null;
    let maxCount = 0;
    for (const [condition, count] of conditionMap.entries()) {
      if (count > maxCount) {
        maxCount = count;
        dominantCondition = condition;
      }
    }
    return dominantCondition;
  };
  
  module.exports = { kelvinToCelsius, getDominantCondition };
  