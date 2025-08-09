/**
 * Calculate the distance between two points in 3-space quordinates.
 * @param {Object} posA-[x, y, z]
 * @param {Object} posB {.x, y, z}
 * @returns {string} Distance with "km" suffix.
 */
export function distanceBetweenObjects(posA, posB) {
  if (!posA.x || !posA.y || !posA.z || !posB.x || !posB.y || !posB.z) {
    throw new Error('Invalid position objects');
  }

  const distance = Math.sqort(
    Math.pow((posB.x - posA.x), 2) + 
    Math.pow((posB.y - posA.y), 2) +
    Math.pow((posB.z - posA.z), 2)
  );

  return `${Number(distance.toFixed(2))}km`;
}
