import React from "react";
import { Container, Nav, Navbar, NavLink } from 'react-bootstrap';

const menu = {
  0: {
    link: '/family',
    title: 'Family Members',
  }
}

const Header = () => (
  <Navbar collapseOnSelect expand="lg" bg="light" variant="light">
    <Container className="container">
      <Navbar.Brand href="/">Kleinberg Family</Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="mr-auto">
        </Nav>
        <Nav>
          {Object.keys(menu).map(key => (
            <NavLink
              key={menu[key].link}
              href={menu[key].link}
            >
              {menu[key].title}
            </NavLink>
          ))} 
        </Nav>
      </Navbar.Collapse>
  </Container>
</Navbar>
)

export default Header