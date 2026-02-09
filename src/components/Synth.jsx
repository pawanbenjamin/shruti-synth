import React, { useEffect, useContext } from "react";
import { store } from "../state";
import * as Tone from "tone";

// Default master volume (0-1 range, will be converted to appropriate gain)
const DEFAULT_MASTER_VOLUME = 0.5;

function Synth() {
  const { state, dispatch } = useContext(store);

  useEffect(() => {
    const synth = new Tone.PolySynth({ maxPolyphony: 12 });

    // Signal chain: PolySynth → Gain → Compressor → Limiter → Destination
    const gainNode = new Tone.Gain(DEFAULT_MASTER_VOLUME);

    // Gentle compressor to tame polyphonic buildup
    const compressor = new Tone.Compressor({
      threshold: -18,
      ratio: 3,
      attack: 0.005,
      release: 0.15,
      knee: 6,
    });

    // Brick-wall limiter as a safety ceiling
    const limiter = new Tone.Limiter(-2);

    synth.connect(gainNode);
    gainNode.connect(compressor);
    compressor.connect(limiter);
    limiter.toDestination();

    dispatch({ type: "synth", value: synth });
    dispatch({ type: "gain-node", value: gainNode });
    dispatch({ type: "master-volume", value: DEFAULT_MASTER_VOLUME });

    // Cleanup on unmount
    return () => {
      synth.dispose();
      gainNode.dispose();
      compressor.dispose();
      limiter.dispose();
    };
  }, [dispatch]);

  return null;
}

export default Synth;
