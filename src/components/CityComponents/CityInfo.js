import React from "react";
import { useLocation, useParams } from "react-router-dom";
import Nav from "../ui/Nav";
import classes from "./CityInfo.module.css";
import FlexContainer from "../ui/FlexContainer";
import FlexItem from "../ui/FlexItem";
import {
  getDateData,
  getOpenWeatherIcon,
  weekDays,
} from "../../services/date-services";

const CityInfo = () => {
  const params = useParams();
  const location = useLocation();
  const cityInfo = location.state;

  return (
    <React.Fragment>
      <Nav></Nav>

      <FlexContainer>
        {cityInfo.daily.map((day, index) => {
          const { dateObj, date, numDate } = getDateData(day.dt * 1000);

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

                <img alt="" src={getOpenWeatherIcon(day.weather[0].icon)}></img>

                <p style={{ textTransform: "Capitalize" }}>
                  {day.weather[0].description}
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
