import React, { useContext } from "react";
import { useLocation, useParams } from "react-router-dom";
import { PlacesContext } from "../context/place-context";
import Nav from "./Nav";
import classes from "./CityInfo.module.css";
import FlexContainer from "./ui/FlexContainer";
import FlexItem from "./ui/FlexItem";
import { getCityInfo } from "../services/city-services";
import { useState } from "react";
import { useEffect } from "react";
import { Skeleton } from "@mui/material";

const CityInfo = () => {
  const params = useParams();
  const location = useLocation();
  // const [cityInfo, setCityInfo] = useState([]);
  const cityInfo = location.state;
  console.log(cityInfo, "cityInfo");
  console.log("location", location);
  console.log(params.city);

  const placesCtx = useContext(PlacesContext);
  const placeIndex = 1;
  // placesCtx.favoritePlaces.findIndex(
  //   (element) => element.cityName === params.city
  // );

  return (
    <React.Fragment>
      <Nav></Nav>

      <FlexContainer>
        {cityInfo.daily.map((day, index) => {
          const dateObj = new Date(day.dt * 1000);
          let date = dateObj.getDate();

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
          let weekDays = [
            "Sunday",
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
          ];
          const weekDay = weekDays[dateObj.getDay()];

          return (
            <FlexItem key={index}>
              <h2>
                {index === 0
                  ? " Today"
                  : index === 1
                  ? " Tomorrow"
                  : " " + weekDay + ", " + date + numDate}
              </h2>
              <div>
                <p>{params.city}</p>

                <img
                  alt=""
                  src={`http://openweathermap.org/img/wn/${day.weather[0].icon}.png`}
                ></img>

                <p>
                  {day.weather[0].description.charAt(0).toUpperCase() +
                    day.weather[0].description.slice(1)}
                </p>
                <p>Daily Temperature {Math.round(day.temp.day)}°C</p>
              </div>
              <div className={classes.table}>
                <div>
                  <p>Max daily Temp.</p>
                  <p>{Math.round(day.temp.max)}°C</p>
                </div>
                <div>
                  <p>Min daily Temp.</p>
                  <p>{Math.round(day.temp.min)}°C</p>
                </div>
                <div>
                  <p>Chance of rain </p>
                  <p>
                    {Math.round(day.pop * 100)}%{" "}
                    {day.pop * 100 > 50 ? "☔" : "🌂"}
                  </p>
                </div>
              </div>

              <div className={classes.table}>
                <div>
                  <p>Humidity</p>
                  <p>{day.humidity}%</p>
                </div>
                <div>
                  <p>UV index</p>
                  <p>
                    {Math.round(day.uvi)}
                    {day.uvi > 8 && "⚠️"}
                  </p>
                </div>
                <div>
                  <p>Wind speed</p>
                  <p>{Math.round(day.wind_speed)}m/s</p>
                </div>
              </div>
            </FlexItem>
          );
        })}
      </FlexContainer>
    </React.Fragment>
  );
};

export default CityInfo;
