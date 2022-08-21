import React, { useEffect, useState } from 'react';
import '../layout/css/createCampaigns.css';
import ActiveUserTable from '../pages/forms/create campaigns from/ActiveUserTable';
import DeactivatedMembersTable from '../pages/forms/create campaigns from/DeactivatedMembersTable';
import CustomSelectionTable from '../pages/forms/create campaigns from/CustomSelectionTable';
import Email from './forms/create campaigns from/Email';
import Shedule from '../pages/forms/create campaigns from/Shedule';
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import axios from 'axios';

const CreateCampaigns = () => {
  const [value, setValue] = useState('active');
  const [email, setEmail] = useState('single');
  const [longDesc, setLongDesc] = useState('');
  const [emailTitle, setEmailTitle] = useState('');
  console.log(value);

  const [nextStape, setNextStape] = useState(1);

  const handleNextStape = () => {
    setNextStape(nextStape + 1);
  };

  const handlePrevStape = () => {
    setNextStape(nextStape - 1);
  };

  console.log(nextStape);

  console.log(value);

  const [users, setUsers] = useState([]);
  const [active, setActive] = useState([]);
  const [inActive, setInActive] = useState([]);

  useEffect(() => {
    const activeUsers = users.filter(user => user.isActive);
    const inActiveUsers = users.filter(user => !user.isActive);
    setActive(activeUsers);
    setInActive(inActiveUsers);
  }, []);

  // useEffect(() => {
  //   const getActiveUsers = async () => {
  //     const res = await axios.get('http://api.smileyhuts.com/api/auth/getActive', {
  //       headers: {
  //         'x-auth-token':
  //           'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MjgsImlhdCI6MTY1NDA2MzI3N30.m2a26rvLm1yMErLovWMeZQhcQXlTrQOEdangNw-E3Ss',
  //       },
  //     });
  //     console.log(res.data);
  //   };
  //   getActiveUsers();
  // }, []);

  useEffect(() => {
    const getUsers = async () => {
      const res = await axios.get(
        process.env.REACT_APP_DEV_URL + '/api/auth/getProfile',
        {
          headers: {
            'x-auth-token':
              'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MjgsImlhdCI6MTY1NDA2MzI3N30.m2a26rvLm1yMErLovWMeZQhcQXlTrQOEdangNw-E3Ss',
          },
        }
      );
      setUsers(res.data);
    };
    getUsers();
  }, []);

  const sendEmail = async () => {
    const res = await axios.post(
      process.env.REACT_APP_DEV_URL + '/api/campaigns/scheduleCampaign',
      {
        users: active,
        emailTitle,
        longDesc,
      },
      {
        headers: {
          'x-auth-token':
            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MjgsImlhdCI6MTY1NDA2MzI3N30.m2a26rvLm1yMErLovWMeZQhcQXlTrQOEdangNw-E3Ss',
        },
      }
    );
    console.log(res);
  };
  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 90 },
    {
      field: 'first_name',
      headerName: 'First name',
      width: 150,
    },
    {
      field: 'email',
      headerName: 'Email',
      width: 300,
    },
    {
      field: 'Total guests hosted',
      headerName: 'Total guests hosted',
      width: 150,
    },
    {
      field: 'Total Bookings',
      headerName: 'bookings',
      width: 200,
      valueGetter: (params: GridValueGetterParams) =>
        `${params.row.firstName || ''} ${params.row.lastName || ''}`,
    },
  ];

  // <span className="CreateCamapigns_title">Create Campaigns</span>
  // <hr
  //   style={{
  //     width: '98%',
  //     height: '3px',
  //     color: 'black',
  //     position: 'absolute',
  //     top: '45px',
  //   }}
  // />
  // <button className="btn btn-outline-dark save_draft">Save Draft</button>

  console.log(users);
  return (
    <div style={{ background: '#EFEFEF', padding: '50px', height: '100vh' }}>
      <div className="create_campa">
        <div className="progressBar" style={{ margin: '20px auto' }}>
          <span>Recipients</span>&nbsp;-------&nbsp;<span>Email</span>
          &nbsp;-------&nbsp;<span>Schedule</span>
        </div>
        {nextStape == 1 ? (
          <>
            <input
              type="text"
              className="campaign-input"
              placeholder="Campaign Title"
            />
            <h4 className="campaign-title">Select Recipients</h4>
            <div>
              <input
                className="radio-input"
                type="radio"
                value="active"
                checked={value === 'active'}
                onChange={e => setValue(e.target.value)}
                name="recipient"
              />
              <label className="radio-label">Active Members</label>
              <input
                className="radio-input"
                type="radio"
                checked={value === 'inActive'}
                value="inActive"
                onChange={e => setValue(e.target.value)}
                name="recipient"
              />
              <label className="radio-label">Inactive Members</label>
              <input
                className="radio-input"
                type="radio"
                value="custom"
                checked={value === 'custom'}
                onChange={e => setValue(e.target.value)}
                name="recipient"
              />
              <label className="radio-label">Custom Selection</label>
              {/* <div className="search">
                <input type="text" placeholder="Search here.." />
                <i class="fa-solid fa-magnifying-glass"></i>
              </div> */}
              {value === 'custom' && (
                <div>
                  <div style={{ height: 400, width: '100%' }}>
                    <DataGrid
                      rows={users}
                      columns={columns}
                      pageSize={5}
                      rowsPerPageOptions={[5]}
                      checkboxSelection
                      disableSelectionOnClick
                    />
                  </div>
                  {/* {users.map(user => {
                  return (
                    <div className="users">
                      <div className="name">{user.first_name}</div>
                      <div className="email">{user.email}</div>
                      <div className="hosted">total hosted guests</div>
                      <div className="bookings">total bookings</div>
                      <div className="user-checkbox">
                        <input type="checkbox" name="" id="" />
                      </div>
                    </div>
                  );
                })} */}
                </div>
              )}
            </div>
          </>
        ) : nextStape == 2 ? (
          <Email
            setEmailType={setEmail}
            email={email}
            longDesc={longDesc}
            setEmailTitle={setEmailTitle}
            setLongDesc={setLongDesc}
            emailTitle={emailTitle}
          />
        ) : nextStape == 3 ? (
          <Shedule
            value={value}
            email={email}
            longDesc={longDesc}
            emailTitle={emailTitle}
          />
        ) : null}
        <button
          className="btn btn-outline-dark"
          disabled={nextStape < 2}
          onClick={handlePrevStape}
        >
          Previous
        </button>{' '}
        {nextStape == 3 ? (
          <button className="btn btn-green" onClick={sendEmail}>
            Schedule
          </button>
        ) : (
          <button className="btn btn-green" onClick={handleNextStape}>
            Next
          </button>
        )}
      </div>
    </div>
  );
};

export default CreateCampaigns;

{
  /* <div className="tabClass create_campaigns_tab">
            <ul className="nav nav-tabs" id="myTab" role="tablist">
              <li className="nav-item" role="presentation">
                <button
                  className="nav-link active"
                  id="home-tab"
                  data-bs-toggle="tab"
                  data-bs-target="#home"
                  type="button"
                  role="tab"
                  aria-controls="home"
                  aria-selected="true"
                >
                  Active Members
                </button>
              </li>
              <li className="nav-item" role="presentation">
                <button
                  className="nav-link"
                  id="profile-tab"
                  data-bs-toggle="tab"
                  data-bs-target="#profile"
                  type="button"
                  role="tab"
                  aria-controls="profile"
                  aria-selected="false"
                >
                  Deactivated members
                </button>
              </li>
              <li className="nav-item" role="presentation">
                <button
                  className="nav-link"
                  id="contact-tab"
                  data-bs-toggle="tab"
                  data-bs-target="#contact"
                  type="button"
                  role="tab"
                  aria-controls="contact"
                  aria-selected="false"
                >
                  Custom Selection
                </button>
              </li>
            </ul>
            <div className="tab-content Create_Camp_content" id="myTabContent">
              <div
                className="tab-pane fade show active"
                id="home"
                role="tabpanel"
                aria-labelledby="home-tab"
              >
                <ActiveUserTable />
              </div>
              <div
                className="tab-pane fade"
                id="profile"
                role="tabpanel"
                aria-labelledby="profile-tab"
              >
                <DeactivatedMembersTable />
              </div>
              <div
                className="tab-pane fade CustomSelectionTable"
                id="contact"
                role="tabpanel"
                aria-labelledby="contact-tab"
              >
                {' '}
                <CustomSelectionTable />
              </div>
            </div>
          </div> */
}
