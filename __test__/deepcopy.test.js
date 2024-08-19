const deepcopy = require("../deepcopy");

describe("deepcopy 함수 테스트", () => {
  describe("원시 타입(Primitive Types) 복사", () => {
    test("number 타입을 복사한다.", () => {
      const original = 15;
      const copy = deepcopy(original);

      expect(copy).toBe(original);
    });

    test("string 타입을 복사한다.", () => {
      const original = "hello";
      const copy = deepcopy(original);

      expect(copy).toBe(original);
    });

    test("boolean 타입을 복사한다.", () => {
      const original = true;
      const copy = deepcopy(original);

      expect(copy).toBe(original);
    });

    test("null을 복사한다.", () => {
      const original = null;
      const copy = deepcopy(original);

      expect(copy).toBeNull();
    });

    test("undefined를 복사한다.", () => {
      const original = undefined;
      const copy = deepcopy(original);

      expect(copy).toBeUndefined();
    });
  });

  describe("참조 타입(reference Types) 깊은 복사", () => {
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

  describe("ES6 타입 복사 (Map, Set, Symbol)", () => {
    test("Map 객체를 복사하면 원본을 수정해도 복사본은 영향을 받지 않는다.", () => {
      const original = new Map();
      original.set("key1", "value1");
      original.set("key2", { key3: 11 });

      const copy = deepcopy(original);
      original.get("key2").key3 = "changed";

      expect(copy.get("key2").key3).toBe(11);
      expect(copy).not.toBe(original);
    });

    test("Set 객체를 복사하면 원본을 수정해도 복사본은 영향을 받지 않는다.", () => {
      const original = new Set([1, 2, { a: 3 }]);

      const copy = deepcopy(original);
      [...original][2].a = 99;

      expect([...copy][2].a).toBe(3);
      expect(copy).not.toBe(original);
    });

    test("Symbol 값을 복사하면 동일한 Symbol을 반환한다.", () => {
      const originalSymbol = Symbol("id");

      const copy = deepcopy(originalSymbol);

      expect(copy).toBe(originalSymbol);
    });
  });
});
