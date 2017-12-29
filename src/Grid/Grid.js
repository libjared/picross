import React from "react";
import "./index.css";

export default class Grid extends React.Component {
  constructor(props) {
    super(props);
    // squares are "F", "X", or " "
    // let's start with an empty board
    // [x][y] order?
    this.state = {
      //squares:
    };
    //this.props.ruleSet.
  }

  render() {
    return (
      <table className="main-grid" cellspacing="0">
        <thead>
          <tr>
            <th></th>
            {this.props.ruleSet.col.map((rule, x) => {
              return <th scope="col" key={x}>{rule.map((num, y) => {
                return <div key={y}>{num}</div>;
              })}</th>;
            })}
          </tr>
        </thead>
        <tbody>
          {/* each has one header cell for the row rules */}
          {this.props.ruleSet.row.map((rule, y) => {
            return (
              <tr key={y}>
                <th scope="row">{rule.map((num, x) => {
                  return <div key={x}>{num}</div>;
                })}</th>
                {this.props.ruleSet.col.map((_, x) => { return (<td style={{ backgroundColor: (x+y)%2===0 ? "red" : "green" }}></td>); })}
              </tr>
            );
          })}
        </tbody>
      </table>
    );
  }
}
