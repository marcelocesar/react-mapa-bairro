import React, { Component } from "react";
import { SideNav, SideNavItem, Navbar } from "react-materialize";

class Sidebar extends Component {

  render() {
    return (
      <SideNav id="sidenav" fixed="true" options={{ closeOnClick: true }}>
        <Navbar search="true" />
        <SideNavItem href="#!icon" icon="cloud">
          First Link With Icon
          </SideNavItem>
      </SideNav>
    )
  }
}

export default Sidebar;
