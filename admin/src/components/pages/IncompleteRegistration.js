import React, { useEffect, useState } from 'react';
// import DummyImg from '../../../layout/images/dummy-img-man.png';
// import '../../../layout/css/members.css';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import axios from 'axios';
// import { allGridColumnsFieldsSelector } from '@mui/x-data-grid';
import { DataGrid } from '@mui/x-data-grid';
import Box from '@mui/material/Box';

const IncompleteRegistration = () => {
  const [allUsers, setAllUsers] = useState([]);
  const [unRegistered, setUnRegistered] = useState([]);

  useEffect(() => {
    axios
      .get(process.env.REACT_APP_DEV_URL + '/api/auth/getprofile', {
        headers: {
          'x-auth-token': `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MjgsImlhdCI6MTY1NDA3ODEzM30.FNfBFklZCDm39ZGicsuQuICMXarIhQh7BmUZ9m_8n7U`,
        },
      })
      .then(res => {
        console.log('response data', res.data);
        setAllUsers(res.data);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  const unReg = allUsers.filter(user => {
    return user.contact_number == null;
  });
  console.log(allUsers);

  const columns = [
    { field: 'id', headerName: 'ID', width: 90 },
    {
      field: 'email',
      headerName: 'Email',
      width: 250,
    },
  ];

  return (
    <div>
      <TableContainer className="tableProfile1">
        <Box sx={{ height: '60vh', width: '100%' }}>
          <DataGrid
            // TextAlignment="Center"
            rows={unReg}
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
export default IncompleteRegistration;
