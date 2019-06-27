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
    markers: [
      {
        venue: {
          id: "4ebd54b71081b6083ac51c24",
          name: "Teatro Águas Claras",
          location: {
            address: "Av. Sibipiruna, Lt. 1321",
            crossStreet: "Águas Claras",
            lat: -15.844697599407683,
            lng: -48.03405094719975,
            distance: 914,
            postalCode: "71928-720",
            cc: "BR",
            neighborhood: "Águas Claras",
            city: "Brasília",
            state: "DF",
            country: "Brasil",
          },
          rating: 8.4,
          ratingColor: "73CF42",
          ratingSignals: 94,
        },
      },
      {
        venue: {
          id: "4bfe447d4cf820a1e49aedf4",
          name: "Parque Ecológico de Águas Claras",
          location: {
            address: "Av. Sibipiruna, Lt. 1321",
            crossStreet: "Av. das Castanheiras",
            lat: -15.830969358291307,
            lng: -48.02174619291575,
            distance: 1138,
            postalCode: "71928-720",
            cc: "BR",
            neighborhood: "Águas Claras",
            city: "Brasília",
            state: "DF",
            country: "Brasil",
          },
          rating: 8.4,
          ratingColor: "73CF42",
          ratingSignals: 94,
        },
      }
    ]
  }

  componentDidMount() {
    M.AutoInit();
    //this.initMap();
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

  updateMarkerClick = (marker) => {
    this.setState((state) => ({
      markers: state.markers.map((m) => {
        if(m.venue.id === marker.venue.id) {
          m.venue.activeMarker = true;
          m.venue.showingInfoWindow = true;
          m.venue.colorMarker = "http://maps.google.com/mapfiles/ms/icons/blue-dot.png";
        } else{
          m.venue.activeMarker = false;
          m.venue.showingInfoWindow = false;
          m.venue.colorMarker = "http://maps.google.com/mapfiles/ms/icons/red-dot.png";
        }
        return m;
      })
    }))
  }

  render() {
    return (
      <div>
        <Header title="Mapa do Bairro" />
        <Sidebar markers={this.state.markers} onMarkerClick={this.updateMarkerClick} />
        <Map markers={this.state.markers} onRenderMarkerClick={this.updateMarkerClick} />
      </div>
    );
  }
}

export default App;
