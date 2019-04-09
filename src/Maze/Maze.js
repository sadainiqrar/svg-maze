// lib
import React, { Component } from "react";

// src
import data from "./sample";
import "./Maze.css";
import { generateFence, generatePath, getScales } from "./utils";

class Maze extends Component {
  render() {
    const { width, height } = this.props;
    const { w, h } = getScales(data, width, height);
    const path = generatePath(data, w, h);
    const fence = generateFence(width, height, w, h);
    return (
      <div className="Root">
        <svg height={height + 2 * h} width={width + 2 * w}>
          <path d={fence + path} stroke="red" strokeWidth="3" fill="none" />
        </svg>
      </div>
    );
  }
}

export default Maze;
