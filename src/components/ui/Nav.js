import React, { useState } from "react";
import { NavLink, useLocation, useParams } from "react-router-dom";
import AsyncSelect from "react-select/async";
import classes from "./Nav.module.css";
import { addCity } from "../../services/http-services";
import { customStyles, customTheme } from "../../services/styles-services";
import { filterCities } from "../../services/cities-services";

const filterOptions = (inputValue) => {
  const filteredCities = filterCities(inputValue).map((city) => {
    return { value: city, label: city };
  });
  return filteredCities;
};

const Nav = (props) => {
  const [selectedCity, setSelectedCity] = useState("");
  const location = useLocation();

  const params = useParams();

  const loadCities = (inputValue, cb) => {
    if (inputValue.length > 2) {
      setTimeout(() => {
        cb(filterOptions(inputValue));
      }, 0);
    }
  };
  const addCityHandler = async () => {
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
              placeholder="Add City..."
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
              +Add city
            </button>
          </div>
        )}
      </ul>
    </div>
  );
};

export default Nav;
