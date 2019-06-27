import React, { PureComponent } from "react";
import {
  GoogleMap,
  Marker,
  withGoogleMap,
  withScriptjs
} from "react-google-maps";
import {compose, withProps, withStateHandlers} from "recompose";
import { InfoBox } from "react-google-maps/lib/components/addons/InfoBox";

const KEY = "AIzaSyDwdFNems2FWUbGrDUbQTKngsZ86m0yPh4";
const CENTER = { lat: -15.8353128, lng: -48.0284164 }; //,
const ZOOM = 15;

const MyMapComponent = compose (
  withProps({
    googleMapURL: `https://maps.googleapis.com/maps/api/js?key=${KEY}&v=3.exp`,
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `94vh` }} />,
    mapElement: <div style={{ height: `100%` }} />
  }),
  withStateHandlers(() => ({
    isOpen: false,
  }), {
    onToggleOpen: ({ isOpen }) => () => ({
      isOpen: !isOpen,
    })
  }),
  withScriptjs,
  withGoogleMap
)(props =>
  <GoogleMap defaultZoom={ZOOM} defaultCenter={CENTER}>
    {props.markers.map(marker => (
        <Marker
          key={marker.venue.id}
          position={{ lat: marker.venue.location.lat, lng: marker.venue.location.lng }}
          onClick={props.onToggleOpen}
          icon={marker.venue.colorMarker}
        >
          {marker.venue.showingInfoWindow && (
            <InfoBox
            onCloseClick={props.onToggleOpen}
            options={{ closeBoxURL: `https://findicons.com/files/icons/1008/quiet/16/no.png`, enableEventPropagation: true }}
          >
            <div
              style={{
                backgroundColor: `white`,
                opacity: 1,
                padding: `12px`
              }}
            >
              <div style={{ fontSize: `16px`, fontColor: `#08233B` }}>
                {marker.venue.name}
              </div>
            </div>
          </InfoBox>
          )}

        </Marker>
      ))}
  </GoogleMap>
);

class Map extends PureComponent {
  state = {
    markers: this.props.markers
  };

  render() {
    return (
      <main>
        <MyMapComponent
          markers={this.props.markers}
        />
      </main>
    );
  }
}

export default Map;
