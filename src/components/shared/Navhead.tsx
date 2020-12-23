import React from 'react';
import { Navbar, Nav } from "reactstrap";
import { Link } from "react-router-dom";
import '../../App.css';

const Navhead = () => 
{
    return (
      <Navbar className="navBar fixed-top">
      <Nav>
        <div style={{alignItems: 'center', justifyContent: 'center'}}>
          <Link to="/" className="boomNoteLogo">
            <img src={'../../logo-boomtown-white.png'} alt="React Logo" />
          </Link>
          <Link to="/" className="boomNoteLogo" id="boomNavTitle">
            Notes
          </Link>
        </div>
      </Nav>
    </Navbar>)
    
}

export default Navhead