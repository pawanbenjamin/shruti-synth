import React, { useEffect, useContext } from "react";
import { store } from "../state";
import * as Tone from "tone";

function Synth() {
  const { state, dispatch } = useContext(store);

  useEffect(() => {
    const synth = new Tone.PolySynth();
    // const filter = new Tone.Filter(0, "lowpass", -12);
    const gainNode = new Tone.Gain(0).toDestination();

    synth.connect(gainNode);
    // filter.connect(gainNode);
    gainNode.gain.rampTo(0.0012, 0.1);

    // dispatch({ type: "filter", value: filter });
    dispatch({ type: "synth", value: synth });
    dispatch({ type: "gain-node", value: gainNode });
  }, []);

  return null;
}

export default Synth;
