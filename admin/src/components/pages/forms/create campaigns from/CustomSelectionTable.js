import React, { useState } from 'react'
import MaterialTable from "material-table"
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import DummyImg from "../../../layout/images/dummy-img-man.png"
import { DataGrid } from '@mui/x-data-grid';
import { Checkbox } from '@mui/material';

const CustomSelectionTable = () => {

  return (
    <div className='CustomSelectionTable'>
      <TableContainer>
        <Table>
          <TableBody>
            <TableRow
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                <img src={DummyImg} style={{ width: "35px" }} />
              </TableCell>
              <TableCell component="th" scope="row" style={{ position: "relative", right: "20px" }}>
                <span style={{ fontWeight: "600" }}>Sample name</span>
                <br />
                <span style={{ fontSize: "12px", color: "gray" }}>Email</span>
              </TableCell>
              <TableCell align="right" style={{ color: "gray" }}>
                Email
              </TableCell>
              <TableCell align="right" style={{ color: "gray" }}>Total Guest Hosted</TableCell>
              <TableCell align="right" style={{ color: "gray" }}>Total Booking</TableCell>
              <TableCell><Checkbox /></TableCell>
            </TableRow>
            <TableRow
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                <img src={DummyImg} style={{ width: "35px" }} />
              </TableCell>
              <TableCell component="th" scope="row" style={{ position: "relative", right: "20px" }}>
                <span style={{ fontWeight: "600" }}>Sample name</span>
                <br />
                <span style={{ fontSize: "12px", color: "gray" }}>Email</span>
              </TableCell>
              <TableCell align="right" style={{ color: "gray" }}>
                Email
              </TableCell>
              <TableCell align="right" style={{ color: "gray" }}>Total Guest Hosted</TableCell>
              <TableCell align="right" style={{ color: "gray" }}>Total Booking</TableCell>
              <TableCell><Checkbox /></TableCell>
            </TableRow>
            <TableRow
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                <img src={DummyImg} style={{ width: "35px" }} />
              </TableCell>
              <TableCell component="th" scope="row" style={{ position: "relative", right: "20px" }}>
                <span style={{ fontWeight: "600" }}>Sample name</span>
                <br />
                <span style={{ fontSize: "12px", color: "gray" }}>Email</span>
              </TableCell>
              <TableCell align="right" style={{ color: "gray" }}>
                Email
              </TableCell>
              <TableCell align="right" style={{ color: "gray" }}>Total Guest Hosted</TableCell>
              <TableCell align="right" style={{ color: "gray" }}>Total Booking</TableCell>
              <TableCell><Checkbox /></TableCell>
            </TableRow>
            <TableRow
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                <img src={DummyImg} style={{ width: "35px" }} />
              </TableCell>
              <TableCell component="th" scope="row" style={{ position: "relative", right: "20px" }}>
                <span style={{ fontWeight: "600" }}>Sample name</span>
                <br />
                <span style={{ fontSize: "12px", color: "gray" }}>Email</span>
              </TableCell>
              <TableCell align="right" style={{ color: "gray" }}>
                Email
              </TableCell>
              <TableCell align="right" style={{ color: "gray" }}>Total Guest Hosted</TableCell>
              <TableCell align="right" style={{ color: "gray" }}>Total Booking</TableCell>
              <TableCell><Checkbox /></TableCell>
            </TableRow>
            <TableRow
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                <img src={DummyImg} style={{ width: "35px" }} />
              </TableCell>
              <TableCell component="th" scope="row" style={{ position: "relative", right: "20px" }}>
                <span style={{ fontWeight: "600" }}>Sample name</span>
                <br />
                <span style={{ fontSize: "12px", color: "gray" }}>Email</span>
              </TableCell>
              <TableCell align="right" style={{ color: "gray" }}>
                Email
              </TableCell>
              <TableCell align="right" style={{ color: "gray" }}>Total Guest Hosted</TableCell>
              <TableCell align="right" style={{ color: "gray" }}>Total Booking</TableCell>
              <TableCell><Checkbox /></TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  )
}

export default CustomSelectionTable