function deepcopy(value) {
  if (value === null || typeof value !== "object") {
    return value;
  }
  throw new Error("얕은 복사만 구현되어 있음");
}

module.exports = deepcopy;
