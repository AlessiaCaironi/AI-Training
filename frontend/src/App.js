import React, { Component } from "react";
import RenderImages from "./components/RenderImages";
import RenderDatas from "./components/RenderDatas";

class App extends Component {
  render() {
    return (
      <main className="container">
        <RenderDatas />
        <RenderImages />
      </main>
    );
  }
}

export default App;

