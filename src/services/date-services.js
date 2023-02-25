export let weekDays = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
export const weekDaysShort = [
  "Sun",
  "Mon",
  "Tue",
  "Wed",
  "Thu",
  "Fri",
  "Sat",
  "Sun",
  "Mon",
  "Tue",
];

export const getDateData = (data) => {
  const dateObj = new Date(data);
  const date = dateObj.getDate();
  const hour = dateObj.getHours();
  const minutes = String(dateObj.getMinutes()).padStart(2, "0");
  let numDate = "";
  if (Number(String(date).slice(-1)) === 1) {
    numDate = "st";
  } else if (Number(String(date).slice(-1)) === 2) {
    numDate = "nd";
  } else if (Number(String(date).slice(-1)) === 3) {
    numDate = "rd";
  } else {
    numDate = "th";
  }
  return { dateObj, date, hour, minutes, numDate };
};

export const getOpenWeatherIcon = (icon) => {
  return `http://openweathermap.org/img/wn/${icon}.png`;
};

export const getWindDirection = (windDegrees) => {
  const windDirections = [
    "N",
    "NNE",
    "NE",
    "ENE",
    "E",
    "ESE",
    "SE",
    "SSE",
    "S",
    "SSW",
    "SW",
    "WSW",
    "W",
    "WNW",
    "NW",
    "NNW",
    "N",
  ];

  return windDirections[Math.round(windDegrees / 22.5)];
};
