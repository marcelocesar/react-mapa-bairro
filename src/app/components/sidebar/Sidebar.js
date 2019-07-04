import React, { Component } from "react";
import { SideNav, SideNavItem } from "react-materialize";
import PropTypes from 'prop-types';
import {DebounceInput} from 'react-debounce-input';

class Sidebar extends Component {

  static propTypes = {
    markers: PropTypes.array.isRequired,
    onMarkerClick: PropTypes.func.isRequired,
    onUpdateQuery: PropTypes.func.isRequired,
    onClearQuery: PropTypes.func.isRequired,
    onQuery: PropTypes.string.isRequired
  }

  render() {
    const { markers, onMarkerClick, onQuery, onUpdateQuery, onClearQuery } = this.props;

    return (
      <SideNav id="sidenav" fixed options={{ closeOnClick: true }} role="navigation">
        <nav>
          <div className="nav-wrapper">
            <div className="input-field" role="search">
            <DebounceInput
              id="search"
              type="search"
              minLength={0}
              debounceTimeout={300}
              value={onQuery}
              onChange={(event) => onUpdateQuery(event.target.value)} />
              <label className="label-icon" htmlFor="search">
                <i className="material-icons">search</i>
              </label>
              <i className="material-icons" onClick={() => onClearQuery()}>close</i>
            </div>
          </div>
        </nav>
        {markers && markers.map((marker) => (
          <SideNavItem key={marker.venue.id} onClick={() => onMarkerClick(marker.venue.id)}>
            {marker.venue.name}
          </SideNavItem>
        ))}

      </SideNav>
    )
  }
}

export default Sidebar;
