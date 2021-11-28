import React from "react";

import MIDI from "./components/MIDI";
import Synth from "./components/Synth";
import FreqTable from "./components/FreqTable";
import SynthParams from "./components/SynthParams";
// import WaveBkg from "./components/WaveBkg";
import Modal from "./components/Modal";

function App() {
  return (
    <div className="App">
      <Modal />
      <MIDI />
      <Synth />
      <FreqTable />
      <SynthParams />
      {/* <WaveBkg /> */}
    </div>
  );
}

export default App;
