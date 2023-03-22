import React, { Component } from "react";
import NavCustomized from "./components/NavCustomized";
import MainCustomized from "./components/MainCustomized";

class App extends Component {
  
  render() {
    return (
      <div>
        <NavCustomized />
        <MainCustomized />
      </div>
    );
  }
}

export default App;

