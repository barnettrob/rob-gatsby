import React from "react";
import { Nav, Navbar, NavLink } from 'react-bootstrap';

const menu = {
  0: {
    link: '/',
    title: 'Home'
  },
  1: {
    link: '/climbing',
    title: 'Climbing',
  },
  2: {
    link: '/music',
    title: 'Music'
  },
  3: {
    link: '/space',
    title: 'Space'
  }
}

const Header = () => (
  <Navbar expand="lg" bg="light" variant="light">
    <Navbar.Brand href="#home">Rob's Space</Navbar.Brand>
    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
    <Navbar.Collapse id="responsive-navbar-nav">
      <Nav className="mr-auto container">
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
  </Navbar>
)

export default Header