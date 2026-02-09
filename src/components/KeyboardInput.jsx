import React, { useEffect, useContext, useState, useCallback } from "react";
import { store } from "../state";
import * as Tone from "tone";

import "./keyboardInput.css";

// Map computer keys to semitone offsets from base MIDI note
const KEY_TO_SEMITONE = {
  // White keys (home row)
  'a': 0, 's': 2, 'd': 4, 'f': 5, 'g': 7, 'h': 9, 'j': 11,
  'k': 12, 'l': 14, ';': 16,
  // Black keys (top row)
  'w': 1, 'e': 3, 't': 6, 'y': 8, 'u': 10,
  'o': 13, 'p': 15,
};

// Two-octave visual layout (14 white keys, 14 black key slots)
// null = no keyboard binding (visual-only key)
const WHITE_KEYS =      ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', ';', null, null, null, null];
const WHITE_KEY_SEMITONES = [0, 2, 4, 5, 7, 9, 11, 12, 14, 16, 17, 19, 21, 23];

const BLACK_KEY_SEMITONES = [1, 3, null, 6, 8, 10, null, 13, 15, null, 18, 20, 22, null];
const BLACK_KEYS =          ['w', 'e', null, 't', 'y', 'u', null, 'o', 'p', null, null, null, null, null];

function KeyboardInput({ enabled, baseOctave = 4, onOctaveChange }) {
  const { state } = useContext(store);
  const [activeKeys, setActiveKeys] = useState(new Set());

  // ragaSwaraMap is keyed by absolute pitch class (0-11)
  const ragaSwaraMap = state.ragaSwaraMap || {};

  const baseMidiNote = (baseOctave + 1) * 12;

  const isSemitoneInRaga = useCallback((semitone) => {
    const midiNote = baseMidiNote + semitone;
    return ragaSwaraMap[midiNote % 12] !== undefined;
  }, [ragaSwaraMap, baseMidiNote]);

  const getSwaraLabel = useCallback((semitone) => {
    const midiNote = baseMidiNote + semitone;
    return ragaSwaraMap[midiNote % 12] || '';
  }, [ragaSwaraMap, baseMidiNote]);

  const playNote = useCallback((key) => {
    if (!state.synth || !state.freqTable) return;

    const semitone = KEY_TO_SEMITONE[key.toLowerCase()];
    if (semitone === undefined) return;

    const midiNote = baseMidiNote + semitone;
    const freq = state.freqTable[midiNote];

    if (freq) {
      if (Tone.context.state !== 'running') {
        Tone.start();
      }
      const now = Tone.now();
      state.synth.triggerAttack(freq, now, 0.7);
    }

    return midiNote;
  }, [state.synth, state.freqTable, baseMidiNote]);

  const releaseNote = useCallback((key) => {
    if (!state.synth || !state.freqTable) return;

    const semitone = KEY_TO_SEMITONE[key.toLowerCase()];
    if (semitone === undefined) return;

    const midiNote = baseMidiNote + semitone;
    const freq = state.freqTable[midiNote];

    if (freq) {
      const now = Tone.now();
      state.synth.triggerRelease(freq, now + 0.05);
    }
  }, [state.synth, state.freqTable, baseMidiNote]);

  useEffect(() => {
    if (!enabled) return;

    const handleKeyDown = (e) => {
      // Only ignore text-like inputs where the user is typing
      if (e.target.tagName === 'TEXTAREA') return;
      if (e.target.tagName === 'INPUT' && !['range', 'checkbox', 'radio', 'button'].includes(e.target.type)) return;
      if (e.repeat) return;

      const key = e.key.toLowerCase();

      if (key === 'z' && onOctaveChange) {
        e.preventDefault();
        onOctaveChange(o => Math.max(1, o - 1));
        return;
      }
      if (key === 'x' && onOctaveChange) {
        e.preventDefault();
        onOctaveChange(o => Math.min(7, o + 1));
        return;
      }

      if (KEY_TO_SEMITONE[key] !== undefined) {
        e.preventDefault();
        setActiveKeys(prev => new Set(prev).add(key));
        playNote(key);
      }
    };

    const handleKeyUp = (e) => {
      if (e.target.tagName === 'TEXTAREA') return;
      if (e.target.tagName === 'INPUT' && !['range', 'checkbox', 'radio', 'button'].includes(e.target.type)) return;

      const key = e.key.toLowerCase();
      if (KEY_TO_SEMITONE[key] !== undefined) {
        e.preventDefault();
        setActiveKeys(prev => {
          const next = new Set(prev);
          next.delete(key);
          return next;
        });
        releaseNote(key);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [enabled, playNote, releaseNote]);

  useEffect(() => {
    if (!enabled && activeKeys.size > 0) {
      activeKeys.forEach(key => releaseNote(key));
      setActiveKeys(new Set());
    }
  }, [enabled, activeKeys, releaseNote]);

  if (!enabled) return null;

  return (
    <div className="keyboard-input">
      <div className="keyboard-visual">
        <div className="black-keys">
          {BLACK_KEY_SEMITONES.map((semitone, i) => {
            if (semitone === null) return <div key={i} className="black-key-spacer" />;
            const key = BLACK_KEYS[i];
            const inRaga = isSemitoneInRaga(semitone);
            const swaraLabel = getSwaraLabel(semitone);
            return (
              <div
                key={i}
                className={`black-key ${key && activeKeys.has(key) ? 'active' : ''} ${!inRaga ? 'dimmed' : ''}`}
                style={{ left: `${i * 39 + 26}px` }}
              >
                {key && <span className="key-label">{key.toUpperCase()}</span>}
                <span className="note-name">{swaraLabel}</span>
              </div>
            );
          })}
        </div>
        <div className="white-keys">
          {WHITE_KEYS.map((key, i) => {
            const semitone = WHITE_KEY_SEMITONES[i];
            const inRaga = isSemitoneInRaga(semitone);
            const swaraLabel = getSwaraLabel(semitone);
            return (
              <div
                key={key || `w${i}`}
                className={`white-key ${key && activeKeys.has(key) ? 'active' : ''} ${!inRaga ? 'dimmed' : ''}`}
              >
                {key && <span className="key-label">{key.toUpperCase()}</span>}
                <span className="note-name">{swaraLabel}</span>
              </div>
            );
          })}
        </div>
      </div>
      <div className="octave-indicator">
        <button
          className="octave-btn"
          onClick={() => onOctaveChange && onOctaveChange(o => Math.max(1, o - 1))}
          disabled={baseOctave <= 1}
        >
          <span className="octave-btn-label">Z</span>
        </button>
        <div className="octave-display">
          <span className="octave-display-label">Octave</span>
          <span className="octave-display-value">{baseOctave}</span>
        </div>
        <button
          className="octave-btn"
          onClick={() => onOctaveChange && onOctaveChange(o => Math.min(7, o + 1))}
          disabled={baseOctave >= 7}
        >
          <span className="octave-btn-label">X</span>
        </button>
      </div>
    </div>
  );
}

export default KeyboardInput;
