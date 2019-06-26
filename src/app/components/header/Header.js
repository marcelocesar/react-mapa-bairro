import React, { Component } from "react";
import {Row, Col} from "react-materialize";

class Header extends Component {

  render() {
    return (
      <header className="navbar-fixed">
        <nav>
          <div className="nav-wrapper">
            <Row>
              <Col s={12} m={12} i={12}>
                <a href="#!" className="brand-logo">
                  Logo
                                </a>
                <a href="#!" data-target="sidenav" className="sidenav-trigger">
                  <i className="material-icons">menu</i>
                </a>
              </Col>
            </Row>
          </div>
        </nav>
      </header>
    )
  }
}

export default Header;
