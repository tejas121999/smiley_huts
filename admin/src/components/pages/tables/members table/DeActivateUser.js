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

const DeActivateUser = () => {
  const [deactive, setdeActive] = useState([]);

  const [selectedUser, setSelectedUser] = useState();
  useEffect(() => {
    axios
      .get(process.env.REACT_APP_DEV_URL + '/api/auth/deActive', {
        headers: {
          'x-auth-token': `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MjgsImlhdCI6MTY1NDA3ODEzM30.FNfBFklZCDm39ZGicsuQuICMXarIhQh7BmUZ9m_8n7U`,
        },
      })
      .then(res => {
        console.log('response data', res.data);
        setdeActive(res.data);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  const columns = [
    {
      field: 'id',
      headerName: 'ID',
      width: 60,
      align: 'center',
      headerAlign: 'center',
    },
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
            rows={deactive}
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
export default DeActivateUser;
