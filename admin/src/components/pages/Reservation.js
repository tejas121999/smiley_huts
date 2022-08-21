import React, { useEffect, useState } from 'react';
import { Avatar, Container, Grid, Paper, Typography } from '@material-ui/core';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import GroupRoundedIcon from '@material-ui/icons/GroupRounded';
import '../layout/css/reservation.css';
import UpcomingBooking from './tables/Reservation/UpcomingBooking';
import DeclinedBooking from './tables/Reservation/DeclinedBooking';
import CompleteBooking from './tables/Reservation/CompleteBooking';
import PendingBooking from './tables/Reservation/PendingBookings';
import axios from 'axios';

const useStyles = makeStyles(theme => ({
  paper: {
    padding: theme.spacing(2),
    margin: '30px',
    width: '110%',
    textAlign: 'center',
    color: theme.palette.text.secondary,
    position: 'relative',
    right: '50px',
    borderRadius: '15px',
    boxShadow: '0px 23px 32px rgba(5, 51, 112, 0.05)',
  },
  avatar: {
    background: '#212121',
    width: '50px',
    height: '50px',
    position: 'relative',
    top: '10px',
  },
  number: {
    fontSize: '30px',
    fontWeight: '600',
    color: '#000000',
  },
  barIcon: {
    width: '80px',
    // position: 'relative',
    // top: '20px',
    color: 'lightgray',
  },
}));

const Reservation = () => {
  const classes = useStyles();

  const [getUpCounts, setUpCounts] = useState([]);
  const [declineCounts, setDeclineCounts] = useState([]);
  const [completeCounts, setCompleteCounts] = useState([]);

  useEffect(() => {
    axios
      .get(process.env.REACT_APP_DEV_URL + '/api/Booking/getUpcomingCounts', {
        headers: {
          'x-auth-token': `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MjgsImlhdCI6MTY1NDA3ODEzM30.FNfBFklZCDm39ZGicsuQuICMXarIhQh7BmUZ9m_8n7U`,
        },
      })
      .then(res => {
        console.log('response data1', res);
        setUpCounts(res.data);
      })
      .catch(error => {
        console.log(error);
      });

    axios
      .get(process.env.REACT_APP_DEV_URL + '/api/Booking/getDeclineCount', {
        headers: {
          'x-auth-token': `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MjgsImlhdCI6MTY1NDA3ODEzM30.FNfBFklZCDm39ZGicsuQuICMXarIhQh7BmUZ9m_8n7U`,
        },
      })
      .then(res => {
        console.log('response data2', res);
        setDeclineCounts(res.data);
      })
      .catch(error => {
        console.log(error);
      });

    axios
      .get(process.env.REACT_APP_DEV_URL + '/api/Booking/getCompleteCount', {
        headers: {
          'x-auth-token': `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MjgsImlhdCI6MTY1NDA3ODEzM30.FNfBFklZCDm39ZGicsuQuICMXarIhQh7BmUZ9m_8n7U`,
        },
      })
      .then(res => {
        console.log('response data3', res);
        setCompleteCounts(res.data);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  return (
    <div>
      <Grid
        container
        spacing={10}
        style={{ width: '100%' }}
        className="member_main1"
      >
        {/* <Grid item xs={4}>
          <Paper className={classes.paper}>
            <Grid container wrap="nowrap" spacing={1}>
              <Grid item>
                <Avatar className={classes.avatar}>
                  <GroupRoundedIcon />
                </Avatar>
              </Grid>
              <Grid item xs>
                <Typography className={classes.number}>
                  {getUpCounts}
                </Typography>
                <Typography>Upcomings Bookings</Typography>
              </Grid>
              <Grid item className={classes.barIcon}>
                <i className="fa-solid fa-chart-simple fa-2xl"></i>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
        <Grid item xs={4}>
          <Paper className={classes.paper}>
            <Grid container wrap="nowrap" spacing={1}>
              <Grid item>
                <Avatar className={classes.avatar}>
                  <GroupRoundedIcon />
                </Avatar>
              </Grid>
              <Grid item xs>
                <Typography className={classes.number}>
                  {completeCounts}
                </Typography>
                <Typography>Completed Bookings</Typography>
              </Grid>
              <Grid item className={classes.barIcon}>
                <i className="fa-solid fa-chart-simple fa-2xl"></i>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
        <Grid item xs={4}>
          <Paper className={classes.paper}>
            <Grid container wrap="nowrap" spacing={1}>
              <Grid item>
                <Avatar className={classes.avatar}>
                  <GroupRoundedIcon />
                </Avatar>
              </Grid>
              <Grid item xs>
                <Typography className={classes.number}>
                  {declineCounts}
                </Typography>
                <Typography>Declined Bookings</Typography>
              </Grid>
              <Grid item className={classes.barIcon}>
                <i className="fa-solid fa-chart-simple fa-2xl"></i>
              </Grid>
            </Grid>
          </Paper>
        </Grid> */}

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
                  {/* {activeMcount} */}
                  {getUpCounts}
                </Typography>
                <Typography>Upcoming Bookings</Typography>
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
              container
              style={{ display: 'flex', alignItems: 'center' }}
              wrap="nowrap"
              spacing={1}
            >
              <Grid item>
                <Avatar
                  style={{ background: '#47af0d' }}
                  className={classes.avatar}
                >
                  <GroupRoundedIcon />
                </Avatar>
              </Grid>
              <Grid item xs>
                <Typography className={classes.number}>
                  {/* {activeMcount} */}
                  {declineCounts}
                </Typography>
                <Typography>Declined Bookings</Typography>
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
                  <GroupRoundedIcon />
                </Avatar>
              </Grid>
              <Grid item xs>
                <Typography className={classes.number}>
                  {/* {activeMcount} */}
                  {completeCounts}
                </Typography>
                <Typography>Completed Bookings</Typography>
              </Grid>
              <Grid item className={classes.barIcon}>
                <i className="fa-solid fa-chart-simple fa-2xl"></i>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
      {/* </Grid> */}
      <Grid container>
        <Grid item xs={12}>
          <Paper className="reservation">
            <div className="tabClass">
              <ul
                className="nav nav-tabs"
                id="myTab"
                role="tablist"
                style={{ height: '40px', marginTop: '10px' }}
              >
                <li className="nav-item" role="presentation">
                  <button
                    className="nav-link active"
                    id="Upcoming_Booking-tab"
                    data-bs-toggle="tab"
                    data-bs-target="#Upcoming_Booking"
                    type="button"
                    role="tab"
                    aria-controls="Upcoming_Booking"
                    aria-selected="true"
                  >
                    Upcoming Booking
                  </button>
                </li>
                <li className="nav-item" role="presentation">
                  <button
                    className="nav-link"
                    id="Pending_Booking-tab"
                    data-bs-toggle="tab"
                    data-bs-target="#Pending_Booking"
                    type="button"
                    role="tab"
                    aria-controls="Pending_Booking"
                    aria-selected="true"
                  >
                    Pending Booking
                  </button>
                </li>
                <li className="nav-item" role="presentation">
                  <button
                    className="nav-link"
                    id="Declined_Booking-tab"
                    data-bs-toggle="tab"
                    data-bs-target="#Declined_Booking"
                    type="button"
                    role="tab"
                    aria-controls="Declined_Booking"
                    aria-selected="false"
                  >
                    Declined Booking
                  </button>
                </li>
                <li className="nav-item" role="presentation">
                  <button
                    className="nav-link"
                    id="Completed_Bookings-tab"
                    data-bs-toggle="tab"
                    data-bs-target="#Completed_Bookings"
                    type="button"
                    role="tab"
                    aria-controls="Completed_Bookings"
                    aria-selected="false"
                  >
                    Completed Bookings
                  </button>
                </li>
              </ul>
              <hr
                style={{
                  width: '98%',
                  height: '3px',
                  color: 'black',
                  position: 'relative',
                  left: '10px',
                }}
              />
              <div className="tab-content" id="myTabContent">
                <div
                  className="tab-pane fade show active"
                  id="Upcoming_Booking"
                  role="tabpanel"
                  aria-labelledby="Upcoming_Booking-tab"
                >
                  <UpcomingBooking />
                </div>
                <div
                  className="tab-pane fade show active"
                  id="Pending_Booking"
                  role="tabpanel"
                  aria-labelledby="Pending_Booking-tab"
                >
                  <PendingBooking />
                </div>
                <div
                  className="tab-pane fade"
                  id="Declined_Booking"
                  role="tabpanel"
                  aria-labelledby="Declined_Booking-tab"
                >
                  <DeclinedBooking />
                </div>
                <div
                  className="tab-pane fade"
                  id="Completed_Bookings"
                  role="tabpanel"
                  aria-labelledby="Completed_Bookings-tab"
                >
                  <CompleteBooking />
                </div>
              </div>
            </div>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
};

export default Reservation;
