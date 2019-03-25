// lib
import React, { Component } from "react";
import size from "lodash/fp/size";
import getOr from "lodash/fp/getOr";
import reduce from "lodash/reduce";

// src
import data from "./sample";
import "./Maze.css";

function generateBoxPath(xMultiplier, yMultiplier, w, h) {
  const x = xMultiplier * w;
  const y = yMultiplier * h;
  return `M${x} ${y} L${x} ${y + h} L${x + w} ${y + h} L${x + w} ${y}Z `;
}

function generateFence(width, height) {
  return `M0 0 L0 ${height} L${width} ${height} L${width} 0 L0 0 `;
}

function getScales(matrix, width, height) {
  const y = size(matrix);
  const x = size(getOr(0, "0")(matrix));
  const scalingSide = width > height ? height : width;
  const w = scalingSide / x;
  const h = scalingSide / y;
  return { w, h };
}

function generatePath(matrix, width, height) {
  const { h, w } = getScales(matrix, height, width);
  return reduce(
    matrix,
    (finalCol, currentCol, colIndex) => {
      const currentColStep = colIndex;
      const rowPath = reduce(
        currentCol,
        (finalRow, currentRow, rowIndex) => {
          const currentRowStep = rowIndex;
          if (currentRow === 0) {
            return (
              finalRow + generateBoxPath(currentRowStep, currentColStep, w, h)
            );
          }
          return finalRow;
        },
        ""
      );
      console.log("rowPath: ", rowPath);
      return finalCol + rowPath;
    },
    ""
  );
}

class Maze extends Component {
  render() {
    const { width, height } = this.props;
    const path = generatePath(data, width, height);
    // const fence = generateFence(width, height);
    return (
      <div className="Root">
        <svg height={height} width={width} viewBox={`0, 0, ${width} ${height}`}>
          {/* <path d={fence} stroke="red" strokeWidth="3" fill="none" /> */}
          <rect x="0" y="0" width={width} height={height} stroke="red" strokeWidth="3" fill="none" />
          <path d={path} stroke="red" strokeWidth="3" fill="Red" />
        </svg>
      </div>
    );
  }
}

export default Maze;
