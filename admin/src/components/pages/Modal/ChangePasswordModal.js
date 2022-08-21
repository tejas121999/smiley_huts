import axios from 'axios';
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import './passwordModal.css';

function MyVerticallyCenteredModal(props) {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setconfirmPassword] = useState('');

  const passwordHandler = async () => {
    let id = localStorage.getItem('user-id');
    const res = await axios.post(
      process.env.REACT_APP_DEV_URL + '/api/auth/changed',
      {
        id: id,
        currentPassword: currentPassword,
        newPassword: newPassword,
      }
    );
    console.log(res);
  };

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      h-10
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Change Password
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {/* <h4>Centered Modal</h4>
        <p>
          Cras mattis consectetur purus sit amet fermentum. Cras justo odio,
          dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac
          consectetur ac, vestibulum at eros.
        </p> */}
        <div>
          <input
            type="text"
            value={currentPassword}
            onChange={e => setCurrentPassword(e.target.value)}
            className="passwordInput"
            placeholder="Current Password"
          />
        </div>
        <div>
          <input
            value={newPassword}
            onChange={e => setNewPassword(e.target.value)}
            type="text"
            className="passwordInput"
            placeholder="New Password"
          />
        </div>
        <div>
          <input
            value={confirmPassword}
            onChange={e => setconfirmPassword(e.target.value)}
            type="text"
            className="passwordInput"
            placeholder="Confirm New Password"
          />
        </div>
        <button className="changePasswordButton" onClick={passwordHandler}>
          Change Password
        </button>
      </Modal.Body>
      {/* <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer> */}
    </Modal>
  );
}

export default MyVerticallyCenteredModal;
