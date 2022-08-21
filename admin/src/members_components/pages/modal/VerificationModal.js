import axios from 'axios';
import { useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';

const VerificationModal = props => {
  const email = 'ninad@gmail.com';
  const id = localStorage.getItem('user-id');
  useEffect(() => {
    const getUser = async () => {
      const res = await axios.post(
        process.env.REACT_APP_DEV_URL + '/api/auth/getIsVerified',
        { userId: id }
      );
      console.log(res.data);
    };
    getUser();
  });

  return (
    <Modal
      backdrop="static"
      keyboard={false}
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Body>
        <div style={{ padding: '60px', paddingRight: '180px' }}>
          {/* <img src={} style={{ width: '250px' }} alt="" /> */}
          <h1>Verify Your Email</h1>
          <p>
            We have sent an email to{' '}
            <span style={{ fontWeight: 'bold' }}>{localStorage.getItem('email')}</span>
          </p>
          <p>
            Please verify your email by clicking on the link present in the email sent by us. If you do not find it in your inbox, try checking in junk/spam folder.
          </p>
          <a id="anchorID" href="https://mail.google.com/" target="_blank">
            <button className="btn-green border-0 px-4 py-2 rounded">
              Check Mail
            </button>
          </a>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default VerificationModal;
