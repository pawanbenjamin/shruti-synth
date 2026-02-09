import React, { useState, useEffect, useContext } from "react";
import { store } from "../state";
import * as Tone from "tone";

function MIDI() {
  const { state, dispatch } = useContext(store);
  const { userCCMap } = state;

  const [noteObj, setNoteObj] = useState({});
  const [midiStatus, setMidiStatus] = useState("initializing");

  useEffect(() => {
    dispatch({ type: "note-obj", value: noteObj });
  }, [noteObj, dispatch]);

  // Handle MIDI CC messages for parameter control
  const handleCCMessage = (ccNumber, ccValue) => {
    if (!userCCMap || !state.synth) return;

    const paramName = userCCMap[ccNumber];
    if (!paramName) return;

    // Normalize CC value (0-127) to appropriate range
    const normalizedValue = ccValue / 127;

    if (paramName.includes(".")) {
      const [parent, child] = paramName.split(".");
      let paramObj = {};
      paramObj[parent] = {};
      // Map to appropriate ranges based on parameter type
      if (child === "sustain") {
        paramObj[parent][child] = normalizedValue;
      } else if (child === "attack" || child === "decay") {
        paramObj[parent][child] = normalizedValue; // 0-1 seconds
      } else if (child === "release") {
        paramObj[parent][child] = normalizedValue * 3; // 0-3 seconds
      } else {
        paramObj[parent][child] = normalizedValue;
      }
      state.synth.set(paramObj);
    } else {
      let paramObj = {};
      if (paramName === "detune") {
        paramObj[paramName] = (normalizedValue - 0.5) * 200; // -100 to +100 cents
      } else if (paramName === "volume") {
        paramObj[paramName] = normalizedValue * 50 - 40; // -40 to +10 dB
      } else {
        paramObj[paramName] = normalizedValue;
      }
      state.synth.set(paramObj);
    }
  };

  // Handle note on/off messages
  useEffect(() => {
    if (!noteObj.command) return;

    // Extract channel from status byte (lower 4 bits)
    const command = noteObj.command & 0xF0;

    // Handle MIDI CC (Control Change) - status bytes 176-191
    if (command === 176) {
      handleCCMessage(noteObj.note, noteObj.velocity);
      return;
    }

    // Handle Note On (status bytes 144-159)
    if (command === 144 && noteObj.velocity > 0) {
      if (state.freqTable && state.synth) {
        const freq = state.freqTable[noteObj.note];
        if (freq) {
          const now = Tone.now();
          // Fix: Normalize velocity from 0-127 to 0-1
          const normalizedVelocity = noteObj.velocity / 127;
          state.synth.triggerAttack(freq, now, normalizedVelocity);
        }
      }
    }
    // Handle Note Off (status bytes 128-143) or Note On with velocity 0
    else if (command === 128 || (command === 144 && noteObj.velocity === 0)) {
      if (state.freqTable && state.synth) {
        const freq = state.freqTable[noteObj.note];
        if (freq) {
          const now = Tone.now();
          state.synth.triggerRelease(freq, now + 0.05);
        }
      }
    }
  }, [noteObj, state.freqTable, state.synth, userCCMap]);

  function getMIDIMessage(midiMessage) {
    setNoteObj({
      command: midiMessage.data[0],
      note: midiMessage.data[1],
      velocity: midiMessage.data.length > 2 ? midiMessage.data[2] : 0,
    });
  }

  useEffect(() => {
    // Check if Web MIDI API is available
    if (!navigator.requestMIDIAccess) {
      setMidiStatus("unsupported");
      console.warn("Web MIDI API is not supported in this browser");
      return;
    }

    navigator.requestMIDIAccess()
      .then(function (access) {
        setMidiStatus("connected");

        // Get lists of available MIDI controllers
        const inputs = access.inputs.values();

        for (let input of inputs) {
          input.onmidimessage = getMIDIMessage;
          console.log(`MIDI input connected: ${input.name}`);
        }

        access.onstatechange = function (e) {
          console.log(e.port.name, e.port.manufacturer, e.port.state);
          // Re-attach handlers when devices connect
          if (e.port.state === "connected" && e.port.type === "input") {
            e.port.onmidimessage = getMIDIMessage;
          }
        };
      })
      .catch(function (error) {
        setMidiStatus("error");
        console.error("Failed to access MIDI devices:", error);
      });
  }, []);

  // Expose MIDI status for debugging (could be used in UI later)
  useEffect(() => {
    dispatch({ type: "midi-status", value: midiStatus });
  }, [midiStatus, dispatch]);

  return null;
}

export default MIDI;
