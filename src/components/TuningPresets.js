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
  const [currentFunc, setCurrentFunc] = useState(null);

  const scales = {
    Jhinjoti: function () {
      console.log("in the setter");
      setSa("1/1");
      setKomalRe("1/2");
      setRe("1/3");
      setKomalGa("1/4");
      setGa("1/5");
      setMa("1/6");
      setTivraMa("1/7");
      setPa("1/8");
      setKomalDha("1/9");
      setDha("1/10");
      setKomalNi("1/11");
      setNi("1/12");
    },
    "Something Else": "A String",
  };

  return (
    <select
      onChange={(e) => {
        const theFunc = scales[e.target.value];
        theFunc();
      }}
    >
      <option value="Jhinjoti">Jhinjoti</option>
      <option value="Something Else" selected>
        Somthing Else
      </option>
    </select>
  );
};

export default TuningPresets;
