import React, { useContext } from "react";
import { useParams } from "react-router-dom";
import { PlacesContext } from "../context/place-context";
import Header from "./Header";

import classes from "./CityInfo.module.css";
import FlexContainer from "./ui/FlexContainer";
import FlexItem from "./ui/FlexItem";

const CityInfo = (props) => {
  const params = useParams();
  const placesCtx = useContext(PlacesContext);
  const placeIndex = placesCtx.favoritePlaces.findIndex(
    (element) => element.cityName === params.city
  );
  const cityInfo = placesCtx.cityWeatherInfo[placeIndex];
  return (
    <React.Fragment>
      <Header>
        <h2>{params.city}</h2>
        <h4>Weather for the next 7 days</h4>
      </Header>
      <FlexContainer>
        {/* <FlexItem>
          <h1>{params.city}, Today</h1>
        </FlexItem> */}

        {cityInfo.daily.map((day, index) => {
          const dateObj = new Date(day.dt * 1000);
          let date = dateObj.getDate();
          let weekDay = "";
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
          switch (dateObj.getDay()) {
            case 0:
              weekDay = "Sunday";

              break;
            case 1:
              weekDay = "Monday";

              break;
            case 2:
              weekDay = "Tuesday";

              break;
            case 3:
              weekDay = "Wednesday";

              break;
            case 4:
              weekDay = "Thursday";

              break;
            case 5:
              weekDay = "Friday";

              break;
            case 6:
              weekDay = "Saturday";

              break;
            default:
              break;
          }

          return (
            <FlexItem key={index}>
              <h2>
                {index === 0
                  ? "Today"
                  : index === 1
                  ? "Tomorrow"
                  : weekDay + ", " + date + numDate}
              </h2>
              <div>
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
