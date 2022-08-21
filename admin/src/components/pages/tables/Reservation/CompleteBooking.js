import React, { useEffect, useState } from 'react';
import DummyImg from '../../../layout/images/dummy-img-man.png';
import '../../../layout/css/reservation.css';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import axios from 'axios';
import ReactStars from 'react-rating-stars-component';

const AllUser = () => {
  const [complete, setComplete] = useState([]);

  useEffect(() => {
    axios
      .get(process.env.REACT_APP_DEV_URL + '/api/Booking/getCompleteBooking', {
        headers: {
          'x-auth-token': `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MjgsImlhdCI6MTY1NDA3ODEzM30.FNfBFklZCDm39ZGicsuQuICMXarIhQh7BmUZ9m_8n7U`,
        },
      })
      .then(res => {
        console.log('response data', res.data.getComplete);
        setComplete(res.data.getComplete);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  return (
    <div>
      <TableContainer className="tableProfile">
        <Table
          sx={{ minWidth: 750 }}
          aria-label="simple table"
          className="gestHostedTable"
        >
          <TableBody>
            {complete.map((prop, key) => (
              <TableRow
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  <img
                    src={
                      prop.users.user_img
                        ? process.env.REACT_APP_DEV_URL +
                          '/profile_images/' +
                          prop.users.user_img
                        : DummyImg
                    }
                    style={{ width: '30px' }}
                  />
                </TableCell>
                <TableCell
                  component="th"
                  scope="row"
                  style={{ position: 'relative' }}
                >
                  <span>
                    {prop.users.first_name} {prop.users.last_name}
                  </span>
                  <br />
                  <span style={{ fontSize: '12px', color: 'gray' }}>
                    {prop.users.email}
                  </span>
                </TableCell>
                <TableCell align="right" style={{ color: 'gray' }}>
                  {prop.createdAt}
                </TableCell>
                <TableCell align="right" style={{ color: 'gray' }}>
                  Host Pending
                </TableCell>
                <TableCell align="right" style={{ color: 'gray' }}>
                  {prop.start_date}
                </TableCell>
                <TableCell align="right" style={{ color: 'gray' }}>
                  {prop.end_date}
                </TableCell>
                <TableCell align="right">
                  <ReactStars
                    size={20}
                    value={prop.review}
                    isHalf={true}
                    edit={false}
                  />
                </TableCell>
                <TableCell align="right">
                  <span className="blue_dot"></span>
                  {prop.isApproved}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default AllUser;
