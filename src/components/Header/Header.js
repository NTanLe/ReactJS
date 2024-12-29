import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { logout } from '../../services/apiService';
import { toast } from 'react-toastify';
import { doLogout, LOGOUT } from '../../redux/action/userAction';
import Language from './Language';
const Header = () => {
  const navigate = useNavigate();
  const handleLogin = () => {
    navigate('/login');
  }
  const account = useSelector(state => state.user.account);
  const isAuthenticated = useSelector(state => state.user.isAuthenticated);
  const dispatch = useDispatch()
  const handleLogout = async () => {
    let res = await logout("account.email", account.refresh_token)
    if (res && res.EC === 0) {
      dispatch(doLogout());
      navigate('/login');
    } else {
      toast.error(res.EM)
    }
  }
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
            <Language></Language>
            {isAuthenticated === false ?
              <> <button className="btn-login" onClick={() => handleLogin()}>Log in</button>
                <button className="btn-signup" onClick={() => navigate('/register')}>Sign up</button>
              </>
              : <>
                <NavDropdown title="Settings" id="basic-nav-dropdown">

                  <NavDropdown.Item >Profile</NavDropdown.Item>
                  <NavDropdown.Item onClick={() => handleLogout()}>Logout</NavDropdown.Item>
                </NavDropdown>
              </>}

          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;