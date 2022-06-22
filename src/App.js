import React, { useState } from "react";
import { BrowserRouter, Link, Routes, Route } from "react-router-dom";
import "./App.css";
import AddCity from "./components/AddCityForm/AddCity";
import Backdrop from "./components/Backdrop/Backdrop";
import CitiesList from "./components/CitiesList";
import CityInfo from "./components/CityInfo";
import Header from "./components/Header";

function App() {
  // const [lat, setLat] = useState("");
  // const [long, setLong] = useState("");
  // const [data, setData] = useState([]);
  // const placesCtx = useContext(PlacesContext);
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
              <Header>
                <button id="addButton" onClick={showBackdropHandler}>
                  + Add City
                </button>
              </Header>

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
        <Route path="/:city" element={<CityInfo></CityInfo>}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
