import React, { useState, Suspense } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
const AddCity = React.lazy(() => import("./components/AddCityForm/AddCity"));
const Backdrop = React.lazy(() => import("./components/Backdrop/Backdrop"));
const CitiesList = React.lazy(() => import("./components/CitiesList"));
const CityInfo = React.lazy(() => import("./components/CityInfo"));
const CityGuardWrapper = React.lazy(() =>
  import("./components/ui/CityGuardWrapper")
);
const CityInfoHourly = React.lazy(() => import("./components/CityInfoHourly"));
const Nav = React.lazy(() => import("./components/Nav"));
const LoadingSpinner = React.lazy(() =>
  import("./components/ui/LoadingSpinner")
);

function App() {
  const [showBackdrop, setShowBackdrop] = useState(false);

  const showBackdropHandler = () => {
    setShowBackdrop(true);
  };
  const closeBackdropHandler = () => {
    setShowBackdrop(false);
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
                  <Nav onClick={showBackdropHandler}></Nav>

                  <Backdrop
                    onClose={closeBackdropHandler}
                    show={showBackdrop}
                  ></Backdrop>

                  <AddCity
                    close={closeBackdropHandler}
                    show={showBackdrop}
                  ></AddCity>
                  <CitiesList></CitiesList>
                </React.Fragment>
              }
            ></Route>
            <Route
              path="/:city/"
              element={
                <CityGuardWrapper>
                  <CityInfo />
                </CityGuardWrapper>
              }
            ></Route>
            <Route
              path="/:city/hourly"
              element={
                <CityGuardWrapper>
                  <CityInfoHourly />
                </CityGuardWrapper>
              }
            ></Route>
            <Route path="/*" element={<Navigate to="/" replace />}></Route>
          </Routes>
        </BrowserRouter>
      </Suspense>
    </React.Fragment>
  );
}

export default App;
