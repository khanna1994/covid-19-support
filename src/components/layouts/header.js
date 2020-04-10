import React, { useState } from "react";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  Nav,
  NavItem,
  NavLink
} from "reactstrap";
import { useHistory } from "react-router-dom";

import Covid from "../../images/covid.jpg";

const Header = props => {
  let history = useHistory();

  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  let homeFont = "bold";
  let linksFont = "lighter";
  let indiaTrack = "lighter";
  let itemFont = 'lighter'
  if (props.isActive === "home") {
    homeFont = "bold";
    linksFont = "lighter";
    indiaTrack = "lighter";
  } else if (props.isActive === "india") {
    homeFont = "lighter";
    linksFont = "lighter";
    indiaTrack = "bold";
  } else if (props.isActive === "links") {
    homeFont = "lighter";
    linksFont = "bold";
    indiaTrack = "lighter";
  } else if (props.isActive === "items") {
    homeFont = "lighter";
    linksFont = "lighter";
    indiaTrack = "lighter";
    itemFont= "bold"
  }
  function handleClickHome() {
    history.push("/");
  }
  function handleClickIndia() {
    history.push("/India-covid19-tracker");
  }
  function handleClickLinks() {
    history.push("/helpful-links");
  }
  function handleClickItems() {
    history.push("/item-at-doorstep");
  }
  return (
    <div>
      <Navbar color="faded" light expand="md" style={{ marginBottom: "5%" }}>
        <img src={Covid} style={{ width: "8rem" }} alt="No Logo" />
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="mr-auto" navbar>
            <NavItem>
              <NavLink
                style={{ fontWeight: `${homeFont}` }}
                onClick={handleClickHome}
              >
                <p className="navbarFontStyle">Home</p>
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                style={{ fontWeight: `${indiaTrack}` }}
                onClick={handleClickIndia}
                className="navbarFontStyle"
              >
                Indian Covid-19 Tracker
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                style={{ fontWeight: `${linksFont}` }}
                onClick={handleClickLinks}
                className="navbarFontStyle"
              >
                Helpful Links
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                style={{ fontWeight: `${itemFont}` }}
                onClick={handleClickItems}
                className="navbarFontStyle"
              >
               Need Essential Items on Doorstep?
              </NavLink>
            </NavItem>
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  );
};

export default Header;
