import React from "react";
import {Navbar} from 'react-bootstrap';
import {Link} from "gatsby";

const menu = {
  0: {
    link: '/',
    title: 'Home'
  },
  1: {
    link: '/space',
    title: 'Space',
  },
  2: {
    link: '/climbing',
    title: 'Climbing'
  },
  3: {
    link: '/music',
    title: 'Music'
  }
}

const Header = () => (
  <Navbar>
    <div className="container">
      <ul className="d-flex list-unstyled">
        {Object.keys(menu).map(function(key) {
          return <li className="pl-3 pr-5" key={menu[key].link}>
          <Link
            to={menu[key].link}
            >
            {menu[key].title}
          </Link>
        </li>
        })}           
      </ul>
    </div>
  </Navbar>
)

export default Header