const { estimateAbilityEAP, itemResponseFunction, information } = require("../");

describe("estimateAbilityEAP", () => {
  const zeta = [{ a: 1.0, b: 1.2, c: 0.1 }, { a: 1.0, b: -0.5, c: 0.5 }];

  it("works with all answers correct", () => {
    expect(0.5436).toBeCloseTo(estimateAbilityEAP([1, 1], zeta), 3);
  });

  it("works with only first correct", () => {
    expect(-0.1256).toBeCloseTo(estimateAbilityEAP([1, 0], zeta), 3);
  });

  it("works with only second correct", () => {
    expect(-0.1118).toBeCloseTo(estimateAbilityEAP([0, 1], zeta), 3);
  });

  it("works with none correct", () => {
    expect(-0.6373).toBeCloseTo(estimateAbilityEAP([0, 0], zeta), 3);
  });
});

describe("itemResponseFunction", () => {
  it("works correctly", () => {
    expect(0.3694).toBeCloseTo(
      itemResponseFunction({ a: 0.5, b: 0.9, c: 0.1 }, -0.8),
      3
    );
    expect(0.5836).toBeCloseTo(
      itemResponseFunction({ a: 0.5, b: 0.9, c: 0.1 }, 1.2),
      3
    );
  });
});

describe("information", () => {
  const zeta = [{ a: 1.1, b: -1.5, c: 0.1 }, { a: 0.3, b: -1, c: 0.5 }];

  it("works correctly for a single item", () => {
    expect(0.2471).toBeCloseTo(information(zeta[0], -1.2), 3);
    expect(0.0074).toBeCloseTo(information(zeta[1], -1.2), 3);
  });

  it("works correctly for multiple items", () => {
    expect(0.2545).toBeCloseTo(information(zeta, -1.2), 3);
  });
});
