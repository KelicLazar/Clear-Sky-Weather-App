import React, { useState, Suspense, useContext } from "react";
import { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import { PlacesContext } from "./context/place-context";
import { getCitiesInfo, refreshCity } from "./services/city-services";
import AddCity from "./components/AddCityForm/AddCity";
import Backdrop from "./components/Backdrop/Backdrop";
import {
  Alert,
  AlertTitle,
  Fade,
  Skeleton,
  Slide,
  Snackbar,
  Zoom,
} from "@mui/material";
const CitiesList = React.lazy(() => import("./components/CitiesList"));
const CityInfo = React.lazy(() => import("./components/CityInfo"));

const CityInfoHourly = React.lazy(() => import("./components/CityInfoHourly"));
const Nav = React.lazy(() => import("./components/Nav"));
const LoadingSpinner = React.lazy(() =>
  import("./components/ui/LoadingSpinner")
);

function App() {
  const [showBackdrop, setShowBackdrop] = useState(false);
  const [citiesData, setCitiesData] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    (async () => {
      const citiesInfo = await getCitiesInfo();
      setCitiesData(citiesInfo);
    })();
  }, []);

  const showBackdropHandler = () => {
    setShowBackdrop(true);
  };
  const closeBackdropHandler = () => {
    setShowBackdrop(false);
  };
  const handleClick = async () => {
    setCitiesData(await getCitiesInfo());
  };
  const setCitiesHandler = async (allCitiesData) => {
    if (allCitiesData.message) {
      setError(allCitiesData);
    } else {
      setCitiesData(allCitiesData);
    }
  };
  const refreshCityHandler = async (cityName, index) => {
    const refreshCityResponse = await refreshCity(cityName, index);
    console.log(refreshCityResponse, "refreshing city response");
    if (refreshCityResponse.message) {
      setError({ message: refreshCityResponse.message, type: "warning" });
    } else {
      setCitiesData(refreshCityResponse.data);
    }
  };
  const clearErrorHandler = (event, reason) => {
    console.log(event, "EVENT");
    console.log(reason, "REASON");
    if (reason === "clickaway") {
      return;
    }

    setError((prev) => {
      return { ...prev, message: "" };
    });

    setTimeout(() => {
      setError(null);
    }, 300);
  };

  return (
    <React.Fragment>
      <Suspense fallback={<LoadingSpinner />}>
        <BrowserRouter>
          <Routes>
            <Route path="/:city" element={<CityInfo />}></Route>
            <Route
              path="/"
              element={
                <React.Fragment>
                  <Nav
                    onClick={showBackdropHandler}
                    onAdd={setCitiesHandler}
                  ></Nav>

                  <Slide
                    direction="up"
                    in={!!error?.message}
                    unmountOnExit
                    mountOnEnter
                  >
                    <Snackbar
                      transitionDuration={{ enter: 300, exit: 1000 }}
                      autoHideDuration={4000}
                      open={!!error?.message}
                      onClose={clearErrorHandler}
                    >
                      <Alert
                        variant="filled"
                        severity={error?.type}
                        onClose={clearErrorHandler}
                        style={{
                          fontWeight: "900",
                        }}
                      >
                        <AlertTitle
                          style={{
                            textTransform: "uppercase",
                            fontSize: "120%",
                            letterSpacing: "2px",
                            fontWeight: "700",
                          }}
                        >
                          {error?.message}
                        </AlertTitle>
                      </Alert>
                    </Snackbar>
                  </Slide>

                  <Backdrop
                    onClose={closeBackdropHandler}
                    show={showBackdrop}
                  ></Backdrop>
                  {showBackdrop && (
                    <AddCity
                      close={closeBackdropHandler}
                      show={showBackdrop}
                      onAdd={setCitiesHandler}
                    ></AddCity>
                  )}

                  <CitiesList
                    citiesData={citiesData}
                    onRemove={setCitiesHandler}
                    onRefresh={refreshCityHandler}
                  ></CitiesList>
                </React.Fragment>
              }
            ></Route>

            <Route path="/:city/hourly" element={<CityInfoHourly />}></Route>
            {/* <Route path="/*" element={<Navigate to="/" replace />}></Route> */}
          </Routes>
        </BrowserRouter>
      </Suspense>
    </React.Fragment>
  );
}

export default App;
