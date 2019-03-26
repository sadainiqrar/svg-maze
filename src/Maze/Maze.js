// lib
import React, { Component } from "react";

// src
import data from "./sample";
import "./Maze.css";
import { generateFence, generatePath } from "./utils";

class Maze extends Component {
  render() {
    const { width, height } = this.props;
    const path = generatePath(data, width, height);
    const fence = generateFence(width, height);
    return (
      <div className="Root">
        <svg height={height} width={width}>
          <path d={fence + path} stroke="red" strokeWidth="3" fill="Red" />
        </svg>
      </div>
    );
  }
}

export default Maze;
