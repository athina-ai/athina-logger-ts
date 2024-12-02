export function removeNoneValues(d: any): any {
  if (typeof d === 'object' && d !== null) {
    if (Array.isArray(d)) {
      return d.filter((v) => v !== null).map(removeNoneValues);
    } else {
      return Object.fromEntries(
        Object.entries(d)
          .filter(([, v]) => v !== null)
          .map(([k, v]) => [k, removeNoneValues(v)]),
      );
    }
  } else {
    return d;
  }
}

export function getUtcTime(timeObj?: Date): Date {
  if (!timeObj) {
    return new Date();
  }
  return new Date(timeObj.toUTCString());
}
