import { useContext } from "react";
import { PlacesContext } from "../context/place-context";
import classes from "./CityItem.module.css";

const CityItem = (props) => {
  return (
    <div className={classes.container}>
      <h2>{props.cityName}</h2>
      <img alt="weather" src={props.imageURL}></img>
      <p>
        {props.weatherDesc.charAt(0).toUpperCase() + props.weatherDesc.slice(1)}
      </p>
      <p>{props.cityTemp}</p>
      <p>{props.timeZone}</p>
      <p>{props.time}</p>
      <button>More info</button>
      <button>Remove city</button>
    </div>
  );
};

export default CityItem;
