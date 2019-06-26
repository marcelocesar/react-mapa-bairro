import React, { Component } from "react";
import { GoogleMap, Marker, withGoogleMap, withScriptjs } from "react-google-maps";
import { compose, withProps, withStateHandlers } from "recompose";
import { InfoBox } from "react-google-maps/lib/components/addons/InfoBox";
import { MarkerClusterer } from "react-google-maps/lib/components/addons/MarkerClusterer";

const MyMapComponent = compose(
  withProps({
    googleMapURL: "https://maps.googleapis.com/maps/api/js?key=AIzaSyDwdFNems2FWUbGrDUbQTKngsZ86m0yPh4&v=3.exp&libraries=geometry,drawing,places",
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `100vh` }} />,
    mapElement: <div style={{ height: `100%` }} />,
  }),
  withStateHandlers(() => ({
    isOpen: false,
  }), {
      onToggleOpen: ({ isOpen }) => () => ({
        isOpen: !isOpen,
      }),
      onMarkerClustererClick: () => (markerClusterer) => {
        const clickedMarkers = markerClusterer.getMarkers()
        console.log(`Current clicked markers length: ${clickedMarkers.length}`)
        console.log(clickedMarkers)
      },
    }),
  withScriptjs,
  withGoogleMap
)((props) =>
  <GoogleMap
  defaultZoom={3}
  defaultCenter={{ lat: 25.0391667, lng: 121.525 }}>
      {/* <Marker
        position={{ lat: -15.8330627, lng: -48.0300472 }}
        onClick={props.onToggleOpen}>
        {props.isOpen && <InfoBox
          onCloseClick={props.onToggleOpen}
          options={{ closeBoxURL: ``, enableEventPropagation: true }}>
          <div style={{ backgroundColor: `yellow`, opacity: 0.75, padding: `12px` }}>
            <div style={{ fontSize: `16px`, fontColor: `#08233B` }}>
              Hello, Kaohsiung!
            </div>
          </div>
        </InfoBox>}
      </Marker> */}
    <MarkerClusterer
      onClick={props.onMarkerClustererClick}
      averageCenter
      enableRetinaIcons
      gridSize={60}>
      {props.markers && props.markers.map(marker => (
        <Marker
        position={{ lat: marker.latitude, lng: marker.longitude }}
        onClick={props.onToggleOpen}
        key={marker.photo_id}>
        {props.isOpen && <InfoBox
          onCloseClick={props.onToggleOpen}
          options={{ closeBoxURL: ``, enableEventPropagation: false }}>
          <div style={{ backgroundColor: `yellow`, opacity: 0.75, padding: `12px` }}>
            <div style={{ fontSize: `16px`, fontColor: `#08233B` }}>
             {marker.photo_title}
            </div>
          </div>
        </InfoBox>}
      </Marker>
      ))}
    </MarkerClusterer>
  </GoogleMap>
)

class Map extends Component {

  state = {
    isMarkerShown: false,
    markers: []
  }

  componentWillMount() {
    this.setState({ markers: [] })
  }

  componentDidMount() {
    this.delayedShowMarker()

    const url = [
      // Length issue
      `https://gist.githubusercontent.com`,
      `/farrrr/dfda7dd7fccfec5474d3`,
      `/raw/758852bbc1979f6c4522ab4e92d1c92cba8fb0dc/data.json`
    ].join("")

    fetch(url)
      .then(res => res.json())
      .then(data => {
        console.log(data.photos);
        this.setState({ markers: data.photos });
      });
  }

  delayedShowMarker = () => {
    setTimeout(() => {
      this.setState({ isMarkerShown: true })
    }, 3000)
  }

  handleMarkerClick = () => {
    this.setState({ isMarkerShown: false })
    this.delayedShowMarker()
  }

  render() {
    return (
      <main>
        <MyMapComponent
          isMarkerShown={this.state.isMarkerShown}
          onMarkerClick={this.handleMarkerClick}
          markers={this.state.markers}
        />
      </main>
    )
  }
}

export default Map;


