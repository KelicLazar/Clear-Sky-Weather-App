import classes from "./CitiesList.module.css";
import React, { useContext } from "react";
import { PlacesContext } from "../context/place-context";
import { useNavigate } from "react-router-dom";

import FlexContainer from "./ui/FlexContainer";
import FlexItem from "./ui/FlexItem";
import { useEffect } from "react";
import { useState } from "react";
import { refreshCity, removeCity } from "../services/city-services";
import CityItem from "./CityItem";

const CitiesList = ({ citiesData, onRemove, onRefresh }) => {
  const placesCtx = useContext(PlacesContext);
  const navigate = useNavigate();
  console.log("citiesData", citiesData);
  return (
    <React.Fragment>
      {/* {placesCtx.error && <h5 style={{ color: "red" }}>{placesCtx.error}</h5>} */}
      <FlexContainer>
        {citiesData.length > 0 &&
          citiesData[0].current &&
          citiesData.map((city, index) => {
            return (
              <CityItem
                key={index}
                city={city}
                index={index}
                onRefresh={onRefresh}
                onRemove={onRemove}
              />
            );
          })}
      </FlexContainer>
    </React.Fragment>
  );
};

export default CitiesList;
