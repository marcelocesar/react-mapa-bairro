import React, { Component } from 'react';
import "./InfoWindow.css";

class InfoWindow extends Component {

  state = {
    place: {}
  }

  render() {
    const { place } = this.props;

    return (
      <div className="infobox">
        <div style={{ fontSize: 16 }}>
          {place.name}
        </div>
      </div>
    );
  }
}

export default InfoWindow;
