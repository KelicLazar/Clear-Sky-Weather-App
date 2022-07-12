import React, { useState } from "react";

export const PlacesContext = React.createContext({
  favoritePlaces: [],
  error: null,
  isVisible: false,
  cityWeatherInfo: [],
  isCityLoading: [],
  showForm: () => {},
  addFavoritePlace: () => {},
  removeFavoritePlace: (index) => {},
  refetchData: (index) => {},
  fetchOnLoad: () => {},
});

const PlacesContextProvider = (props) => {
  const [favPlaces, setFavPlaces] = useState([]);
  const [cityWeatherInfo, setCityWeatherInfo] = useState([]);
  const [error, setError] = useState(null);
  const [isVisible, setIsvisible] = useState(false);
  const [isCityLoading, setIsCityLoading] = useState([]);

  const fetchWeatherData = async (fullCity) => {
    const getWeatherData = await fetch(
      `https://api.openweathermap.org/data/2.5/onecall?lat=${fullCity.lat}&lon=${fullCity.long}&units=metric&exclude=minutely&appid=${process.env.REACT_APP_API_KEY}`
    );
    const weatherData = await getWeatherData.json();

    setCityWeatherInfo((prevValue) => {
      return [...prevValue, weatherData];
    });
    setIsCityLoading((prevValue) => {
      return [...prevValue, false];
    });
    setIsvisible(false);
  };

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

    const fullCity = {
      cityName: city,
      cityCode: data.sys.country,
      lat: data.coord.lat,
      long: data.coord.lon,
    };
    setFavPlaces((prevValue) => {
      return [...prevValue, fullCity];
    });

    fetchWeatherData(fullCity);
  };

  const onShow = () => {
    setIsvisible(true);
  };
  const removeFavoritePlaceHandler = (ind) => {
    const updatedFavPlaces = favPlaces.filter((place, index) => {
      return index !== ind;
    });
    setFavPlaces(updatedFavPlaces);
    const updatedIsCityLoading = isCityLoading.filter((state, index) => {
      return index !== ind;
    });
    setIsCityLoading(updatedIsCityLoading);
    const updatedCityWeatherInfo = cityWeatherInfo.filter((cityInfo, index) => {
      return index !== ind;
    });
    setCityWeatherInfo(updatedCityWeatherInfo);
  };
  const refetchDataHandler = async (index) => {
    setIsCityLoading((prevValue) => {
      return [...prevValue, (prevValue[index] = true)];
    });

    const cityToRefetch = favPlaces[index];
    const refetchInfo = await fetch(
      `https://api.openweathermap.org/data/2.5/onecall?lat=${cityToRefetch.lat}&lon=${cityToRefetch.long}&units=metric&exclude=minutely&appid=${process.env.REACT_APP_API_KEY}`
    );
    const newData = await refetchInfo.json();

    const copyData = cityWeatherInfo;

    copyData[index] = newData;

    setCityWeatherInfo(copyData);
    setIsCityLoading((prevValue) => {
      return [...prevValue, (prevValue[index] = false)];
    });
  };

  return (
    <PlacesContext.Provider
      value={{
        favoritePlaces: favPlaces,
        error: error,
        cityWeatherInfo: cityWeatherInfo,
        isVisible: isVisible,
        isCityLoading: isCityLoading,
        showForm: onShow,
        addFavoritePlace: addFavoritePlaceHandler,
        removeFavoritePlace: removeFavoritePlaceHandler,
        refetchData: refetchDataHandler,
        fetchOnLoad: fetchWeatherData,
      }}
    >
      {props.children}
    </PlacesContext.Provider>
  );
};

export default PlacesContextProvider;
