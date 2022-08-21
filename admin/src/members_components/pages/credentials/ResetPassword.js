import React, { useEffect, useState } from 'react';
import "../../layout/css/credentials.css"
import Logo from "../../layout/images/login_register_logo.png"
import axios from 'axios';
import { useParams, useNavigate, useLocation } from "react-router-dom";
import SweetAlert from 'react-bootstrap-sweetalert';

const ResetPassword = () => {

    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const param = useParams();
	const [alert, setAlert] = useState(false);
    const [alertMsg, setAlertMsg] = useState('');
    const navigate = useNavigate();

    useEffect(()=>{
    	
    	console.log("params------------",param.token)
    	axios.get( process.env.REACT_APP_DEV_URL + '/api/auth/resetPasswordData', { 
    		params: {
    			resetPasswordToken: param.token 
    		} 
    	})
    	.then(response=>{
    		if(response.data.message == "password reset link a-ok") {
    			console.log("Response---------", response);
    			setEmail(response.data.email);
    		} else {
    			alert("Error")
    		}
    	})
    	.catch(error=>{
    		console.log('err---------',error);
    	})

    },[])

    const handleUpdatePassword = () => {
        axios.post( process.env.REACT_APP_DEV_URL + '/api/auth/updatePasswordViaEmail', { email:email, password:password })
        .then(response=>{
            console.log("Res-----------",response.data);
            if(response.data.message == "Password updated") {
            	setAlertMsg(response.data.message);
            	setAlert(true);
            }
        })
        .catch(error => {
            console.log("err-----------",error)
        })
    }

    const handleChange = (e) => {
        setPassword(e.target.value);
    }

    const hideAlert = () => {
        setAlert(false);
        navigate('/login');
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
                <p className='Register_As_Member_text'>Lorem Ipsum is simply dummy text of the printing and typesetting</p>
                <button className='btn btn-light Register_button_class'>Register</button>
            </div>
            <div className='Left_side'>
                <dib className="forgot_pass">
                    <p className='Forgot_Password'>Reset Password</p>
                    <p className='Forgot_Password_text'>
                        Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                        Lorem Ipsum has been the industry's
                    </p>
                    <input className='form-control Forgot_Password_input' type="password" value={password} onChange={handleChange} placeholder='Password' />
                    <button className='btn btn-dark send_req' onClick={handleUpdatePassword}>Update</button>
                </dib>
            </div>
        </div>
    )
}

export default ResetPassword