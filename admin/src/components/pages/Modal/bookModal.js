import axios from 'axios';
import './bookModal.css';
import { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
const BookModal = props => {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  // console.log(details);
  const handleBooking = () => {
    axios
      .post(
        process.env.REACT_APP_DEV_URL + '/api/booking/addRequest',
        {
          booking_user_id: props.details.booking_user_id,
          property_id: props.details.property_id,
          start_date: startDate,
          end_date: endDate,
        },
        {
          headers: {
            'x-auth-token': `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MjgsImlhdCI6MTY1NDAwMDIwNX0.SvPTaaSc2IRLVlg8OrurDPmqkaNtZnI4DXmn31SmMP8`,
          },
        }
      )
      .then(res => {
        console.log(res);
        alert('Booking Complete!!');
        // setAllReviews(res.data.getAllReviews);
      })
      .catch(error => {
        console.log(error);
        alert(error.response.data);
      });
  };

  const handleStartDateChange = e => {
    setStartDate(e.target.value);
  };

  const handleEndDateChange = e => {
    setEndDate(e.target.value);
  };
  return (
    <>
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          {/* <Modal.Title id="contained-modal-title-vcenter">
            Modal heading
          </Modal.Title> */}
        </Modal.Header>
        <Modal.Body>
          <div className="Inputfields inputss">
            <input
              className="form-control start_date"
              type="date"
              onChange={handleStartDateChange}
              value={startDate}
              placeholder="Start Date"
            />
            <input
              className="form-control end_date"
              type="date"
              onChange={handleEndDateChange}
              value={endDate}
              placeholder="End Date"
            />
            <button
              className="btn btn-dark book_button"
              onClick={handleBooking}
            >
              Book
            </button>
          </div>
        </Modal.Body>
        {/* <Modal.Footer>
          <Button onClick={props.onHide}>Close</Button>
        </Modal.Footer> */}
      </Modal>
      {/* <div className="book_modal_main"></div> */}
    </>
  );
};
export default BookModal;

{
  /* <svg
          onClick={() => setModal(false)}
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
            clipRule="evenodd"
          />
        </svg> */
}
