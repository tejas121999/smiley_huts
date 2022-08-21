import React, { useEffect, useState } from 'react';
import "../../layout/css/credentials.css"
import Logo from "../../layout/images/login_register_logo.png"
import axios from 'axios';
import SweetAlert from 'react-bootstrap-sweetalert';

const ForgotPassword = () => {

    const [email, setEmail] = useState('');
    const [alert, setAlert] = useState(false);
    const [alertMsg, setAlertMsg] = useState('');

    const handleForgotPassword = () => {
        axios.post(process.env.REACT_APP_DEV_URL + '/api/auth/forgotPassword', { email: email })
            .then(response => {
                console.log("Res-----------", response.data)
                setAlertMsg(response.data);
                setAlert(true);
            })
            .catch(error => {
                console.log("err-----------", error)
            })
    }

    const handleChange = (e) => {
        setEmail(e.target.value);
    }

    const hideAlert = () => {
        setAlert(false);
    };

    return (
        <div className='credentials'>
            {alert == true ? (
                <SweetAlert success title="Success" onConfirm={hideAlert}>
                    {alertMsg}
                </SweetAlert>
            ) : null}

            <div className='right_side'>
                <img src={Logo} className="Logo_img" />
                <p className='Register_As_Member'>Register As <br />Member!</p>
                <p className='Register_As_Member_text'>Come, start your journey with us!</p>
                <button className='btn btn-green Register_button_class'>Register</button>
            </div>
            <div className='Left_side'>
                <dib className="forgot_pass">
                    <p className='Forgot_Password'>Forgot Password</p>
                    <p className='Forgot_Password_text'>
                        Enter your email below
                    </p>
                    <input className='form-control Forgot_Password_input' value={email} onChange={handleChange} placeholder='Email' />
                    <button className='btn btn-dark send_req' onClick={handleForgotPassword}>Send</button>
                </dib>
            </div>
        </div>
    )
}

export default ForgotPassword