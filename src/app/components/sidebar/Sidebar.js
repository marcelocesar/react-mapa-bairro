import React, { Component } from "react";
import { SideNav, SideNavItem } from "react-materialize";
import PropTypes from 'prop-types';
import escapeRegExp from 'escape-string-regexp';
import sortBy from 'sort-by';

class Sidebar extends Component {

  state = {
    query: ''
  }

  static propTypes = {
    markers: PropTypes.array.isRequired,
    onMarkerClick: PropTypes.func.isRequired
  }

  updateQuery = (query) => {
    this.setState({ query: query.trim() });
  }

  clearQuery = () => {
    this.setState({ query: '' });
  }

  render() {
    const { markers, onMarkerClick } = this.props;
    const { query } = this.state;

    let showingMarkers;

    if (query) {
        const match = new RegExp(escapeRegExp(query), 'i');
        showingMarkers = markers.filter((marker) => match.test(marker.name))
    } else {
      showingMarkers = markers
    }
    showingMarkers.sort(sortBy('name'));

    return (
      <SideNav id="sidenav" fixed options={{ closeOnClick: true }}>
        <nav>
          <div className="nav-wrapper">
            <div className="input-field">
              <input
                id="search"
                type="search"
                value={query}
                onChange={(event) => this.updateQuery(event.target.value)}/>
              <label className="label-icon" htmlFor="search">
                <i className="material-icons">search</i>
              </label>
              <i className="material-icons" onClick={this.clearQueryƒ}>close</i>
            </div>
          </div>
        </nav>
        {showingMarkers && showingMarkers.map((marker) => (
          <SideNavItem key={marker.id} onClick={() => onMarkerClick(marker)}>
            {marker.name}
          </SideNavItem>
        ))}

      </SideNav>
    )
  }
}

export default Sidebar;
