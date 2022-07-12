import classes from "./CitiesList.module.css";
import React, { useContext } from "react";
import { PlacesContext } from "../context/place-context";
import { useNavigate } from "react-router-dom";

import FlexContainer from "./ui/FlexContainer";
import FlexItem from "./ui/FlexItem";

const CitiesList = () => {
  const placesCtx = useContext(PlacesContext);
  const navigate = useNavigate();

  const moreInfoHandler = (index) => {
    navigate(`/${placesCtx.favoritePlaces[index].cityName}`);
  };
  const removeCityHandler = (index) => {
    placesCtx.removeFavoritePlace(index);
  };
  const refreshWeatherData = (index) => {
    placesCtx.refetchData(index);
  };

  return (
    <React.Fragment>
      {placesCtx.error && <h5 style={{ color: "red" }}>{placesCtx.error}</h5>}
      <FlexContainer>
        {placesCtx.cityWeatherInfo.map((city, index) => {
          const dateObj = new Date(city.current.dt * 1000);
          const date = dateObj.getDate();
          const hour = dateObj.getHours();
          const minutes = String(dateObj.getMinutes()).padStart(2, "0");

          let weekDays = [
            "Sunday",
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
          ];
          const weekDaysShort = [
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
          const weekDay = weekDays[dateObj.getDay()];
          const day2 = weekDaysShort[dateObj.getDay() + 1];
          const day3 = weekDaysShort[dateObj.getDay() + 2];
          const day4 = weekDaysShort[dateObj.getDay() + 3];

          const imageUrl = `http://openweathermap.org/img/wn/${city.current.weather[0].icon}.png`;
          const img2 = `http://openweathermap.org/img/wn/${city.daily[1].weather[0].icon}.png`;
          const img3 = `http://openweathermap.org/img/wn/${city.daily[2].weather[0].icon}.png`;
          const img4 = `http://openweathermap.org/img/wn/${city.daily[3].weather[0].icon}.png`;
          return (
            <FlexItem key={index}>
              {!placesCtx.isCityLoading[index] && (
                <React.Fragment>
                  <span
                    onClick={() => {
                      removeCityHandler(index);
                    }}
                    className={classes.removeButton}
                  >
                    ✕
                  </span>
                  <span
                    onClick={() => {
                      refreshWeatherData(index);
                    }}
                    className={classes.refreshButton}
                  >
                    ↺
                  </span>
                  <div
                    onClick={() => {
                      moreInfoHandler(index);
                    }}
                  >
                    <h2>
                      {placesCtx.favoritePlaces[index].cityName.length > 13
                        ? placesCtx.favoritePlaces[index].cityName.substring(
                            0,
                            12
                          ) + "."
                        : placesCtx.favoritePlaces[index].cityName + ","}
                      <span>{placesCtx.favoritePlaces[index].cityCode} </span>
                    </h2>

                    <p>
                      {weekDay},<span> {date}</span>
                    </p>
                    <p>
                      {hour}: {minutes}
                    </p>
                    <img alt="" src={imageUrl}></img>
                    <p>
                      {city.current.weather[0].description
                        .charAt(0)
                        .toUpperCase() +
                        city.current.weather[0].description.slice(1)}
                    </p>
                    <p>{Math.round(city.current.temp)}°C</p>
                    <div className={classes.table}>
                      <div>
                        <img alt="" src={img2}></img>
                        <p>{day2}</p>
                      </div>
                      <div>
                        <img alt="" src={img3}></img>
                        <p>{day3}</p>
                      </div>
                      <div>
                        <img alt="" src={img4}></img>
                        <p>{day4}</p>
                      </div>
                    </div>
                  </div>
                </React.Fragment>
              )}
            </FlexItem>
          );
        })}
      </FlexContainer>
    </React.Fragment>
  );
};

export default CitiesList;
