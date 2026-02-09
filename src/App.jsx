import React, { useState, useContext } from "react";
import * as Tone from "tone";
import { store } from "./state";

import MIDI from "./components/MIDI";
import Synth from "./components/Synth";
import FreqTable from "./components/FreqTable";
import SynthParams from "./components/SynthParams";
import KeyboardInput from "./components/KeyboardInput";
import UserMappings from "./components/UserMappings";

function App() {
  const { state } = useContext(store);
  const [midiLearn, setMidiLearn] = useState(false);
  const [keyboardEnabled, setKeyboardEnabled] = useState(false);
  const [keyboardOctave, setKeyboardOctave] = useState(4);

  const handlePanic = () => {
    if (state.synth) {
      state.synth.releaseAll(Tone.now());
    }
  };

  return (
    <div className="synth-chassis">
      <div className="wood-panel wood-left"></div>
      <div className="App">
        {/* Nameplate */}
        <div className="synth-header">
          <h1>Shruti Synth</h1>
          <span className="subtitle">Microtonal Synthesis</span>
        </div>

        {/* Main control panels */}
        <div className="panels-container">
          <FreqTable />
          <SynthParams setMidiLearn={setMidiLearn} midiLearn={midiLearn} />
        </div>

        {/* Control bar */}
        <div className="control-bar">
          <div className="keyboard-toggle">
            <button
              className={keyboardEnabled ? 'active' : 'inactive'}
              onClick={() => setKeyboardEnabled(!keyboardEnabled)}
            >
              {keyboardEnabled ? 'Keys On' : 'Keys Off'}
            </button>

            {keyboardEnabled && (
              <div className="octave-control">
                <button
                  onClick={() => setKeyboardOctave(o => Math.max(1, o - 1))}
                  disabled={keyboardOctave <= 1}
                >
                  -
                </button>
                <span>{keyboardOctave}</span>
                <button
                  onClick={() => setKeyboardOctave(o => Math.min(7, o + 1))}
                  disabled={keyboardOctave >= 7}
                >
                  +
                </button>
              </div>
            )}
          </div>

          <div className="control-bar-group">
            <div className="divider" />
          </div>

          <button
            className={`midi-learn-btn ${midiLearn ? 'active' : ''}`}
            onClick={() => setMidiLearn(!midiLearn)}
          >
            {midiLearn ? 'MIDI Learn: On' : 'MIDI Learn'}
          </button>

          <button className="panic-btn" onClick={handlePanic}>
            Panic
          </button>
        </div>

        {/* MIDI mappings display */}
        {midiLearn && <UserMappings />}

        {/* Keyboard */}
        <KeyboardInput enabled={keyboardEnabled} baseOctave={keyboardOctave} onOctaveChange={setKeyboardOctave} />

        {/* Invisible components */}
        <MIDI />
        <Synth />
      </div>
      <div className="wood-panel wood-right"></div>
    </div>
  );
}

export default App;
