import React, { useState, useContext, useEffect } from "react";
import { store } from "../state";

const TuningPresets = ({
  setSa,
  setKomalRe,
  setRe,
  setKomalGa,
  setGa,
  setMa,
  setTivraMa,
  setPa,
  setKomalDha,
  setDha,
  setKomalNi,
  setNi,
}) => {
  const { state, dispatch } = useContext(store);

  const [currentScale, setCurrentScale] = useState([]);

  const setJhinjhoti = (e) => {
    setSa("1/1");
    setKomalResetSa();
    setResetSa();
    setKomalGasetSa();
    setGasetSa();
    setMasetSa();
    setTivraMasetSa();
    setPasetSa();
    setKomalDhasetSa();
    setDhasetSa();
    setKomalNisetSa();
    setNisetSa();
  };

  return (
    <select onChange={(e) => e.target.value()}>
      <option value={setJhinjhoti}>Jhinjoti</option>
    </select>
  );
};

export default TuningPresets;
