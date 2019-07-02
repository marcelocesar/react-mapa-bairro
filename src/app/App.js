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
    await FoursquareAPI.getAll()
      .then(data => {
        this.handleError(data);
        this.setState({
          markers: data.response.groups[0].items
        })
      })
      .catch(error => M.toast({html: error.message, classes: 'red darken-1'}))
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

  handleError(response) {

    if (response.meta.code !== 200) {
      switch(response.meta.errorType) {
        case 'invalid_auth':
          throw new Error ('OAuth token was not provided or was invalid.');
        case 'param_error':
          throw new Error ('A required parameter was missing or a parameter was malformed. This is also used if the resource ID in the path is incorrect.');
        case 'endpoint_error':
          throw new Error ('The requested path does not exist.');
        case 'not_authorized':
          throw new Error ('Although authentication succeeded, the acting user is not allowed to see this information due to privacy restrictions.');
        case 'rate_limit_exceeded':
          throw new Error ('Rate limit for this hour exceeded.');
        case 'quota_exceeded':
          throw new Error ('Daily call quota exceeded.');
        case 'deprecated':
          throw new Error ('Something about this request is using deprecated functionality, or the response format may be about to change.');
        default:
          throw new Error ('Server is currently experiencing issues.');
      }
    }
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
