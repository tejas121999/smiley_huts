import { Message } from '@material-ui/icons';
import axios from 'axios';
import { useState } from 'react';
import banner from '../members_components/layout/images/homepage_after_login.png';
import './contactus.css';
import UnregistererHeader from '../components/UnregistererHeader';
import { useAuth } from './hooks/useAuth';

const ContactUs = () => {
  const { user } = useAuth()
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const sendContactMailHandler = async () => {
    let body = 'First Name: ' + email + '%0D%0A' + 'Last Name: ' + message;

    const res = await axios.post(
      process.env.REACT_APP_DEV_URL + '/api/auth/sendContactMail',
      { emailTitle: 'Contact query', emailBody: body }
    );
    console.log(res);
  };

  return (
    <div>
      {!localStorage.getItem('user_data') &&
        < UnregistererHeader />
      }

      <div className="contact-header">
        <img src={banner} alt="" srcset="" />
      </div>
      <div className="contact-main">
        <div className="contact-black">
          <div className="contact-black-text">
            <h1>Contact</h1>
            <h1>Details</h1>
            <p>contact number</p>
            <p>info@loremipsum.com</p>
            <p>address</p>
          </div>
        </div>
        <div className="contact-white">
          <h1>Write to Us</h1>
          <div className="input-div">
            <input
              type="text"
              placeholder="Name"
              value={name}
              onChange={e => setName(e.target.value)}
            />
          </div>
          <div className="input-div">
            <input
              type="text"
              placeholder="Email"
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
          </div>
          <div className="input-div">
            <textarea
              placeholder="Message"
              value={message}
              onChange={e => setMessage(e.target.value)}
            ></textarea>
          </div>
          <button onClick={sendContactMailHandler} className="btn-green">
            Send
          </button>
        </div>
      </div>
    </div>
  );
};
export default ContactUs;
