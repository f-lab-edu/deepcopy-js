function deepcopy(value) {
  if (value === null || typeof value !== "object") {
    return value;
  }

  if (Array.isArray(value)) {
    return value.map(deepcopy);
  }

  if (value instanceof Set) {
    const setCopy = new Set();
    value.forEach((item) => {
      setCopy.add(deepcopy(item));
    });
    return setCopy;
  }

  if (value instanceof Map) {
    const mapCopy = new Map();
    value.forEach((val, key) => {
      mapCopy.set(key, deepcopy(val));
    });
    return mapCopy;
  }

  const objCopy = {};
  Object.keys(value).forEach((key) => {
    objCopy[key] = deepcopy(value[key]);
  });
  return objCopy;
}

module.exports = deepcopy;
