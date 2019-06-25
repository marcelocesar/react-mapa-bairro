import React, {Component} from "react";
import {Navbar, NavItem, SideNav, SideNavItem, Button, Row, Col} from "react-materialize";

import "materialize-css/dist/css/materialize.min.css";
import "./app.css";

// Import Materialize
import M from "materialize-css";

class App extends Component {
  componentDidMount() {
    M.AutoInit();
  }

  render() {
    return (
      <div>
      <SideNav id="sidebar" fixed="true" options={{closeOnClick: true}}>
        <Navbar search="true" />
        <SideNavItem href="#!icon" icon="cloud">
          First Link With Icon
        </SideNavItem>
      </SideNav>
      <Row>
        <Col s={12} m={4} i={3} className="orange white-text p-0">
          
        </Col>
        <Col s={12} m={8} i={9} className="teal white-text p-0">
          <nav>
            <div className="nav-wrapper">
              <a href="#!" className="brand-logo">
                Logo
              </a>
              <a href="#!" data-target="sidebar" className="sidenav-trigger">
                <i className="material-icons">menu</i>
              </a>
            </div>
          </nav>
        </Col>
      </Row>
    </div>
    );
  }
}

export default App;
