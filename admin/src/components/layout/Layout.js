import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import jhon_doe from './images/dummy-img-man.png';
import { Avatar, Divider } from '@material-ui/core';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import DashboardIcon from '@material-ui/icons/Dashboard';
import GroupRoundedIcon from '@material-ui/icons/GroupRounded';
import SendRoundedIcon from '@material-ui/icons/SendRounded';
import HeadsetMicRoundedIcon from '@material-ui/icons/HeadsetMicRounded';
import LocalOfferRoundedIcon from '@material-ui/icons/LocalOfferRounded';
import MailIcon from '@material-ui/icons/Mail';
import StarIcon from '@material-ui/icons/Star';
import EditIcon from '@material-ui/icons/Edit';
import { useNavigate } from 'react-router-dom';
import './layout.css';
import { useAuth } from '../../members_components/hooks/useAuth';

const drawerWidth = 130;

const useStyles = makeStyles(theme => ({
  page: {
    // background: '#f9f9f9',
    width: '100%',
    // padding: theme.spacing(3),
    // backgroundColor: "#DCDCDC",
    // backgroundSize:"cover"
    // marginTop: "50px"
  },
  toolbar: theme.mixins.toolbar,
  root: {
    display: 'flex',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
  drawer: {
    width: drawerWidth,
    // flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerContainer: {
    overflow: 'auto',
    // padding: theme.spacing(1),
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  avatar: {
    marginLeft: theme.spacing(2),
  },
  icon: {
    position: 'relative',
    // left: "10px",
    justifyContent: 'center',
  },
  text: {
    position: 'relative',
    // left: "10px",
    justifyContent: 'center',
  },
  listItem: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
}));

const Layout = ({ children }) => {
  const { logout } = useAuth();
  const classes = useStyles();
  const navigate = useNavigate();

  const [modelOpen, setModelOpen] = useState(false);

  const openModal = () => setModelOpen(true);
  const closeModal = () => setModelOpen(false);

  const menuItem = [
    {
      text: 'Dashboard',
      icon: <DashboardIcon />,
      path: '/',
    },
    {
      text: 'Members',
      icon: <GroupRoundedIcon />,
      path: '/members',
    },
    {
      text: 'Reservation',
      icon: <SendRoundedIcon />,
      path: '/reservation',
    },
    {
      text: 'Support',
      icon: <HeadsetMicRoundedIcon />,
      path: '/support',
    },
    {
      text: 'Offers',
      icon: <LocalOfferRoundedIcon />,
      path: '/offers',
    },
    {
      text: 'Campaigns',
      icon: <MailIcon />,
      path: '/campaigns',
    },
    {
      text: 'Reviews',
      icon: <StarIcon />,
      path: '/Reviews',
    },
    {
      text: 'Subscription',
      icon: <EditIcon />,
      path: '/subscription',
    },
  ];

  const handleLogout = () => {
    localStorage.clear();
    logout();
    navigate('/');
  };

  const [selectedTab, setSelectedTab] = useState('Dashboard');

  const user = JSON.parse(localStorage.getItem('user_data'));

  return (
    <div className={classes.root}>
      {/*app bar*/}
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar style={{ display: 'flex', justifyContent: 'end' }}>
          <Typography
            className="notification"
            onClick={() => navigate('/notification')}
          >
            Notification
          </Typography>
          &nbsp; &nbsp; &nbsp;
          <Typography className="notification">
            {user.first_name + ' ' + user.last_name}
          </Typography>
          <Avatar className={classes.avatar} src={jhon_doe} />
          <a className="nav-link pointer" onClick={handleLogout}>
            <img
              style={{ height: '25px', width: '25px' }}
              src="./images/logout-svgrepo-com.png"
              className="logout-img"
            />
          </a>
        </Toolbar>
      </AppBar>
      {/*side bar*/}
      <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <Toolbar />
        <div className={classes.drawerContainer} style={{ marginTop: '30px' }}>
          <List>
            {menuItem.map(item => (
              <ListItem
                button
                className="listItem"
                key={item.text}
                onClick={() => {
                  navigate(item.path);
                  setSelectedTab(item.text);
                }}
                // className={location.pathname == item.path ? classes.active : null}
              >
                <div
                  className={`${
                    selectedTab === item.text && 'selected_dashboard_tab'
                  } item_list`}
                >
                  <ListItemIcon
                    className={`${
                      selectedTab === item.text && 'selected_dashboard_tab'
                    } icon`}
                  >
                    {item.icon}
                  </ListItemIcon>
                  <ListItemText className="text" primary={item.text} />
                </div>
              </ListItem>
            ))}
          </List>
        </div>
      </Drawer>

      <div className={classes.page}>
        <div className={classes.toolbar}></div>
        {children}
      </div>
    </div>
  );
};

export default Layout;
