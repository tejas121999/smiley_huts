import './unregisteredHeader.css';
import { Link } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
// import Nav from 'react-bootstrap/Nav';
// import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

const UnregistererHeader = () => {
  return (

    // <div className="unregistered-main">
    //   <div>
    //     <a className="nav-link" href="/">
    //       <img
    //         src="./images/logo.png"
    //         style={{ width: '250px' }}
    //         className=""
    //       />
    //     </a>
    //   </div>
    //   <div className="nav-items">
    //     <ul>
    //       <a href="/subscribe">
    //         <li>Subscription Plans</li>
    //       </a>
    //       <a href="/login">
    //         <li>Login</li>
    //       </a>
    //     </ul>
    //   </div>
    // </div>

    <>
      <Navbar bg="light" expand="lg">
        <Container>
          <Navbar.Brand href="/">
            <img
              src="./images/logo.png"
              style={{ width: '250px' }}
              className=""
            />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="justify-content-end" style={{ width: '100%' }}>
              {/*<Nav.Link href="/subscribe" style={{ color: 'black' }}>
                Subscription Plans
              </Nav.Link>*/}
              <Nav.Link style={{ color: 'black' }} href="/login">
                Login
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>

  );
};

export default UnregistererHeader;
