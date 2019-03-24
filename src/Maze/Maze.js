// lib
import React, { Component } from "react";

// src
import "./Maze.css";

class App extends Component {
  render() {
    return (
      <div className="Root">
        <svg height="210" width="400">
          <path
            d="M150 0 L75 200 L225 200 Z M225 200 L400 210"
            stroke="red"
            strokeWidth="3"
            fill="Red"
          />
        </svg>
      </div>
    );
  }
}

export default App;
