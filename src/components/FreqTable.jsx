import React, { useState, useContext, useEffect, useMemo } from "react";
import { store } from "../state";
import { createFreqTableMemoized } from "./createFreqTable";
import { RAGAS } from "../data/ragas";
import { getRagaScale, getRagaSwaraMap } from "../data/ragaUtils";
import { SHRUTI_TABLE } from "../data/shrutiTable";

import "./freqTable.css";

const sortedRagas = [...RAGAS].sort((a, b) => a.name.localeCompare(b.name));
const DEFAULT_RAGA_ID = 13; // Bhairav

function FreqTable() {
  const { state, dispatch } = useContext(store);
  const [rootKey, setRootKey] = useState(69);
  const [rootFreq, setRootFreq] = useState("432");
  const [selectedRagaId, setSelectedRagaId] = useState(DEFAULT_RAGA_ID);

  const selectedRaga = useMemo(
    () => RAGAS.find(r => r.id === selectedRagaId) || RAGAS[0],
    [selectedRagaId]
  );

  const scale = useMemo(() => getRagaScale(selectedRaga), [selectedRaga]);

  // Convert raga-relative swara map to absolute pitch-class map
  // so the keyboard can look up by midiNote % 12 directly
  const swaraMap = useMemo(() => {
    const relativeMap = getRagaSwaraMap(selectedRaga);
    const absoluteMap = {};
    for (const [semitone, swara] of Object.entries(relativeMap)) {
      const absPitchClass = (parseInt(semitone, 10) + rootKey) % 12;
      absoluteMap[absPitchClass] = swara;
    }
    return absoluteMap;
  }, [selectedRaga, rootKey]);

  useEffect(() => {
    const freqTable = createFreqTableMemoized(rootKey, scale, rootFreq);
    dispatch({ type: "freq-table", value: freqTable });
    dispatch({ type: "raga-swara-map", value: swaraMap });
  }, [rootKey, rootFreq, scale, swaraMap, dispatch]);

  return (
    <div className="tuning-panel panel">
      <div className="tuning-section-label">Raga</div>

      <div className="tuning-header">
        <div className="tuning-field">
          <label>Root</label>
          <input
            type="text"
            value={rootFreq}
            onChange={(e) => setRootFreq(e.target.value)}
          />
          <label>Hz</label>
        </div>

        <div className="tuning-field">
          <label>Key</label>
          <select onChange={(e) => setRootKey(parseInt(e.target.value, 10))} defaultValue="69">
            <option value="60">C</option>
            <option value="61">C#/Db</option>
            <option value="62">D</option>
            <option value="63">D#/Eb</option>
            <option value="64">E</option>
            <option value="65">F</option>
            <option value="66">F#/Gb</option>
            <option value="67">G</option>
            <option value="68">G#/Ab</option>
            <option value="69">A</option>
            <option value="70">A#/Bb</option>
            <option value="71">B</option>
          </select>
        </div>

        <div className="tuning-field raga-field">
          <select
            value={selectedRagaId}
            onChange={(e) => setSelectedRagaId(parseInt(e.target.value, 10))}
          >
            {sortedRagas.map(raga => (
              <option key={raga.id} value={raga.id}>{raga.name}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="tuning-section-label">Swaras</div>
      <div className="swara-grid">
        {selectedRaga.swaras.map(swara => {
          const entry = SHRUTI_TABLE[swara];
          return (
            <div className="swara-cell" key={swara}>
              <span className="swara-name">{swara}</span>
              <span className="swara-ratio">{entry ? entry.ratio : ''}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default FreqTable;
