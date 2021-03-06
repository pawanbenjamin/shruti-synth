import React, { useState, useContext, useEffect } from "react";
import { store } from "../state";
import { createFreqTable } from "./createFreqTable";
import TuningPresets from "./TuningPresets";

import "./freqTable.css";

function FreqTable(props) {
  const { state, dispatch } = useContext(store);
  // Default Key and Default Frequency
  const [rootKey, setRootKey] = useState(69);

  const [rootFreq, setRootFreq] = useState("432");

  // Note Ratios
  const [sa, setSa] = useState("1/1");
  const [komalRe, setKomalRe] = useState("16/15");
  const [re, setRe] = useState("9/8");
  const [komalGa, setKomalGa] = useState("6/5");
  const [ga, setGa] = useState("5/4");
  const [ma, setMa] = useState("4/3");
  const [tivraMa, setTivraMa] = useState("45/32");
  const [pa, setPa] = useState("3/2");
  const [komalDha, setKomalDha] = useState("8/5");
  const [dha, setDha] = useState("5/3");
  const [komalNi, setKomalNi] = useState("9/5");
  const [ni, setNi] = useState("15/8");

  const changeKey = (e) => {
    setRootKey(e.target.value);
  };

  const changeRatio = (e, setter) => {
    setter(e.target.value);
  };

  useEffect(() => {
    dispatch({
      type: "freq-table",
      value: createFreqTable(
        rootKey,
        [
          sa,
          komalRe,
          re,
          komalGa,
          ga,
          ma,
          tivraMa,
          pa,
          komalDha,
          dha,
          komalNi,
          ni,
        ],
        rootFreq
      ),
    });
  }, [
    rootKey,
    rootFreq,
    sa,
    komalRe,
    re,
    komalGa,
    ga,
    ma,
    tivraMa,
    pa,
    komalDha,
    dha,
    komalNi,
    ni,
  ]);

  return (
    <div>
      {/* <button onClick={() => console.log(state)}>Log out Context State</button> */}
      <div>
        <div>
          <label>Root Freq</label>
          <input
            type="text"
            placeholder="432"
            onChange={(e) => setRootFreq(e.target.value)}
          />
          <label>Root Key</label>
          <select onChange={changeKey}>
            <option value="60">C</option>
            <option value="61">C# / Db</option>
            <option value="62">D</option>
            <option value="63">D# / Eb</option>
            <option value="64">E</option>
            <option value="65">F</option>
            <option value="66">F# / Gb</option>
            <option value="67">G</option>
            <option value="68">G# / Ab</option>
            <option value="69" selected>
              A
            </option>
            <option value="70">A# / Bb</option>
            <option value="71">B</option>
          </select>
        </div>
      </div>

      {/* tuning presets dropdown */}
      <TuningPresets
        setSa={setSa}
        setKomalRe={setKomalRe}
        setRe={setRe}
        setKomalGa={setKomalGa}
        setGa={setGa}
        setMa={setMa}
        setTivraMa={setTivraMa}
        setPa={setPa}
        setKomalDha={setKomalDha}
        setDha={setDha}
        setKomalNi={setKomalNi}
        setNi={setNi}
      />

      <div>
        <h3>Note Ratios:</h3>
        <p>User inputs must be in whole number ratios</p>
        <ul>
          <label>1.&nbsp;&nbsp;&nbsp;&nbsp;</label>
          <input
            placeholder={sa}
            onChange={(e) => changeRatio(e, setSa)}
          ></input>
          <br />
          <label>2.&nbsp;&nbsp;&nbsp;&nbsp;</label>
          <input
            placeholder={komalRe}
            onChange={(e) => changeRatio(e, setKomalRe)}
          ></input>
          <br />
          <label>3.&nbsp;&nbsp;&nbsp;&nbsp;</label>
          <input
            placeholder={re}
            onChange={(e) => changeRatio(e, setRe)}
          ></input>
          <br />
          <label htmlFor="">4.&nbsp;&nbsp;&nbsp;&nbsp;</label>
          <input
            placeholder={komalGa}
            onChange={(e) => changeRatio(e, setKomalGa)}
          ></input>
          <br />
          <label htmlFor="">5.&nbsp;&nbsp;&nbsp;&nbsp;</label>
          <input
            type="text"
            placeholder={ga}
            onChange={(e) => changeRatio(e, setGa)}
          />
          <br />
          <label htmlFor="">6.&nbsp;&nbsp;&nbsp;&nbsp;</label>
          <input
            type="text"
            placeholder={ma}
            onChange={(e) => changeRatio(e, setMa)}
          />
          <br />
          <label htmlFor="">7.&nbsp;&nbsp;&nbsp;&nbsp;</label>
          <input
            type="text"
            placeholder={tivraMa}
            onChange={(e) => changeRatio(e, setTivraMa)}
          />
          <br />
          <label htmlFor="">8.&nbsp;&nbsp;&nbsp;&nbsp;</label>
          <input
            type="text"
            placeholder={pa}
            onChange={(e) => changeRatio(e, setPa)}
          />
          <br />
          <label htmlFor="">9.&nbsp;&nbsp;&nbsp;&nbsp;</label>
          <input
            type="text"
            placeholder={komalDha}
            onChange={(e) => changeRatio(e, setKomalDha)}
          />
          <br />
          <label htmlFor="">10.&nbsp;&nbsp;</label>
          <input
            type="text"
            placeholder={dha}
            onChange={(e) => changeRatio(e, setDha)}
          />
          <br />
          <label>11.&nbsp;&nbsp;</label>
          <input
            type="text"
            placeholder={komalNi}
            onChange={(e) => changeRatio(e, setKomalNi)}
          />
          <br />
          <label>12.&nbsp;&nbsp;</label>
          <input
            type="text"
            placeholder={ni}
            onChange={(e) => changeRatio(e, setNi)}
          />
        </ul>
      </div>
    </div>
  );
}

export default FreqTable;
