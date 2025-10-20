// const MIN_RADIUS = 7.5;
// const MAX_RADIUS = 15;
// const DEPTH = 2;
// const LEFT_COLOR = "FDC700";
// const RIGHT_COLOR = "FDC700";
// const NUM_POINTS = 2500;

// /**
//  * --- Credit ---
//  * https://stackoverflow.com/questions/16360533/calculate-color-hex-having-2-colors-and-percent-position
//  */
// const getGradientStop = (ratio) => {
//     // For outer ring numbers potentially past max radius,
//     // just clamp to 0
//     ratio = ratio > 1 ? 1 : ratio < 0 ? 0 : ratio;

//     const c0 = LEFT_COLOR.match(/.{1,2}/g).map(
//     (oct) => parseInt(oct, 16) * (1 - ratio)
//     );
//     const c1 = RIGHT_COLOR.match(/.{1,2}/g).map(
//     (oct) => parseInt(oct, 16) * ratio
//     );
//     const ci = [0, 1, 2].map((i) => Math.min(Math.round(c0[i] + c1[i]), 255));
//     const color = ci
//     .reduce((a, v) => (a << 8) + v, 0)
//     .toString(16)
//     .padStart(6, "0");

//     return `#${color}`;
// };

// const calculateColor = (x) => {
//     const maxDiff = MAX_RADIUS * 2;
//     const distance = x + MAX_RADIUS;

//     const ratio = distance / maxDiff;

//     const stop = getGradientStop(ratio);
//     return stop;
// };

// const randomFromInterval = (min, max) => {
//     return Math.random() * (max - min) + min;
// };

// export const pointsInner = Array.from(
//     { length: NUM_POINTS },
//     (v, k) => k + 1
// ).map((num) => {
//     const randomRadius = randomFromInterval(MIN_RADIUS, MAX_RADIUS);
//     const randomAngle = Math.random() * Math.PI * 2;

//     const x = Math.cos(randomAngle) * randomRadius;
//     const y = Math.sin(randomAngle) * randomRadius;
//     const z = randomFromInterval(-DEPTH, DEPTH);

//     const color = calculateColor(x);

//     return {
//     idx: num,
//     position: [x, y, z],
//     color,
//     };
// });

// export const pointsOuter = Array.from(
//     { length: NUM_POINTS / 4 },
//     (v, k) => k + 1
// ).map((num) => {
//     const randomRadius = randomFromInterval(MIN_RADIUS / 2, MAX_RADIUS * 2);
//     const angle = Math.random() * Math.PI * 2;

//     const x = Math.cos(angle) * randomRadius;
//     const y = Math.sin(angle) * randomRadius;
//     const z = randomFromInterval(-DEPTH * 10, DEPTH * 10);

//     const color = calculateColor(x);

//     return {
//     idx: num,
//     position: [x, y, z],
//     color,
//     };
// });
// === Configuration Constants ===
const MIN_RADIUS = 7.5;
const MAX_RADIUS = 15;
const DEPTH = 2;
const LEFT_COLOR = "00FFC6";  // teal
const RIGHT_COLOR = "7B2FF7"; // purple
const MID_COLOR = "0077FF";   // blue accent
const NUM_POINTS = 2500;

/**
 * Calculate gradient color between 3 stops (teal → blue → purple)
 */
const getGradientStop = (ratio) => {
  ratio = ratio > 1 ? 1 : ratio < 0 ? 0 : ratio;

  // Split ratio into two segments for 3-color gradient
  const midRatio = 0.5;
  let cStart, cEnd, localRatio;

  if (ratio < midRatio) {
    cStart = LEFT_COLOR;
    cEnd = MID_COLOR;
    localRatio = ratio / midRatio;
  } else {
    cStart = MID_COLOR;
    cEnd = RIGHT_COLOR;
    localRatio = (ratio - midRatio) / (1 - midRatio);
  }

  const c0 = cStart.match(/.{1,2}/g).map((oct) => parseInt(oct, 16) * (1 - localRatio));
  const c1 = cEnd.match(/.{1,2}/g).map((oct) => parseInt(oct, 16) * localRatio);
  const ci = [0, 1, 2].map((i) => Math.min(Math.round(c0[i] + c1[i]), 255));
  const color = ci.reduce((a, v) => (a << 8) + v, 0).toString(16).padStart(6, "0");

  return `#${color}`;
};

const calculateColor = (x) => {
  const maxDiff = MAX_RADIUS * 2;
  const distance = x + MAX_RADIUS;
  const ratio = distance / maxDiff;
  return getGradientStop(ratio);
};

const randomFromInterval = (min, max) => Math.random() * (max - min) + min;

// === Inner Bubbles (Dense Center) ===
export const pointsInner = Array.from({ length: NUM_POINTS }, (_, i) => {
  const randomRadius = randomFromInterval(MIN_RADIUS, MAX_RADIUS);
  const randomAngle = Math.random() * Math.PI * 2;
  const x = Math.cos(randomAngle) * randomRadius;
  const y = Math.sin(randomAngle) * randomRadius;
  const z = randomFromInterval(-DEPTH, DEPTH);
  const color = calculateColor(x);
  return { idx: i + 1, position: [x, y, z], color };
});

// === Outer Bubbles (Wider Spread) ===
export const pointsOuter = Array.from({ length: NUM_POINTS / 4 }, (_, i) => {
  const randomRadius = randomFromInterval(MIN_RADIUS / 2, MAX_RADIUS * 2);
  const angle = Math.random() * Math.PI * 2;
  const x = Math.cos(angle) * randomRadius;
  const y = Math.sin(angle) * randomRadius;
  const z = randomFromInterval(-DEPTH * 10, DEPTH * 10);
  const color = calculateColor(x);
  return { idx: i + 1, position: [x, y, z], color };
});
