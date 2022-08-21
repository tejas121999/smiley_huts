import React, { useState, useEffect } from "react";
import "../../layout/css/request_reservation.css";
import john_doe from "../../layout/images/john-doe.jpg";
import ReservationModal from "../modal/ReservationModal";
import axios from "axios";
import { useParams, useNavigate, useLocation } from "react-router-dom";

const Reservation = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [modelOpen, setModelOpen] = useState(false);
  const [reservationData, setReservationData] = useState([]);
  const [selectedGuestData, setSelectedGuestData] = useState({});

  const openModal = (guestData) => {
    setModelOpen(true);
    setSelectedGuestData(guestData);
  };
  const closeModal = () => setModelOpen(false);

  useEffect(() => {
    axios
      .get(
        process.env.REACT_APP_DEV_URL+"/api/booking/getuserIdInReservation/" +
          localStorage.getItem("user-id"),
        {
          headers: {
            "x-auth-token": `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MjgsImlhdCI6MTY1NDAwMDIwNX0.SvPTaaSc2IRLVlg8OrurDPmqkaNtZnI4DXmn31SmMP8`,
          },
        }
      )
      .then((res) => {
        setReservationData(res.data.userData);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const formatDate = (dateVal) => {
    let dateObj = new Date(dateVal);
    const month = dateObj.toLocaleString("default", { month: "short" });
    let day = dateObj.getDate();
    if (day < 10) {
      day = "0" + day;
    }
    let dateStr = day + " " + month;
    return dateStr;
  };

  return (
    <div className="Reservation_container">
      <ReservationModal
        show={modelOpen}
        onHide={closeModal}
        selectedGuestData={selectedGuestData}
      />

      {reservationData.map((reservation, key) => (
        <div
          className="reservation_main mb-1"
          key={key}
          onClick={() => openModal(reservation)}
        >
          <div className="d-flex">
            <div className="mr-1">
              <img src={john_doe} className="Reservation_img" />
            </div>
            <div className="d-flex flex-column">
              <p className="Reservation_name m-0">
                {reservation.users.first_name} {reservation.users.last_name}
              </p>
              <p className="Reservation_number m-0">
                {reservation.users.contact_number}
              </p>
            </div>
          </div>
          <span className="Reservation_date">
            {formatDate(reservation.start_date)} -{" "}
            {formatDate(reservation.end_date)}
          </span>
        </div>
      ))}
    </div>
  );
};

export default Reservation;
