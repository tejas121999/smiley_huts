import React, { useEffect, useState } from "react";
import "../../../layout/css/campaigns.css";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import axios from "axios";

const SheduleCampaigns = () => {
  const [sCamp, setsCamp] = useState([]);

  useEffect(() => {
    axios
      .get(process.env.REACT_APP_DEV_URL+"/api/campaigns/getScheduleCamp", {
        headers: {
          "x-auth-token": `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MjgsImlhdCI6MTY1NDA3ODEzM30.FNfBFklZCDm39ZGicsuQuICMXarIhQh7BmUZ9m_8n7U`,
        },
      })
      .then((res) => {
        console.log("response data", res.data.getScheduleCamp);
        setsCamp(res.data.getScheduleCamp);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div className="CampaignsDraft">
      <TableContainer className="campaignsTable">
        <Table className="gestHostedTable">
          <TableBody>
            {sCamp.map((camp, key) => (
              <TableRow>
                <TableCell
                  style={{ fontSize: "20px", fontWeight: "600" }}
                  key={key}
                >
                  <span style={{ fontSize: "12px", color: "#808080" }}>
                    Campaigns Title
                  </span>
                  <br />
                  {camp.campaigns_title}
                </TableCell>
                <TableCell style={{ fontSize: "20px", fontWeight: "600" }}>
                  <span style={{ fontSize: "12px", color: "#808080" }}>
                    Recipients
                  </span>
                  <br />
                  {camp.recipients}
                </TableCell>
                <TableCell style={{ fontSize: "20px", fontWeight: "600" }}>
                  <span style={{ fontSize: "12px", color: "#808080" }}>
                    No of Recipients
                  </span>
                  <br />
                  {camp.recipients}
                </TableCell>
                <TableCell style={{ fontSize: "20px", fontWeight: "600" }}>
                  <span style={{ fontSize: "12px", color: "#808080" }}>
                    Delivery Date
                  </span>
                  <br />
                  {camp.users.createdAt}
                </TableCell>
                <TableCell style={{ fontSize: "20px", fontWeight: "600" }}>
                  <span style={{ fontSize: "12px", color: "#808080" }}>
                    Shedule By
                  </span>
                  <br />
                  {camp.schedule_by}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default SheduleCampaigns;
