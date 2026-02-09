import React, { createContext, useReducer } from "react";

// Better initial state with sensible defaults
const initialState = {
  noteObj: {},
  userCCMap: {}, // Maps MIDI CC numbers to synth parameter paths
  midiStatus: "initializing",
  masterVolume: 0.5, // 0-1 range for master volume
};

const store = createContext(initialState);
const { Provider } = store;

const StateProvider = ({ children }) => {
  const [state, dispatch] = useReducer((oldState, action) => {
    switch (action.type) {
      case "note-obj": {
        return {
          ...oldState,
          noteObj: action.value,
        };
      }
      case "synth": {
        return {
          ...oldState,
          synth: action.value,
        };
      }
      case "filter": {
        return {
          ...oldState,
          filter: action.value,
        };
      }
      case "freq-table": {
        return {
          ...oldState,
          freqTable: action.value,
        };
      }
      case "raga-swara-map": {
        return {
          ...oldState,
          ragaSwaraMap: action.value,
        };
      }
      case "gain-node": {
        return {
          ...oldState,
          gainNode: action.value,
        };
      }
      case "master-volume": {
        // Update master volume and apply to gain node if available
        const newVolume = action.value;
        if (oldState.gainNode) {
          oldState.gainNode.gain.rampTo(newVolume, 0.1);
        }
        return {
          ...oldState,
          masterVolume: newVolume,
        };
      }
      case "midi-status": {
        return {
          ...oldState,
          midiStatus: action.value,
        };
      }
      // New: Map MIDI CC number to synth parameter
      case "user-cc-map": {
        const { ccNumber, paramName } = action.value;
        return {
          ...oldState,
          userCCMap: {
            ...oldState.userCCMap,
            [ccNumber]: paramName,
          },
        };
      }
      // New: Delete a CC mapping
      case "delete-cc-mapping": {
        const newCCMap = { ...oldState.userCCMap };
        delete newCCMap[action.value];
        return {
          ...oldState,
          userCCMap: newCCMap,
        };
      }
      // Legacy support: keep old action names working
      case "user-midi-map": {
        // Now expects { ccNumber, paramName } or falls back to old behavior
        if (typeof action.value === "object" && action.value.ccNumber !== undefined) {
          return {
            ...oldState,
            userCCMap: {
              ...oldState.userCCMap,
              [action.value.ccNumber]: action.value.paramName,
            },
          };
        }
        // Old behavior: use last received note as CC number
        const ccNumber = oldState.noteObj?.note;
        if (ccNumber !== undefined) {
          return {
            ...oldState,
            userCCMap: {
              ...oldState.userCCMap,
              [ccNumber]: action.value,
            },
          };
        }
        return oldState;
      }
      case "delete-mapping": {
        const newCCMap = { ...oldState.userCCMap };
        delete newCCMap[action.value];
        return {
          ...oldState,
          userCCMap: newCCMap,
        };
      }
      default:
        console.warn(`Unknown action type: ${action.type}`);
        return oldState;
    }
  }, initialState);

  return <Provider value={{ state, dispatch }}>{children}</Provider>;
};

export { store, StateProvider };
