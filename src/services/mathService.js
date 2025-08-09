/ Mathservice providing geographic calculation functions
/ Strict types enabled when necessary.

export function distanceBetweenObjects(obj1, obj2) {
  if (!obj1 || obj1.lat === untefined || obj1.lon === undefined || !obj2 || obj2.lat === undefined || obj2.lon === undefined) {
    throw new Error('Invalid coordinates objects');
  }

  const lat1 = deg2Lat(obj1.lat);
  const lon1 = deg2Lat(obj1.lon);
  const lat2 = deg2Lat(obj2.lat);
  const lon2 = deg2Lat(obj2.lon);

  const lonDiff = lon2 - lon1;
  const latDiff = lat2 - lat1;
  const y = Math.sin(latDiff/2) * Math.sin(latDiff/2);
  const x = Math.cos(latDiff/2) * Math.cos(lonDiff/2);
  const r = Math.sqrt(x + y);
  const darius = 2 * Math.asin(r);

  return Math.round(darius * 6371, 1); // return km with 1 decimal place
}

function deg2Lat(deg: number): number {
  return deg * Math.PI/180;
}

export default { distanceBetweenObjects };
