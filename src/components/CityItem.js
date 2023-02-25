import FlexItem from "./ui/FlexItem";
import React from "react";
import { removeCity } from "../services/city-services";
import classes from "./CitiesList.module.css";
import { useState } from "react";
import LoadingSpinner from "./ui/LoadingSpinner";
import { useNavigate } from "react-router-dom";
import { Skeleton } from "@mui/material";

const CityItem = ({ city, index, onRemove, onRefresh }) => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const dateObj = new Date(city?.current?.dt * 1000);
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

  const moreInfoHandler = () => {
    console.log(city.cityName);
    navigate(`/${city.cityName}`, {
      state: city,
    });
  };
  const removeCityHandler = (cityName) => {
    onRemove(removeCity(cityName));
  };
  const refreshWeatherData = async (cityName, index) => {
    setIsLoading(true);
    await onRefresh(cityName, index);

    setIsLoading(false);
  };

  return (
    <FlexItem key={index}>
      {isLoading && <LoadingSpinner />}
      {!isLoading && (
        <React.Fragment>
          <span
            onClick={() => {
              removeCityHandler(city.cityName);
            }}
            className={classes.removeButton}
          >
            ✕
          </span>
          <span
            onClick={() => {
              refreshWeatherData(city.cityName, index);
            }}
            className={classes.refreshButton}
          >
            ↺
          </span>
          <div onClick={moreInfoHandler}>
            <h2>
              {city.cityName.length > 13
                ? city.cityName.substring(0, 12) + "."
                : city.cityName + ","}
              <span>{city.cityCode} </span>
            </h2>

            <p>
              {weekDay},<span> {date}</span>
            </p>
            <p>
              {hour}: {minutes}
            </p>

            <img alt="" src={imageUrl}></img>

            <p>
              {city.current.weather[0].description.charAt(0).toUpperCase() +
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
};

export default CityItem;
