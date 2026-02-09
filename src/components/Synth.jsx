import React, { useEffect, useContext } from "react";
import { store } from "../state";
import * as Tone from "tone";

// Default master volume (0-1 range, will be converted to appropriate gain)
const DEFAULT_MASTER_VOLUME = 0.5;

function Synth() {
  const { state, dispatch } = useContext(store);

  useEffect(() => {
    const synth = new Tone.PolySynth({ maxPolyphony: 32 });

    // Signal chain: PolySynth → Filter → Gain → EQ3 → Compressor → Limiter → Destination
    const filter = new Tone.Filter({
      frequency: 20000,
      type: 'lowpass',
      rolloff: -12,
      Q: 1,
    });

    const gainNode = new Tone.Gain(DEFAULT_MASTER_VOLUME);

    // 3-band EQ for tone shaping
    const eq = new Tone.EQ3({
      low: 0,
      mid: 0,
      high: 0,
      lowFrequency: 250,
      highFrequency: 3200,
    });

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

    synth.connect(filter);
    filter.connect(gainNode);
    gainNode.connect(eq);
    eq.connect(compressor);
    compressor.connect(limiter);
    limiter.toDestination();

    dispatch({ type: "synth", value: synth });
    dispatch({ type: "filter", value: filter });
    dispatch({ type: "gain-node", value: gainNode });
    dispatch({ type: "eq-node", value: eq });
    dispatch({ type: "master-volume", value: DEFAULT_MASTER_VOLUME });

    // Cleanup on unmount
    return () => {
      synth.dispose();
      filter.dispose();
      gainNode.dispose();
      eq.dispose();
      compressor.dispose();
      limiter.dispose();
    };
  }, [dispatch]);

  return null;
}

export default Synth;
