import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import DummyImg from '../../../layout/images/dummy-img-man.png';
import '../../../layout/css/members.css';

export default function Top_Rated_Hosts() {
  return (
    <TableContainer style={{ width: '100%' }} className="tableProfile">
      <Table
        sx={{ overflow: 'auto', bottom: '20px' }}
        aria-label="simple table"
        className="gestHostedTable"
      >
        <TableBody>
          <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
            <TableCell component="th" scope="row">
              <img src={DummyImg} style={{ width: '30px' }} />
            </TableCell>
            <TableCell
              align="left"
              style={{ position: 'relative', right: '30px' }}
            >
              <span>Sample name</span>
              <br />
              <span style={{ fontSize: '12px', color: 'gray' }}>Location</span>
            </TableCell>

            <TableCell align="right">
              (12) &nbsp;4.0 &nbsp;
              <i className="fas fa-star" style={{ color: 'yellow' }}></i>
              <i className="fas fa-star" style={{ color: 'yellow' }}></i>
              <i className="fas fa-star" style={{ color: 'yellow' }}></i>
              <i className="fas fa-star" style={{ color: 'yellow' }}></i>
              <i className="fas fa-star" style={{ color: 'gray' }}></i>
            </TableCell>
            <TableCell align="right"></TableCell>
          </TableRow>
          <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
            <TableCell component="th" scope="row">
              <img src={DummyImg} style={{ width: '30px' }} />
            </TableCell>
            <TableCell
              align="left"
              style={{ position: 'relative', right: '30px' }}
            >
              <span>Sample name</span>
              <br />
              <span style={{ fontSize: '12px', color: 'gray' }}>Location</span>
            </TableCell>

            <TableCell align="right">
              (12) &nbsp;4.0 &nbsp;
              <i className="fas fa-star" style={{ color: 'yellow' }}></i>
              <i className="fas fa-star" style={{ color: 'yellow' }}></i>
              <i className="fas fa-star" style={{ color: 'yellow' }}></i>
              <i className="fas fa-star" style={{ color: 'yellow' }}></i>
              <i className="fas fa-star" style={{ color: 'gray' }}></i>
            </TableCell>
            <TableCell align="right"></TableCell>
          </TableRow>
          <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
            <TableCell className="Top_rated_table" component="th" scope="row">
              <img src={DummyImg} style={{ width: '30px' }} />
            </TableCell>
            <TableCell
              className="Top_rated_table"
              align="left"
              style={{ position: 'relative', right: '30px' }}
            >
              <span>Sample name</span>
              <br />
              <span style={{ fontSize: '12px', color: 'gray' }}>Location</span>
            </TableCell>

            <TableCell className="Top_rated_table" align="right">
              (12) &nbsp;4.0 &nbsp;
              <i className="fas fa-star" style={{ color: 'yellow' }}></i>
              <i className="fas fa-star" style={{ color: 'yellow' }}></i>
              <i className="fas fa-star" style={{ color: 'yellow' }}></i>
              <i className="fas fa-star" style={{ color: 'yellow' }}></i>
              <i className="fas fa-star" style={{ color: 'gray' }}></i>
            </TableCell>
            <TableCell align="right"></TableCell>
          </TableRow>
          <TableRow
            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            className="Top_rated_table"
          >
            <TableCell component="th" scope="row">
              <img src={DummyImg} style={{ width: '30px' }} />
            </TableCell>
            <TableCell
              align="left"
              style={{ position: 'relative', right: '30px' }}
            >
              <span>Sample name</span>
              <br />
              <span style={{ fontSize: '12px', color: 'gray' }}>Location</span>
            </TableCell>

            <TableCell align="right">
              (12) &nbsp;4.0 &nbsp;
              <i className="fas fa-star" style={{ color: 'yellow' }}></i>
              <i className="fas fa-star" style={{ color: 'yellow' }}></i>
              <i className="fas fa-star" style={{ color: 'yellow' }}></i>
              <i className="fas fa-star" style={{ color: 'yellow' }}></i>
              <i className="fas fa-star" style={{ color: 'gray' }}></i>
            </TableCell>
          </TableRow>
          <TableRow
            sx={{ '&:last-child td, &:last-child th': { border: 'none' } }}
            className="Top_rated_table"
          >
            <TableCell component="th" scope="row">
              <img src={DummyImg} style={{ width: '30px' }} />
            </TableCell>
            <TableCell
              align="left"
              style={{ position: 'relative', right: '30px' }}
            >
              <span>Sample name</span>
              <br />
              <span style={{ fontSize: '12px', color: 'gray' }}>Location</span>
            </TableCell>

            <TableCell align="right">
              (12) &nbsp;4.0 &nbsp;
              <i className="fas fa-star" style={{ color: 'yellow' }}></i>
              <i className="fas fa-star" style={{ color: 'yellow' }}></i>
              <i className="fas fa-star" style={{ color: 'yellow' }}></i>
              <i className="fas fa-star" style={{ color: 'yellow' }}></i>
              <i className="fas fa-star" style={{ color: 'gray' }}></i>
            </TableCell>
            <TableCell align="right"></TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
}
