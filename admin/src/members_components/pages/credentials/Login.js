import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import '../../layout/css/credentials.css';
import Logo from '../../layout/images/login_register_logo.png';
import Facebook from '../../layout/images/SMILEY HUTS USER SIDE ICONS AND IMAGES/Group 4816.png';
import Google from '../../layout/images/SMILEY HUTS USER SIDE ICONS AND IMAGES/Group 4815.png';
import { LoginUser } from '../../../redux/action/authAction';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
// import { GoogleLogin } from 'react-google-login';
import { GoogleLogin, googleLogout } from '@react-oauth/google';
import FacebookLogin from 'react-facebook-login';
import SweetAlert from 'react-bootstrap-sweetalert';
import UnregistererHeader from '../../../components/UnregistererHeader';
import jwt_decode from 'jwt-decode';

const responseGoogle = response => {
  console.log(response);
};

const responseFacebook = response => {
  console.log(response);
};

const Login = () => {
  const { loginFun, user } = useAuth();
  const [errorAlert, setErrorAlert] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [emailError, setEmailError] = useState('');

  let navigate = useNavigate();
  const [users, setUsers] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState('');

  const { email, password } = users;

  const dispatch = useDispatch();

  useEffect(() => {
    console.log('users------------------', users);
    if (user == null) {
      console.log('After Logout---------', user);
    } else {
      navigate('/homepage');
    }
    if (user !== null || user !== undefined) {
      // navigate('/homepage');
    }
  }, []);

  const handleSubmit = async e => {
    e.preventDefault();
    if (!email) {
      setError('please enter email address');
    }
    if (!password) {
      setError('please enter password');
    } else {
      // dispatch(LoginUser(email, password))
      setUsers({ email: '', password: '' });
      setError('');
      try {
        const res = await axios.post(
          process.env.REACT_APP_DEV_URL + '/api/auth/',
          users
        );

        if (res.data.Token) {
          loginFun({
            users: users,
          });
          const accessToken = res.data.Token;
          const id = res.data.user.id;
          localStorage.setItem('user-id', id);
          localStorage.setItem('access-token', accessToken);
          localStorage.setItem('user_data', JSON.stringify(res.data.user));
          if (res.data.user.isAdmin == true) {
            // alert("admin")
            navigate('/');
          } else {
            window.location.href = '/homePage';
          }
        }
      } catch (err) {
        const error = err.response.data.error;
        console.log('erroris', err.response.data);
        setErrorMsg(err.response.data.msg);
        setErrorAlert(true);
        // alert(error);
      }
    }
  };
  const handleChange = e => {
    let { name, value } = e.target;
    setUsers({ ...users, [name]: value });
  };

  const handleRegisterClick = () => {
    navigate('/register');
  };

  const hideAlert = () => {
    setErrorAlert(false);
  };

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

  const responseFacebook = response => {
    localStorage.setItem('email', response.email);
    // loginFun({
    //   users: { email: user.email },
    // });
    setFacebookEmail(response.email);
  };

  useEffect(() => {
    const loginGoogleUser = async () => {
      const res = await axios.post(
        process.env.REACT_APP_DEV_URL + '/api/auth/googlelogin',
        { email: googleEmail }
      );
      console.log(res);
      const accessToken = res.data.Token;
      const id = res.data.user.id;
      // localStorage.setItem('email', email);
      localStorage.setItem('user-id', id);
      localStorage.setItem('access-token', accessToken);
      // localStorage.setItem('user_data', JSON.stringify(res.data.user));
      if (res.data.Token) {
        loginFun({
          users: { email: googleEmail },
        });
      }
      navigate('/homePage');
    };
    loginGoogleUser();
  }, [googleEmail]);

  useEffect(() => {
    const loginFacebookUser = async () => {
      const res = await axios.post(
        process.env.REACT_APP_DEV_URL + '/api/auth/googleLogin',
        { email: facebookEmail }
      );
      console.log(res);
      const accessToken = res.data.Token;
      const id = res.data.user.id;
      // localStorage.setItem('user_data', JSON.stringify(res.data.user));
      // localStorage.setItem('email', email);
      localStorage.setItem('user-id', id);
      localStorage.setItem('access-token', accessToken);
      console.log(res);
      if (res.data.Token) {
        loginFun({
          users: { email: googleEmail },
        });
      }
      navigate('/homePage');
    };
    loginFacebookUser();
  }, [facebookEmail]);

  return (
    <>
      <UnregistererHeader />
      <div className="credentials">
        {errorAlert == true ? (
          <SweetAlert danger title="Error" onConfirm={hideAlert}>
            {errorMsg}
          </SweetAlert>
        ) : null}

        <div className="right_side">
          <img src={Logo} className="Logo_img" />
          <p className="Register_As_Member">
            Register As <br />
            Member!
          </p>
          <p className="Register_As_Member_text">
            Come, start your journey with us!
          </p>
          <button
            onClick={handleRegisterClick}
            className="btn btn-green Register_button_class"
          >
            Register
          </button>
        </div>
        <div className="Left_side">
          <p className="Login_text">Login</p>
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
          </div>
          {/*<div className='Login_logo'>
            <FacebookLogin
                btnContent="Facebook"
                appId="185202659227880"
                fields="name,email,picture"
                onSuccess={responseFacebook}
                onFailure={responseFacebook}
            />
            <GoogleLogin
                clientId="830483056437-nuvjp043lgf8d6itsu00o29o9trnccks.apps.googleusercontent.com"
                buttonText="Login"
                onSuccess={responseGoogle}
                onFailure={responseGoogle}
            />
        </div>*/}
          <p className="Login_text_Using_Email">or Login Using Email</p>
          <form onSubmit={handleSubmit} className="login-form-class">
            <input
              className="form-control Login_email"
              placeholder="Email"
              type="email"
              name="email"
              value={email}
              onChange={handleChange}
            />
            <span className="errMsg">{emailError}</span>

            <input
              className="form-control Login_password"
              placeholder="Password"
              type="password"
              name="password"
              value={password}
              onChange={handleChange}
            />
            <a href="/forgot_password" style={{ alignSelf: ' baseline' }}>
              <p className="forgot_Password_login">Forgot Password?</p>
            </a>
            <button className="btn btn-green Login_button" type="submit">
              Login
            </button>
            <p style={{ textAlign: 'center' }} className="toregister">
              Dont have an account? Go to{' '}
              <span
                className="pointer"
                onClick={() => {
                  window.location.href = '/register';
                }}
              >
                register
              </span>
            </p>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
