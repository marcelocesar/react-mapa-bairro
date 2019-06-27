import React, {Component} from "react";
import {Map, InfoWindow, Marker, GoogleApiWrapper} from "google-maps-react";
import Sidebar from "./../sidebar/Sidebar"

class MapContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showingInfoWindow: false, //Hides or the shows the infoWindow
      activeMarker: {}, //Shows the active marker upon click
      selectedPlace: {} //Shows the infoWindow to the selected place upon a marker
    };

    this.updateMarkers = this.updateMarkers.bind(this);
  }

  static defaultProps = {
    key: "AIzaSyDwdFNems2FWUbGrDUbQTKngsZ86m0yPh4",
    center: {lat: -15.8353128, lng: -48.0284164},
    zoom: 15
  };

  handleMarkerClick = (props, marker, e) => {
    console.log("props :", props);
    console.log("marker", marker);
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true
    });
  };

  componentWillReceiveProps(props) {
    console.log("props :", props);
    //this.updateMarkers(props.stateParent);
  }

  updateMarkers(marker) {
    this.setState({
      selectedPlace: marker.venue,
      activeMarker: marker.venue,
      showingInfoWindow: true
    });
  }

  onClose = props => {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null
      });
    }
  };

  onMapClicked = (props) => {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null
      })
    }
  };

  render() {
    const style = {
      overflow: "hidden"
    };

    return (
      <div>
        <Sidebar
          markers={this.props.markers}
          onMarkerClick={this.updateMarkers}
        />
        <main>
          <Map
            google={this.props.google}
            zoom={this.props.zoom}
            style={style}
            initialCenter={this.props.center}
          >
            {this.props.markers.map(marker => (
              <Marker
                key={marker.venue.id}
                id={marker.venue.id}
                onClick={this.handleMarkerClick}
                name={marker.venue.name}
                position={marker.venue.location}
              />
            ))}
            <InfoWindow
              marker={this.state.activeMarker}
              visible={this.state.showingInfoWindow}
              onClose={this.onClose}
            >
              <div>
                <h4>{this.state.selectedPlace.name}</h4>
              </div>
            </InfoWindow>
          </Map>
        </main>
      </div>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: "AIzaSyDwdFNems2FWUbGrDUbQTKngsZ86m0yPh4"
})(MapContainer);
