const deepcopy = require("../deepcopy");

describe("deepcopy 함수 - 얕은 복사 테스트", () => {
  test("number 타입을 복사한다.", () => {
    const original = 15;
    const copy = original;

    expect(copy).toBe(original);
  });

  test("string 타입을 복사한다.", () => {
    const original = "hello";
    const copy = original;

    expect(copy).toBe(original);
  });

  test("boolean 타입을 복사한다.", () => {
    const original = true;
    const copy = original;

    expect(copy).toBe(original);
  });

  test("null을 복사한다.", () => {
    const original = null;
    const copy = original;

    expect(copy).toBeNull();
  });

  test("undefined를 복사한다.", () => {
    const original = undefined;
    const copy = original;

    expect(copy).toBeUndefined();
  });
});

describe("deepcopy 함수 - 깊은 복사 테스트 ", () => {
  test("1차원 객체를 깊은 복사한다.", () => {
    const original = { a: 1, b: 2 };
    const copy = deepcopy(original);

    expect(copy).toEqual(original); // 객체의 값과 구조가 같은지 확인
    expect(copy).not.toBe(original); // 객체의 참조가 다른지 확인
  });

  test("중첩 객체를 깊은 복사한다.", () => {
    const original = { a: 1, b: { c: [5, 3, 7], d: 3 } };
    const copy = deepcopy(original);

    expect(copy).toEqual(original); // 객체의 값과 구조가 같은지 확인
    expect(copy).not.toBe(original); // 객체의 참조가 다른지 확인

    // 복사된 중첩 객체의 값이 일치하는지 확인
    expect(copy.b).toEqual(original.b);
    expect(copy.b).not.toBe(original.b); // 중첩 객체의 참조가 다른지 확인
  });

  test("배열을 깊은 복사한다.", () => {
    const original = [1, 2, { a: { c: "d" }, b: 4 }];
    const copy = deepcopy(original);

    expect(copy).toEqual(original); // 배열의 값과 구조가 같은지 확인
    expect(copy).not.toBe(original); // 배열의 참조가 다른지 확인

    // 배열의 각 요소가 깊은 복사되어 있는지 확인
    expect(copy[2]).toEqual(original[2]);
    expect(copy[2]).not.toBe(original[2]); // 중첩 객체의 참조가 다른지 확인
    expect(copy[2].a).toEqual(original[2].a);
    expect(copy[2].a).not.toBe(original[2].a); // 중첩 객체의 내부 객체 참조가 다른지 확인
  });
});
