import classes from "./CitiesList.module.css";
import { useContext } from "react";
import { PlacesContext } from "../context/place-context";
import {
  BrowserRouter,
  Switch,
  Route,
  Link,
  useNavigate,
} from "react-router-dom";
import Card from "./Card";

const CitiesList = () => {
  const placesCtx = useContext(PlacesContext);
  const navigate = useNavigate();

  const moreInfoHandler = (index) => {
    console.log(`/${placesCtx.favoritePlaces[index].cityName}`);
    navigate(`/${placesCtx.favoritePlaces[index].cityName}`);
  };

  return (
    <div className={classes.container}>
      {placesCtx.cityWeatherInfo.map((city, index) => {
        const dateObj = new Date(city.current.dt * 1000);
        const date = dateObj.getDate();
        const hour = dateObj.getHours();
        const minutes = String(dateObj.getMinutes()).padStart(2, "0");
        let weekDay = "";
        let day2, day3, day4;
        switch (dateObj.getDay()) {
          case 0:
            weekDay = "Sunday";
            day2 = "Mon";
            day3 = "Tue";
            day4 = "Wed";
            break;
          case 1:
            weekDay = "Monday";
            day2 = "Tue";
            day3 = "Wed";
            day4 = "Thu";
            break;
          case 2:
            weekDay = "Tuesday";
            day2 = "Wed";
            day3 = "Thu";
            day4 = "Fri";
            break;
          case 3:
            weekDay = "Wednesday";
            day2 = "Thu";
            day3 = "Fri";
            day4 = "Sat";
            break;
          case 4:
            weekDay = "Thursday";
            day2 = "Fri";
            day3 = "Sat";
            day4 = "Sun";
            break;
          case 5:
            weekDay = "Friday";
            day2 = "Sat";
            day3 = "Sun";
            day4 = "Mon";
            break;
          case 6:
            weekDay = "Saturday";
            day2 = "Sun";
            day3 = "Mon";
            day4 = "Tue";
            break;
          default:
            break;
        }

        console.log("this is city" + city);
        const imageUrl = `http://openweathermap.org/img/wn/${city.current.weather[0].icon}.png`;
        const img2 = `http://openweathermap.org/img/wn/${city.daily[1].weather[0].icon}.png`;
        const img3 = `http://openweathermap.org/img/wn/${city.daily[2].weather[0].icon}.png`;
        const img4 = `http://openweathermap.org/img/wn/${city.daily[3].weather[0].icon}.png`;
        return (
          <Card key={index} className={classes.city}>
            <div
              onClick={() => {
                moreInfoHandler(index);
              }}
            >
              <h2>
                {placesCtx.favoritePlaces[index].cityName},
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
          </Card>
        );
      })}
    </div>
  );
};

export default CitiesList;
