import React, { useContext, useEffect, useState, useRef } from "react";

import { store } from "../state";

import "./synthParams.css";

function SynthParams({ midiLearn, setMidiLearn }) {
  const { state, dispatch } = useContext(store);

  const detuneRef = useRef();

  // Envelope State Variables
  const [volume, setVolume] = useState(-5);
  const [detune, setDetune] = useState(0);
  const [portamento, setPortamento] = useState(0);
  const [attack, setAttack] = useState(0.05);
  const [attackCurve, setAttackCurve] = useState("linear");
  const [decay, setDecay] = useState(0.1);
  const [decayCurve, setDecayCurve] = useState("exponential");
  const [release, setRelease] = useState(1);
  const [releaseCurve, setReleaseCurve] = useState("exponential");
  const [sustain, setSustain] = useState(1);

  // Oscillator Variables
  const [partialCount, setPartialCount] = useState(0);
  const [partials, setPartials] = useState([]);
  const [phase, setPhase] = useState(0);
  const [type, setType] = useState("sine");

  // Synth Paramps Use Effect
  useEffect(() => {
    if (state.synth !== undefined) {
      state.synth.set({
        volume: volume,
        detune: detune,
        portamento: portamento,
        envelope: {
          attack: attack,
          attackCurve: attackCurve,
          decay: decay,
          decayCurve: decayCurve,
          release: release,
          releaseCurve: releaseCurve,
          sustain: sustain,
        },
        oscillator: {
          partialCount: partialCount,
          partials: partials,
          phase: phase,
          type: type,
        },
      });
    }
  }, [
    volume,
    detune,
    portamento,
    attack,
    attackCurve,
    decay,
    decayCurve,
    release,
    releaseCurve,
    sustain,
    partialCount,
    partials,
    phase,
    type,
  ]);

  const addToMidiMap = (id) => {
    if (midiLearn) {
      dispatch({ type: "user-midi-map", value: id });
    }
  };

  return (
    <div>
      <h3>Synth:</h3>
      <div>
        <label
        // className={midiLearn ? "learn" : "label"}
        // id="volume"
        // onClick={(e) => addToMidiMap(e.target.id)}
        >
          Volume:
        </label>
        <input
          type="range"
          min="-40"
          max="10"
          step=".01"
          defaultValue={volume}
          onChange={(e) => {
            setVolume(e.target.value);
          }}
        />
      </div>
      <div>
        <label
          className={midiLearn ? "learn" : "label"}
          id="detune"
          onClick={(e) => addToMidiMap(e.target.id)}
        >
          Detune
        </label>
        <form ref={detuneRef}>
          <input
            type="range"
            min="-100"
            max="100"
            step="1"
            defaultValue={detune}
            onChange={(e) => setDetune(e.target.value)}
            onMouseUp={(e) => {
              setDetune(0);
              detuneRef.current.reset();
            }}
          />
        </form>
      </div>
      {/* <div>
        <label
          className={midiLearn ? "learn" : "label"}
          id="portamento"
          onClick={(e) => addToMidiMap(e.target.id)}
        >
          Portamento
        </label>
        <input
          type="range"
          min="0"
          max="100"
          step="1"
          defaultValue={portamento}
          onChange={(e) => setPortamento(e.target.value)}
        />
      </div> */}
      <div className="synth_synth-param-container_single-param">
        <label
          className={midiLearn ? "learn" : "label"}
          id="envelope.attack"
          onClick={(e) => addToMidiMap(e.target.id)}
        >
          Attack
        </label>
        <input
          type="range"
          min="0"
          max="1"
          step=".001"
          defaultValue={attack}
          onChange={(e) => setAttack(e.target.value)}
        />
      </div>
      <div>
        <label>Attack Curve:</label>
        <select name="" id="" onChange={(e) => setAttackCurve(e.target.value)}>
          <option defaultValue value="linear">
            Linear
          </option>

          <option value="exponential">Exponential</option>
        </select>
      </div>
      <div>
        <label
          className={midiLearn ? "learn" : "label"}
          id="envelope.decay"
          onClick={(e) => addToMidiMap(e.target.id)}
        >
          Decay:
        </label>
        <input
          type="range"
          defaultValue={decay}
          min="0.1"
          max="1.0"
          step="0.01"
          onChange={(e) => setDecay(e.target.value)}
        />
      </div>
      <div>
        <label>Decay Curve:</label>
        <select name="" id="" onChange={(e) => setDecayCurve(e.target.value)}>
          <option defaultValue value="linear">
            Linear
          </option>
          <option value="exponential">Exponential</option>
        </select>
      </div>
      <div>
        <label
          className={midiLearn ? "learn" : "label"}
          id="envelope.release"
          onClick={(e) => addToMidiMap(e.target.id)}
        >
          Release
        </label>
        <input
          type="range"
          min="1"
          max="3"
          step=".1"
          defaultValue={release}
          onChange={(e) => setRelease(e.target.value)}
        />
      </div>
      <div>
        <label>Release Curve:</label>
        <select name="" id="" onChange={(e) => setReleaseCurve(e.target.value)}>
          <option defaultValue value="linear">
            Linear
          </option>
          <option value="exponential">Exponential</option>
        </select>
      </div>
      <div>
        <label
          className={midiLearn ? "learn" : "label"}
          id="envelope.sustain"
          onClick={(e) => addToMidiMap(e.target.id)}
        >
          Sustain
        </label>
        <input
          type="range"
          min="0"
          max="1"
          step="0.01"
          defaultValue={sustain}
          onChange={(e) => setSustain(e.target.value)}
        />
      </div>
      <div>
        <label>Partial Count</label>
        <input
          type="range"
          min="0"
          max="15"
          step="1"
          defaultValue={partialCount}
          onChange={(e) => setPartialCount(e.target.value)}
        />
      </div>

      <div>
        <label>Wave Type</label>
        <select onChange={(e) => setType(e.target.value)}>
          <option defaultValue value="sine">
            Sine
          </option>
          <option value="triangle">Triange</option>
          <option value="sawtooth">Sawtooth</option>
          <option value="square">Square</option>
        </select>
      </div>
    </div>
  );
}

export default SynthParams;
