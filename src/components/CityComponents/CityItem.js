import React, { useState } from "react";
import FlexItem from "../ui/FlexItem";
import { removeCity } from "../../services/http-services";
import classes from "./CityItem.module.css";

import LoadingSpinner from "../ui/LoadingSpinner";
import { useNavigate } from "react-router-dom";
import {
  getDateData,
  getOpenWeatherIcon,
  weekDays,
  weekDaysShort,
} from "../../services/date-services";

const CityItem = ({ city, index, onRemove, onRefresh }) => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const { dateObj, date, hour, minutes } = getDateData(
    city?.current?.dt * 1000
  );
  const weekDay = weekDays[dateObj.getDay()];
  const day2 = weekDaysShort[dateObj.getDay() + 1];
  const day3 = weekDaysShort[dateObj.getDay() + 2];
  const day4 = weekDaysShort[dateObj.getDay() + 3];

  const imageUrl = getOpenWeatherIcon(city.current.weather[0].icon);
  const img2 = getOpenWeatherIcon(city.daily[1].weather[0].icon);
  const img3 = getOpenWeatherIcon(city.daily[2].weather[0].icon);
  const img4 = getOpenWeatherIcon(city.daily[3].weather[0].icon);

  const moreInfoHandler = () => {
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

            <p style={{ textTransform: "capitalize" }}>
              {city.current.weather[0].description}
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
