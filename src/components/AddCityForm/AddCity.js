import React, { useContext, useEffect, useRef, useState } from "react";
import { PlacesContext } from "../../context/place-context";
import AsyncSelect from "react-select/async";
import classes from "./AddCity.module.css";
import { filterCities } from "../../context/longCities";
import { addCity } from "../../services/city-services";

const customTheme = (theme) => ({
  ...theme,
  colors: {
    ...theme.colors,
    primary: "brown",
    primary25: "#ccc",
    primary50: "rgba(165, 42, 42, 0.733)",
    primary75: "brown",
  },
});
const customStyles = {
  singleValue: (provided, state) => ({
    ...provided,
    fontWeight: "500",
    color: state.hasValue ? "brown" : "#ccc",
  }),
  container: (provided, state) => ({
    ...provided,
    color: "brown",
    borderColor: "green",
  }),
  valueContainer: (provided, state) => ({
    ...provided,
    color: "brown",
  }),
  placeholder: (provided, state) => ({
    ...provided,
    fontWeight: "500",
    color: state.hasValue ? "brown" : "#ccc",
  }),
  menuList: (provided, state) => ({
    ...provided,
    border: "2px solid brown",
    maxHeight: "15vh",
  }),
  dropdownIndicator: (provided, state) => ({
    ...provided,
    color: state.isFocused ? "brown" : "#ccc",
  }),
  clearIndicator: (provided, state) => ({
    ...provided,
    color: state.isFocused ? "brown" : "#ccc",
  }),
  indicatorSeparator: (provided, state) => ({
    ...provided,
    backgroundColor: state.isFocused ? "brown" : "#ccc",
  }),
  input: (provided, state) => ({
    ...provided,
    color: "brown",
    fontWeight: "500",
    width: "150px",
  }),
};
const filterOptions = (inputValue) => {
  const filteredCities = filterCities(inputValue).map((city) => {
    return { value: city, label: city };
  });
  return filteredCities;
};

const AddCity = (props) => {
  const [selectedCity, setSelectedCity] = useState("");
  const cssClasses = [
    classes.container,
    props.show ? classes.FormOpen : classes.FormClosed,
  ];
  const placesCtx = useContext(PlacesContext);

  const addCityHandler = async (event) => {
    event.preventDefault();
    props.close();
    const allCitiesInfo = await addCity(selectedCity);
    props.onAdd(allCitiesInfo);
  };
  const closeFormHandler = () => {
    props.close();
  };
  const loadCities = (inputValue, cb) => {
    if (inputValue.length > 2) {
      setTimeout(() => {
        cb(filterOptions(inputValue));
      }, 0);
    }
  };

  return (
    <React.Fragment>
      <div className={cssClasses.join(" ")}>
        <form onSubmit={addCityHandler}>
          <AsyncSelect
            onChange={(value, action) => {
              if (value && value !== "No cities") {
                setSelectedCity(value.value);
              } else {
                setSelectedCity(null);
              }
            }}
            cacheOptions
            autoFocus={true}
            placeholder="City name..."
            noOptionsMessage={() => {
              return "Min 3 characters...";
            }}
            isClearable
            escapeClearsValue={true}
            styles={customStyles}
            theme={customTheme}
            loadOptions={loadCities}
          />
          <div className={classes.formActions}>
            <button onClick={closeFormHandler}>Close</button>
            <button disabled={!selectedCity}>Add City</button>
          </div>
        </form>
      </div>
    </React.Fragment>
  );
};

export default AddCity;
