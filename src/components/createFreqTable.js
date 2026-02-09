/**
 * Parse a ratio string (e.g., "3/2") into a numeric value
 * @param {string} ratioStr - Ratio in format "numerator/denominator"
 * @returns {number} The computed ratio, or 1 if invalid
 */
function parseRatio(ratioStr) {
  if (!ratioStr || typeof ratioStr !== 'string') {
    console.warn(`Invalid ratio: ${ratioStr}, using 1/1`);
    return 1;
  }

  const parts = ratioStr.split('/');
  if (parts.length !== 2) {
    console.warn(`Invalid ratio format: ${ratioStr}, using 1/1`);
    return 1;
  }

  const numerator = parseInt(parts[0], 10);
  const denominator = parseInt(parts[1], 10);

  if (isNaN(numerator) || isNaN(denominator) || denominator === 0) {
    console.warn(`Invalid ratio values: ${ratioStr}, using 1/1`);
    return 1;
  }

  return numerator / denominator;
}

/**
 * Create a frequency lookup table mapping MIDI note numbers to frequencies
 * based on just intonation ratios.
 *
 * @param {number} rootKey - MIDI note number of the root (e.g., 69 for A4)
 * @param {string[]} scale - Array of 12 ratio strings (e.g., ["1/1", "16/15", ...])
 * @param {number|string} rootFreq - Frequency of the root note in Hz (e.g., 432)
 * @returns {Object} Map of MIDI note numbers to frequencies
 */
export function createFreqTable(rootKey, scale, rootFreq) {
  const freqTable = {};

  // Validate inputs
  const rootKeyNum = parseInt(rootKey, 10);
  const rootFreqNum = parseFloat(rootFreq);

  if (isNaN(rootKeyNum) || rootKeyNum < 0 || rootKeyNum > 127) {
    console.error(`Invalid root key: ${rootKey}`);
    return freqTable;
  }

  if (isNaN(rootFreqNum) || rootFreqNum <= 0) {
    console.error(`Invalid root frequency: ${rootFreq}`);
    return freqTable;
  }

  if (!Array.isArray(scale) || scale.length !== 12) {
    console.error(`Scale must be an array of 12 ratios, got: ${scale?.length}`);
    return freqTable;
  }

  // Pre-parse all ratios for efficiency (null entries stay null)
  const ratios = scale.map(r => r === null ? null : parseRatio(r));

  // Generate frequencies upward from root (rootKey to 108)
  let currentKey = rootKeyNum;
  let scaleDegree = 0;
  let octaveMultiplier = 1;

  while (currentKey <= 108) {
    const ratio = ratios[scaleDegree % 12];
    if (ratio !== null) {
      freqTable[currentKey] = rootFreqNum * ratio * octaveMultiplier;
    }

    currentKey++;
    scaleDegree++;

    // Move to next octave after 12 notes
    if (scaleDegree % 12 === 0 && scaleDegree > 0) {
      octaveMultiplier *= 2;
    }
  }

  // Generate frequencies downward from root (rootKey-1 to 21)
  currentKey = rootKeyNum - 1;
  scaleDegree = 11; // Start at the 12th degree (one below root)
  octaveMultiplier = 0.5;

  while (currentKey >= 21) {
    const ratio = ratios[scaleDegree % 12];
    if (ratio !== null) {
      freqTable[currentKey] = rootFreqNum * ratio * octaveMultiplier;
    }

    currentKey--;
    scaleDegree--;

    // Move to lower octave when we pass the root
    if (scaleDegree < 0) {
      scaleDegree = 11;
      octaveMultiplier /= 2;
    }
  }

  return freqTable;
}

// Memoization cache for frequency tables
const freqTableCache = new Map();
const MAX_CACHE_SIZE = 10;

/**
 * Memoized version of createFreqTable to avoid recalculating
 * when inputs haven't changed.
 */
export function createFreqTableMemoized(rootKey, scale, rootFreq) {
  const cacheKey = `${rootKey}-${rootFreq}-${scale.join(',')}`;

  if (freqTableCache.has(cacheKey)) {
    return freqTableCache.get(cacheKey);
  }

  const result = createFreqTable(rootKey, scale, rootFreq);

  // Limit cache size
  if (freqTableCache.size >= MAX_CACHE_SIZE) {
    const firstKey = freqTableCache.keys().next().value;
    freqTableCache.delete(firstKey);
  }

  freqTableCache.set(cacheKey, result);
  return result;
}
