import React from "react";
import { NavLink, useParams } from "react-router-dom";
import classes from "./Nav.module.css";

const Nav = (props) => {
  const params = useParams();

  const showBackdropHandler = () => {
    props.onClick();
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
            {" "}
            <li>
              <NavLink
                className={(navData) =>
                  navData.isActive ? classes.active : ""
                }
                to={`/${params.city.replaceAll(" ", "%20")}`}
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
              >
                Hourly
              </NavLink>
            </li>
          </React.Fragment>
        ) : (
          <li>
            <button id="addButton" onClick={showBackdropHandler}>
              + Add City
            </button>
          </li>
        )}
      </ul>
    </div>
  );
};

export default Nav;
