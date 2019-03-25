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
    // const fence = generateFence(width, height);
    return (
      <div className="Root">
        <svg height={height} width={width} viewBox={`0, 0, ${width} ${height}`}>
          {/* <path d={fence} stroke="red" strokeWidth="3" fill="none" /> */}
          <rect
            x="0"
            y="0"
            width={width}
            height={height}
            stroke="red"
            strokeWidth="3"
            fill="none"
          />
          <path d={path} stroke="red" strokeWidth="3" fill="Red" />
        </svg>
      </div>
    );
  }
}

export default Maze;
