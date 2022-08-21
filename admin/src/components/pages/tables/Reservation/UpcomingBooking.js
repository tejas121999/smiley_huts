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
import ReservationModal from '../../Modal/ReservationModal';
import axios from 'axios';

const AllUser = () => {
  const [openModal, setOpenModal] = useState(false);

  const [upComing, setUpComingModalData] = useState();

  const handleModalOpen = decBookingRow => {
    console.log('row is ............', decBookingRow);
    setUpComingModalData(decBookingRow);
    setOpenModal(true);
  };

  // const handleModalOpen = () => setOpenModal(true);
  const handleModalClose = () => setOpenModal(false);
  const [ubooking, setUbooking] = useState([]);

  useEffect(() => {
    axios
      .get(process.env.REACT_APP_DEV_URL + '/api/Booking/getUpcomingDates', {
        headers: {
          'x-auth-token': `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MjgsImlhdCI6MTY1NDA3ODEzM30.FNfBFklZCDm39ZGicsuQuICMXarIhQh7BmUZ9m_8n7U`,
        },
      })
      .then(res => {
        console.log('response data222', res.data.getUpcoming);
        setUbooking(res.data.getUpcoming);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  return (
    <div>
      <ReservationModal
        show={openModal}
        onHide={handleModalClose}
        onModal={upComing}
      />
      <TableContainer className="tableProfile">
        <Table
          sx={{ minWidth: 750 }}
          aria-label="simple table"
          className="gestHostedTable"
        >
          <TableBody>
            {ubooking.map((prop, key) => (
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
                  <span className="dot"></span>
                  {prop.isAccepted}
                </TableCell>
                <TableCell align="right">
                  <button
                    type="button"
                    class="btn btn-outline-dark"
                    onClick={() => handleModalOpen(prop)}
                  >
                    View Details
                  </button>
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
