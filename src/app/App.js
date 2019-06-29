import React, { Component } from "react";
import "materialize-css/dist/css/materialize.min.css";
import "./app.css";

import Header from "./components/header/Header"
import Sidebar from "./components/sidebar/Sidebar"
import MapView from "./components/map/MapView"

import * as FoursquareAPI from "./utils/fourquareAPI"

// Import Materialize
import M from "materialize-css";

class App extends Component {

  state = {
    selectedPlace: {},
    activeMarker: {},
    showingInfoWindow: false,
    markers: []
  }

  componentDidMount() {
    M.AutoInit();
    this.initMap();
  }

  async initMap() {
    await FoursquareAPI.getAll().then(data => {
      this.setState({
        markers: data.response.groups[0].items
      })
    })
  }

  updateMarkerClick = (marker) => {
    this.setState((state) => ({
      markers: state.markers.map((m) => {
        if (m.venue.id === marker.venue.id) {
          m.show = true;
        } else {
          m.show = false;
        }
        return m;
      })
    }))
  }

  render() {
    return (
      <div>
        <Header title="Mapa do Bairro" />
        {this.state.markers && this.state.markers.length > 0 ?
          <Sidebar
            markers={this.state.markers}
            onMarkerClick={this.updateMarkerClick} /> : null}
        {this.state.markers && this.state.markers.length > 0 ? <MapView places={this.state.markers} /> : null}
      </div>
    );
  }
}

export default App;
