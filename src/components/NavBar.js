import React, { useState } from "react";
import logo from "../logo.png";
import "./navbar.css";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink
} from "reactstrap";

const NavBar = props => {
  const [collapsed, setCollapsed] = useState(true);

  const toggleNavbar = () => setCollapsed(!collapsed);

  return (
    <div>
      <Navbar color="bg-dark" light>
        <img src={logo} className="img-responsive"></img>
        <NavbarBrand href="/" className="mr-auto">
          <h2 className="h2-style">PlotHole - Team BitFlip</h2>
        </NavbarBrand>

        <NavbarToggler onClick={toggleNavbar} className="mr-2" />
        <Collapse isOpen={!collapsed} navbar>
          <Nav navbar>
            <NavItem>
              <NavLink href="#">Severity 1</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="#">Severity 2</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="#">Severity 3</NavLink>
            </NavItem>
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  );
};

export default NavBar;
