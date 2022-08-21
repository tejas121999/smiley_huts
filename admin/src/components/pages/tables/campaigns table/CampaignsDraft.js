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

const CampaignsDraft = () => {
  const [draft, setDraft] = useState([]);

  useEffect(() => {
    axios
      .get(process.env.REACT_APP_DEV_URL+"/api/Campaigns/getAllCampaignsDraft", {
        headers: {
          "x-auth-token": `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MjgsImlhdCI6MTY1NDA3ODEzM30.FNfBFklZCDm39ZGicsuQuICMXarIhQh7BmUZ9m_8n7U`,
        },
      })
      .then((res) => {
        console.log("response data", res.data.getScheduleCamp);
        setDraft(res.data.getScheduleCamp);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleDelete = (prop_id) => {
    axios
      .delete(
        process.env.REACT_APP_DEV_URL+"/api/Campaigns/deleteCampaignsDraft/" +
          prop_id,
        {
          headers: {
            "x-auth-token": `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MjgsImlhdCI6MTY1NDA3ODEzM30.FNfBFklZCDm39ZGicsuQuICMXarIhQh7BmUZ9m_8n7U`,
          },
        }
      )
      .then((res) => {
        console.log("value deleted");
        axios
          .get(process.env.REACT_APP_DEV_URL+"/api/Campaigns/getAllCampaignsDraft", {
            headers: {
              "x-auth-token": `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MjgsImlhdCI6MTY1NDA3ODEzM30.FNfBFklZCDm39ZGicsuQuICMXarIhQh7BmUZ9m_8n7U`,
            },
          })
          .then((res) => {
            console.log("response data", res.data.getScheduleCamp);
            setDraft(res.data.getScheduleCamp);
          })
          .catch((error) => {
            console.log(error);
          });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="CampaignsDraft">
      <TableContainer className="campaignsTable">
        <Table className="gestHostedTable">
          <TableBody>
            {draft.map((prop, key) => (
              <TableRow>
                <TableCell style={{ fontSize: "20px", fontWeight: "600" }}>
                  <span style={{ fontSize: "12px", color: "#808080" }}>
                    Campaigns Title
                  </span>
                  <br />
                  {prop.campaigns_title}
                </TableCell>
                <TableCell style={{ fontSize: "20px", fontWeight: "600" }}>
                  <span style={{ fontSize: "12px", color: "#808080" }}>
                    Recipients
                  </span>
                  <br />
                  {prop.users.isActive == 1 ? "Active Member" : "Not Active"}
                </TableCell>
                <TableCell style={{ fontSize: "20px", fontWeight: "600" }}>
                  <span style={{ fontSize: "12px", color: "#808080" }}>
                    No of Recipients
                  </span>
                  <br />
                  {prop.recipients}
                </TableCell>
                <TableCell style={{ fontSize: "20px", fontWeight: "600" }}>
                  <span style={{ fontSize: "12px", color: "#808080" }}>
                    Delivery Date
                  </span>
                  <br />
                  {prop.delivery_date}
                </TableCell>
                <TableCell style={{ fontSize: "20px", fontWeight: "600" }}>
                  <span style={{ fontSize: "12px", color: "#808080" }}>
                    Shedule By
                  </span>
                  <br />
                  {prop.schedule_by}
                </TableCell>
                <TableCell style={{ fontSize: "20px", fontWeight: "600" }}>
                  <span style={{ fontSize: "12px", color: "#808080" }}>
                    Shedule By
                  </span>
                  <br />
                  {prop.schedule_by}
                </TableCell>
                <TableCell style={{ fontSize: "20px", fontWeight: "600" }}>
                  <button
                    type="button"
                    class="btn btn-outline-dark"
                    onClick={() => handleDelete(prop.id)}
                  >
                    Delete
                  </button>
                  &nbsp;
                  <button type="button" class="btn btn-dark">
                    Edit
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

export default CampaignsDraft;
