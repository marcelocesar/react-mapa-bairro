import React, {Componen, PureComponent} from "react";
import {
  GoogleMap,
  Marker,
  withGoogleMap,
  withScriptjs
} from "react-google-maps";
import {compose, withProps, withStateHandlers} from "recompose";
import {InfoBox} from "react-google-maps/lib/components/addons/InfoBox";

const KEY = "AIzaSyDwdFNems2FWUbGrDUbQTKngsZ86m0yPh4";
const CENTER = {lat: -15.860049, lng: -47.998109};
const ZOOM = 16;

const MyMapComponent = compose(
  withProps({
    googleMapURL: `https://maps.googleapis.com/maps/api/js?key=${KEY}&v=3.exp&libraries=geometry,drawing,places`,
    loadingElement: <div style={{height: `100%`}} />,
    containerElement: <div style={{height: `100vh`}} />,
    mapElement: <div style={{height: `100%`}} />
  }),
  withStateHandlers(() => ({isOpen: false}), {
    onToggleOpen: ({isOpen}) => () => ({
      isOpen: !isOpen
    })
  }),
  withScriptjs,
  withGoogleMap
)(props => (
  <GoogleMap defaultZoom={ZOOM} defaultCenter={CENTER}>
    {console.log(props.markers)}
    {props.markers &&
      props.markers.map(marker => (
        <Marker
          position={{lat: -15.8330627, lng: -48.0300472}}
          onClick={props.onToggleOpen}
        >
          {props.isOpen && (
            <InfoBox
              onCloseClick={props.onToggleOpen}
              options={{closeBoxURL: ``, enableEventPropagation: true}}
            >
              <div
                style={{
                  backgroundColor: `yellow`,
                  opacity: 0.75,
                  padding: `12px`
                }}
              >
                <div style={{fontSize: `16px`, fontColor: `#08233B`}}>
                  Hello, Kaohsiung!
                </div>
              </div>
            </InfoBox>
          )}
        </Marker>
      ))}
  </GoogleMap>
));

class Map extends PureComponent {
  state = {
    isMarkerShown: true,
    venues: []
  };

  componentDidMount() {
    console.log(this.props.markers);
    this.setState({
      venues: this.props.markers
    });
  }

  render() {
    return (
      <main>
        <MyMapComponent
          isMarkerShown={this.state.isMarkerShown}
          markers={this.state.venues}
        />
      </main>
    );
  }
}

export default Map;
