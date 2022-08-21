import { Avatar } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import '../../layout/css/dashboard.css';
import dummy from '../../layout/images/dummy-img-man.png';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import axios from 'axios';
import { DataGrid } from '@mui/x-data-grid';
import Box from '@mui/material/Box';

const ProfileRequest = () => {
  const [profile, setProfile] = useState([]);

  useEffect(() => {
    axios
      .get(
        process.env.REACT_APP_DEV_URL + '/api/property/getAllPropertyAdmin',
        {
          headers: {
            'x-auth-token': localStorage.getItem('access-token'),
          },
        }
      )
      .then(res => {
        console.log(
          'response data=======================',
          res.data.getAllprop
        );
        setProfile(res.data.getAllprop);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  const handleAccept = (prop_id, Approve) => {
    axios
      .post(
        process.env.REACT_APP_DEV_URL + '/api/property/isApproved',
        { id: prop_id, isApproved: Approve },
        {
          headers: {
            'x-auth-token': localStorage.getItem('access-token'),
          },
        }
      )
      .then(res => {
        console.log('value updated');
        axios
          .get(
            process.env.REACT_APP_DEV_URL + '/api/property/getAllPropertyAdmin',
            {
              headers: {
                'x-auth-token': localStorage.getItem('access-token'),
              },
            }
          )
          .then(res => {
            console.log('response data', res.data.getAllprop);
            setProfile(res.data.getAllprop);
          })
          .catch(error => {
            console.log(error);
          });
      })
      .catch(error => {
        console.log(error);
      });
  };

  const columns = [
    {
      field: 'id',
      headerName: 'ID',
      width: 60,
      align: 'left',
      headerAlign: 'left',
    },
    // {
    //   field: 'firstName',
    //   headerName: 'Full Name',
    //   width: 150,
    //   editable: true,
    // },
    {
      field: 'users.lastName',
      headerName: 'Full name',
      // width: 200,
      flex: 1,
      align: 'left',
      headerAlign: 'left',
      // editable: true,
      renderCell: function (d) {
        return (
          <div>
            <span
            // variant="contained"
            // className="mr1"
            // onClick={() => handleShare(d.row)}
            >
              {d.row.users.first_name + ' ' + d.row.users.last_name}
            </span>
          </div>
        );
      },
    },

    {
      field: 'prop_type',
      headerName: 'Property Type',
      type: 'number',
      // width: 150,
      // editable: true,
      flex: 1,
      align: 'left',
      headerAlign: 'left',
    },
    {
      field: 'prop_address',
      headerName: 'Address',
      // type: 'number',
      // width: 400,
      flex: 2,
      align: 'left',
      headerAlign: 'left',
      // editable: true,
    },
    {
      field: '',
      headerName: '',
      // width: 150,
      flex: 1,
      align: 'center',
      headerAlign: 'center',
      // editable: true,
      renderCell: function (d) {
        return (
          <div>
            {d.row.users.isApproved != 1 && (
              <button
                // variant="contained"
                className="btn btn-outline-dark"
                // className="mr1"
                onClick={() => handleAccept(d.row.id, -1)}
              >
                {/* {d.row.users.first_name + ' ' + d.row.users.last_name} */}
                {d.row.users.isApproved == -1 ? 'Rejected' : 'Reject'}
              </button>
            )}
            {d.row.users.isApproved != -1 && (
              <button
                className="btn btn-green"
                onClick={() => handleAccept(d.row.id, 1)}
              >
                {/* {d.row.users.first_name + ' ' + d.row.users.last_name} */}
                {/* Reject */}
                {d.row.users.isApproved == 1 ? 'Accepted' : 'Accept'}
              </button>
            )}
          </div>
        );
      },
    },
    // {
    //   field: ' ',
    //   headerName: '  ',
    //   width: 150,
    //   // editable: true,
    //   renderCell: function (d) {
    //     return <div></div>;
    //   },
    // },
    // {
    //   field: 'prop_address',
    //   headerName: 'Address',
    //   description: 'This column has a value getter and is not sortable.',
    //   sortable: false,
    //   width: 160,
    //   valueGetter: params =>
    //     `${params.row.firstName || ''} ${params.row.lastName || ''}`,
    // },
  ];

  // const rows = [
  //   { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
  //   { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
  //   { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
  //   { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
  //   { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
  //   { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
  //   { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
  //   { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
  //   { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
  // ];

  return (
    <div className="table_body_profile">
      <TableContainer>
        <Box sx={{ height: '60vh', width: '100%' }}>
          <DataGrid
            // initialState={{
            //   sorting: {
            //     sortModel: [{ field: 'created_at', sort: 'desc' }],
            //   },
            // }}
            // TextAlignment="Center"
            rows={profile}
            columns={columns}
            pageSize={10}
            rowsPerPageOptions={[5]}
            // checkboxSelection
            disableSelectionOnClick
          />
        </Box>
      </TableContainer>
    </div>
  );
};

export default ProfileRequest;

{
  /* <Table className="profile_table">
<TableBody>
  {profile.map((prop, key) => (
    <TableRow>
      <TableCell>
        <div className="d-flex align-center">
          <div className="mr-1">
            <img
              src={
                process.env.REACT_APP_DEV_URL +
                '/profile_images/' +
                prop.users.user_img
              }
              className="dummy_img"
              style={{ width: '30px', height: '30px' }}
            />
          </div>

          <div className="d-flex flex-column">
            <div>
              <span style={{ fontSize: '17px', fontWeigt: '600' }}>
                {prop.users.first_name} {prop.users.last_name}
              </span>
            </div>

            <div>
              <span style={{ fontSize: '8px', color: 'gray' }}>
                {prop.users.createdAt}
              </span>
            </div>
          </div>
        </div>
      </TableCell> */
}
{
  /*<TableCell
                        style={{ position: "relative", right: "75px", top: "2px" }}
                      >
                        <span style={{ fontSize: "20px", fontWeigt: "600" }}>
                          {prop.users.first_name} {prop.users.last_name}
                        </span>
                        <br />
                        <span style={{ fontSize: "8px", color: "gray" }}>
                          {prop.users.createdAt}
                        </span>
                      </TableCell>*/
}
{
  /* <TableCell
        style={{
          // position: 'relative',
          // right: '60px',
          color: 'gray',
          fontSize: '10px',
        }}
      >
        {prop.prop_type}
      </TableCell>
      <TableCell
        style={{
          position: 'relative',
          right: '40px',
          color: 'gray',
          fontSize: '10px',
        }}
      >
        {prop.prop_address}
      </TableCell>
      <TableCell>
        {prop.users?.isApproved == -1 && (
          <button
            className="btn btn-outline-dark"
            onClick={() => handleAccept(prop.id, -1)}
          >
            {prop.users?.isApproved == -1 ? 'Rejected' : 'Reject'}
          </button>
        )}
        {prop.users?.isApproved == 0 && (
          <button
            className="btn btn-outline-dark"
            onClick={() => handleAccept(prop.id, -1)}
          >
            {prop.users?.isApproved == -1 ? 'Rejected' : 'Reject'}
          </button>
        )}
        &nbsp;
        {prop.users.isApproved !== -1 && (
          <button
            className="btn btn-dark"
            onClick={() => handleAccept(prop.id, 1)}
          >
            {prop.users?.isApproved == false ? 'Accept' : 'Accepted'}
          </button>
        )}
      </TableCell>
    </TableRow>
  ))}
</TableBody>
</Table> */
}
