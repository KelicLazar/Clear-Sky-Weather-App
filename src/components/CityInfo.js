import React, { useContext } from "react";
import { useParams } from "react-router-dom";
import { PlacesContext } from "../context/place-context";
import Header from "./Header";
import Card from "./Card";
import classes from "./CitiesList.module.css";

const CityInfo = (props) => {
  const params = useParams();
  const placesCtx = useContext(PlacesContext);
  const placeIndex = placesCtx.favoritePlaces.findIndex(
    (element) => element.cityName === params.city
  );
  const cityInfo = placesCtx.cityWeatherInfo[placeIndex];
  return (
    <React.Fragment>
      <Header></Header>
      <div className={classes.container}>
        <Card>
          <h2>{params.city}</h2>
          <img
            alt=""
            src={`http://openweathermap.org/img/wn/${cityInfo.current.weather[0].icon}.png`}
          ></img>
        </Card>

        {cityInfo.daily.map((day, index) => {
          {
            if (index === 0) {
              return;
            }
          }
          const dateObj = new Date(day.dt * 1000);
          let weekDay = "";
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
            <Card key={index}>
              <h2>{weekDay}</h2>
            </Card>
          );
        })}
      </div>
    </React.Fragment>
  );
};

export default CityInfo;
