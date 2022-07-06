import React, { useContext } from "react";
import { Navigate, useParams } from "react-router-dom";
import { PlacesContext } from "../../context/place-context";

const CityGuardWrapper = (props) => {
  const params = useParams();
  const placesCtx = useContext(PlacesContext);

  const isValid = placesCtx.favoritePlaces.some(
    (element) => element.cityName === params.city
  );

  return isValid ? (
    <React.Fragment>{props.children}</React.Fragment>
  ) : (
    <Navigate to="/" replace></Navigate>
  );
};

export default CityGuardWrapper;
