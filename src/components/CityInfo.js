import React, { useContext } from "react";
import { useParams } from "react-router-dom";
import { PlacesContext } from "../context/place-context";
import Header from "./Header";

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

      <h2>{cityInfo.current.temp}</h2>
      <img
        alt=""
        src={`http://openweathermap.org/img/wn/${cityInfo.current.weather[0].icon}.png`}
      ></img>
    </React.Fragment>
  );
};

export default CityInfo;
