import React, { useState, Suspense, useEffect } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { getCitiesInfo, refreshCity } from "./services/http-services";
import { Alert, AlertTitle, Slide, Snackbar } from "@mui/material";
import Nav from "./components/ui/Nav";
import LoadingSpinner from "./components/ui/LoadingSpinner";
import CitiesList from "./components/CityComponents/CitiesList";
const CityInfo = React.lazy(() =>
  import("./components/CityComponents/CityInfo")
);
const CityInfoHourly = React.lazy(() =>
  import("./components/CityComponents/CityInfoHourly")
);

function App() {
  const [citiesData, setCitiesData] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    (async () => {
      const citiesInfo = await getCitiesInfo();
      setCitiesData(citiesInfo);
    })();
  }, []);

  const setCitiesHandler = async (allCitiesData) => {
    if (allCitiesData.message) {
      setError(allCitiesData);
    } else {
      setCitiesData(allCitiesData);
    }
  };
  const refreshCityHandler = async (cityName, index) => {
    const refreshCityResponse = await refreshCity(cityName, index);
    if (refreshCityResponse.message) {
      setError({ message: refreshCityResponse.message, type: "warning" });
    } else {
      setCitiesData(refreshCityResponse.data);
    }
  };
  const clearErrorHandler = (event, reason) => {
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
            <Route
              path="/"
              element={
                <React.Fragment>
                  <Nav onAdd={setCitiesHandler}></Nav>

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

                  <CitiesList
                    citiesData={citiesData}
                    onRemove={setCitiesHandler}
                    onRefresh={refreshCityHandler}
                  ></CitiesList>
                </React.Fragment>
              }
            ></Route>
            <Route path="/:city" element={<CityInfo />}></Route>

            <Route path="/:city/hourly" element={<CityInfoHourly />}></Route>
          </Routes>
        </BrowserRouter>
      </Suspense>
    </React.Fragment>
  );
}

export default App;
