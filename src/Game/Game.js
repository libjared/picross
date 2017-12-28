import React from "react";
import Grid from "../Grid";

export default class Game extends React.Component {
  constructor(props) {
    super(props);
    // create aurora borealis puzzle
    const ruleStr = "2,1,1,1,,2,1,1,,2,4,,2,2,3,,3,1,2,,1,1,1,2,,1,1,2,2,,3,,5,,7,,,4,1,,5,1,,2,,1,1,1,,1,1,1,1,,1,1,1,2,,1,1,1,1,2,,2,3,,1,8,,9";
    this.state = {
        ruleSet: this.makeRulesObjectFromString(ruleStr)
    };

    // row rule = row of numbers like "2 1 1 1" that is read left to right and describes a horizontal set of squares
    // col [...] column [...] top to bottom [...] vertical set of squares
    // width of puzzle = colRules.length
    // height [...] rowRules [...]

    // Glossary:
    // ruleset -- collection of W col rules and H row rules, that create a unique puzzle
    // rule -- example "2 1 1 1"
    // number -- example "2"
    // square -- is filled, Xed, or unknown
    // puzzle -- entire grid of squares and a ruleset of the same dimensions
  }

  makeRulesObjectFromString(str) {
    return {
      row: str.split(",,,")[0].split(",,").map((rule) => rule.split(",")),
      col: str.split(",,,")[1].split(",,").map((rule) => rule.split(","))
    }
  }

  render() {
    return (
      <Grid
        ruleSet={this.state.ruleSet}
      />
    );
  }
}
