const deepcopy = require("../deepcopy");

describe("deepcopy 함수 테스트", () => {
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

  test("객체의 프로토타입 체인을 깊은 복사한다.", () => {
    // 생성자 함수를 정의
    function Parent() {}
    Parent.prototype.method = function () {
      return "method from Parent";
    };

    // Parent를 프로토타입으로 가지는 original 객체 생성
    const original = Object.create(new Parent());
    original.a = 1;

    const copy = deepcopy(original);

    expect(copy).toEqual(original); // 객체의 값과 구조가 같은지 확인
    expect(copy).not.toBe(original); // 객체의 참조가 다른지 확인

    // 복사된 객체와 원본 객체가 같은 프로토타입 체인을 가지는지 확인
    expect(Object.getPrototypeOf(copy)).toEqual(
      Object.getPrototypeOf(original)
    );
    expect(Object.getPrototypeOf(copy)).not.toBe(null);

    // 복사된 객체의 메서드가 원본 메서드와 동일하게 동작하는지 확인
    expect(copy.method()).toBe(original.method());
  });

  test("null과 undefined를 올바르게 처리한다.", () => {
    expect(deepcopy(null)).toBeNull(); // null 처리 확인
    expect(deepcopy(undefined)).toBeUndefined(); // undefined 처리 확인
  });
});
