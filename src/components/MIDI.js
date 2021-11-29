import React, { useState, useEffect, useContext, useRef } from "react";
import { store } from "../state";
import * as Tone from "tone";

const isChrome =
  !!window.chrome && (!!window.chrome.webstore || !!window.chrome.runtime);

function MIDI(props) {
  const { state, dispatch } = useContext(store);
  const { userMidiMap } = state;

  const [noteObj, setNoteObj] = useState({});

  useEffect(() => {
    dispatch({ type: "note-obj", value: noteObj });
  }, [noteObj]);

  useEffect(() => {
    for (const midiCC in userMidiMap) {
      if (noteObj.note === +midiCC) {
        const paramName = userMidiMap[midiCC];
        if (paramName.includes(".")) {
          const [parent, child] = paramName.split(".");
          let paramObj = {};
          paramObj[parent] = {};
          paramObj[parent][child] =
            child === "sustain" ? noteObj.velocity / 127 : noteObj.velocity;
          console.log(paramObj);
          state.synth.set(paramObj);
        } else {
          let paramObj = {};
          paramObj[paramName] = noteObj.velocity;
          state.synth.set(paramObj);
        }
      }
    }
    if (noteObj.command === 144) {
      if (state.freqTable !== undefined) {
        const now = Tone.now();
        const freq = state.freqTable[noteObj.note];
        state.synth.triggerAttack(freq, now, noteObj.velocity);
      }
    } else if (noteObj.command === 128) {
      const now = Tone.now();
      const freq = state.freqTable[noteObj.note];
      state.synth.triggerRelease(freq, now + 0.05);
    }
  }, [noteObj]);

  function getMIDIMessage(midiMessage) {
    setNoteObj({
      command: midiMessage.data[0],
      note: midiMessage.data[1],
      velocity: midiMessage.data.length > 2 ? midiMessage.data[2] : 0,
    });
  }

  useEffect(() => {
    navigator.requestMIDIAccess().then(function (access) {
      // Get lists of available MIDI controllers
      const inputs = access.inputs.values();
      const outputs = access.outputs.values();

      for (let input of inputs) {
        input.onmidimessage = getMIDIMessage;
      }

      for (let output of outputs) {
        output.onmidimessage = getMIDIMessage;
      }

      access.onstatechange = function (e) {
        // Print information about the (dis)connected MIDI controller
        console.log(e.port.name, e.port.manufacturer, e.port.state);
      };
    });
  }, []);

  return null;
}

export default MIDI;
