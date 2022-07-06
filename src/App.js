import React, { useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import AddCity from "./components/AddCityForm/AddCity";
import Backdrop from "./components/Backdrop/Backdrop";
import CitiesList from "./components/CitiesList";
import CityInfo from "./components/CityInfo";
import CityGuardWrapper from "./components/ui/CityGuardWrapper";
import CityInfoHourly from "./components/CityInfoHourly";
import Nav from "./components/Nav";

function App() {
  const [showBackdrop, setShowBackdrop] = useState(false);

  const showBackdropHandler = () => {
    setShowBackdrop(true);
  };
  const closeBackdropHandler = () => {
    setShowBackdrop(false);
  };

  return (
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
  );
}

export default App;
