import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import Marker from "./../marker/Marker";

class MapView extends Component {

  static defaultProps = {
    key: "AIzaSyDwdFNems2FWUbGrDUbQTKngsZ86m0yPh4",
    center: { lat: -15.8353128, lng: -48.0284164 },
    zoom: 15
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
    this.setState((state) => {
      const index = state.places.findIndex(e => e.id === key);
      state.places[index].show = !state.places[index].show;
      return { places: state.places };
    });
  };

  render() {
    const { places } = this.state;
    return (
      <div style={{ height: '100vh', width: '100%' }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: "AIzaSyDwdFNems2FWUbGrDUbQTKngsZ86m0yPh4" }}
          defaultCenter={this.props.center}
          defaultZoom={this.props.zoom}
          onChildClick={this.onChildClickCallback}
        >
          {console.log('places :', places)}
          {places.map(place =>
            (<Marker

            />))}
        </GoogleMapReact>
      </div>
    );
  }
}

export default MapView;
