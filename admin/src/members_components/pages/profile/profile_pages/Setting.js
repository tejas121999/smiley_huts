import React, { useEffect, useState } from "react";
import "../../../layout/css/settings.css";
import Switch from "@mui/material/Switch";
import axios from "axios";

const Setting = () => {
  const [setting, setSetting] = useState([]);

  const [guestReqNotifi, setGuestReqNotifi] = useState(false);
  const [reviewRatingNotifi, setReviewRatingNotifi] = useState(false);
  const [guestReviewNotifiEmail, setGuestReviewNotifiEmail] = useState(false);
  const [reviewRatingNotificationEmail, setNeviewRatingNotificationEmail] =
    useState(false);

  useEffect(() => {
    axios
      .post(
        process.env.REACT_APP_DEV_URL + "/api/setting/getAllNotification",
        { user_id: localStorage.getItem("user-id") },
        {
          headers: {
            "x-auth-token": `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MjgsImlhdCI6MTY1NDA4MjQ1NH0.zp-ijrmfwk7Eaej8STURxXBFR6c_Wm1KIpUeLK37VTE`,
          },
        }
      )
      .then((res) => {
        setSetting(res.data);
        setGuestReqNotifi(res.data[0].guest_req_notifi);
        setReviewRatingNotifi(res.data[0].review_rating_notifi);
        setGuestReviewNotifiEmail(res.data[0].guest_review_notifi_email);
        setNeviewRatingNotificationEmail(
          res.data[0].review_rating_notification_email
        );
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleGuestReqNotifiOnchange = (e) => {
    console.log("value pass---------------------", e.target.checked);
    setGuestReqNotifi(e.target.checked);

    axios
      .post(
        process.env.REACT_APP_DEV_URL + "/api/setting/isGuestRequest",
        {
          user_id: localStorage.getItem("user-id"),
          guest_req_notifi: e.target.checked,
        },
        {
          headers: {
            "x-auth-token": `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MjgsImlhdCI6MTY1NDA3ODEzM30.FNfBFklZCDm39ZGicsuQuICMXarIhQh7BmUZ9m_8n7U`,
          },
        }
      )
      .then((res) => {
        console.log("Guest Request Updated");
        axios
          .post(
            process.env.REACT_APP_DEV_URL + "/api/setting/getAllNotification",
            { user_id: localStorage.getItem("user-id") },
            {
              headers: {
                "x-auth-token": `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MjgsImlhdCI6MTY1NDA4MjQ1NH0.zp-ijrmfwk7Eaej8STURxXBFR6c_Wm1KIpUeLK37VTE`,
              },
            }
          )
          .then((res) => {
            setSetting(res.data);
          })
          .catch((error) => {
            console.log(error);
          });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleReviewRatingNotifi = (e) => {
    console.log("value pass---------------------", e.target.checked);
    setReviewRatingNotifi(e.target.checked);

    axios
      .post(
        process.env.REACT_APP_DEV_URL + "/api/setting/isreviewratingnotifi",
        {
          user_id: localStorage.getItem("user-id"),
          review_rating_notifi: e.target.checked,
        },
        {
          headers: {
            "x-auth-token": `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MjgsImlhdCI6MTY1NDA3ODEzM30.FNfBFklZCDm39ZGicsuQuICMXarIhQh7BmUZ9m_8n7U`,
          },
        }
      )
      .then((res) => {
        console.log("Guest Request Updated");
        axios
          .post(
            process.env.REACT_APP_DEV_URL + "/api/setting/getAllNotification",
            { user_id: localStorage.getItem("user-id") },
            {
              headers: {
                "x-auth-token": `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MjgsImlhdCI6MTY1NDA4MjQ1NH0.zp-ijrmfwk7Eaej8STURxXBFR6c_Wm1KIpUeLK37VTE`,
              },
            }
          )
          .then((res) => {
            setSetting(res.data);
          })
          .catch((error) => {
            console.log(error);
          });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleguestreviewnotifiemail = (e) => {
    console.log("value pass---------------------", e.target.checked);
    setGuestReviewNotifiEmail(e.target.checked);

    axios
      .post(
        process.env.REACT_APP_DEV_URL + "/api/setting/guestreviewnotifiemail",
        {
          user_id: localStorage.getItem("user-id"),
          guest_review_notifi_email: e.target.checked,
        },
        {
          headers: {
            "x-auth-token": `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MjgsImlhdCI6MTY1NDA3ODEzM30.FNfBFklZCDm39ZGicsuQuICMXarIhQh7BmUZ9m_8n7U`,
          },
        }
      )
      .then((res) => {
        console.log("Guest Request Updated");
        axios
          .post(
            process.env.REACT_APP_DEV_URL + "/api/setting/getAllNotification",
            { user_id: localStorage.getItem("user-id") },
            {
              headers: {
                "x-auth-token": `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MjgsImlhdCI6MTY1NDA4MjQ1NH0.zp-ijrmfwk7Eaej8STURxXBFR6c_Wm1KIpUeLK37VTE`,
              },
            }
          )
          .then((res) => {
            setSetting(res.data);
          })
          .catch((error) => {
            console.log(error);
          });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handlereviewRatingNotificationEmail = (e) => {
    console.log("value pass---------------------", e.target.checked);
    setNeviewRatingNotificationEmail(e.target.checked);

    axios
      .post(
        process.env.REACT_APP_DEV_URL + "/api/setting/reviewratingnotificationemail",
        {
          user_id: localStorage.getItem("user-id"),
          review_rating_notification_email: e.target.checked,
        },
        {
          headers: {
            "x-auth-token": `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MjgsImlhdCI6MTY1NDA3ODEzM30.FNfBFklZCDm39ZGicsuQuICMXarIhQh7BmUZ9m_8n7U`,
          },
        }
      )
      .then((res) => {
        console.log("Guest Request Updated");
        axios
          .post(
            process.env.REACT_APP_DEV_URL + "/api/setting/getAllNotification",
            { user_id: localStorage.getItem("user-id") },
            {
              headers: {
                "x-auth-token": `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MjgsImlhdCI6MTY1NDA4MjQ1NH0.zp-ijrmfwk7Eaej8STURxXBFR6c_Wm1KIpUeLK37VTE`,
              },
            }
          )
          .then((res) => {
            setSetting(res.data);
          })
          .catch((error) => {
            console.log(error);
          });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="List_Box">
      <div className="setting_item">
        <div>
          <p className="Guest_Request_Notification">Guest Request Notification</p>
          <p className="Guest_Request_Notification_text">
            dummy text dummy text dummy text dummy text dummy text dummy text
          </p>
        </div>
        <div>
          <Switch
            className="switch"
            checked={guestReqNotifi}
            onChange={handleGuestReqNotifiOnchange}
          />
        </div>
      </div>

      <div className="setting_item">
        <p className="Guest_Request_Notification">
          Review and Rating Notification
        </p>
        <p className="Guest_Request_Notification_text">
          dummy text dummy text dummy text dummy text dummy text dummy text
        </p>
        <Switch
          className="switch"
          checked={reviewRatingNotifi}
          onChange={handleReviewRatingNotifi}
        />
      </div>

      <div className="setting_item">
        <p className="Guest_Request_Notification">
          Guest Request Notifications Email
        </p>
        <p className="Guest_Request_Notification_text">
          dummy text dummy text dummy text dummy text dummy text dummy text
        </p>
        <Switch
          className="switch"
          checked={guestReviewNotifiEmail}
          onChange={handleguestreviewnotifiemail}
        />
      </div>

      <div className="setting_item">
        <p className="Guest_Request_Notification">
          Review and Rating Notification Email
        </p>
        <p className="Guest_Request_Notification_text">
          dummy text dummy text dummy text dummy text dummy text dummy text
        </p>
        <Switch
          className="switch"
          checked={reviewRatingNotificationEmail}
          onChange={handlereviewRatingNotificationEmail}
        />
      </div>
    </div>
  );
};

export default Setting;
