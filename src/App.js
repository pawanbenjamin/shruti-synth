import React, { useEffect, useState } from "react";

import MIDI from "./components/MIDI";
import Synth from "./components/Synth";
import FreqTable from "./components/FreqTable";
import SynthParams from "./components/SynthParams";
// import WaveBkg from "./components/WaveBkg";
import Modal from "./components/Modal";
import UserMappings from "./components/UserMappings";
// import Filter from "./components/Filter";

function App() {
  const [midiLearn, setMidiLearn] = useState(false);

  return (
    <div className="App">
      <button onClick={() => setMidiLearn(() => !midiLearn)}>
        Midi Learn Mode
      </button>
      {midiLearn ? <UserMappings /> : null}
      {/* <Modal /> */}
      <MIDI />
      <Synth />
      <FreqTable />
      <SynthParams setMidiLearn={setMidiLearn} midiLearn={midiLearn} />
      {/* <Filter /> */}
      {/* <WaveBkg /> */}
    </div>
  );
}

export default App;
