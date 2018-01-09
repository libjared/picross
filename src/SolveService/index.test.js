import SolveService from "./";

it("exists", () => {
  expect(SolveService).toBeDefined();
});

it("initializes", () => {
  const ss = new SolveService();
  expect(ss).toBeDefined();
});

it("counts xes 4,4", () => {
  const ss = new SolveService();
  const result = ss.countXesForLine({
    length: 10,
    rule: [ 4,4 ]
  });
  expect(result).toBe(2);
});

it("counts xes 10", () => {
  const ss = new SolveService();
  const result = ss.countXesForLine({
    length: 10,
    rule: [ 10 ]
  });
  expect(result).toBe(0);
});

it("counts xes 0", () => {
  const ss = new SolveService();
  const result = ss.countXesForLine({
    length: 10,
    rule: [ 0 ]
  });
  expect(result).toBe(10);
});

it("generates chunk offsets rl=2,wr=1", () => {
  const ss = new SolveService();
  const result = ss.generateChunkOffsets({
    ruleLength: 2,
    wiggleRoom: 1
  });
  expect(result).toMatchObject([
    [0,0],
    [0,1],
    [1,0]
  ]);
});

it("generates chunk offsets rl=3,wr=2", () => {
  const ss = new SolveService();
  const result = ss.generateChunkOffsets({
    ruleLength: 3,
    wiggleRoom: 2
  });
  expect(result).toMatchObject([
    [0,0,0],
    [0,0,1],
    [0,0,2],
    [0,1,0],
    [0,1,1],
    [0,2,0],
    [1,0,0],
    [1,0,1],
    [1,1,0],
    [2,0,0]
  ]);
});

// it("generates chunk offsets 0", () => {
//   throw new Error("wtf is this even?");
// });

// it("generates chunk offsets 10", () => {
//   throw new Error("wtf is this even?");
// });

it("generates possibilities 4,4", () => {
  const ss = new SolveService();
  const result = ss.generatePossibilities({
    length: 10,
    rule: [ 4,4 ]
  });
  expect(result).toHaveLength(3);
  expect(result[0]).toBe("1111x2222x");
  expect(result[1]).toBe("1111xx2222");
  expect(result[2]).toBe("x1111x2222");
});

// it("generates possibilities 10", () => {
//   const ss = new SolveService();
//   const result = ss.generatePossibilities({
//     length: 10,
//     rule: [ 10 ]
//   });
//   expect(result).toHaveLength(1);
//   expect(result[0]).toBe("1111111111");
// });

// it("generates possibilities 0", () => {
//   const ss = new SolveService();
//   const result = ss.generatePossibilities({
//     length: 10,
//     rule: [ 0 ]
//   });
//   expect(result).toHaveLength(1);
//   expect(result[0]).toBe("xxxxxxxxxx");
// });
