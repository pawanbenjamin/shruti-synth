import React, { useEffect, useContext, useState } from "react";
import { store } from "../state";

function Filter(props) {
  const { state, dispatch } = useContext(store);

  const [frequency, setFrequency] = useState(0);
  const [filterType, setFilterType] = useState("allpass");
  const [gain, setGain] = useState(0);

  useEffect(() => {
    if (state.filter !== undefined) {
      state.filter.set({
        frequency: frequency,
      });
      console.log(frequency);
    }
  }, [frequency]);
  return (
    <div>
      <h3>Filter:</h3>
      <label>Frequency</label>
      <input
        type="range"
        min="0"
        max="20000"
        step="1"
        defaultValue={frequency}
        onChange={(e) => {
          setFrequency(e.target.value);
        }}
      />
      <label>Gain</label>
      <input
        type="range"
        min="0"
        max="10"
        step="1"
        defaultValue={gain}
        onChange={(e) => {
          setGainy(e.target.value);
        }}
      />
      <select onChange={(e) => setFilterType(e.target.value)}>
        <option value="lowpass">LowPass</option>
        <option value="highpass">HighPass</option>
        <option value="bandpass">BandPass</option>
        <option value="lowshelf">LowShelf</option>
        <option value="highshelf">HighShelf</option>
        <option value="notch">Notch</option>
        <option value="allpass">AllPass</option>
        <option value="peaking">Peaking</option>
      </select>
    </div>
  );
}

export default Filter;
