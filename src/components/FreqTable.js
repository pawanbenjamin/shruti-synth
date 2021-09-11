import React, { useState, useContext, useEffect } from "react";
import { store } from "../state";
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
      {/* <button className="btn" onClick={() => console.log(state)}>
        Log out Context State
      </button> */}
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
      <div className="synth_freq-table_note-ratios">
        <label className="label" className="label">
          Note Ratios
        </label>
        <select className="select">
          <option value="1/1" className="option">
            Sa 1/1
          </option>
        </select>
        <select className="select" onChange={(e) => changeRatio(e, setKomalRe)}>
          <option className="option" value="256/243">
            Ati Komal Re 256/243
          </option>
          <option className="option" value="16/15">
            Komal Re 16/15
          </option>
        </select>
        <select className="select" onChange={(e) => changeRatio(e, setRe)}>
          <option className="option" value="10/9">
            Shuddha Re 10/9
          </option>
          <option className="option" value="9/8">
            Tivra Re 9/8
          </option>
        </select>
        <select className="select" onChange={(e) => changeRatio(e, setKomalGa)}>
          <option className="option" value="32/27">
            Ati Komal Ga 32/27
          </option>
          <option className="option" value="6/5">
            Komal Ga 6/5
          </option>
        </select>
        <select className="select" onChange={(e) => changeRatio(e, setGa)}>
          <option className="option" value="5/4">
            Shuddha Ga 5/4
          </option>
          <option className="option" value="81/64">
            Tivra Ga 81/64
          </option>
        </select>
        <select className="select" onChange={(e) => changeRatio(e, setMa)}>
          <option className="option" value="4/3">
            Shuddha Ma 4/3
          </option>
          <option className="option" value="27/20">
            Shruti Ma 27/20
          </option>
        </select>
        <select className="select" onChange={(e) => changeRatio(e, setTivraMa)}>
          <option className="option" value="45/32">
            Tivra Ma 45/32
          </option>
          <option className="option" value="729/512">
            Tivra Tivra Ma 729/512
          </option>
        </select>
        <select className="select">
          <option value="3/2" className="option">
            Pa 3/2
          </option>
        </select>
        <select
          className="select"
          onChange={(e) => changeRatio(e, setKomalDha)}
        >
          <option className="option" value="128/81">
            Ati Komal Dha 128/81
          </option>
          <option className="option" value="8/5">
            Komal Dha 8/5
          </option>
        </select>
        <select className="select" onChange={(e) => changeRatio(e, setDha)}>
          <option className="option" value="5/3">
            Shuddha Dha 5/3
          </option>
          <option className="option" value="27/16">
            Tivra Dha 27/16
          </option>
        </select>
        <select className="select" onChange={(e) => changeRatio(e, setKomalNi)}>
          <option className="option" value="16/9">
            Ati Komal Ni 16/9
          </option>
          <option className="option" value="9/5">
            Komal Ni 9/5
          </option>
        </select>
        <select className="select" onChange={(e) => changeRatio(e, setNi)}>
          <option className="option" value="15/8">
            Shuddha Ni 15/8
          </option>
          <option className="option" value="243/128">
            Tivra Ni 243/128
          </option>
        </select>
      </div>
    </div>
  );
}

export default FreqTable;
