import React from "react";

import MIDI from "./components/MIDI";
import Synth from "./components/Synth";
import FreqTable from "./components/FreqTable";
import SynthParams from "./components/SynthParams";

function App() {
  return (
    <div className="App">
      <MIDI />
      <Synth />
      <FreqTable />
      <SynthParams />
    </div>
  );
}

export default App;
