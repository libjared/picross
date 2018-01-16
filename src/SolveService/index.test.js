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

it("generates chunk offsets rl=1,wr=0", () => {
  const ss = new SolveService();
  const result = ss.generateChunkOffsets({
    ruleLength: 1,
    wiggleRoom: 0
  });
  expect(result).toMatchObject([
    [0]
  ]);
});


it("generates line from offsets A", () => {
  // 2 2 2 [x11x22xx33] 1,0,1
  const ss = new SolveService();
  const result = ss.generateLineFromOffsets({
    length: 10,
    rule: [ 2, 2, 2 ],
    offsets: [ 1, 0, 1 ]
  });
  expect(result).toBe("x11x22xx33");
});

it("generates line from offsets B", () => {
  // 5 4 [11111x2222] 0,0
  const ss = new SolveService();
  const result = ss.generateLineFromOffsets({
    length: 10,
    rule: [ 5, 4 ],
    offsets: [ 0, 0 ]
  });
  expect(result).toBe("11111x2222");
});

it("generates line from offsets C", () => {
  // 1 1 [xx1xxxx2xx] 2,3
  const ss = new SolveService();
  const result = ss.generateLineFromOffsets({
    length: 10,
    rule: [ 1, 1 ],
    offsets: [ 2, 3 ]
  });
  expect(result).toBe("xx1xxxx2xx");
});

it("generates line from offsets non 10", () => {
  // 2 3 [xx11xx222] 2,1
  const ss = new SolveService();
  const result = ss.generateLineFromOffsets({
    length: 9,
    rule: [ 2, 3 ],
    offsets: [ 2, 1 ]
  });
  expect(result).toBe("xx11xx222");
});

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

it("generates possibilities 10", () => {
  const ss = new SolveService();
  const result = ss.generatePossibilities({
    length: 10,
    rule: [ 10 ]
  });
  expect(result).toHaveLength(1);
  expect(result[0]).toBe("1111111111");
});

it("generates possibilities 1", () => {
  const ss = new SolveService();
  const result = ss.generatePossibilities({
    length: 10,
    rule: [ 1 ]
  });
  expect(result).toHaveLength(10);
  expect(result[0]).toBe("1xxxxxxxxx");
  expect(result[1]).toBe("x1xxxxxxxx");
  expect(result[2]).toBe("xx1xxxxxxx");
  expect(result[3]).toBe("xxx1xxxxxx");
  expect(result[4]).toBe("xxxx1xxxxx");
  expect(result[5]).toBe("xxxxx1xxxx");
  expect(result[6]).toBe("xxxxxx1xxx");
  expect(result[7]).toBe("xxxxxxx1xx");
  expect(result[8]).toBe("xxxxxxxx1x");
  expect(result[9]).toBe("xxxxxxxxx1");
});

it("generates possibilities 0", () => {
  const ss = new SolveService();
  const result = ss.generatePossibilities({
    length: 10,
    rule: [ ] // not an actual 0
  });
  expect(result).toHaveLength(1);
  expect(result[0]).toBe("xxxxxxxxxx");
});

it("filters compatible A", () => {
  const ss = new SolveService();
  const result = ss.filterCompatible({
    possibilities: [
      "1111x2222x",
      "1111xx2222",
      "x1111x2222"
    ],
    truth:
      "-###x-###-"
  });
  expect(result).toHaveLength(2);
  expect(result[0]).toBe("1111x2222x");
  expect(result[1]).toBe("1111xx2222");
});

it("filters compatible B", () => {
  const ss = new SolveService();
  const result = ss.filterCompatible({
    possibilities: [
      "1111x2222x",
      "1111xx2222",
      "x1111x2222"
    ],
    truth:
      "-###--####"
  });
  expect(result).toHaveLength(2);
  expect(result[0]).toBe("1111xx2222");
  expect(result[1]).toBe("x1111x2222");
});

it("filters compatible C", () => {
  const ss = new SolveService();
  const result = ss.filterCompatible({
    possibilities: [
      "1111x2222x",
      "1111xx2222",
      "x1111x2222"
    ],
    truth:
      "-###--###x"
  });
  expect(result).toHaveLength(1);
  expect(result[0]).toBe("1111x2222x");
});

it("filters compatible D", () => {
  const ss = new SolveService();
  const result = ss.filterCompatible({
    possibilities: [
      "1111x2222x",
      "1111xx2222",
      "x1111x2222"
    ],
    truth:
      "----------"
  });
  expect(result).toHaveLength(3);
  expect(result[0]).toBe("1111x2222x");
  expect(result[1]).toBe("1111xx2222");
  expect(result[2]).toBe("x1111x2222");
});

it("correctly performs logical-AND with squares", () => {
  // truth table (well, not really)
  // we're only testing up to 4 because it would take too long to write otherwise
  /*
      X-#1234
      _______
    X|x------
    -|-------
    #|--#####
    1|--#1###
    2|--##2##
    3|--###3#
    4|--####4
  */

  const ss = new SolveService();

  const charset =
  // 0123456
    "x-#1234";
  const truthTable = [
    "0111111",
    "1111111",
    "1122222",
    "1123222",
    "1122422",
    "1122252",
    "1122226"
  ];
  for (let y = 0; y < 6; y++) {
    for (let x = 0; x < 6; x++) {
      const a = charset[x];
      const b = charset[y];
      const expected = charset[Number(truthTable[y][x])];
      const result = ss.squareAnd(a, b);
      if (result !== expected) {
        throw new Error(`${a} + ${b} = ${result} (Expected ${expected})`);
      }
    }
  }
});

it("ANDs current-state-compatible possibilities A", () => {
  const ss = new SolveService();
  const result = ss.andReduce([
    "1111x2222x",
    "1111xx2222",
    "x1111x2222"
  ]);
  expect(result).toBe("-111--222-");
});

it("ANDs current-state-compatible possibilities with overlap fill", () => {
  const ss = new SolveService();

  // with rule 2, 3
  // --x#------ if the line looks like this
  // --x##----- we can prove this
  const result = ss.andReduce([
    "11x222xxxx",
    "xxx11x222x",
    "xxx11xx222"
  ]);
  expect(result).toBe("--x##-----");
});
