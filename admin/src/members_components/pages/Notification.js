import React, { useEffect, useState } from 'react';
import '../layout/css/notification.css';
import NotificationModl from './modal/NotificationModl';
import axios from 'axios';

const Notification = () => {
  const [modelOpen, setModelOpen] = useState(false);
  const [notificationData, setNotificationData] = useState([]);
  const [selectedGuestData, setSelectedGuestData] = useState({});

  useEffect(() => {
    axios
      .get(
        process.env.REACT_APP_DEV_URL +
          '/api/notification/getnotificationbyueseID/' +
          localStorage.getItem('user-id'),
        {
          headers: {
            'x-auth-token': `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MjgsImlhdCI6MTY1NDA4MjQ1NH0.zp-ijrmfwk7Eaej8STURxXBFR6c_Wm1KIpUeLK37VTE`,
          },
        }
      )
      .then(res => {
        setNotificationData(res.data.userReview);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  const changeNotificationToRead = async notification_id => {
    const res = await axios.post(
      process.env.REACT_APP_DEV_URL +
        '/api/notification/updateNotification/' +
        notification_id,
      {
        read_unread: true,
      },
      {
        headers: {
          'x-auth-token': `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MjgsImlhdCI6MTY1NDA4MjQ1NH0.zp-ijrmfwk7Eaej8STURxXBFR6c_Wm1KIpUeLK37VTE`,
        },
      }
    );
  };

  const openModal = notification => {
    setModelOpen(true);
    setSelectedGuestData(notification);
  };
  const closeModal = () => setModelOpen(false);

  return (
    <>
      <NotificationModl
        show={modelOpen}
        onHide={closeModal}
        selectedGuestData={selectedGuestData}
      />
      <div className="notification-main">
        <p className="Notification_text">Notifications</p>
        {notificationData.map((notification, key) => (
          <div
            className="Notification"
            onClick={() => {
              changeNotificationToRead(notification.id);
              notification.notification_type !== 1 && openModal(notification);
            }}
          >
            <div className="Notification_man">
              <i className="fas fa-link"></i>
              <p className="Notification_title">{notification.title}</p>
              <p className="Notification_body">{notification.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Notification;
