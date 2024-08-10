function deepcopy(value) {
  if (value === null || typeof value !== "object") {
    return value;
  }

  if (Array.isArray(value)) {
    return value.map(deepcopy);
  }

  const objCopy = {};
  Object.keys(value).forEach((key) => {
    objCopy[key] = deepcopy(value[key]);
  });
  return objCopy;
}

module.exports = deepcopy;
