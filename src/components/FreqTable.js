import React, { useState, useContext, useEffect } from "react";
import { store } from "../state";
import { createFreqTable } from "./createFreqTable";
import TuningPresets from "./TuningPresets";

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
        <h3 className="label" className="label">
          Note Ratios <br />
          (must be whole number ratios)
        </h3>
        <label>1.</label>
        <input placeholder={sa} onChange={(e) => changeRatio(e, setSa)}></input>
        <label>2.</label>
        <input
          placeholder={komalRe}
          onChange={(e) => changeRatio(e, setKomalRe)}
        ></input>
        <label>3.</label>
        <input placeholder={re} onChange={(e) => changeRatio(e, setRe)}></input>
        <label htmlFor="">4.</label>
        <input
          placeholder={komalGa}
          onChange={(e) => changeRatio(e, setKomalGa)}
        ></input>
        <label htmlFor="">5.</label>
        <input
          type="text"
          placeholder={ga}
          onChange={(e) => changeRatio(e, setGa)}
        />
        <label htmlFor="">6.</label>
        <input
          type="text"
          placeholder={ma}
          onChange={(e) => changeRatio(e, setMa)}
        />
        <label htmlFor="">7.</label>
        <input
          type="text"
          placeholder={tivraMa}
          onChange={(e) => changeRatio(e, setTivraMa)}
        />
        <label htmlFor="">8.</label>
        <input
          type="text"
          placeholder={pa}
          onChange={(e) => changeRatio(e, setPa)}
        />
        <label htmlFor="">9.</label>
        <input
          type="text"
          placeholder={komalDha}
          onChange={(e) => changeRatio(e, setKomalDha)}
        />

        <label htmlFor="">10.</label>
        <input
          type="text"
          placeholder={dha}
          onChange={(e) => changeRatio(e, setDha)}
        />
        <label>11.</label>
        <input
          type="text"
          placeholder={komalNi}
          onChange={(e) => changeRatio(e, setKomalNi)}
        />
        <label>12.</label>
        <input
          type="text"
          placeholder={ni}
          onChange={(e) => changeRatio(e, setNi)}
        />
      </div>
    </div>
  );
}

export default FreqTable;
