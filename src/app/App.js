import React, { Component } from "react";
import escapeRegExp from 'escape-string-regexp';
import sortBy from 'sort-by';
import { Preloader } from 'react-materialize';
import "materialize-css/dist/css/materialize.min.css";
import "./app.scss";

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
    markers: [],
    showingMarkers: [],
    query: '',
    isLoading: true
  }

  componentDidMount() {
    M.AutoInit();
    this.initMap();
  }

  updateQuery = (query) => {
    this.setState({ query: query });
    let showingMarkers

    if (query) {
      const match = new RegExp(escapeRegExp(query), 'i');
      showingMarkers = this.state.markers.filter((marker) => match.test(marker.venue.name))
      showingMarkers.sort(sortBy('name'));
    } else {
      showingMarkers = this.state.markers
    }
    this.setState({ showingMarkers: showingMarkers })
  }

  clearQuery = () => {
    this.setState({
      query: '',
      showingMarkers: this.state.markers });
  }

  async initMap() {
    await FoursquareAPI.getAll()
      .then(data => {
        this.handleError(data);
        this.setState({
          markers: data.response.groups[0].items,
          showingMarkers: data.response.groups[0].items
        })
        this.unSetLoading();
      })
      .catch(error => M.toast({ html: error.message, classes: 'red darken-1' }))
  }

  updateMarkerClick = (key) => {
    this.setState((state) => ({
      showingMarkers: state.showingMarkers.map((m) => {
        if (m.venue.id === key) {
          m.show = !m.show;
        } else {
          m.show = false;
        }
        return m;
      })
    }))
  }

  setLoading() {
    this.setState({ isLoading: true })
  }

  unSetLoading() {
    this.setState({ isLoading: false })
  }

  handleError(response) {

    if (response.meta.code !== 200) {
      switch (response.meta.errorType) {
        case 'invalid_auth':
          throw new Error('OAuth token was not provided or was invalid.');
        case 'param_error':
          throw new Error('A required parameter was missing or a parameter was malformed. This is also used if the resource ID in the path is incorrect.');
        case 'endpoint_error':
          throw new Error('The requested path does not exist.');
        case 'not_authorized':
          throw new Error('Although authentication succeeded, the acting user is not allowed to see this information due to privacy restrictions.');
        case 'rate_limit_exceeded':
          throw new Error('Rate limit for this hour exceeded.');
        case 'quota_exceeded':
          throw new Error('Daily call quota exceeded.');
        case 'deprecated':
          throw new Error('Something about this request is using deprecated functionality, or the response format may be about to change.');
        default:
          throw new Error('Server is currently experiencing issues.');
      }
    }
  }

  render() {

    const { showingMarkers, query, isLoading } = this.state;

    return (
      <div>
        {isLoading ? (
          <Preloader flashing className="preloading" />
        ) : (
            <div>
              <Header title="Mapa do Bairro" />
              <Sidebar
                markers={showingMarkers}
                onMarkerClick={this.updateMarkerClick}
                onUpdateQuery={this.updateQuery}
                onClearQuery={this.clearQuery}
                onQuery={query} />
              <MapView
                places={showingMarkers}
                onMarkerClick={this.updateMarkerClick} />
            </div>
          )}
      </div>
    );
  }
}

export default App;
