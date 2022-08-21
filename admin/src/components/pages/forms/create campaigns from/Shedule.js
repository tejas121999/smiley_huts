import React, { useState } from 'react';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import axios from 'axios';

const Shedule = ({ value, email, longDesc }) => {
  console.log(value, email, longDesc);
  const [radioButton, setRadioButton] = useState('immediately');
  return (
    <div>
      <span className="schedule_Type">Select Schedule Type</span>
      <div
        className="form-check"
        value={radioButton}
        onChange={e => setRadioButton(e.target.value)}
      >
        <div className="Schedule_check">
          <input
            className="form-check-input"
            type="radio"
            name="flexRadioDefault"
            id="flexRadioDefault1"
            value="immediately"
          />
          <label className="form-check-label" for="flexRadioDefault1">
            Schedule Immediately
          </label>
        </div>
        <div className="Future_check">
          <input
            className="form-check-input"
            type="radio"
            name="flexRadioDefault"
            id="flexRadioDefault1"
            value="future"
          />
          <label className="form-check-label" for="flexRadioDefault1">
            Schedule for Future
          </label>
        </div>
      </div>
      {radioButton == 'immediately' ? (
        <>
          <div className="topTitle">
            <span className="Recipients">Recipients: {value} </span>
            <br />
            <span className="Email_Type">Email Type: {email}</span>
          </div>
          <div className="immediately_table">
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Email No</TableCell>
                    <TableCell>Subject</TableCell>
                    <TableCell>Delivery Date</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell>1</TableCell>
                    <TableCell>Sample Subject</TableCell>
                    <TableCell>28.06.2022</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>1</TableCell>
                    <TableCell>Sample Subject</TableCell>
                    <TableCell>28.06.2022</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>1</TableCell>
                    <TableCell>Sample Subject</TableCell>
                    <TableCell>28.06.2022</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>1</TableCell>
                    <TableCell>Sample Subject</TableCell>
                    <TableCell>28.06.2022</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>1</TableCell>
                    <TableCell>Sample Subject</TableCell>
                    <TableCell>28.06.2022</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>1</TableCell>
                    <TableCell>Sample Subject</TableCell>
                    <TableCell>28.06.2022</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        </>
      ) : (
        <>
          <input
            type="date"
            placeholder="Select Campaign Date"
            className="form-control date"
          />
        </>
      )}
    </div>
  );
};

export default Shedule;
