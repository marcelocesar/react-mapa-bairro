import React, { Component } from "react";
import "materialize-css/dist/css/materialize.min.css";
import "./app.css";

import Header from "./components/header/Header"
import Sidebar from "./components/sidebar/Sidebar"
import Map from "./components/map/Map";

import * as FoursquareAPI from "./utils/fourquareAPI"

// Import Materialize
import M from "materialize-css";

class App extends Component {

  state = {
    markers: []
  }
  
  componentDidMount() {
    M.AutoInit();
    this.initMap();
  }

  initMap() {
    let lsMarkers = localStorage.markers
    if (!lsMarkers) {
      FoursquareAPI.getAll().then(data => {
        this.setState({
          markers: data
        })
        lsMarkers = localStorage.markers = data;
      })
    } else {
      this.setState({
        markers: lsMarkers
      })
    }
  }

  render() {
    return (
      <div>
        <Header />
        <Sidebar />
        <Map markers={this.state.markers} />
      </div>
    );
  }
}

export default App;
