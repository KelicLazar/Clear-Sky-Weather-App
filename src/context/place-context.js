import React, { useState } from "react";

export const PlacesContext = React.createContext({
  favoritePlaces: [],
  error: null,
  isVisible: false,
  cityWeatherInfo: [],
  showForm: () => {},
  addFavoritePlace: () => {},
  removeFavoritePlace: () => {},
});

const PlacesContextProvider = (props) => {
  const [favPlaces, setFavPlaces] = useState([]);
  const [cityWeatherInfo, setCityWeatherInfo] = useState([]);
  const [error, setError] = useState(null);
  const [isVisible, setIsvisible] = useState(false);
  console.log("loaded ctxprovider");

  const addFavoritePlaceHandler = async (city) => {
    if (favPlaces.some((e) => e.cityName === city)) {
      setError("That city is already added to favorites");
      setTimeout(() => {
        setError(null);
      }, 2000);
      return;
    }
    if (favPlaces.length === 6) {
      setError("Maximum number of favorite cities is reached");
      setTimeout(() => {
        setError(null);
      }, 2000);
      return;
    }
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.REACT_APP_API_KEY}`
    );
    if (!response.ok) {
      console.error("There is no info about that city");
      setError("There is no info about " + city);
      setTimeout(() => {
        setError(null);
      }, 2000);
      throw Error(response.statusText);
    }
    const data = await response.json();
    console.log(data);
    const fullCity = {
      cityName: city,
      cityCode: data.sys.country,
      lat: data.coord.lat,
      long: data.coord.lon,
    };
    const getWeatherData = await fetch(
      `https://api.openweathermap.org/data/2.5/onecall?lat=${fullCity.lat}&lon=${fullCity.long}&units=metric&exclude=hourly,minutely&appid=${process.env.REACT_APP_API_KEY}`
    );
    const weatherData = await getWeatherData.json();
    console.log("This is weather data", weatherData);
    console.log(weatherData.daily[0].temp.day);
    console.log(fullCity);
    setFavPlaces((prevValue) => {
      return [...prevValue, fullCity];
    });
    setCityWeatherInfo((prevValue) => {
      return [...prevValue, weatherData];
    });
    setIsvisible(false);
  };
  const onShow = () => {
    setIsvisible(true);
  };
  const removeFavoritePlaceHandler = () => {};

  return (
    <PlacesContext.Provider
      value={{
        favoritePlaces: favPlaces,
        error: error,
        cityWeatherInfo: cityWeatherInfo,
        isVisible: isVisible,
        showForm: onShow,
        addFavoritePlace: addFavoritePlaceHandler,
        removeFavoritePlace: removeFavoritePlaceHandler,
      }}
    >
      {props.children}
    </PlacesContext.Provider>
  );
};

export default PlacesContextProvider;
