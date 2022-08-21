import React, { useEffect, useState } from 'react';
import { Modal } from 'react-bootstrap';
import axios from 'axios';
import '../../layout/css/homeStay.css';

const EditMyStayModal = props => {
  console.log('edt  props are----------', props.selectedGuestData);
  // const [data,setData] = useState({
  //     start_date:"",
  //     end_date :""

  // })

  // function handle(e){
  //     const newData = {...data}
  //     newData[e.target.id] = e.target.value
  //     setData(newData);
  //     console.log(newData)
  // }

  // function submit(e){
  //     e.preventDefault();

  //     axios.post('http://api.smileyhuts.com/api/notification/addNotification', {userId: props.selectMessagedata.booking_user_id, title:data.title , desc:data.desc}, { headers: {"x-auth-token" : `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MjgsImlhdCI6MTY1NDAwMDIwNX0.SvPTaaSc2IRLVlg8OrurDPmqkaNtZnI4DXmn31SmMP8`} })
  //     .then(res => {
  //       console.log("res------------",res.data);

  //     })
  //     .catch((error) => {
  //         console.log(error)
  //     });

  // }'

  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  useEffect(() => {
    const today = new Date();
    const date = today.setDate(today.getDate());
    const defaultValue = new Date(date).toISOString().split('T')[0]; // yyyy-mm-dd
    console.log('DefDate-------', defaultValue);
    setStartDate(defaultValue);
    setEndDate(defaultValue);
  }, []);

  const handleStartDateChange = e => {
    setStartDate(e.target.value);
  };

  const handleEndDateChange = e => {
    setEndDate(e.target.value);
  };

  const handleDate = () => {
    axios
      .post(
        process.env.REACT_APP_DEV_URL + '/api/booking/update_date',
        {
          abc: props.selectedGuestData.id,
          prop_id: props.selectedGuestData.property_id,
          start_date: startDate,
          end_date: endDate,
        },
        {
          headers: {
            'x-auth-token': `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MjgsImlhdCI6MTY1NDA4MjQ1NH0.zp-ijrmfwk7Eaej8STURxXBFR6c_Wm1KIpUeLK37VTE`,
          },
        }
      )
      .then(res => {
        alert('Booking updated successfully');
      })
      .catch(error => {
        console.log(error);
        alert(error.response.data);
      });
  };

  const handleBookingCancel = async () => {
    const res = await axios.post(
      process.env.REACT_APP_DEV_URL +
        '/api/booking/approveDeclineBookingRequest',
      { bookingId: props.selectedGuestData.id, isAccepted: 2 },
      {
        headers: {
          'x-auth-token': `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MjgsImlhdCI6MTY1NDAwMDIwNX0.SvPTaaSc2IRLVlg8OrurDPmqkaNtZnI4DXmn31SmMP8`,
        },
      }
    );
    console.log(res);
    window.location.reload();
  };

  return (
    <>
      <Modal
        centered
        show={props.show}
        onHide={props.onHide}
        keyboard={false}
        className="edit-modal"
      >
        <Modal.Body>
          <div className="edit-modal-main">
            <input
              className="form-control start_date"
              type="date"
              onChange={handleStartDateChange}
              value={startDate}
              placeholder="Start Date"
            />
            <input
              style={{ marginRight: '0' }}
              className="form-control end_date"
              type="date"
              onChange={handleEndDateChange}
              value={endDate}
              placeholder="End Date"
            />
          </div>
          <div className="edit-modal-buttons">
            <button className="btn btn-dark" onClick={handleDate}>
              Update
            </button>
            <button className="btn btn-danger" onClick={handleBookingCancel}>
              Cancel
            </button>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default EditMyStayModal;
