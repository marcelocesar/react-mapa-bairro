import React, { Component } from "react";
import "materialize-css/dist/css/materialize.min.css";
import "./app.css";

import Header from "./components/header/Header"
import Sidebar from "./components/sidebar/Sidebar"
import Map from "./components/map/Map";

// Import Materialize
import M from "materialize-css";

class App extends Component {
  componentDidMount() {
    M.AutoInit();
  }

  render() {
    return (
      <div>
        <Header />
        <Sidebar />
        <Map />
      </div>
    );
  }
}

export default App;
