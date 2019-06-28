import React from 'react';

const InfoWindow = (props) => {

  const { place } = props;

  const infoWindowStyle = {
    position: 'relative',
    bottom: 0,
    left: 0,
    width: 220,
    backgroundColor: 'white',
    boxShadow: '0 2px 7px 1px rgba(0, 0, 0, 0.3)',
    padding: 10,
    fontSize: 14,
    zIndex: 100,
  };

  return (
    <div style={infoWindowStyle}>
      <div style={{ fontSize: 16 }}>
        {place.name}
      </div>
      <div style={{ fontSize: 14 }}>
        <span style={{ color: 'grey' }}>
          {place.name}{' '}
        </span>
        <span style={{ color: 'orange' }}>

        </span>
        <span style={{ color: 'lightgrey' }}>

        </span>
      </div>
      <div style={{ fontSize: 14, color: 'grey' }}>

      </div>
      <div style={{ fontSize: 14, color: 'grey' }}>

      </div>
      <div style={{ fontSize: 14, color: 'green' }}>

      </div>
    </div>
  );
};

export default InfoWindow;
