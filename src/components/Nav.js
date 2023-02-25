import React, { useState } from "react";
import { NavLink, useLocation, useParams } from "react-router-dom";
import AsyncSelect from "react-select/async";
import classes from "./Nav.module.css";
import { filterCities } from "../context/longCities";
import { addCity } from "../services/city-services";

const customTheme = (theme) => ({
  ...theme,
  colors: {
    ...theme.colors,
    primary: "#4533bf",
    primary25: "#ccc",
    primary50: "#261590",
    primary75: "#120758",
  },
});
const customStyles = {
  singleValue: (provided, state) => ({
    ...provided,
    fontWeight: "500",
    color: "#120758",
  }),
  container: (provided, state) => ({
    ...provided,
    width: "70%",
    minWidth: "70%",
    color: "#120758",
    borderColor: "#120758",
    height: "40px",
  }),
  valueContainer: (provided, state) => ({
    ...provided,
    color: "#120758",
  }),
  placeholder: (provided, state) => ({
    ...provided,
    fontWeight: "500",
    color: "#120758",
  }),
  menuList: (provided, state) => ({
    ...provided,
    border: "2px solid #120758",
    maxHeight: "220px",
  }),
  dropdownIndicator: (provided, state) => ({
    ...provided,
    color: state.isFocused ? "#120758" : "#ccc",
  }),
  clearIndicator: (provided, state) => ({
    ...provided,
    color: "#120758",
  }),
  indicatorSeparator: (provided, state) => ({
    ...provided,
    backgroundColor: state.isFocused ? "#120758" : "#ccc",
  }),
  input: (provided, state) => ({
    ...provided,
    color: "#120758",
    fontWeight: "500",
    width: "30%",
    maxWidth: "30%",
  }),
};

const filterOptions = (inputValue) => {
  const filteredCities = filterCities(inputValue).map((city) => {
    return { value: city, label: city };
  });
  return filteredCities;
};

const Nav = (props) => {
  const [selectedCity, setSelectedCity] = useState("");
  const location = useLocation();
  console.log("location in NAV", location);

  const params = useParams();

  const loadCities = (inputValue, cb) => {
    if (inputValue.length > 2) {
      setTimeout(() => {
        cb(filterOptions(inputValue));
      }, 0);
    }
  };
  const addCityHandler = async () => {
    console.log(selectedCity);

    props.onAdd(await addCity(selectedCity));
    setSelectedCity("");
  };

  return (
    <div className={classes.navBar}>
      <ul className={classes.navUl}>
        <li>
          <div className={classes.title}>
            <NavLink
              className={(navData) => (navData.isActive ? classes.active : "")}
              to="/"
              end
            >
              Clear Sky App
            </NavLink>
          </div>
        </li>
        {params.city ? (
          <React.Fragment>
            <div className={classes.navigationContainer}>
              <li>
                <NavLink
                  className={(navData) =>
                    navData.isActive ? classes.active : ""
                  }
                  to={`/${params.city.replaceAll(" ", "%20")}`}
                  state={location.state}
                  end
                >
                  Daily
                </NavLink>
              </li>
              <li>
                <NavLink
                  className={(navData) =>
                    navData.isActive ? classes.active : ""
                  }
                  to={`/${params.city.replaceAll(" ", "%20")}/hourly`}
                  state={location.state}
                >
                  Hourly
                </NavLink>
              </li>
            </div>
          </React.Fragment>
        ) : (
          <div className={classes.addCityContainer}>
            <AsyncSelect
              value={
                selectedCity
                  ? { label: selectedCity, value: selectedCity }
                  : null
              }
              onChange={(value, action) => {
                if (value && value.value !== "No cities") {
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

            <button
              className={
                selectedCity ? classes.addButtonShown : classes.addButton
              }
              onClick={addCityHandler}
            >
              Add city
            </button>
          </div>
        )}
      </ul>
    </div>
  );
};

export default Nav;
