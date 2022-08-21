import React, { useEffect, useState } from 'react';
import { Avatar, Container, Grid, Paper, Typography } from '@material-ui/core';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import GroupRoundedIcon from '@material-ui/icons/GroupRounded';
import '../layout/css/members.css';
import AllUser from './tables/members table/AllUser';
import ActiveUser from './tables/members table/ActiveUser';
import DeActivateUser from './tables/members table/DeActivateUser';
import Top_Rated_Hosts from './tables/members table/Top_Rated_Hosts';
import Max_Gest_Hosted from './tables/members table/Max_Gest_Hosted';
import axios from 'axios';

import ProfileRequest from './tables/ProfileRequest';

const useStyles = makeStyles(theme => ({
  paper: {
    padding: theme.spacing(2),
    // margin: '30px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    textAlign: 'center',
    color: theme.palette.text.secondary,
    // position: 'relative',
    // right: '50px',
    borderRadius: '15px',
    boxShadow: '0px 23px 32px rgba(5, 51, 112, 0.05)',
  },
  avatar: {
    background: '#212121',
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
    // position: 'relative',
    // top: '20px',
    color: 'lightgray',
  },
}));

const Members = () => {
  const classes = useStyles();

  const [activeMcount, setaciveMcount] = useState([]);
  const [deActiveMcount, setdeActiveMcount] = useState([]);
  const [totalUsers, setTotalUsers] = useState([]);

  useEffect(() => {
    const getActiverMembers = async () => {
      const res = await axios.get(
        process.env.REACT_APP_DEV_URL + '/api/auth/getActiveCountMembers',
        {
          headers: {
            'x-auth-token': `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MjgsImlhdCI6MTY1NDA3ODEzM30.FNfBFklZCDm39ZGicsuQuICMXarIhQh7BmUZ9m_8n7U`,
          },
        }
      );
      setaciveMcount(res.data);
    };

    getActiverMembers();
  }, []);

  useEffect(() => {
    const getDeactiveMembers = async () => {
      const res = await axios.get(
        process.env.REACT_APP_DEV_URL + '/api/auth/getDeactiveCountMembers',
        {
          headers: {
            'x-auth-token': `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MjgsImlhdCI6MTY1NDA3ODEzM30.FNfBFklZCDm39ZGicsuQuICMXarIhQh7BmUZ9m_8n7U`,
          },
        }
      );
      setdeActiveMcount(res.data);
    };
    getDeactiveMembers();
  }, []);

  useEffect(() => {
    const getTotalMembers = async () => {
      const res = await axios.get(
        process.env.REACT_APP_DEV_URL + '/api/auth/getTotalUsers',
        {
          headers: {
            'x-auth-token': `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MjgsImlhdCI6MTY1NDA3ODEzM30.FNfBFklZCDm39ZGicsuQuICMXarIhQh7BmUZ9m_8n7U`,
          },
        }
      );
      setTotalUsers(res.data);
    };
    getTotalMembers();
  }, []);

  return (
    <div>
      <Grid
        style={{ width: '100%' }}
        className="member_main1"
        container
        spacing={10}
      >
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
                  {activeMcount}
                </Typography>
                <Typography>active member</Typography>
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
                  {deActiveMcount}
                </Typography>
                <Typography>Deactivated members</Typography>
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
                <Typography className={classes.number}>{totalUsers}</Typography>
                <Typography>Total Members</Typography>
              </Grid>
              <Grid item className={classes.barIcon}>
                <i className="fa-solid fa-chart-simple fa-2xl"></i>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
      <Grid container>
        <Grid item xs={8}>
          <Paper
            style={{ width: '100%', height: '100%' }}
            className="user_Table"
          >
            <div className="tabClass tab_class" style={{ width: '90%' }}>
              <ul
                className="nav nav-tabs"
                id="myTab"
                role="tablist"
                style={{
                  height: '45px',
                  width: 'fit-content',
                  marginLeft: '13px',
                }}
              >
                <li className="nav-item" role="presentation">
                  <button
                    className="nav-link active"
                    id="All_user-tab"
                    data-bs-toggle="tab"
                    data-bs-target="#All_user"
                    type="button"
                    role="tab"
                    aria-controls="All_user"
                    aria-selected="true"
                  >
                    All user
                  </button>
                </li>
                <li className="nav-item" role="presentation">
                  <button
                    className="nav-link"
                    id="Active_User-tab"
                    data-bs-toggle="tab"
                    data-bs-target="#Active_User"
                    type="button"
                    role="tab"
                    aria-controls="Active_User"
                    aria-selected="false"
                  >
                    Active User
                  </button>
                </li>
                <li className="nav-item" role="presentation">
                  <button
                    className="nav-link"
                    id="De-Activate_User-tab"
                    data-bs-toggle="tab"
                    data-bs-target="#De-Activate_User"
                    type="button"
                    role="tab"
                    aria-controls="De-Activate_User"
                    aria-selected="false"
                  >
                    De-Activate User
                  </button>
                </li>
              </ul>
              <hr
                style={{
                  width: '97%',
                  height: '3px',
                  color: 'black',
                  position: 'relative',
                  left: '10px',
                }}
              />
              <div className="tab-content" id="myTabContent">
                <div
                  className="tab-pane fade show active"
                  id="All_user"
                  role="tabpanel"
                  aria-labelledby="All_user-tab"
                >
                  <AllUser />
                </div>
                <div
                  className="tab-pane fade"
                  id="Active_User"
                  role="tabpanel"
                  aria-labelledby="Active_User-tab"
                >
                  <ActiveUser />
                </div>
                <div
                  className="tab-pane fade"
                  id="De-Activate_User"
                  role="tabpanel"
                  aria-labelledby="De-Activate_User-tab"
                >
                  <DeActivateUser />
                </div>
              </div>
            </div>
          </Paper>
        </Grid>
        <Grid item xs={4}>
          <Paper className="Top_rated_host">
            <div className="tabClass topratedhost">
              <ul
                className="nav nav-tabs"
                id="myTab"
                role="tablist"
                style={{ height: '45px' }}
              >
                <li className="nav-item" role="presentation">
                  <button
                    className="nav-link active"
                    id="Top_Rated_Hosts-tab"
                    data-bs-toggle="tab"
                    data-bs-target="#Top_Rated_Hosts"
                    type="button"
                    role="tab"
                    aria-controls="Top_Rated_Hosts"
                    aria-selected="true"
                  >
                    Top Rated Hosts
                  </button>
                </li>
                <li className="nav-item" role="presentation">
                  <button
                    className="nav-link"
                    id="Max_Guests_hosted-tab"
                    data-bs-toggle="tab"
                    data-bs-target="#Max_Guests_hosted"
                    type="button"
                    role="tab"
                    aria-controls="Max_Guests_hosted"
                    aria-selected="false"
                  >
                    Max Guests hosted
                  </button>
                </li>
              </ul>
              <hr
                style={{
                  width: '99%',
                  height: '3px',
                  color: 'black',
                  left: '20px',
                }}
              />
              <div
                className="tab-content"
                style={{ width: '100%' }}
                id="myTabContent"
              >
                <div
                  className="tab-pane fade show active"
                  id="Top_Rated_Hosts"
                  role="tabpanel"
                  aria-labelledby="Top_Rated_Hosts-tab"
                >
                  <Top_Rated_Hosts />
                </div>
                <div
                  className="tab-pane fade"
                  id="Max_Guests_hosted"
                  role="tabpanel"
                  aria-labelledby="Max_Guests_hosted-tab"
                >
                  <Max_Gest_Hosted />
                </div>
              </div>
            </div>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
};

export default Members;

{
  /* <Grid container spacing={10}>
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
          {activeMcount}
        </Typography>
        <Typography>active member</Typography>
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
          {deActiveMcount}
        </Typography>
        <Typography>Deactivated members</Typography>
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
        <Typography className={classes.number}>{totalUsers}</Typography>
        <Typography>Total Members</Typography>
      </Grid>
      <Grid item className={classes.barIcon}>
        <i className="fa-solid fa-chart-simple fa-2xl"></i>
      </Grid>
    </Grid>
  </Paper>
</Grid>
</Grid>
<Grid container>
<Grid item xs={8}>
  <Paper className="user_Table">
    <div className="tabClass tab_class">
      <ul
        className="nav nav-tabs"
        id="myTab"
        role="tablist"
        style={{
          height: '45px',
          width: 'fit-content',
          marginLeft: '13px',
        }}
      >
        <li className="nav-item" role="presentation">
          <button
            className="nav-link active"
            id="All_user-tab"
            data-bs-toggle="tab"
            data-bs-target="#All_user"
            type="button"
            role="tab"
            aria-controls="All_user"
            aria-selected="true"
          >
            All user
          </button>
        </li>
        <li className="nav-item" role="presentation">
          <button
            className="nav-link"
            id="Active_User-tab"
            data-bs-toggle="tab"
            data-bs-target="#Active_User"
            type="button"
            role="tab"
            aria-controls="Active_User"
            aria-selected="false"
          >
            Active User
          </button>
        </li>
        <li className="nav-item" role="presentation">
          <button
            className="nav-link"
            id="De-Activate_User-tab"
            data-bs-toggle="tab"
            data-bs-target="#De-Activate_User"
            type="button"
            role="tab"
            aria-controls="De-Activate_User"
            aria-selected="false"
          >
            De-Activate User
          </button>
        </li>
      </ul>
      <hr
        style={{
          width: '97%',
          height: '3px',
          color: 'black',
          position: 'relative',
          left: '10px',
        }}
      />
      <div className="tab-content" id="myTabContent">
        <div
          className="tab-pane fade show active"
          id="All_user"
          role="tabpanel"
          aria-labelledby="All_user-tab"
        >
          <AllUser />
        </div>
        <div
          className="tab-pane fade"
          id="Active_User"
          role="tabpanel"
          aria-labelledby="Active_User-tab"
        >
          <ActiveUser />
        </div>
        <div
          className="tab-pane fade"
          id="De-Activate_User"
          role="tabpanel"
          aria-labelledby="De-Activate_User-tab"
        >
          <DeActivateUser />
        </div>
      </div>
    </div>
  </Paper>
</Grid>
<Grid item xs={4}>
  <Paper className="Top_rated_host">
    <div className="tabClass topratedhost">
      <ul
        className="nav nav-tabs"
        id="myTab"
        role="tablist"
        style={{ height: '45px' }}
      >
        <li className="nav-item" role="presentation">
          <button
            className="nav-link active"
            id="Top_Rated_Hosts-tab"
            data-bs-toggle="tab"
            data-bs-target="#Top_Rated_Hosts"
            type="button"
            role="tab"
            aria-controls="Top_Rated_Hosts"
            aria-selected="true"
          >
            Top Rated Hosts
          </button>
        </li>
        <li className="nav-item" role="presentation">
          <button
            className="nav-link"
            id="Max_Guests_hosted-tab"
            data-bs-toggle="tab"
            data-bs-target="#Max_Guests_hosted"
            type="button"
            role="tab"
            aria-controls="Max_Guests_hosted"
            aria-selected="false"
          >
            Max Guests hosted
          </button>
        </li>
      </ul>
      <hr
        style={{
          width: '99%',
          height: '3px',
          color: 'black',
          left: '20px',
        }}
      />
      <div className="tab-content" id="myTabContent">
        <div
          className="tab-pane fade show active"
          id="Top_Rated_Hosts"
          role="tabpanel"
          aria-labelledby="Top_Rated_Hosts-tab"
        >
          <Top_Rated_Hosts />
        </div>
        <div
          className="tab-pane fade"
          id="Max_Guests_hosted"
          role="tabpanel"
          aria-labelledby="Max_Guests_hosted-tab"
        >
          <Max_Gest_Hosted />
        </div>
      </div>
    </div>
  </Paper>
</Grid>
</Grid> */
}
