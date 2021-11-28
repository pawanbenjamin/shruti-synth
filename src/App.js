import React, { useEffect, useState } from "react";

import MIDI from "./components/MIDI";
import Synth from "./components/Synth";
import FreqTable from "./components/FreqTable";
import SynthParams from "./components/SynthParams";
// import WaveBkg from "./components/WaveBkg";
import Modal from "./components/Modal";

function App() {
  const [midiLearn, setMidiLearn] = useState(false);

  useEffect(() => {
    console.log(midiLearn);
  });

  return (
    <div className="App">
      <button onClick={() => setMidiLearn(() => !midiLearn)}>
        Midi Learn Mode
      </button>
      <Modal />
      <MIDI />
      <Synth />
      <FreqTable />
      <SynthParams setMidiLearn={setMidiLearn} midiLearn={midiLearn} />
      {/* <WaveBkg /> */}
    </div>
  );
}

export default App;
