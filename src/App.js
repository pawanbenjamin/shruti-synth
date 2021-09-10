import React from "react";

import "./style.css";

import MIDI from "./components/MIDI";
import Synth from "./components/Synth";
import FreqTable from "./components/FreqTable";
import SynthParams from "./components/SynthParams";
import WaveBkg from "./components/WaveBkg";

function App() {
  return (
    <div className="App">
      <MIDI />
      <Synth />
      <FreqTable />
      <SynthParams />
      <WaveBkg />
    </div>
  );
}

export default App;
