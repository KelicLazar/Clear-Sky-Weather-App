import React from "react";
import { useLocation, useParams } from "react-router-dom";
import {
  getDateData,
  getOpenWeatherIcon,
  getWindDirection,
  weekDays,
} from "../../services/date-services";
import classes from "./CityInfoHourly.module.css";
import Nav from "../ui/Nav";
import {
  FeelsLikeSvg,
  HumiditySvg,
  RainSvg,
  WindSvg,
  UVLevelSvg,
  CloudSvg,
} from "../WeatherSvgs/WeatherSvgs";

const CityInfoHourly = () => {
  const params = useParams();
  const location = useLocation();

  const cityInfo = location.state;

  return (
    <React.Fragment>
      <Nav></Nav>

      <div className={classes.container}>
        {cityInfo.hourly.map((hour, index) => {
          const {
            dateObj,
            hour: time,
            date,
            numDate,
          } = getDateData(hour.dt * 1000);

          const weekDay = weekDays[dateObj.getDay()];

          const windDirection = getWindDirection(hour.wind_deg);

          return (
            <React.Fragment key={index}>
              {index === 0 && (
                <h2>
                  {params.city + ",  "}
                  <br></br>
                  {weekDay} {date}
                  {numDate}
                </h2>
              )}
              {time === 0 && (
                <h2>
                  {params.city + ",  "}
                  <br></br>
                  {weekDay} {date}
                  {numDate}
                </h2>
              )}
              <details>
                <summary>
                  <div className={classes.flexContainer}>
                    <div className={classes.flexItem}>
                      <p>{time}h</p>
                      <p>{Math.round(hour.temp)}°C</p>
                      <div className={classes.subFlexItem}>
                        <img
                          id="img"
                          alt="weather-icon"
                          src={getOpenWeatherIcon(hour.weather[0].icon)}
                        ></img>

                        <p style={{ textTransform: "capitalize" }}>
                          {hour.weather[0].description.length > 9
                            ? hour.weather[0].main
                            : hour.weather[0].description}
                        </p>
                      </div>
                    </div>
                    <div className={classes.flexItem}>
                      <div className={classes.subFlexItem}>
                        <RainSvg />
                        <p>{Math.round(hour.pop * 100)}%</p>
                      </div>

                      <div className={classes.subFlexItem}>
                        <WindSvg />

                        <p>
                          {windDirection + "  "}
                          {+(hour.wind_speed * 3.6).toFixed(2)}km/h
                        </p>
                      </div>
                    </div>
                  </div>
                </summary>
                <div className={classes.moreInfo}>
                  <ul className={classes.ul}>
                    <li>
                      <FeelsLikeSvg />

                      <div className={classes.spanContainer}>
                        <span>Feels like </span>

                        <span>{Math.round(hour.feels_like)}°C</span>
                      </div>
                    </li>
                    <li>
                      <WindSvg />
                      <div className={classes.spanContainer}>
                        <span>Wind </span>

                        <span>
                          {windDirection + "  "}
                          {Math.round(+(hour.wind_speed * 3.6))}km/h
                        </span>
                      </div>
                    </li>
                    <li>
                      <HumiditySvg />

                      <div className={classes.spanContainer}>
                        <span>Humidity </span>
                        <span>{hour.humidity}%</span>
                      </div>
                    </li>
                    <li>
                      <UVLevelSvg />

                      <div className={classes.spanContainer}>
                        <span>UV index </span>

                        <span>{Math.round(hour.uvi)} of 10</span>
                      </div>
                    </li>
                    <li>
                      <CloudSvg />

                      <div className={classes.spanContainer}>
                        <span>Cloud cover </span>

                        <span> {hour.clouds}%</span>
                      </div>
                    </li>
                    <li>
                      <RainSvg />
                      <div className={classes.spanContainer}>
                        <span>Chance of rain </span>

                        <span>{Math.round(hour.pop * 100)}%</span>
                      </div>
                    </li>
                  </ul>
                </div>
              </details>
            </React.Fragment>
          );
        })}
      </div>
    </React.Fragment>
  );
};

export default CityInfoHourly;
