import React, { useState } from "react";
import logo from "./logo.png";
import "./App.css";
import Map from "./components/Map";
import { Collapse, Navbar, NavbarToggler, Nav, NavItem } from "reactstrap";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Severity0Map from "./components/Severity0Map";
import Severity1Map from "./components/Severity1Map";
import Severity2Map from "./components/Severity2Map";
import Severity3Map from "./components/Severity3Map";
const openMap = () => {
  return <Map />;
};
const openSeverity0Map = () => {
  return <Severity0Map />;
};
const openSeverity1Map = () => {
  return <Severity1Map />;
};
const openSeverity2Map = () => {
  return <Severity2Map />;
};
const openSeverity3Map = () => {
  return <Severity3Map />;
};
const NavBar = () => {
  const [collapsed, setCollapsed] = useState(true);
  const toggleNavbar = () => setCollapsed(!collapsed);
  return (
    <Router>
      <div>
        <Navbar color="p-3 bg-dark text-white" dark>
          <img alt="logo" src={logo} className="img-responsive"></img>

          <Link className="mr-auto" to={{ pathname: "/" }}>
            <div>
              <h2 className="h2-style" style={{ color: "white" }}>
                PlotHole - Team BitFlip
              </h2>
            </div>
          </Link>

          <NavbarToggler onClick={toggleNavbar} className="mr-2" />
          <Collapse isOpen={!collapsed} navbar>
            <Nav navbar>
              <NavItem>
                <Link
                  style={{ color: "white" }}
                  to={{
                    pathname: "/severity0map"
                  }}
                >
                  Severity 0
                </Link>
              </NavItem>
              <NavItem style={{ paddingTop: "0.5rem" }}>
                <Link
                  style={{ color: "white" }}
                  to={{
                    pathname: "/severity1map"
                  }}
                >
                  Severity 1
                </Link>
              </NavItem>
              <NavItem style={{ paddingTop: "0.5rem" }}>
                <Link
                  style={{ color: "white" }}
                  to={{
                    pathname: "/severity2map"
                  }}
                >
                  Severity 2
                </Link>
              </NavItem>
              <NavItem style={{ paddingTop: "0.5rem" }}>
                <Link
                  style={{ color: "white" }}
                  to={{
                    pathname: "/severity3map"
                  }}
                >
                  Severity 3
                </Link>
              </NavItem>
            </Nav>
          </Collapse>
        </Navbar>
        <Route path="/" exact component={openMap}></Route>
        <Route path="/severity0map/" component={openSeverity0Map}></Route>
        <Route path="/severity1map/" component={openSeverity1Map}></Route>
        <Route path="/severity2map/" component={openSeverity2Map}></Route>
        <Route path="/severity3map/" component={openSeverity3Map}></Route>
      </div>
    </Router>
  );
};

export default class App extends React.Component {
  render() {
    return (
      <React.Fragment>
        <NavBar />
      </React.Fragment>
    );
  }
}
