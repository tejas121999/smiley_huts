import React, { useEffect, useState } from 'react';
import DummyImg from '../../../layout/images/dummy-img-man.png';
import '../../../layout/css/members.css';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import axios from 'axios';
import { DataGrid } from '@mui/x-data-grid';
import Box from '@mui/material/Box';
import ViewProfileModal from '../../Modal/ViewProfileModal';

const ActiveUser = () => {
  const [active, setActive] = useState([]);
  const [selectedUser, setSelectedUser] = useState();

  useEffect(() => {
    axios
      .get(process.env.REACT_APP_DEV_URL + '/api/auth/getActive', {
        headers: {
          'x-auth-token': `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MjgsImlhdCI6MTY1NDA3ODEzM30.FNfBFklZCDm39ZGicsuQuICMXarIhQh7BmUZ9m_8n7U`,
        },
      })
      .then(res => {
        console.log('response data', res.data);
        setActive(res.data);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  const columns = [
    { field: 'id', headerName: 'ID', width: 60 },
    // {
    //   field: 'firstName',
    //   headerName: 'Full Name',
    //   width: 150,
    //   editable: true,
    // },
    {
      field: 'lastName',
      headerName: 'Full name',
      // width: 200,
      // editable: true,
      flex: 1,
      align: 'center',
      headerAlign: 'center',
      renderCell: function (d) {
        return (
          <div>
            <span>{d.row.first_name + ' ' + d.row.last_name}</span>
          </div>
        );
      },
    },
    // {
    //   field: 'first_name',
    //   headerName: 'Full name1',
    //   width: 200,
    //   editable: true,
    //   renderCell: function (d) {
    //     return (
    //       <div>
    //         <span>{d.row.first_name + ' ' + d.row.last_name}</span>
    //       </div>
    //     );
    //   },
    // },

    {
      field: '',
      headerName: 'Total Hosted',
      // width: 150,
      flex: 1,
      align: 'center',
      headerAlign: 'center',
      // editable: true,
      renderCell: function (d) {
        return <span>Total Hosted Guests</span>;
      },
    },
    {
      field: ' ',
      headerName: 'Total Bookings',
      // width: 150,
      flex: 1,
      align: 'center',
      headerAlign: 'center',
      // editable: true,
      renderCell: function (d) {
        return <span>Total Bookings</span>;
      },
    },

    {
      field: '  ',
      headerName: '  ',
      // width: 150,
      flex: 1,
      align: 'center',
      headerAlign: 'center',
      // editable: true,
      renderCell: function (d) {
        return (
          <div>
            <button
              onClick={() => {
                setSelectedUser(d.row);
                setViewProfileModal(true);
              }}
              className="btn btn-outline-dark"
            >
              View Details
            </button>
          </div>
        );
      },
    },
  ];
  const [viewProfileModal, setViewProfileModal] = useState(false);
  return (
    <>
      <ViewProfileModal
        user={selectedUser}
        show={viewProfileModal}
        onHide={() => setViewProfileModal(false)}
      />
      <TableContainer className="tableProfile1">
        <Box sx={{ height: '60vh', width: '100%' }}>
          <DataGrid
            // TextAlignment="Center"
            rows={active}
            columns={columns}
            pageSize={10}
            rowsPerPageOptions={[5]}
            // checkboxSelection
            disableSelectionOnClick
          />
        </Box>
      </TableContainer>
    </>
  );
};

export default ActiveUser;

{
  /* 
</TableContainer>
    <TableContainer className="tableProfile1">
      <Table
        // sx={{ minWidth: 750 }}
        aria-label="simple table"
        className="gestHostedTable"
      >
        <TableBody>
          {active.map((prop, key) => (
            <TableRow
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                <img src={DummyImg} style={{ width: '40px' }} />
              </TableCell>
              <TableCell component="th" scope="row">
                <span style={{ fontSize: '15px' }}>
                  {prop.first_name} {prop.last_name}
                </span>
                <br />
                <span style={{ fontSize: '12px', color: 'gray' }}>
                  {prop.email}
                </span>
              </TableCell>
              <TableCell
                align="right"
                style={{ fontSize: '12px', color: 'gray' }}
              >
                Total Guest Hosted
              </TableCell>
              <TableCell
                align="right"
                style={{ fontSize: '12px', color: 'gray' }}
              >
                Total Booking
              </TableCell>
              <TableCell
                align="right"
                style={{ fontSize: '12px', color: 'gray' }}
              >
                <button type="button" class="btn btn-outline-dark">
                  View Details
                </button>
              </TableCell>
            </TableRow>
          ))}

          <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
            <TableCell component="th" scope="row">
              <img src={DummyImg} style={{ width: '40px' }} />
            </TableCell>
            <TableCell
              component="th"
              scope="row"
              style={{ position: 'relative', right: '40px' }}
            >
              <span style={{ fontSize: '15px' }}>Sample name</span>
              <br />
              <span style={{ fontSize: '12px', color: 'gray' }}>Email</span>
            </TableCell>
            <TableCell
              align="right"
              style={{ fontSize: '12px', color: 'gray' }}
            >
              Total Guest Hosted
            </TableCell>
            <TableCell
              align="right"
              style={{ fontSize: '12px', color: 'gray' }}
            >
              Total Booking
            </TableCell>
            <TableCell
              align="right"
              style={{ fontSize: '12px', color: 'gray' }}
            >
              <button type="button" class="btn btn-outline-dark">
                View Details
              </button>
            </TableCell>
          </TableRow>
          <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
            <TableCell component="th" scope="row">
              <img src={DummyImg} style={{ width: '40px' }} />
            </TableCell>
            <TableCell
              component="th"
              scope="row"
              style={{ position: 'relative', right: '40px' }}
            >
              <span style={{ fontSize: '15px' }}>Sample name</span>
              <br />
              <span style={{ fontSize: '12px', color: 'gray' }}>Email</span>
            </TableCell>
            <TableCell
              align="right"
              style={{ fontSize: '12px', color: 'gray' }}
            >
              Total Guest Hosted
            </TableCell>
            <TableCell
              align="right"
              style={{ fontSize: '12px', color: 'gray' }}
            >
              Total Booking
            </TableCell>
            <TableCell
              align="right"
              style={{ fontSize: '12px', color: 'gray' }}
            >
              <button type="button" class="btn btn-outline-dark">
                View Details
              </button>
            </TableCell>
          </TableRow>
          <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
            <TableCell component="th" scope="row">
              <img src={DummyImg} style={{ width: '40px' }} />
            </TableCell>
            <TableCell
              component="th"
              scope="row"
              style={{ position: 'relative', right: '40px' }}
            >
              <span style={{ fontSize: '15px' }}>Sample name</span>
              <br />
              <span style={{ fontSize: '12px', color: 'gray' }}>Email</span>
            </TableCell>
            <TableCell
              align="right"
              style={{ fontSize: '12px', color: 'gray' }}
            >
              Total Guest Hosted
            </TableCell>
            <TableCell
              align="right"
              style={{ fontSize: '12px', color: 'gray' }}
            >
              Total Booking
            </TableCell>
            <TableCell
              align="right"
              style={{ fontSize: '12px', color: 'gray' }}
            >
              <button type="button" class="btn btn-outline-dark">
                View Details
              </button>
            </TableCell>
          </TableRow>
          <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
            <TableCell component="th" scope="row">
              <img src={DummyImg} style={{ width: '40px' }} />
            </TableCell>
            <TableCell
              component="th"
              scope="row"
              style={{ position: 'relative', right: '40px' }}
            >
              <span style={{ fontSize: '15px' }}>Sample name</span>
              <br />
              <span style={{ fontSize: '12px', color: 'gray' }}>Email</span>
            </TableCell>
            <TableCell
              align="right"
              style={{ fontSize: '12px', color: 'gray' }}
            >
              Total Guest Hosted
            </TableCell>
            <TableCell
              align="right"
              style={{ fontSize: '12px', color: 'gray' }}
            >
              Total Booking
            </TableCell>
            <TableCell
              align="right"
              style={{ fontSize: '12px', color: 'gray' }}
            >
              <button type="button" class="btn btn-outline-dark">
                View Details
              </button>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer> */
}
