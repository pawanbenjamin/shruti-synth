export function createFreqTable(rootKey, scale, rootFreq) {
  //createFrequency Table to use for note generation
  const freqTable = {};

  let rootKeyValue = rootKey;
  let scaleDegree = 0;
  let oct = 1;

  let counter = 1;

  while (rootKeyValue <= 108) {
    let ratio = scale[scaleDegree % 12];

    let [freqRatioNumerator, freqRatioDenominator] = ratio.split("/");
    freqRatioNumerator = parseInt(freqRatioNumerator);
    freqRatioDenominator = parseInt(freqRatioDenominator);
    freqTable[rootKeyValue] =
      (rootFreq * freqRatioNumerator * oct) / freqRatioDenominator;

    rootKeyValue++;
    scaleDegree++;
    if (counter === 12) {
      counter = 0;
      oct *= 2;
    }
    counter++;
  }

  let rootKeyValue2 = rootKey - 1;
  let scaleDegree2 = scale.length - 1;
  let oct2 = 1 / 2;

  while (rootKeyValue2 >= 21) {
    let ratio = scale[scaleDegree2 % 12];
    let [freqRatio2Numerator, freqRatio2Denominator] = ratio.split("/");
    freqRatio2Numerator = parseInt(freqRatio2Numerator);
    freqRatio2Denominator = parseInt(freqRatio2Denominator);

    freqTable[rootKeyValue2] =
      (rootFreq * freqRatio2Numerator * oct2) / freqRatio2Denominator;

    rootKeyValue2--;
    if (scaleDegree2 === 0) {
      scaleDegree2 = scale.length;
      oct2 = oct2 / 2;
    }
    scaleDegree2--;
  }

  return freqTable;
}
