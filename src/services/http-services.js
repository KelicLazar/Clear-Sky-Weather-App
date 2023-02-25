let allCitiesInfo = [];

export const getSavedCities = () => {
  return JSON.parse(localStorage.getItem("cities") || "[]");
};
export const getCityInfo = async (city) => {
  try {
    const getWeatherData = await fetch(
      `https://api.openweathermap.org/data/2.5/onecall?lat=${city.lat}&lon=${city.long}&units=metric&exclude=minutely&appid=${process.env.REACT_APP_API_KEY}`
    );

    let weatherData = await getWeatherData.json();
    weatherData.cityName = city.name;
    weatherData.cityCode = city.cityCode;
    return weatherData;
  } catch (error) {
    return { message: error.message, type: "error" };
  }
};

export const getCitiesInfo = async () => {
  const cities = getSavedCities();
  let newCitiesInfo = [];
  for (const city of cities) {
    const cityInfo = await getCityInfo(city);
    newCitiesInfo.push(cityInfo);
  }
  allCitiesInfo = newCitiesInfo;
  return allCitiesInfo;
};

export const addCity = async (city) => {
  const savedCities = getSavedCities();
  for (const cityInfo of allCitiesInfo) {
    if (cityInfo.cityName === city) {
      return { message: "That city is already added.", type: "info" };
    }
  }
  let cityData;
  try {
    const cityCoordsResponse = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.REACT_APP_API_KEY}`
    );
    if (!cityCoordsResponse.ok) {
      const errorResponse = await cityCoordsResponse.json();
      errorResponse.type = "error";
      return errorResponse;
    }

    const data = await cityCoordsResponse.json();

    cityData = {
      name: city,
      cityCode: data.sys.country,
      lat: data.coord.lat,
      long: data.coord.lon,
    };
  } catch (error) {
    throw new Error(error.message);
  }
  if (cityData) {
    const newCityInfo = await getCityInfo(cityData);
    allCitiesInfo = [...allCitiesInfo, newCityInfo];
    const newSavedCities = [...savedCities, cityData];
    localStorage.setItem("cities", JSON.stringify(newSavedCities));
    return allCitiesInfo;
  }
};
export const removeCity = (city) => {
  const savedCities = getSavedCities();
  const newSavedCities = savedCities.filter((item) => item.name !== city);
  localStorage.setItem("cities", JSON.stringify(newSavedCities));

  allCitiesInfo = allCitiesInfo.filter((item) => item.cityName !== city);
  return allCitiesInfo;
};

export const refreshCity = async (cityName, cityIndex) => {
  let cityData = {
    name: allCitiesInfo[cityIndex].cityName,
    cityCode: allCitiesInfo[cityIndex].cityCode,
    lat: allCitiesInfo[cityIndex].lat,
    long: allCitiesInfo[cityIndex].lon,
  };

  const updatedCityData = await getCityInfo(cityData);
  if (updatedCityData.message) {
    return { data: allCitiesInfo, message: updatedCityData.message };
  }

  allCitiesInfo[cityIndex] = updatedCityData;

  return { data: allCitiesInfo };
};
