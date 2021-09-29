import React, { useState, useContext, useEffect } from "react";
import { store } from "../state";
import TuningPresets from "./TuningPresets";

export function createFreqTable(rootKey, scale, rootFreq) {
  //if root key is 58 (D)

  //createFrequency Table to use for note generation
  const freqTable = {};

  let copy = rootKey;
  let scaleDegree = 0;
  let oct = 1;

  let counter = 1;

  while (copy <= 108) {
    let ratio = scale[scaleDegree % 12];

    let [numer, denom] = ratio.split("/");
    numer = parseInt(numer);
    denom = parseInt(denom);
    freqTable[copy] = (rootFreq * numer * oct) / denom;

    copy++;
    scaleDegree++;
    if (counter === 12) {
      counter = 0;
      oct *= 2;
    }
    counter++;
  }

  let copy2 = rootKey - 1;
  let scaleDegree2 = scale.length - 1;
  let oct2 = 1 / 2;

  while (copy2 >= 21) {
    let ratio = scale[scaleDegree2 % 12];
    let [numer, denom] = ratio.split("/");
    numer = parseInt(numer);
    denom = parseInt(denom);

    freqTable[copy2] = (rootFreq * numer * oct2) / denom;

    copy2--;
    if (scaleDegree2 === 0) {
      scaleDegree2 = scale.length;
      oct2 = oct2 / 2;
    }
    scaleDegree2--;
  }

  return freqTable;
}

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
    <div className="synth_freq-table">
      <button className="btn" onClick={() => console.log(state)}>
        Log out Context State
      </button>
      <div className="synth_freq-table_root-info">
        <div className="root-container"></div>

        <div className="synth_freq-table_root-info_key">
          <label className="rootF_label">Root Freq</label>
          <input
            className="text-input"
            type="text"
            placeholder="432"
            onChange={(e) => setRootFreq(e.target.value)}
          />
          <label className="label">Root Key</label>
          <select className="select-key" onChange={changeKey}>
            <option className="option" value="60">
              C
            </option>
            <option className="option" value="61">
              C# / Db
            </option>
            <option className="option" value="62">
              D
            </option>
            <option className="option" value="63">
              D# / Eb
            </option>
            <option className="option" value="64">
              E
            </option>
            <option className="option" value="65">
              F
            </option>
            <option className="option" value="66">
              F# / Gb
            </option>
            <option className="option" value="67">
              G
            </option>
            <option className="option" value="68">
              G# / Ab
            </option>
            <option className="option" value="69" selected>
              A
            </option>
            <option className="option" value="70">
              A# / Bb
            </option>
            <option className="option" value="71">
              B
            </option>
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

      <div className="synth_freq-table_note-ratios">
        <label className="label" className="label">
          Note Ratios <br />
          (must be whole number ratios)
        </label>
        <label>1.</label>
        <input
          className="text-input"
          type="text"
          placeholder="1/1"
          onChange={(e) => changeRatio(e, setSa)}
        ></input>
        <label>2.</label>
        <input
          placeholder="16/15"
          onChange={(e) => changeRatio(e, setKomalRe)}
        ></input>
        <label>3.</label>
        <input
          placeholder="10/9"
          onChange={(e) => changeRatio(e, setRe)}
        ></input>
        <label htmlFor="">4.</label>
        <input
          placeholder="32/27"
          onChange={(e) => changeRatio(e, setKomalGa)}
        ></input>
        <label htmlFor="">5.</label>
        <input
          type="text"
          placeholder="5/4"
          onChange={(e) => changeRatio(e, setGa)}
        />
        <label htmlFor="">6.</label>
        <input
          type="text"
          placeholder="4/3"
          onChange={(e) => changeRatio(e, setMa)}
        />
        <label htmlFor="">7.</label>
        <input
          type="text"
          placeholder="45/32"
          onChange={(e) => changeRatio(e, setTivraMa)}
        />
        <label htmlFor="">8.</label>
        <input
          type="text"
          placeholder="3/2"
          onChange={(e) => changeRatio(e, setPa)}
        />
        <label htmlFor="">9.</label>
        <input
          type="text"
          placeholder="8/5"
          onChange={(e) => changeRatio(e, setKomalDha)}
        />

        <label htmlFor="">10.</label>
        <input
          type="text"
          placeholder="5/3"
          onChange={(e) => changeRatio(e, setDha)}
        />
        <label>11.</label>
        <input
          type="text"
          placeholder="9/5"
          onChange={(e) => changeRatio(e, setKomalNi)}
        />
        <label>12.</label>
        <input
          type="text"
          placeholder="15/8"
          onChange={(e) => changeRatio(e, setNi)}
        />
      </div>
    </div>
  );
}

export default FreqTable;
