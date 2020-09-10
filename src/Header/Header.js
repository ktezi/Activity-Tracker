import React from 'react';
import { Navbar } from 'react-bootstrap'


function Header() {
  return (
    <Navbar bg="dark" variant="dark">
      <Navbar.Brand href="#home">
        Activity Tracker
        </Navbar.Brand>
    </Navbar>
  );
}

export default Header;