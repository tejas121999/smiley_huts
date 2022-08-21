import React from 'react';
import '../../../layout/css/campaigns.css';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

const PreviousCampaigns = () => {
  return (
    <div className="CampaignsDraft">
      <TableContainer className="campaignsTable">
        <Table className="gestHostedTable">
          <TableBody>
            <TableRow>
              <TableCell style={{ fontSize: '20px', fontWeight: '600' }}>
                <span style={{ fontSize: '12px', color: '#808080' }}>
                  Campaigns Title
                </span>
                <br />
                sample name
              </TableCell>
              <TableCell style={{ fontSize: '20px', fontWeight: '600' }}>
                <span style={{ fontSize: '12px', color: '#808080' }}>
                  Recipients
                </span>
                <br />
                Active Members
              </TableCell>
              <TableCell style={{ fontSize: '20px', fontWeight: '600' }}>
                <span style={{ fontSize: '12px', color: '#808080' }}>
                  No of Recipients
                </span>
                <br />
                124
              </TableCell>
              <TableCell style={{ fontSize: '20px', fontWeight: '600' }}>
                <span style={{ fontSize: '12px', color: '#808080' }}>
                  Delivery Date
                </span>
                <br />
                28th Mar, 2022
              </TableCell>
              <TableCell style={{ fontSize: '20px', fontWeight: '600' }}>
                <span style={{ fontSize: '12px', color: '#808080' }}>
                  Shedule By
                </span>
                <br />
                sample name
              </TableCell>
              <TableCell style={{ fontSize: '20px', fontWeight: '600' }}>
                <span style={{ fontSize: '12px', color: '#808080' }}>
                  Shedule By
                </span>
                <br />
                sample name
              </TableCell>
              <TableCell style={{ fontSize: '20px', fontWeight: '600' }}>
                <span style={{ fontSize: '12px', color: '#808080' }}>
                  Shedule By
                </span>
                <br />
                sample name
              </TableCell>
              <TableCell
                style={{
                  fontSize: '20px',
                  fontWeight: '600',
                }}
              >
                <TableCell style={{ fontSize: '20px', fontWeight: '600' }}>
                  <button
                    style={{ height: '40px', width: '120px' }}
                    type="button"
                    class="btn btn-dark"
                  >
                    Edit
                  </button>
                </TableCell>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell style={{ fontSize: '20px', fontWeight: '600' }}>
                <span style={{ fontSize: '12px', color: '#808080' }}>
                  Campaigns Title
                </span>
                <br />
                sample name
              </TableCell>
              <TableCell style={{ fontSize: '20px', fontWeight: '600' }}>
                <span style={{ fontSize: '12px', color: '#808080' }}>
                  Recipients
                </span>
                <br />
                Active Members
              </TableCell>
              <TableCell style={{ fontSize: '20px', fontWeight: '600' }}>
                <span style={{ fontSize: '12px', color: '#808080' }}>
                  No of Recipients
                </span>
                <br />
                124
              </TableCell>
              <TableCell style={{ fontSize: '20px', fontWeight: '600' }}>
                <span style={{ fontSize: '12px', color: '#808080' }}>
                  Delivery Date
                </span>
                <br />
                28th Mar, 2022
              </TableCell>
              <TableCell style={{ fontSize: '20px', fontWeight: '600' }}>
                <span style={{ fontSize: '12px', color: '#808080' }}>
                  Shedule By
                </span>
                <br />
                sample name
              </TableCell>
              <TableCell style={{ fontSize: '20px', fontWeight: '600' }}>
                <span style={{ fontSize: '12px', color: '#808080' }}>
                  Shedule By
                </span>
                <br />
                sample name
              </TableCell>
              <TableCell style={{ fontSize: '20px', fontWeight: '600' }}>
                <span style={{ fontSize: '12px', color: '#808080' }}>
                  Shedule By
                </span>
                <br />
                sample name
              </TableCell>
              <TableCell
                style={{
                  fontSize: '20px',
                  fontWeight: '600',
                }}
              >
                <TableCell style={{ fontSize: '20px', fontWeight: '600' }}>
                  <button
                    style={{ height: '40px', width: '120px' }}
                    type="button"
                    class="btn btn-dark"
                  >
                    Edit
                  </button>
                </TableCell>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell style={{ fontSize: '20px', fontWeight: '600' }}>
                <span style={{ fontSize: '12px', color: '#808080' }}>
                  Campaigns Title
                </span>
                <br />
                sample name
              </TableCell>
              <TableCell style={{ fontSize: '20px', fontWeight: '600' }}>
                <span style={{ fontSize: '12px', color: '#808080' }}>
                  Recipients
                </span>
                <br />
                Active Members
              </TableCell>
              <TableCell style={{ fontSize: '20px', fontWeight: '600' }}>
                <span style={{ fontSize: '12px', color: '#808080' }}>
                  No of Recipients
                </span>
                <br />
                124
              </TableCell>
              <TableCell style={{ fontSize: '20px', fontWeight: '600' }}>
                <span style={{ fontSize: '12px', color: '#808080' }}>
                  Delivery Date
                </span>
                <br />
                28th Mar, 2022
              </TableCell>
              <TableCell style={{ fontSize: '20px', fontWeight: '600' }}>
                <span style={{ fontSize: '12px', color: '#808080' }}>
                  Shedule By
                </span>
                <br />
                sample name
              </TableCell>
              <TableCell style={{ fontSize: '20px', fontWeight: '600' }}>
                <span style={{ fontSize: '12px', color: '#808080' }}>
                  Shedule By
                </span>
                <br />
                sample name
              </TableCell>
              <TableCell style={{ fontSize: '20px', fontWeight: '600' }}>
                <span style={{ fontSize: '12px', color: '#808080' }}>
                  Shedule By
                </span>
                <br />
                sample name
              </TableCell>
              <TableCell
                style={{
                  fontSize: '20px',
                  fontWeight: '600',
                }}
              >
                <TableCell style={{ fontSize: '20px', fontWeight: '600' }}>
                  <button
                    style={{ height: '40px', width: '120px' }}
                    type="button"
                    class="btn btn-dark"
                  >
                    Edit
                  </button>
                </TableCell>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default PreviousCampaigns;
