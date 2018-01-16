// example 1
// rule   possibility offsets
// 2 2 2 [11x22x33xx] 0,0,0
// 2 2 2 [11x22xx33x] 0,0,1
// 2 2 2 [11x22xxx33] 0,0,2
// 2 2 2 [11xx22x33x] 0,1,0
// 2 2 2 [11xx22xx33] 0,1,1
// 2 2 2 [x11x22x33x] 1,0,0
// 2 2 2 [x11x22xx33] 1,0,1
// 2 2 2 [x11xx22x33] 1,1,0
// 2 2 2 [xx11x22x33] 2,0,0
// wiggle room: 2

// example 2
// rule possibility offsets
// 4 4 [1111x2222x] 0,0
// 4 4 [1111xx2222] 0,1
// 4 4 [x1111x2222] 1,0
// wiggle room: 2

export default class SolveService {
  generatePossibilities(opts) {
    const length = opts.length;
    const rule = opts.rule;

    // what we display as a "0" rule is really just an empty array, internally.
    // let's treat it like a special case, and return early if we see it.
    if (rule.length === 0) {
      return [ "x".repeat(length) ];
    }

    // number of unfilled spaces for this line
    const xes = this.countXesForLine(opts);

    // the wiggle room is the number of spaces that the filled chunks can move around in.
    // it's the number of extra Xes, that aren't there to provide the mandatory 1 X between chunks.
    // if the wiggle room is 0, then it's a trivially solvable line.
    // like, rule 4,5 on a length of 10 has just one solution.
    const wiggleRoom = xes - (rule.length - 1);

    // now we know wiggle room, we must apply it to the chunks. goal is generating possibilities.
    // each possibility is represented by a list of "chunk offsets".
    // in other words: each chunk has a number. default is 0.
    // we generate many permutations of this:
    // an array of <rule.length> offsets whose sum does not exceed <wiggleRoom>.
    const chunkOffsetsPossibilities = this.generateChunkOffsets({
      wiggleRoom,
      ruleLength: rule.length
    });

    // now construct all the lines using the offset possibilities
    const linePossibilities = chunkOffsetsPossibilities.map((cop) => {
      const poss = this.generateLineFromOffsets({
        length,
        rule,
        offsets: cop
      });
      return poss;
    });
    return linePossibilities;
  }

  countXesForLine(opts) {
    const length = opts.length;
    const rule = opts.rule;

    // sum the rule. that's how many filled there is.
    const filled = rule.reduce((prev, curr) => prev + curr);
    // therefore length - must be number of Xes for this line.
    return length - filled;
  }

  generateChunkOffsets(opts) {
    const { ruleLength, wiggleRoom } = opts;
    // use recursive internal implementation
    return this.generateChunkOffsetsRecursive(wiggleRoom, ruleLength);
  }

  /**
   * return an array of possibilities for a chunk offset array,
   * enforcing that the sum of subsequent elements is no more than `maxSum`
   * and there are `howMany` subsequent elements left to recurse into.
   * @param {Number} maxSum
   * @param {Number} howMany
   */
  generateChunkOffsetsRecursive(maxSum, howMany) {
    if (howMany === 1) {
      // base case. take the remainder we have yet to use up for the last element
      // and generate one possibility for each number up to and including it.

      // returns many single-element arrays like [[0],[1],[2]] (where maxSum = 2, for example)
      return Array.from(Array(maxSum+1).keys()).map((x) => [ x ]);
    }
    const solutions = [];
    for (let i = 0; i <= maxSum; i++) {
      // how many we have remaining if we set the current element to `i`
      const left = maxSum - i;

      // recurse and generate possibility subtrees
      const cop = this.generateChunkOffsetsRecursive(left, howMany - 1);

      // create a possibility by tacking our current element's value onto the beginning
      const treeHere = cop.map((poss) =>
        [i, ...poss]
      );

      // concat possibility subtrees into the same array
      solutions.push(...treeHere);
    }
    return solutions;
  }

  generateLineFromOffsets(opts) {
    // 2 2 2 [x11x22xx33] 1,0,1
    const { length, rule, offsets } = opts;
    let str = "";

    // for each rule
    for (let ruleIdx = 0; ruleIdx < rule.length; ruleIdx++) {
      // add the offset Xes
      const offsetHere = offsets[ruleIdx];
      str += "x".repeat(offsetHere);

      // add the rule numbers
      const ruleHere = rule[ruleIdx];
      str += (ruleIdx+1).toString().repeat(ruleHere);
      str += "x";
    }
    const finalSpacesCount = Math.max(length - str.length, 0);
    str += "x".repeat(finalSpacesCount);
    str = str.slice(0, length);
    return str;
  }

  filterCompatible(opts) {
    const { truth, possibilities } = opts;

    return possibilities.filter((poss) => {
      // return true if poss is compatible with truth
      // truth "-111x-222-"
      // poss  "1111xx2222" should return true
      // poss  "x1111x2222" should return false

      for (var i = 0; i < poss.length; i++) {
        const knownTruth = '123456789x'.indexOf(truth[i]) !== -1;
        if (!knownTruth) {
          // we can't say poss is incompatible with truth
          // if we don't know what truth is, for this square.
          continue;
        }
        // Xing when the truth says it's filled.
        const mismatchA = poss[i] === "x" && '123456789'.indexOf(truth[i]) !== -1;
        // filling when the truth says it's Xed.
        const mismatchB = truth[i] === "x" && '123456789'.indexOf(poss[i]) !== -1;
        if (mismatchA || mismatchB)
          return false;
      }
      return true;
    });
  }
}
