import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { NavLink } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import { useSelector } from 'react-redux';

const NavBar = () => {
  const user = useSelector((state) => state.user);
  return (
    <Navbar
      bg='primary'
      variant='dark'
      expand='lg'
      className='mt-4 mb-4 rounded'
    >
      <Container>
        <Navbar.Brand href='/'>NoticeBoard.app</Navbar.Brand>
        <Navbar.Toggle aria-controls='basic-navbar-nav' />
        <Navbar.Collapse id='basic-navbar-nav'>
          <Nav className='ms-auto'>
            <Nav.Link as={NavLink} to='/'>
              Home
            </Nav.Link>
            {!user && (
              <Nav.Link as={NavLink} to='/register'>
                Register
              </Nav.Link>
            )}
            {!user && (
              <Nav.Link as={NavLink} to='/login'>
                Login
              </Nav.Link>
            )}
            {user && (
              <Nav.Link as={NavLink} to='/logout'>
                Logout
              </Nav.Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
