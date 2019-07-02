import React, { Component } from 'react';
import "./InfoWindow.css";

class InfoWindow extends Component {

  state = {
    place: {}
  }

  render() {
    console.log(this.props);
    const { place } = this.props;

    return (
      <div
        className="infobox"
        role="dialog"
        aria-labelledby={place.venue.name}
        aria-modal={place.show}>
        <div style={{ fontSize: 16 }}>
          {place.venue.name}
        </div>
      </div>
    );
  }
}

export default InfoWindow;
