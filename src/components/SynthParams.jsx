import React, { useContext, useEffect, useState, useRef } from 'react'

import { store } from '../state'

import './synthParams.css'

function SynthParams({ midiLearn, setMidiLearn }) {
  const { state, dispatch } = useContext(store)

  const detuneRef = useRef()

  // Master volume (0-1 range, controls gain node)
  const [masterVolume, setMasterVolume] = useState(state.masterVolume || 0.5)

  // Synth-level volume in dB
  const [volume, setVolume] = useState(-5)
  const [detune, setDetune] = useState(0)
  const [portamento, setPortamento] = useState(0)

  // Envelope State Variables
  const [attack, setAttack] = useState(0.05)
  const [attackCurve, setAttackCurve] = useState('linear')
  const [decay, setDecay] = useState(0.1)
  const [decayCurve, setDecayCurve] = useState('exponential')
  const [release, setRelease] = useState(1)
  const [releaseCurve, setReleaseCurve] = useState('exponential')
  const [sustain, setSustain] = useState(1)

  // Oscillator Variables
  const [partialCount, setPartialCount] = useState(0)
  const [partials, setPartials] = useState([])
  const [phase, setPhase] = useState(0)
  const [type, setType] = useState('sine')

  // Update master volume through state (controls gain node)
  useEffect(() => {
    dispatch({ type: 'master-volume', value: masterVolume })
  }, [masterVolume, dispatch])

  // Synth Parameters Effect
  useEffect(() => {
    if (state.synth) {
      state.synth.set({
        volume: volume,
        detune: detune,
        portamento: portamento,
        envelope: {
          attack: attack,
          attackCurve: attackCurve,
          decay: decay,
          decayCurve: decayCurve,
          release: release,
          releaseCurve: releaseCurve,
          sustain: sustain,
        },
        oscillator: {
          partialCount: partialCount,
          partials: partials,
          phase: phase,
          type: type,
        },
      })
    }
  }, [
    state.synth,
    volume,
    detune,
    portamento,
    attack,
    attackCurve,
    decay,
    decayCurve,
    release,
    releaseCurve,
    sustain,
    partialCount,
    partials,
    phase,
    type,
  ])

  const addToMidiMap = (id) => {
    if (midiLearn) {
      dispatch({ type: 'user-midi-map', value: id })
    }
  }

  return (
    <div className="synth-params">
      {/* ENVELOPE PANEL */}
      <div className="panel panel-envelope">
        <div className="param-section-label">Envelope</div>

        <div className="param-row">
          <div className="param-control">
            <label
              className={midiLearn ? 'learn' : ''}
              id="envelope.attack"
              onClick={(e) => addToMidiMap(e.target.id)}
            >
              Attack
            </label>
            <input
              type="range"
              min="0"
              max="1"
              step=".001"
              value={attack}
              onChange={(e) => setAttack(e.target.value)}
            />
            <span className="param-value">{parseFloat(attack).toFixed(2)}s</span>
          </div>

          <div className="param-control">
            <label
              className={midiLearn ? 'learn' : ''}
              id="envelope.decay"
              onClick={(e) => addToMidiMap(e.target.id)}
            >
              Decay
            </label>
            <input
              type="range"
              min="0.1"
              max="1.0"
              step="0.01"
              value={decay}
              onChange={(e) => setDecay(e.target.value)}
            />
            <span className="param-value">{parseFloat(decay).toFixed(2)}s</span>
          </div>

          <div className="param-control">
            <label
              className={midiLearn ? 'learn' : ''}
              id="envelope.sustain"
              onClick={(e) => addToMidiMap(e.target.id)}
            >
              Sustain
            </label>
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={sustain}
              onChange={(e) => setSustain(e.target.value)}
            />
            <span className="param-value">{parseFloat(sustain).toFixed(2)}</span>
          </div>

          <div className="param-control">
            <label
              className={midiLearn ? 'learn' : ''}
              id="envelope.release"
              onClick={(e) => addToMidiMap(e.target.id)}
            >
              Release
            </label>
            <input
              type="range"
              min="1"
              max="3"
              step=".1"
              value={release}
              onChange={(e) => setRelease(e.target.value)}
            />
            <span className="param-value">{parseFloat(release).toFixed(1)}s</span>
          </div>
        </div>

        <div className="param-sub-label">Curves</div>
        <div className="param-row">
          <div className="param-control">
            <label>Atk</label>
            <select onChange={(e) => setAttackCurve(e.target.value)}>
              <option defaultValue value="linear">Linear</option>
              <option value="exponential">Expo</option>
            </select>
          </div>
          <div className="param-control">
            <label>Dec</label>
            <select onChange={(e) => setDecayCurve(e.target.value)}>
              <option defaultValue value="linear">Linear</option>
              <option value="exponential">Expo</option>
            </select>
          </div>
          <div className="param-control">
            <label>Rel</label>
            <select onChange={(e) => setReleaseCurve(e.target.value)}>
              <option defaultValue value="linear">Linear</option>
              <option value="exponential">Expo</option>
            </select>
          </div>
        </div>
      </div>

      {/* OSCILLATOR PANEL */}
      <div className="panel">
        <div className="param-section-label">Oscillator</div>

        <div className="param-row">
          <div className="param-control">
            <label>Wave</label>
            <select onChange={(e) => setType(e.target.value)}>
              <option defaultValue value="sine">Sine</option>
              <option value="triangle">Triangle</option>
              <option value="sawtooth">Sawtooth</option>
              <option value="square">Square</option>
            </select>
          </div>

          <div className="param-control">
            <label>Partials</label>
            <input
              type="range"
              min="0"
              max="15"
              step="1"
              value={partialCount}
              onChange={(e) => setPartialCount(e.target.value)}
            />
            <span className="param-value">{partialCount}</span>
          </div>
        </div>
      </div>

      {/* VOLUME / LEVELS PANEL */}
      <div className="panel panel-volume">
        <div className="param-section-label">Levels</div>

        <div className="param-row">
          <div className="param-control">
            <label>Master</label>
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={masterVolume}
              onChange={(e) => setMasterVolume(parseFloat(e.target.value))}
            />
            <span className="param-value">{Math.round(masterVolume * 100)}%</span>
          </div>

          <div className="param-control">
            <label
              className={midiLearn ? 'learn' : ''}
              id="volume"
              onClick={(e) => addToMidiMap(e.target.id)}
            >
              Synth
            </label>
            <input
              type="range"
              min="-40"
              max="10"
              step="0.1"
              value={volume}
              onChange={(e) => setVolume(parseFloat(e.target.value))}
            />
            <span className="param-value">{volume}dB</span>
          </div>
        </div>

        <div className="param-row" style={{ marginTop: '8px' }}>
          <div className="param-control">
            <label
              className={midiLearn ? 'learn' : ''}
              id="detune"
              onClick={(e) => addToMidiMap(e.target.id)}
            >
              Detune
            </label>
            <form ref={detuneRef}>
              <input
                type="range"
                min="-100"
                max="100"
                step="1"
                value={detune}
                onChange={(e) => setDetune(e.target.value)}
                onMouseUp={() => {
                  setDetune(0)
                  detuneRef.current.reset()
                }}
              />
            </form>
            <span className="param-value">{detune}ct</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SynthParams
