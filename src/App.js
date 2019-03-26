// lib
import React, { Component } from "react";

// src
import Maze from './Maze'
import "./App.css";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Maze width={400} height={400}/>
      </div>
    );
  }
}

export default App;
