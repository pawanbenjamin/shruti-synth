import React, { useState, useContext, useEffect } from "react";

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
  const scales = {
    Jhinjoti: function () {
      setSa("1/1");
      setKomalRe("16/15");
      setRe("10/9");
      setKomalGa("6/5");
      setGa("5/4");
      setMa("4/3");
      setTivraMa("45/32");
      setPa("3/2");
      setKomalDha("8/5");
      setDha("5/3");
      setKomalNi("16/9");
      setNi("15/8");
    },
    Yaman: function () {
      setSa("1/1");
      setKomalRe("16/15");
      setRe("8/9");
      setKomalGa("6/5");
      setGa("5/4");
      setMa("4/3");
      setTivraMa("45/32");
      setPa("3/2");
      setKomalDha("8/5");
      setDha("27/16");
      setKomalNi("16/9");
      setNi("15/8");
    },
    Todi: function () {
      setSa("1/1");
      setKomalRe("256/243");
      setRe("10/9");
      setKomalGa("32/27");
      setGa("5/4");
      setMa("4/3");
      setTivraMa("729/512");
      setPa("3/2");
      setKomalDha("128/81");
      setDha("5/3");
      setKomalNi("16/9");
      setNi("243/128");
    },
  };

  return (
    <select
      onChange={(e) => {
        const theFunc = scales[e.target.value];
        theFunc();
      }}
    >
      <option value="Jhinjoti">Jhinjoti</option>
      <option value="Yaman">Yaman</option>
      <option value="Todi">Todi</option>
    </select>
  );
};

export default TuningPresets;
