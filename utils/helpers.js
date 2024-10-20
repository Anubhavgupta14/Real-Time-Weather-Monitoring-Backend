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

const convertDate = (date) => {
  const day = date.substring(0, 2);
  const month = date.substring(2, 4);
  const year = date.substring(4, 8);

  const istDate = new Date(`${year}-${month}-${day}T00:00:00.000+05:30`);
  return istDate;
};

module.exports = { kelvinToCelsius, getDominantCondition, convertDate };
