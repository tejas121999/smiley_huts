import { Avatar } from '@mui/material';
import React, { useEffect, useState } from 'react';
import '../layout/css/homePage.css';
import dummy_Img from '../layout/images/dummy_img.png';
import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import axios from 'axios';
import { Height } from '@material-ui/icons';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

const Header = () => {
  const { logout } = useAuth();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [unReadCount, setUnReadCount] = useState(0);
  const [personal, setPersonal] = useState();
  const token = localStorage.getItem('access-token');

  useEffect(() => {
    const getUserDetails = async () => {
      const id = {
        userId: localStorage.getItem('user-id'),
      };
      const res = await axios.post(
        process.env.REACT_APP_DEV_URL + '/api/auth/getUserProfile',
        id,
        {
          headers: {
            'x-auth-token': token,
          },
        }
      );
      // console.log(res.data);
      setPersonal(res.data.userProfile)
    };
    getUserDetails();
  }, []);


  const handleLogout = () => {
    localStorage.clear();
    logout();
  };

  useEffect(() => {
    axios
      .get(
        process.env.REACT_APP_DEV_URL +
        '/api/notification/getUnreadNotificationCount/' +
        localStorage.getItem('user-id'),
        {
          headers: {
            'x-auth-token': `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MjgsImlhdCI6MTY1NDA4MjQ1NH0.zp-ijrmfwk7Eaej8STURxXBFR6c_Wm1KIpUeLK37VTE`,
          },
        }
      )
      .then(res => {
        setUnReadCount(res.data.userReview.length);
      })
      .catch(error => {
        console.log(error);
      });
    setFirstName(JSON.parse(localStorage.getItem('user_data'))?.first_name);
    setLastName(JSON.parse(localStorage.getItem('user_data'))?.last_name);
  }, []);

  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand href="/homePage">
          {/* <a
      className="nav-link d-flex align-center"
      style={{ width: '300px', height: '65px' }}
      href="/homepage"
    > */}
          <img
            style={{ height: '40px', width: '250px' }}
            src="./images/logo.png"
            className="header-logo-img"
          />
          {/* </a> */}
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav
            className="justify-content-end align-items-center"
            style={{ width: '100%' }}
          >
            <Nav.Link href="/Guest_Request_Reservation">
              Guest Request & Reservation
            </Nav.Link>
            <Nav.Link style={{ position: 'relative' }} href="/notification">
              Notification
              <span
                class="badge badge-pill badge-dark"
                style={{
                  color: 'white',
                  borderRadius: '9999px',
                  background: 'black',
                  position: 'absolute',
                  top: 0,
                }}
              >
                {unReadCount}
              </span>
            </Nav.Link>
            <Nav.Link
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
              href="/userProfile"
            >
              {firstName}
              <Avatar src={
                personal?.user_img
                  ? process.env.REACT_APP_DEV_URL +
                  '/profile_images/' +
                  personal?.user_img
                  : dummy_Img
              } className="avatar" />
            </Nav.Link>
            <Nav.Link onClick={handleLogout}>
              <img
                src="./images/logout-svgrepo-com.png"
                className="logout-img"
              />
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;

// <div className="d-flex nav_header" style={{ width: '100%' }}>
// <ul className="nav w-30">
//   <li className="user-nav-item nav-item header-logo-li">
//     <a
//       className="nav-link d-flex align-center"
//       style={{ width: '300px', height: '65px' }}
//       href="/homepage"
//     >
//       <img
//         style={{ width: '100%' }}
//         src="./images/logo.png"
//         className="header-logo-img"
//       />
//     </a>
//   </li>
// </ul>
// <ul className="nav justify-content-end w-100">
//   <li className="user-user-nav-item nav-item header-right-li">
//     <a className="nav-link" href="/Guest_Request_Reservation">
//       Guest Request & Reservation
//     </a>
//   </li>
//   <li className="user-nav-item nav-item header-right-li">
//     <a
//       className="nav-link"
//       href="/notification"
//       style={{ position: 'relative' }}
//     >
//       Notification
// <span
//   class="badge badge-pill badge-dark"
//   style={{
//     color: 'white',
//     borderRadius: '9999px',
//     background: 'black',
//     position: 'absolute',
//     top: 0,
//   }}
// >
//   {unReadCount}
// </span>
//     </a>
//   </li>
//   <li className="user-nav-item nav-item header-right-li">
// <a className="nav-link" href="/userProfile">
//   {firstName}
// </a>
// <Avatar src={dummy_Img} className="avatar" />
//   </li>
//   <li
//     className="user-nav-item nav-item header-right-li pointer logout-li"
//     onClick={handleLogout}
//   >
//     {/*<span>Logout</span>*/}
//     <a className="nav-link">
//       <img src="./images/logout-svgrepo-com.png" className="logout-img" />
//     </a>
//   </li>
// </ul>
// </div>
