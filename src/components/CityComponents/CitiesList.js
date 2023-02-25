import React from "react";
import FlexContainer from "../ui/FlexContainer";
import CityItem from "./CityItem";

const CitiesList = ({ citiesData, onRemove, onRefresh }) => {
  return (
    <React.Fragment>
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
