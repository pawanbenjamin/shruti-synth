import { SHRUTI_TABLE } from './shrutiTable';

/**
 * Given a raga object, return a 12-element array where each index
 * is a ratio string or null (for unused semitones).
 *
 * Example for Bhoop (swaras: ["S", "R1", "G1", "P", "D1"]):
 *   ["1/1", null, "10/9", null, "5/4", null, null, "3/2", null, "5/3", null, null]
 */
export function getRagaScale(raga) {
  const scale = new Array(12).fill(null);
  for (const swara of raga.swaras) {
    const entry = SHRUTI_TABLE[swara];
    if (entry && entry.semitone < 12) {
      scale[entry.semitone] = entry.ratio;
    }
  }
  return scale;
}

/**
 * Given a raga object, return an object mapping semitone position
 * to swara name, for keyboard labeling.
 *
 * Example for Bhoop: { 0: "S", 2: "R1", 4: "G1", 7: "P", 9: "D1" }
 */
export function getRagaSwaraMap(raga) {
  const map = {};
  for (const swara of raga.swaras) {
    const entry = SHRUTI_TABLE[swara];
    if (entry && entry.semitone < 12) {
      map[entry.semitone] = swara;
    }
  }
  return map;
}
