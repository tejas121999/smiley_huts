import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import '../../layout/css/credentials.css';
import Logo from '../../layout/images/login_register_logo.png';
import Facebook from '../../layout/images/SMILEY HUTS USER SIDE ICONS AND IMAGES/Group 4816.png';
import Google from '../../layout/images/SMILEY HUTS USER SIDE ICONS AND IMAGES/Group 4815.png';
import { registerUser } from '../../../redux/action/authAction';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import UnregistererHeader from '../../../components/UnregistererHeader';
// import { GoogleLogin } from 'react-google-login';
import { GoogleLogin, googleLogout } from '@react-oauth/google';
import jwt_decode from 'jwt-decode';
import { useAuth } from '../../hooks/useAuth';
import { useGoogleLogin } from '@react-oauth/google';
import FacebookLogin from 'react-facebook-login';
import VerificationModal from '../modal/VerificationModal';
// import jwtDecode from 'jwt-decode';

const Register = () => {
  const [verificationPopUp, setVerificationPopUp] = useState(false);
  let navigate = useNavigate();
  const dispatch = useDispatch();
  const [users, setUsers] = useState({
    email: '',
    password: '',
    password2: '',
  });

  const [error, setError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passError, setPassError] = useState('');
  const [cPassError, setCPassError] = useState('');

  const { email, password, password2 } = users;

  const handleSubmit = async e => {
    e.preventDefault();

    var pattern = new RegExp(
      /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i
    );
    let errorBit = 0;
    if (email == null || email.trim() === '') {
      setEmailError('Email is required.');
      errorBit++;
    } else if (!pattern.test(email)) {
      setEmailError('Enter a valid email address.');
      errorBit++;
    } else {
      setEmailError('');
    }

    if (password.trim() === '') {
      setPassError('Password is required.');
      errorBit++;
    } else if (password.length < 8) {
      setPassError('Password should be atleast 8 characters long.');
      errorBit++;
    } else {
      setPassError('');
    }

    if (password2.trim() === '') {
      setCPassError('Confirm Password is required.');
      errorBit++;
    } else if (password !== password2) {
      setCPassError('Password and Confirm Password fields should match.');
      errorBit++;
    } else {
      setCPassError('');
    }

    if (errorBit > 0) {
      return false;
    }

    // setUsers({ email: "", password: "", password2: "" });
    // setError("");
    try {
      console.log(users);
      const res = await axios.post(
        process.env.REACT_APP_DEV_URL + '/api/auth/register',
        users
      );
      console.log(res.data.user.id);
      const accessToken = res.data.Token;
      const id = res.data.user.id;
      const email = res.data.user.email;
      localStorage.setItem('email', email);
      localStorage.setItem('user-id', id);
      localStorage.setItem('access-token', accessToken);
      // navigate('/create_profile');
      setVerificationPopUp(true);
    } catch (err) {
      const error = err.response.data.errors;
      console.log(error);
      alert(err);
    }
  };

  const handleChange = e => {
    let { name, value } = e.target;
    setUsers({ ...users, [name]: value });
  };

  const { loginFun, user } = useAuth();
  const [googleEmail, setGoogleEmail] = useState();
  const [facebookEmail, setFacebookEmail] = useState();

  const handleGoogleRegister = async credentialResponse => {
    const user = jwt_decode(credentialResponse.credential);
    localStorage.setItem('email', user.email);

    // loginFun({
    //   users: { email: user.email },
    // });
    setGoogleEmail(user.email);

    // console.log(res);
    // navigate('/create_profile');
  };

  console.log(googleEmail);
  useEffect(() => {
    const registerGoogleUser = async () => {
      const res = await axios.post(
        process.env.REACT_APP_DEV_URL + '/api/auth/googleRegister',
        { email: googleEmail }
      );
      console.log(res);
      const accessToken = res.data.Token;
      const id = res.data.user.id;
      // localStorage.setItem('email', email);
      localStorage.setItem('user-id', id);
      localStorage.setItem('access-token', accessToken);
      navigate('/create_profile');
    };
    registerGoogleUser();
  }, [googleEmail]);

  useEffect(() => {
    try {
      const registerGoogleUser = async () => {
        const res = await axios.post(
          process.env.REACT_APP_DEV_URL + '/api/auth/googleRegister',
          { email: facebookEmail }
        );
        console.log(res);
        const accessToken = res.data.Token;
        const id = res.data.user.id;
        // localStorage.setItem('email', email);
        localStorage.setItem('user-id', id);
        localStorage.setItem('access-token', accessToken);
        navigate('/create_profile');
      };
      registerGoogleUser();
    } catch (err) {
      alert('User already exists');
    }
  }, [facebookEmail]);

  const responseFacebook = response => {
    localStorage.setItem('email', response.email);
    // loginFun({
    //   users: { email: user.email },
    // });
    setFacebookEmail(response.email);
  };

  return (
    <>
      <VerificationModal
        show={verificationPopUp}
        onHide={() => setVerificationPopUp(false)}
      />
      <UnregistererHeader />
      <div className="credentials">
        <div className="right_side">
          <img src={Logo} className="Logo_img" />
          <p className="Register_As_Member">
            Login As <br />
            Member!
          </p>
          <p className="Register_As_Member_text">
            Have you joined us already? Log In here
          </p>
          <button
            onClick={() => navigate('/login')}
            className="btn btn-green Register_button_class"
          >
            Login
          </button>
        </div>
        <div className="Left_side">
          <p className="Register_text">Register</p>
          <div className="Register_logo">
            <GoogleLogin
              className="google_login"
              type="icon"
              shape="circle"
              onSuccess={handleGoogleRegister}
              onError={() => {
                console.log('Login Failed');
              }}
            />
            <FacebookLogin
              appId="1237992367006101"
              icon={<img src={Facebook} />}
              textButton=""
              // autoLoad={true}
              size="small"
              fields="name,email,picture"
              // onClick={componentClicked}
              callback={responseFacebook}
            />
            {/* <img src={Google} className="Google_login" /> */}
          </div>
          <p className="Register_text_Using_Email">or Register Using Email</p>
          <form onSubmit={handleSubmit} className="register-form-class">
            <input
              className="form-control Register_email"
              placeholder="Email"
              type="email"
              name="email"
              value={email}
              onChange={handleChange}
            />
            {emailError !== '' ? (
              <span className={`errMsg`}>{emailError}</span>
            ) : null}

            <input
              className="form-control Register_password"
              placeholder="Password"
              type="password"
              name="password"
              value={password}
              onChange={handleChange}
            />
            {passError !== '' ? (
              <span className={`errMsg`}>{passError}</span>
            ) : null}

            <input
              className="form-control Register_password"
              placeholder="Confirm Password"
              type="password"
              name="password2"
              value={password2}
              onChange={handleChange}
            />
            {cPassError !== '' ? (
              <span className={`errMsg`}>{cPassError}</span>
            ) : null}

            <button className="btn btn-green Register_button">Register</button>
            <p style={{ textAlign: 'center' }} className="toregister">
              Dont have an account? Go to{' '}
              <span
                className="pointer"
                onClick={() => {
                  window.location.href = '/login';
                }}
              >
                login
              </span>
            </p>
          </form>
        </div>
        {/* <p className="Register_text_Using_Email">or Register Using Email</p> */}
      </div>
    </>
  );
};

export default Register;
