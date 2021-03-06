import React from "react";
import {Navbar} from 'react-bootstrap';
import {Link} from "gatsby";

const Header = () => (
  <Navbar>
    <div className="container">
      <ul className="d-flex list-unstyled">
        <li className="pl-3 pr-5">
          <Link
            to="/"
            >
            Home
          </Link>
        </li>
        <li className="px-5">
          <Link
            to="/space"
            >
            Space
          </Link>
        </li>
      </ul>
    </div>
  </Navbar>
)

export default Header