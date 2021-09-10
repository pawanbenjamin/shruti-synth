import React, { createContext, useReducer } from "react";
const initialState = {};

const store = createContext(initialState);
const { Provider } = store;

const StateProvider = ({ children }) => {
  const [state, dispatch] = useReducer((oldState, action) => {
    switch (action.type) {
      case "note-obj": {
        const newState = {
          ...oldState,
          noteObj: action.value,
        };
        return newState;
      }
      case "synth": {
        const newState = {
          ...oldState,
          synth: action.value,
        };
        return newState;
      }
      case "freq-table": {
        const newState = {
          ...oldState,
          freqTable: action.value,
        };
        return newState;
      }
      case "gain-node": {
        const newState = {
          ...oldState,
          gainNode: action.value,
        };
        return newState;
      }
      default:
        throw new Error();
    }
  }, initialState);

  return <Provider value={{ state, dispatch }}>{children}</Provider>;
};

export { store, StateProvider };
