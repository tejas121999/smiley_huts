import { Avatar, Container, Grid, Paper, Typography } from '@material-ui/core';
import React, { useEffect } from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import GroupRoundedIcon from '@material-ui/icons/GroupRounded';
import SendRoundedIcon from '@material-ui/icons/SendRounded';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import '../layout/css/dashboard.css';
import ProfileRequest from './tables/ProfileRequest';
import PhotoRequest from './tables/PhotoRequest';
import { useState } from 'react';
// import Calendar from "react-calendar";
import 'react-calendar/dist/Calendar.css';
import moment from 'moment';
import axios from 'axios';
import ActiveModal from '../pages/Modal/activeModal';

import BookingCalendar from 'react-booking-calendar';

// calender
import format from 'date-fns/format';
import getDay from 'date-fns/getDay';
import parse from 'date-fns/parse';
import startOfWeek from 'date-fns/startOfWeek';
import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import IncompleteRegistration from './IncompleteRegistration';

const locales = {
  'en-US': require('date-fns/locale/en-US'),
};

const useStyles = makeStyles(theme => ({
  paper: {
    padding: theme.spacing(2),
    margin: '30px',
    width: '100%',
    textAlign: 'center',
    color: theme.palette.text.secondary,
    // position: 'relative',
    // right: '50px',
    borderRadius: '15px',
    boxShadow: '0px 23px 32px rgba(5, 51, 112, 0.05)',
  },
  avatar: {
    width: '50px',
    height: '50px',

    // position: 'relative',
    // top: '10px',
  },
  number: {
    fontSize: '30px',
    fontWeight: '600',
    color: '#000000',
  },
  barIcon: {
    width: '80px',
    color: 'lightgray',
    // position: 'relative',
    // top: '20px',
  },
}));

// tabs

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

// const events = [
//   {
//     id: 0,
//     title: "All Day Event very long title",
//     allDay: true,
//     start: new Date(2022, 6, 1),
//     end: new Date(2022, 6, 5)
//   },
//   {
//     id: 1,
//     title: "Long Event",
//     start: new Date(2022, 6, 1),
//     end: new Date(2022, 6, 5)
//   },

//   {
//     id: 2,
//     title: "DTS STARTS",
//     start: new Date(2022, 6, 1),
//     end: new Date(2022, 6, 5)
//   },

//   {
//     id: 3,
//     title: "DTS ENDS",
//     start: new Date(2022, 6, 1),
//     end: new Date(2022, 6, 5)
//   },

//   {
//     id: 4,
//     title: "Some Event",
//     start: new Date(2015, 3, 9, 0, 0, 0),
//     end: new Date(2015, 3, 9, 0, 0, 0)
//   },
//   {
//     id: 5,
//     title: "Conference",
//     start: new Date(2015, 3, 11),
//     end: new Date(2015, 3, 13),
//     desc: "Big conference for important people"
//   },
//   {
//     id: 6,
//     title: "Meeting",
//     start: new Date(2015, 3, 12, 10, 30, 0, 0),
//     end: new Date(2015, 3, 12, 12, 30, 0, 0),
//     desc: "Pre-meeting meeting, to prepare for the meeting"
//   },
//   {
//     id: 7,
//     title: "Lunch",
//     start: new Date(2015, 3, 12, 12, 0, 0, 0),
//     end: new Date(2015, 3, 12, 13, 0, 0, 0),
//     desc: "Power lunch"
//   },
//   {
//     id: 8,
//     title: "Meeting",
//     start: new Date(2015, 3, 12, 14, 0, 0, 0),
//     end: new Date(2015, 3, 12, 15, 0, 0, 0)
//   },
//   {
//     id: 9,
//     title: "Happy Hour",
//     start: new Date(2015, 3, 12, 17, 0, 0, 0),
//     end: new Date(2015, 3, 12, 17, 30, 0, 0),
//     desc: "Most important meal of the day"
//   },
//   {
//     id: 10,
//     title: "Dinner",
//     start: new Date(2015, 3, 12, 20, 0, 0, 0),
//     end: new Date(2015, 3, 12, 21, 0, 0, 0)
//   },
//   {
//     id: 11,
//     title: "Birthday Party",
//     start: new Date(2015, 3, 13, 7, 0, 0),
//     end: new Date(2015, 3, 13, 10, 30, 0)
//   },
//   {
//     id: 12,
//     title: "Late Night Event",
//     start: new Date(2015, 3, 17, 19, 30, 0),
//     end: new Date(2015, 3, 18, 2, 0, 0)
//   },
//   {
//     id: 13,
//     title: "Multi-day Event",
//     start: new Date(2015, 3, 20, 19, 30, 0),
//     end: new Date(2015, 3, 22, 2, 0, 0)
//   },
//   {
//     id: 14,
//     title: "Today",
//     start: new Date(new Date().setHours(new Date().getHours() - 3)),
//     end: new Date(new Date().setHours(new Date().getHours() + 3))

//   }
// ];

const Dashboard = () => {
  // const [newEvent, setNewEvent] = useState({ title: "", start: "", end: "" });
  // const [allEvents, setAllEvents] = useState(events);

  // function handleAddEvent() {
  //     setAllEvents([...allEvents, newEvent]);
  // }

  const [chartdata, setCharData] = useState([
    { argument: '1', value: 0 },
    { argument: '2', value: 0 },
    { argument: '3', value: 0 },
    { argument: '4', value: 0 },
    { argument: '5', value: 0 },
    { argument: '6', value: 0 },
    { argument: '7', value: 0 },
    { argument: '8', value: 0 },
    { argument: '9', value: 0 },
    { argument: '10', value: 0 },
    { argument: '11', value: 0 },
    { argument: '12', value: 0 },
  ]);

  // const bookings = [
  //   new Date(2022, 9, 1),
  //   new Date(2022, 9, 2),
  //   new Date(2022, 9, 3),

  // ];

  const classes = useStyles();
  const [value, setValue] = React.useState('1');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  // const [dateState, setDateState] = useState(new Date());
  // const changeDate = (e) => {
  //   setDateState(e);
  // };

  const [activeCount, setActiveCount] = useState([]);

  const [activeHome, setActiveHome] = useState([]);
  const [amount, setAmount] = useState([]);

  const [bookings, setBookings] = useState([]);

  const [calEvents, setCalEvents] = useState([]);

  useEffect(() => {
    axios
      .get(process.env.REACT_APP_DEV_URL + '/api/auth/getActiveCount', {
        headers: {
          'x-auth-token': localStorage.getItem('access-token'),
        },
      })
      .then(res => {
        console.log('response data', res);
        setActiveCount(res.data);
      })
      .catch(error => {
        console.log(error);
      });

    axios
      .get(process.env.REACT_APP_DEV_URL + '/api/Booking/getHomeStayBookings', {
        headers: {
          'x-auth-token': localStorage.getItem('access-token'),
        },
      })
      .then(res => {
        console.log('response data', res);
        setActiveHome(res.data);
      })
      .catch(error => {
        console.log(error);
      });

    axios
      .get(process.env.REACT_APP_DEV_URL + '/api/Subscription/payementSum', {
        headers: {
          'x-auth-token': localStorage.getItem('access-token'),
        },
      })
      .then(res => {
        console.log(
          'response data------------->',
          res.data.payementSum[0].total_amount
        );
        setAmount(res.data.payementSum[0].total_amount);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    axios
      .get(process.env.REACT_APP_DEV_URL + '/api/booking/getBookingCalender', {
        headers: {
          'x-auth-token': localStorage.getItem('access-token'),
        },
      })
      .then(res => {
        console.log('response data----------------->>>>>>>>>>>>>>>>>>>', res);
        setBookings(res.data.getCalenderBookings);
      })

      .catch(error => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    const events = bookings.map((appointment, key) => {
      return {
        id: key,
        title:
          appointment.users?.first_name + ' ' + appointment.users?.last_name,
        start: new Date(appointment.start_date),
        end: new Date(appointment.end_date),
      };
    });
    console.log('events------------->', events);
    setCalEvents(events);
  }, [bookings]);
  const [modalShow, setModalShow] = React.useState(false);

  // const openModal = () => setModelOpen(true);
  // const closeModal = () => setModelOpen(false);
  return (
    <>
      <ActiveModal
        show={modalShow}
        onHide={() => setModalShow(false)}
        // closeModal={closeModal}
        chartdata={chartdata}
      />
      <div className="dashboard">
        {/* top container */}
        <Grid style={{ width: '100%' }} container spacing={10}>
          <Grid item xs={4}>
            <Paper className={classes.paper}>
              <Grid
                style={{ display: 'flex', alignItems: 'center' }}
                container
                wrap="nowrap"
                spacing={1}
              >
                <Grid item>
                  <Avatar
                    style={{ background: 'yellow' }}
                    className={classes.avatar}
                  >
                    <GroupRoundedIcon />
                  </Avatar>
                </Grid>
                <Grid item xs>
                  <Typography className={classes.number}>
                    {activeCount}
                  </Typography>
                  <Typography>active member</Typography>
                </Grid>
                <Grid
                  item
                  className={classes.barIcon}
                  onClick={() => setModalShow(true)}
                >
                  <i className="fa-solid fa-chart-simple fa-2xl"></i>
                </Grid>
              </Grid>
            </Paper>
          </Grid>
          <Grid item xs={4}>
            <Paper className={classes.paper}>
              <Grid
                style={{ display: 'flex', alignItems: 'center' }}
                container
                wrap="nowrap"
                spacing={1}
              >
                <Grid item>
                  <Avatar
                    style={{ background: '#47af0d' }}
                    className={classes.avatar}
                  >
                    <SendRoundedIcon />
                  </Avatar>
                </Grid>
                <Grid item xs>
                  <Typography className={classes.number}>
                    {activeHome}
                  </Typography>
                  <Typography>home stay bookings</Typography>
                </Grid>
                <Grid item className={classes.barIcon}>
                  <i className="fa-solid fa-chart-simple fa-2xl"></i>
                </Grid>
              </Grid>
            </Paper>
          </Grid>
          <Grid item xs={4}>
            <Paper className={classes.paper}>
              <Grid
                style={{ display: 'flex', alignItems: 'center' }}
                container
                wrap="nowrap"
                spacing={1}
              >
                <Grid item>
                  <Avatar
                    style={{ background: '#4bc2f1' }}
                    className={classes.avatar}
                  >
                    <AttachMoneyIcon />
                  </Avatar>
                </Grid>
                <Grid item xs>
                  <Typography className={classes.number}>{amount}</Typography>
                  <Typography>Total Earnings</Typography>
                </Grid>
                <Grid item className={classes.barIcon}>
                  <i className="fa-solid fa-chart-simple fa-2xl"></i>
                </Grid>
              </Grid>
            </Paper>
          </Grid>
        </Grid>
        {/* bottom containers */}
        <div className="dashboard-container">
          <div className="tabClass dashboard_tab">
            <ul
              className="nav nav-tabs "
              id="myTab"
              role="tablist"
              // style={{ marginLeft: '-31px' }}
            >
              <li className="nav-item" role="presentation">
                <button
                  className="nav-link active"
                  id="Profile_Request-tab"
                  data-bs-toggle="tab"
                  data-bs-target="#Profile_Request"
                  type="button"
                  role="tab"
                  aria-controls="Profile_Request"
                  aria-selected="true"
                >
                  Profile Request
                </button>
              </li>
              <li className="nav-item" role="presentation">
                <button
                  className="nav-link"
                  id="Photo_Request-tab"
                  data-bs-toggle="tab"
                  data-bs-target="#Photo_Request"
                  type="button"
                  role="tab"
                  aria-controls="Photo_Request"
                  aria-selected="false"
                >
                  Photo Request
                </button>
              </li>
              <li className="nav-item" role="presentation">
                <button
                  className="nav-link"
                  id="incomplete-registration-tab"
                  data-bs-toggle="tab"
                  data-bs-target="#incomplete_registration"
                  type="button"
                  role="tab"
                  aria-controls="incomplete_registration"
                  aria-selected="false"
                >
                  Incomplete Registration
                </button>
              </li>
            </ul>
            <hr
              style={{
                width: '95%',
                height: '3px',
                color: 'gray',
                // position: 'relative',
                // right: '25px',
              }}
            />
            <div className="tab-content" id="myTabContent">
              <div
                className="tab-pane fade show active"
                id="Profile_Request"
                role="tabpanel"
                aria-labelledby="Profile_Request-tab"
              >
                <ProfileRequest />
              </div>
              <div
                className="tab-pane fade"
                id="Photo_Request"
                role="tabpanel"
                aria-labelledby="Photo_Request-tab"
              >
                <PhotoRequest />
              </div>
              <div
                className="tab-pane fade"
                id="incomplete_registration"
                role="tabpanel"
                aria-labelledby="incomplete-registration-tab"
              >
                <IncompleteRegistration />
              </div>
            </div>
          </div>
          <div className="calender-main">
            <div
              className="calender-text"
              style={{
                height: '30px',
                fontSize: '20px',
                fontWeight: 'bold',
              }}
            >
              Booking Calender
            </div>
            <hr
              style={{
                width: '95%',
                height: '3px',
                color: 'gray',
              }}
            />
            <Calendar
              eventPropGetter={(event, start, end, isSelected) => {
                let newStyle = {
                  backgroundColor: '#47af0d',
                  color: 'black',
                  borderRadius: '0px',
                  border: 'none',
                };

                if (event.isMine) {
                  newStyle.backgroundColor = 'lightgreen';
                }

                return {
                  className: '',
                  style: newStyle,
                };
              }}
              localizer={localizer}
              events={calEvents}
              views={{
                day: true,

                month: true,
              }}
              startAccessor="start"
              endAccessor="end"
              // style={{ height: '100%', width: '500px' }}
            />
          </div>
        </div>
        {/* <Grid container>
        <Grid item xs={7}>
          <Paper className="Profile_request">
            
          </Paper>
        </Grid>
        <Grid item xs={5}>
          <Paper className="booking_calander">
            <span
              style={{
                position: 'relative',
                bottom: '35px',
                right: '150px',
                fontSize: '20px',
                fontWeight: '600',
              }}
            >
              Booking calendar
            </span>
            <hr
              style={{
                width: '480px',
                height: '3px',
                position: 'relative',
                bottom: '26px',
                color: 'black',
              }}
            />

            <Calendar
              localizer={localizer}
              events={calEvents}
              views={{
                day: true,

                month: true,
              }}
              startAccessor="start"
              endAccessor="end"
              style={{ height: '100%', width: '500px' }}
            />
          </Paper>
        </Grid>
      </Grid> */}
      </div>
    </>
  );
};

export default Dashboard;
{
  /* <Calendar
              className="calender"
              value={dateState}
              onChange={changeDate}
              defaultValue={bookings}
            /> */
}
