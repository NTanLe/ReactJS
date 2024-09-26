import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import NavDropdown from 'react-bootstrap/NavDropdown';
const Header = () => {
  const navigate = useNavigate();
  const handleLogin = () => {
    navigate('/login');
  }
  const account = useSelector(state => state.user.account);
  const isAuthenticated = useSelector(state => state.user.isAuthenticated);
  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand as={Link} to="/">React-JS</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <NavLink as={Link} to="/" className='nav-link'>Home</NavLink>
            <NavLink as={Link} to="user" className='nav-link'>User</NavLink>
            <NavLink as={Link} to="admin" className='nav-link'>Admin</NavLink>
          </Nav>
          <Nav>
            {isAuthenticated === false ?
              <> <button className="btn-login" onClick={() => handleLogin()}>Log in</button>
                <button className="btn-signup" onClick={() => navigate('/register')}>Sign up</button>
              </>
              : <> <NavDropdown title="Settings" id="basic-nav-dropdown">
                <NavDropdown.Item onClick={() => handleLogin()}>Logout</NavDropdown.Item>
                <NavDropdown.Item >Profile</NavDropdown.Item>
              </NavDropdown></>}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;