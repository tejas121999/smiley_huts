import React, { useState, useTransition } from 'react';
import { Modal } from 'react-bootstrap';
import SendIcon from '@mui/icons-material/Send';
import axios from 'axios';

const MessageModal = props => {
  console.log('message props are----------', props.selectMessagedata);
  const [data, setData] = useState({
    title: '',
    desc: ' ',
  });

  console.log(props.selectMessagedata);

  const sendMessageRequest = async e => {
    // const handleRequestApproval = (bookingId, isApproved) => {
    e.preventDefault();
    const res = await axios.post(
      process.env.REACT_APP_DEV_URL +
        '/api/booking/approveDeclineBookingRequest',
      { bookingId: props.selectMessagedata.id, isAccepted: 4 },
      {
        headers: {
          'x-auth-token': `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MjgsImlhdCI6MTY1NDAwMDIwNX0.SvPTaaSc2IRLVlg8OrurDPmqkaNtZnI4DXmn31SmMP8`,
        },
      }
    );
    console.log(res);
  };

  const [modalShow, setModalShow] = React.useState(false);

  function handle(e) {
    const newData = { ...data };
    newData[e.target.id] = e.target.value;
    setData(newData);
    console.log(newData);
  }

  function submit(e) {
    e.preventDefault();
    axios
      .post(
        process.env.REACT_APP_DEV_URL + '/api/notification/addNotification',
        {
          userId: props.selectMessagedata.booking_user_id,
          title: data.title,
          desc: data.desc,
        },
        {
          headers: {
            'x-auth-token': `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MjgsImlhdCI6MTY1NDAwMDIwNX0.SvPTaaSc2IRLVlg8OrurDPmqkaNtZnI4DXmn31SmMP8`,
          },
        }
      )
      .then(res => {
        console.log('res------------', res.data);

        props.setClose();
        setModalShow(true);
      })
      .catch(error => {
        console.log(error);
      });
  }

  return (
    <div>
      <MyVerticallyCenteredModal
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
      <Modal
        centered
        show={props.show}
        onHide={props.onHide}
        keyboard={false}
        className="request_guest_modal"
      >
        <Modal.Body>
          <div className="container">
            <form
              onSubmit={e => {
                sendMessageRequest(e);
                submit(e);
              }}
            >
              <input
                type="text"
                onChange={e => handle(e)}
                id="title"
                style={{
                  height: '60px',
                  width: '100%',
                  background: 'rgb(236,236,236)',
                  border: 'none',
                }}
                value={data.title}
                placeholder="title"
              />{' '}
              <br /> <br />
              <textarea
                onChange={e => handle(e)}
                style={{
                  height: '200px',
                  width: '100%',
                  background: 'rgb(236,236,236)',
                  border: 'none',
                }}
                value={data.desc}
                id="desc"
                placeholder="description"
              />
              <br />
              <br />
              <input
                className="changePasswordButton"
                type="submit"
                value="Send"
              />
            </form>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default MessageModal;

function MyVerticallyCenteredModal(props) {
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      {/* <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Modal heading
        </Modal.Title>
      </Modal.Header> */}
      <Modal.Body>
        <p>Your Message has been successfully sent to the User</p>
      </Modal.Body>
      {/* <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer> */}
    </Modal>
  );
}

// function App() {
//   const [modalShow, setModalShow] = React.useState(false);

//   return (
//     <>
//       <Button variant="primary" onClick={() => setModalShow(true)}>
//         Launch vertically centered modal
//       </Button>

//       <MyVerticallyCenteredModal
//         show={modalShow}
//         onHide={() => setModalShow(false)}
//       />
//     </>
//   );
// }

// render(<App />);
