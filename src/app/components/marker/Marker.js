import React, { Fragment } from 'react';
import InfoWindow from "./../infowindow/InfoWindow";

const Marker = (props) => {
  const markerStyle = {
    border: '1px solid white',
    borderRadius: '50%',
    height: 25,
    width: 25,
    backgroundColor: props.show ? 'red' : 'blue',
    cursor: 'pointer',
    zIndex: 10,
  };

  return (
    <Fragment>
      <div style={markerStyle} />
      {props.show && <InfoWindow place={props.place} />}
    </Fragment>
  );
};

export default Marker;
