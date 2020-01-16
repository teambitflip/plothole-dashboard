import React, { Component, useState } from "react";
import logo from "./logo.png";
import "./App.css";
import Map from "./components/Map";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  Nav,
  NavItem,
  NavLink
} from "reactstrap";

const NavBar = props => {
  const [collapsed, setCollapsed] = useState(true);

  const toggleNavbar = () => setCollapsed(!collapsed);
  return (
    <div>
      <Navbar color="p-3 bg-dark text-white" dark>
        <img src={logo} className="img-responsive"></img>
        <NavLink className="mr-auto" href="#">
          <div>
            <h2 className="h2-style" style={{ color: "white" }}>
              PlotHole - Team BitFlip
            </h2>
          </div>
        </NavLink>

        <NavbarToggler onClick={toggleNavbar} className="mr-2" />
        <Collapse isOpen={!collapsed} navbar>
          <Nav navbar>
            <NavItem>
              <NavLink style={{ color: "white" }} href="#">
                Severity 1
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink style={{ color: "white" }} href="#">
                Severity 2
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink style={{ color: "white" }} href="#">
                Severity 3
              </NavLink>
            </NavItem>
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  );
};

export default class App extends React.Component {
  render() {
    return (
      <React.Fragment>
        <NavBar />
        <Map />
      </React.Fragment>
    );
  }
}
