import React, { useContext, useEffect, useRef, useState } from "react";
import { PlacesContext } from "../../context/place-context";

import classes from "./AddCity.module.css";

const AddCity = (props) => {
  const [places, setPlaces] = useState([]);
  const [
    availableCitiesInSelectedCountry,
    setAvailableCitiesInSelectedCountry,
  ] = useState([]);
  const [isSelected, setIsSelected] = useState({ country: false, city: false });
  const [cityToAdd, setCityToAdd] = useState();
  const countryRef = useRef("--Select Country--");
  const cityRef = useRef();

  const cssClasses = [
    classes.container,
    props.show ? classes.FormOpen : classes.FormClosed,
  ];

  const placesCtx = useContext(PlacesContext);

  const getPlacesHandler = async () => {
    const response = await fetch(
      "https://countriesnow.space/api/v0.1/countries"
    );
    const places = await response.json();
    setPlaces(places.data);
  };

  useEffect(() => {
    getPlacesHandler();
  });
  const selectedCountryHandler = (event) => {
    // placesCtx.getCitiesOfSelectedCountry(event.target.value);
    const selectedCountryIndex = places.findIndex(
      (element) => element.country === event.target.value
    );
    setAvailableCitiesInSelectedCountry(places[selectedCountryIndex].cities);
    setIsSelected((prevValue) => ({ ...prevValue, country: true }));
  };
  const selectedCityHandler = (event) => {
    setCityToAdd(event.target.value);
    setIsSelected((prevValue) => ({ ...prevValue, city: true }));
  };

  const closeFormHandler = () => {
    props.close();
    countryRef.current.value = "--Select Country--";
    cityRef.current.value = "--Select City--";
    setIsSelected({ country: false, city: false });
  };

  const addCityHandler = () => {
    placesCtx.addFavoritePlace(cityToAdd);
    closeFormHandler();
  };

  return (
    <React.Fragment>
      <div className={cssClasses.join(" ")}>
        <select
          ref={countryRef}
          value={countryRef.current.value}
          onChange={selectedCountryHandler}
        >
          <option disabled selected hidden value={null}>
            --Select Country--
          </option>

          {places.map((item, index) => {
            return (
              <option key={index} value={item.country}>
                {item.country}
              </option>
            );
          })}
        </select>

        <select
          ref={cityRef}
          onChange={selectedCityHandler}
          disabled={!isSelected.country}
        >
          <option disabled selected hidden value={null}>
            --Select City--
          </option>
          {availableCitiesInSelectedCountry.map((city, index) => {
            return (
              <option key={index} value={city}>
                {city}
              </option>
            );
          })}
        </select>
        <button
          onClick={addCityHandler}
          disabled={!isSelected.country || !isSelected.city}
        >
          Add City
        </button>
        <button onClick={closeFormHandler}>Close</button>
        {/* {placesCtx.favoritePlaces.map((city, index) => {
          return <h2 key={index}>{city.cityName}</h2>;
        })} */}
      </div>
    </React.Fragment>
  );
};

export default AddCity;
