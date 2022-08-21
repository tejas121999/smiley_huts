import React, { useEffect } from 'react';
import '../../../layout/css/campaigns.css';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useNavigate } from 'react-router-dom';
import Modal from 'react-bootstrap/Modal';
import { useState } from 'react';
import axios from 'axios';

const OfferDisable = () => {
  // const navigate = useNavigate();
  const userData = JSON.parse(localStorage.getItem('user_data'));
  const navigate = useNavigate();
  const [offers, setOffers] = useState([]);
  useEffect(() => {
    const getOffers = async () => {
      const res = await axios.get(
        process.env.REACT_APP_DEV_URL + '/api/offer/get-all-offer',
        {
          headers: {
            'x-auth-token': localStorage.getItem('access-token'),
          },
        }
      );
      console.log(res.data);
      setOffers(res.data);
    };

    getOffers();
  }, []);

  const handleDelete = async id => {
    const res = await axios.delete(
      process.env.REACT_APP_DEV_URL + '/api/offer/delete-offer/' + id,
      {
        headers: {
          'x-auth-token': localStorage.getItem('access-token'),
        },
      }
    );
    window.location.reload();
    console.log(res);
  };

  const [openOfferModal, setOpenOfferModal] = useState(false);
  return (
    <div className="offersTable">
      <OfferModal
        show={openOfferModal}
        onHide={() => setOpenOfferModal(false)}
      />
      <TableContainer
        style={{ width: '106%', height: '100%', overflow: 'auto' }}
      >
        <Table className="OffersTable">
          <TableBody className="offer_table_man">
            {offers.map(offer => {
              return (
                <TableRow>
                  <TableCell
                    onClick={() => setOpenOfferModal(true)}
                    style={{
                      fontSize: '15px',
                      fontWeight: '600',
                      position: 'relative',
                      left: '20px',
                    }}
                  >
                    <span style={{ fontSize: '7px', color: '#808080' }}>
                      Campaigns Title
                    </span>
                    <br />
                    {offer.offers_name}
                  </TableCell>
                  <TableCell
                    style={{
                      fontSize: '15px',
                      fontWeight: '600',
                      position: 'relative',
                      left: '20px',
                    }}
                  >
                    <span style={{ fontSize: '7px', color: '#808080' }}>
                      Recipients
                    </span>
                    <br />
                    {offer.isMember == 1 && 'Active Members'}
                    {offer.isMember == 0 && 'InActive Members'}
                    {offer.isMember == 2 && 'Custom Members'}
                  </TableCell>
                  <TableCell
                    style={{
                      fontSize: '15px',
                      fontWeight: '600',
                      position: 'relative',
                      left: '20px',
                    }}
                  >
                    <span style={{ fontSize: '7px', color: '#808080' }}>
                      No of Recipients
                    </span>
                    <br />
                    124
                  </TableCell>
                  <TableCell
                    style={{
                      fontSize: '15px',
                      fontWeight: '600',
                      position: 'relative',
                      left: '20px',
                    }}
                  >
                    <span style={{ fontSize: '7px', color: '#808080' }}>
                      Delivery Date
                    </span>
                    <br />
                    {new Date(offer.createdAt).toLocaleString()}
                  </TableCell>
                  <TableCell
                    style={{
                      fontSize: '15px',
                      fontWeight: '600',
                      position: 'relative',
                      left: '20px',
                    }}
                  >
                    <span style={{ fontSize: '7px', color: '#808080' }}>
                      Shedule By
                    </span>
                    <br />
                    {userData.first_name}
                  </TableCell>
                  <TableCell className="offersButton">
                    <button
                      onClick={() => handleDelete(offer.id)}
                      type="button"
                      class="offer_button btn btn-outline-dark"
                    >
                      Delete
                    </button>
                    &nbsp;
                    <button
                      type="button"
                      class="offer_button btn btn-outline-dark"
                      onClick={() => navigate('/editOffers')}
                    >
                      Edit
                    </button>
                    &nbsp;
                    <button type="button" class="offer_button btn btn-green">
                      Resend offer
                    </button>
                  </TableCell>
                </TableRow>
              );
            })}
            {/* <TableRow>
              <TableCell
                style={{
                  fontSize: '15px',
                  fontWeight: '600',
                  position: 'relative',
                  left: '20px',
                }}
              >
                <span style={{ fontSize: '7px', color: '#808080' }}>
                  Campaigns Title
                </span>
                <br />
                sample name
              </TableCell>
              <TableCell
                style={{
                  fontSize: '15px',
                  fontWeight: '600',
                  position: 'relative',
                  left: '20px',
                }}
              >
                <span style={{ fontSize: '7px', color: '#808080' }}>
                  Recipients
                </span>
                <br />
                Active Members
              </TableCell>
              <TableCell
                style={{
                  fontSize: '15px',
                  fontWeight: '600',
                  position: 'relative',
                  left: '20px',
                }}
              >
                <span style={{ fontSize: '7px', color: '#808080' }}>
                  No of Recipients
                </span>
                <br />
                124
              </TableCell>
              <TableCell
                style={{
                  fontSize: '15px',
                  fontWeight: '600',
                  position: 'relative',
                  left: '20px',
                }}
              >
                <span style={{ fontSize: '7px', color: '#808080' }}>
                  Delivery Date
                </span>
                <br />
                28th Mar, 2022
              </TableCell>
              <TableCell
                style={{
                  fontSize: '15px',
                  fontWeight: '600',
                  position: 'relative',
                  left: '20px',
                }}
              >
                <span style={{ fontSize: '7px', color: '#808080' }}>
                  Shedule By
                </span>
                <br />
                sample name
              </TableCell>
              <TableCell className="offersButton">
                <button type="button" class="btn btn-outline-dark">
                  Delete
                </button>
                &nbsp;
                <button type="button" class="btn btn-outline-dark">
                  Edit
                </button>
                &nbsp;
                <button type="button" class="btn btn-dark">
                  Resend offer
                </button>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell
                style={{
                  fontSize: '15px',
                  fontWeight: '600',
                  position: 'relative',
                  left: '20px',
                }}
              >
                <span style={{ fontSize: '7px', color: '#808080' }}>
                  Campaigns Title
                </span>
                <br />
                sample name
              </TableCell>
              <TableCell
                style={{
                  fontSize: '15px',
                  fontWeight: '600',
                  position: 'relative',
                  left: '20px',
                }}
              >
                <span style={{ fontSize: '7px', color: '#808080' }}>
                  Recipients
                </span>
                <br />
                Active Members
              </TableCell>
              <TableCell
                style={{
                  fontSize: '15px',
                  fontWeight: '600',
                  position: 'relative',
                  left: '20px',
                }}
              >
                <span style={{ fontSize: '7px', color: '#808080' }}>
                  No of Recipients
                </span>
                <br />
                124
              </TableCell>
              <TableCell
                style={{
                  fontSize: '15px',
                  fontWeight: '600',
                  position: 'relative',
                  left: '20px',
                }}
              >
                <span style={{ fontSize: '7px', color: '#808080' }}>
                  Delivery Date
                </span>
                <br />
                28th Mar, 2022
              </TableCell>
              <TableCell
                style={{
                  fontSize: '15px',
                  fontWeight: '600',
                  position: 'relative',
                  left: '20px',
                }}
              >
                <span style={{ fontSize: '7px', color: '#808080' }}>
                  Shedule By
                </span>
                <br />
                sample name
              </TableCell>
              <TableCell className="offersButton">
                <button type="button" class="btn btn-outline-dark">
                  Delete
                </button>
                &nbsp;
                <button type="button" class="btn btn-outline-dark">
                  Edit
                </button>
                &nbsp; &nbsp;
                <button type="button" class="btn btn-dark">
                  Resend offer
                </button>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell
                style={{
                  fontSize: '15px',
                  fontWeight: '600',
                  position: 'relative',
                  left: '20px',
                }}
              >
                <span style={{ fontSize: '7px', color: '#808080' }}>
                  Campaigns Title
                </span>
                <br />
                sample name
              </TableCell>
              <TableCell
                style={{
                  fontSize: '15px',
                  fontWeight: '600',
                  position: 'relative',
                  left: '20px',
                }}
              >
                <span style={{ fontSize: '7px', color: '#808080' }}>
                  Recipients
                </span>
                <br />
                Active Members
              </TableCell>
              <TableCell
                style={{
                  fontSize: '15px',
                  fontWeight: '600',
                  position: 'relative',
                  left: '20px',
                }}
              >
                <span style={{ fontSize: '7px', color: '#808080' }}>
                  No of Recipients
                </span>
                <br />
                124
              </TableCell>
              <TableCell
                style={{
                  fontSize: '15px',
                  fontWeight: '600',
                  position: 'relative',
                  left: '20px',
                }}
              >
                <span style={{ fontSize: '7px', color: '#808080' }}>
                  Delivery Date
                </span>
                <br />
                28th Mar, 2022
              </TableCell>
              <TableCell
                style={{
                  fontSize: '15px',
                  fontWeight: '600',
                  position: 'relative',
                  left: '20px',
                }}
              >
                <span style={{ fontSize: '7px', color: '#808080' }}>
                  Shedule By
                </span>
                <br />
                sample name
              </TableCell>
              <TableCell className="offersButton">
                <button type="button" class="btn btn-outline-dark">
                  Delete
                </button>
                &nbsp;
                <button type="button" class="btn btn-outline-dark">
                  Edit
                </button>
                &nbsp; &nbsp;
                <button type="button" class="btn btn-dark">
                  Resend offer
                </button>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell
                style={{
                  fontSize: '15px',
                  fontWeight: '600',
                  position: 'relative',
                  left: '20px',
                }}
              >
                <span style={{ fontSize: '7px', color: '#808080' }}>
                  Campaigns Title
                </span>
                <br />
                sample name
              </TableCell>
              <TableCell
                style={{
                  fontSize: '15px',
                  fontWeight: '600',
                  position: 'relative',
                  left: '20px',
                }}
              >
                <span style={{ fontSize: '7px', color: '#808080' }}>
                  Recipients
                </span>
                <br />
                Active Members
              </TableCell>
              <TableCell
                style={{
                  fontSize: '15px',
                  fontWeight: '600',
                  position: 'relative',
                  left: '20px',
                }}
              >
                <span style={{ fontSize: '7px', color: '#808080' }}>
                  No of Recipients
                </span>
                <br />
                124
              </TableCell>
              <TableCell
                style={{
                  fontSize: '15px',
                  fontWeight: '600',
                  position: 'relative',
                  left: '20px',
                }}
              >
                <span style={{ fontSize: '7px', color: '#808080' }}>
                  Delivery Date
                </span>
                <br />
                28th Mar, 2022
              </TableCell>
              <TableCell
                style={{
                  fontSize: '15px',
                  fontWeight: '600',
                  position: 'relative',
                  left: '20px',
                }}
              >
                <span style={{ fontSize: '7px', color: '#808080' }}>
                  Shedule By
                </span>
                <br />
                sample name
              </TableCell>
              <TableCell className="offersButton">
                <button type="button" class="btn btn-outline-dark">
                  Delete
                </button>
                &nbsp;
                <button type="button" class="btn btn-outline-dark">
                  Edit
                </button>
                &nbsp; &nbsp;
                <button type="button" class="btn btn-dark">
                  Resend offer
                </button>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell
                style={{
                  fontSize: '15px',
                  fontWeight: '600',
                  position: 'relative',
                  left: '20px',
                }}
              >
                <span style={{ fontSize: '7px', color: '#808080' }}>
                  Campaigns Title
                </span>
                <br />
                sample name
              </TableCell>
              <TableCell
                style={{
                  fontSize: '15px',
                  fontWeight: '600',
                  position: 'relative',
                  left: '20px',
                }}
              >
                <span style={{ fontSize: '7px', color: '#808080' }}>
                  Recipients
                </span>
                <br />
                Active Members
              </TableCell>
              <TableCell
                style={{
                  fontSize: '15px',
                  fontWeight: '600',
                  position: 'relative',
                  left: '20px',
                }}
              >
                <span style={{ fontSize: '7px', color: '#808080' }}>
                  No of Recipients
                </span>
                <br />
                124
              </TableCell>
              <TableCell
                style={{
                  fontSize: '15px',
                  fontWeight: '600',
                  position: 'relative',
                  left: '20px',
                }}
              >
                <span style={{ fontSize: '7px', color: '#808080' }}>
                  Delivery Date
                </span>
                <br />
                28th Mar, 2022
              </TableCell>
              <TableCell
                style={{
                  fontSize: '15px',
                  fontWeight: '600',
                  position: 'relative',
                  left: '20px',
                }}
              >
                <span style={{ fontSize: '7px', color: '#808080' }}>
                  Shedule By
                </span>
                <br />
                sample name
              </TableCell>
              <TableCell className="offersButton">
                <button type="button" class="btn btn-outline-dark">
                  Delete
                </button>
                &nbsp;
                <button type="button" class="btn btn-outline-dark">
                  Edit
                </button>
                &nbsp; &nbsp;
                <button type="button" class="btn btn-dark">
                  Resend offer
                </button>
              </TableCell>
            </TableRow> */}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default OfferDisable;

function OfferModal(props) {
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Modal heading
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h4>Centered Modal</h4>
        <p>
          Cras mattis consectetur purus sit amet fermentum. Cras justo odio,
          dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac
          consectetur ac, vestibulum at eros.
        </p>
      </Modal.Body>
    </Modal>
  );
}
