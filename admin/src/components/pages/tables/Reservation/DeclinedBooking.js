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

  const [decModalData, setdecModalData] = useState([]);

  const handleModalOpen = decBookingRow => {
    console.log('row is ............', decBookingRow);
    setdecModalData(decBookingRow);
    setOpenModal(true);
  };
  const handleModalClose = () => setOpenModal(false);

  const [dec, setDec] = useState([]);

  useEffect(() => {
    axios
      .get(process.env.REACT_APP_DEV_URL + '/api/Booking/getAllBooking', {
        headers: {
          'x-auth-token': `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MjgsImlhdCI6MTY1NDA3ODEzM30.FNfBFklZCDm39ZGicsuQuICMXarIhQh7BmUZ9m_8n7U`,
        },
      })
      .then(res => {
        console.log(
          'response data--------------------',
          res.data.get_allBooking
        );
        setDec(res.data.get_allBooking);
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
        onModal={decModalData}
      />
      <TableContainer className="tableProfile">
        <Table
          sx={{ minWidth: 750 }}
          aria-label="simple table"
          className="gestHostedTable"
        >
          <TableBody>
            {dec.map((prop, key) => (
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
                  {prop.propId?.users?.first_name}{' '}
                  {prop.propId?.users?.last_name}
                </TableCell>
                <TableCell align="right" style={{ color: 'gray' }}>
                  {prop.start_date}
                </TableCell>
                <TableCell align="right" style={{ color: 'gray' }}>
                  {prop.end_date}
                </TableCell>
                <TableCell align="right">
                  <span className="red_dot"></span>
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

            {/* <TableRow
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                <img src={DummyImg} style={{ width: "30px" }} />
              </TableCell>
              <TableCell
                component="th"
                scope="row"
                style={{ position: "relative", right: "40px" }}
              >
                <span>Sample name</span>
                <br />
                <span style={{ fontSize: "12px", color: "gray" }}>Email</span>
              </TableCell>
              <TableCell align="right" style={{ color: "gray" }}>
                Booking On
              </TableCell>
              <TableCell align="right" style={{ color: "gray" }}>
                Host Name
              </TableCell>
              <TableCell align="right" style={{ color: "gray" }}>
                Start Date
              </TableCell>
              <TableCell align="right" style={{ color: "gray" }}>
                End Date
              </TableCell>
              <TableCell align="right">
                <span className="red_dot"></span>
                Approve
              </TableCell>
              <TableCell align="right">
                <button
                  type="button"
                  class="btn btn-outline-dark"
                  onClick={() => handleModalOpen()}
                >
                  View Details
                </button>
              </TableCell>
            </TableRow>

            <TableRow
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                <img src={DummyImg} style={{ width: "30px" }} />
              </TableCell>
              <TableCell
                component="th"
                scope="row"
                style={{ position: "relative", right: "40px" }}
              >
                <span>Sample name</span>
                <br />
                <span style={{ fontSize: "12px", color: "gray" }}>Email</span>
              </TableCell>
              <TableCell align="right" style={{ color: "gray" }}>
                Booking On
              </TableCell>
              <TableCell align="right" style={{ color: "gray" }}>
                Host Name
              </TableCell>
              <TableCell align="right" style={{ color: "gray" }}>
                Start Date
              </TableCell>
              <TableCell align="right" style={{ color: "gray" }}>
                End Date
              </TableCell>
              <TableCell align="right">
                <span className="red_dot"></span>
                Approve
              </TableCell>
              <TableCell align="right">
                <button type="button" class="btn btn-outline-dark">
                  View Details
                </button>
              </TableCell>
            </TableRow>
            <TableRow
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                <img src={DummyImg} style={{ width: "30px" }} />
              </TableCell>
              <TableCell
                component="th"
                scope="row"
                style={{ position: "relative", right: "40px" }}
              >
                <span>Sample name</span>
                <br />
                <span style={{ fontSize: "12px", color: "gray" }}>Email</span>
              </TableCell>
              <TableCell align="right" style={{ color: "gray" }}>
                Booking On
              </TableCell>
              <TableCell align="right" style={{ color: "gray" }}>
                Host Name
              </TableCell>
              <TableCell align="right" style={{ color: "gray" }}>
                Start Date
              </TableCell>
              <TableCell align="right" style={{ color: "gray" }}>
                End Date
              </TableCell>
              <TableCell align="right">
                <span className="red_dot"></span>
                Approve
              </TableCell>
              <TableCell align="right">
                <button type="button" class="btn btn-outline-dark">
                  View Details
                </button>
              </TableCell>
            </TableRow>
            <TableRow
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                <img src={DummyImg} style={{ width: "30px" }} />
              </TableCell>
              <TableCell
                component="th"
                scope="row"
                style={{ position: "relative", right: "40px" }}
              >
                <span>Sample name</span>
                <br />
                <span style={{ fontSize: "12px", color: "gray" }}>Email</span>
              </TableCell>
              <TableCell align="right" style={{ color: "gray" }}>
                Booking On
              </TableCell>
              <TableCell align="right" style={{ color: "gray" }}>
                Host Name
              </TableCell>
              <TableCell align="right" style={{ color: "gray" }}>
                Start Date
              </TableCell>
              <TableCell align="right" style={{ color: "gray" }}>
                End Date
              </TableCell>
              <TableCell align="right">
                <span className="red_dot"></span>
                Approve
              </TableCell>
              <TableCell align="right">
                <button type="button" class="btn btn-outline-dark">
                  View Details
                </button>
              </TableCell>
            </TableRow>
            <TableRow
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                <img src={DummyImg} style={{ width: "30px" }} />
              </TableCell>
              <TableCell
                component="th"
                scope="row"
                style={{ position: "relative", right: "40px" }}
              >
                <span>Sample name</span>
                <br />
                <span style={{ fontSize: "12px", color: "gray" }}>Email</span>
              </TableCell>
              <TableCell align="right" style={{ color: "gray" }}>
                Booking On
              </TableCell>
              <TableCell align="right" style={{ color: "gray" }}>
                Host Name
              </TableCell>
              <TableCell align="right" style={{ color: "gray" }}>
                Start Date
              </TableCell>
              <TableCell align="right" style={{ color: "gray" }}>
                End Date
              </TableCell>
              <TableCell align="right">
                <span className="red_dot"></span>
                Approve
              </TableCell>
              <TableCell align="right">
                <button type="button" class="btn btn-outline-dark">
                  View Details
                </button>
              </TableCell>
            </TableRow> */}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default AllUser;
