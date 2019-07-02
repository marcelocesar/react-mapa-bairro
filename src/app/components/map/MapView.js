import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import Marker from "./../marker/Marker";
import "./MapView.css"

class MapView extends Component {

  static defaultProps = {
    key: "AIzaSyDwdFNems2FWUbGrDUbQTKngsZ86m0yPh4",
    center: { lat: -15.8353128, lng: -48.0284164 },
    zoom: 16
  };

  state = {
    places: [],
  };

  componentDidMount() {
    this.setState({ places: this.props.places })
  }

  componentWillReceiveProps() {
    this.setState({ places: this.props.places })
  }

  onChildClickCallback = (key) => {
    this.setState((state) => ({
      places: state.places.map((m) => {
        if (m.venue.id === key) {
          m.show = !m.show;
        } else {
          m.show = false;
        }
        return m;
      })
    }))
  }

  render() {
    const { places } = this.state;

    return (
      <main>
        <div className="map">
          <GoogleMapReact
            bootstrapURLKeys={{ key: this.props.key }}
            defaultCenter={this.props.center}
            defaultZoom={this.props.zoom}
            onChildClick={this.onChildClickCallback}
          >
            {places.map(place =>
              (<Marker
                key={place.venue.id}
                lat={place.venue.location.lat}
                lng={place.venue.location.lng}
                show={place.show}
                place={place}
                arial-expanded={place.show}
              />))}
          </GoogleMapReact>
        </div>
      </main>
    );
  }
}

export default MapView;
