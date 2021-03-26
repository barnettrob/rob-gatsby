import React from "react";
import { Router } from "@reach/router";
import { Link } from "gatsby";
import { Container, Nav, Navbar, NavLink } from 'react-bootstrap';
import { isAuthenticated } from "../utils/auth";

const FamilyMember = () => <div></div>
const FamilyTree = () => <div></div>
const Logout = () => <div>Logout</div>

const Header = () => {
  if (!isAuthenticated()) {
    return (
      <Navbar collapseOnSelect expand="lg" bg="light" variant="light">
        <Container className="container">
          <Navbar.Brand href="/">Kleinberg Family</Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="mr-auto">
            </Nav>
            <Nav>
                <NavLink
                  href="/login"
                >
                  Login
                </NavLink>
            </Nav>
          </Navbar.Collapse>
      </Container>
    </Navbar>
    )
  }

  return (
    <Navbar collapseOnSelect expand="lg" bg="light" variant="light">
      <Container className="container">
        <Navbar.Brand href="/">Kleinberg Family</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mr-auto">
          </Nav>
          <Nav>
        <Link to="/family/members/" className="mx-2 text-secondary">Family Members</Link>{" "}
        <Link to="/family/tree" className="mx-5 text-secondary">Family Tree</Link>{" "}
        <Link to="/logout" className="mx-2 text-secondary">Logout</Link>{" "}
      </Nav>
      <Router>
        <FamilyMember path="/family/members" />
        <FamilyTree path="/family/tree" />
        <Logout path="/logout" />
      </Router>
        </Navbar.Collapse>
    </Container>
  </Navbar>
  )
}

export default Header