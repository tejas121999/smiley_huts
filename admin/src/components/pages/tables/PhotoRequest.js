import React, { useEffect, useState } from 'react';
import '../../layout/css/dashboard.css';
import dummy from '../../layout/images/dummy-img-man.png';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Modal from 'react-bootstrap/Modal';
import axios from 'axios';

const PhotoRequest = () => {
  const [request, setRequest] = useState({});
  const [photo, setPhoto] = useState([]);
  const [showImageModal, setShowImageModal] = useState(false);

  useEffect(() => {
    axios
      .get(
        process.env.REACT_APP_DEV_URL + '/api/property/getAllPropertyAdmin',
        {
          headers: {
            'x-auth-token': localStorage.getItem('access-token'),
          },
        }
      )
      .then(res => {
        console.log('response data', res.data.getAllprop);
        setPhoto(res.data.getAllprop);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  const handleAccept = (prop_id, Accept) => {
    axios
      .post(
        process.env.REACT_APP_DEV_URL + '/api/property/isphotoRequest',
        { id: prop_id, photo_req: Accept },
        {
          headers: {
            'x-auth-token': localStorage.getItem('access-token'),
          },
        }
      )
      .then(res => {
        console.log('Photo Request Accepted');
        axios
          .get(
            process.env.REACT_APP_DEV_URL + '/api/property/getAllPropertyAdmin',
            {
              headers: {
                'x-auth-token': localStorage.getItem('access-token'),
              },
            }
          )
          .then(res => {
            console.log('response data', res.data.getAllprop);
            setPhoto(res.data.getAllprop);
          })
          .catch(error => {
            console.log(error);
          });
      })
      .catch(error => {
        console.log(error);
      });
  };
  console.log(photo);
  return (
    <div className="table_body_profile">
      <TableContainer>
        <Table className="profile_table">
          <TableBody>
            {photo.map((prop, key) => (
              <TableRow>
                <TableCell>
                  <img
                    src={prop.users?.user_img}
                    className="dummy_img"
                  // style={{ width: "30px", height: "30px" }}
                  />
                </TableCell>
                <TableCell

                // style={{ position: "relative", right: "45px", top: "2px" }}
                >
                  <span style={{ fontSize: '17px', fontWeigt: '600' }}>
                    {prop.users?.first_name} {prop.users?.last_name}
                  </span>
                  <br />
                  <span style={{ fontSize: '8px', color: 'gray' }}>
                    {prop.users?.createdAt}
                  </span>
                </TableCell>
                <TableCell>
                  <span
                    onClick={() => {
                      setRequest(prop);
                      setShowImageModal(true);
                    }}
                    className="pro_imggg"
                    style={{ textDecoration: 'underline' }}
                  >
                    {prop?.pro_img}
                  </span>
                  {/* <span style={{ textDecoration: 'underline' }}>1.img</span> */}
                </TableCell>
                <TableCell></TableCell>
                <TableCell
                // style={{ position: 'relative', right: '60px' }}
                ></TableCell>
                <TableCell>
                  {prop.photo_req != 1 && (
                    <button
                      className="btn btn-outline-dark"
                      onClick={() => handleAccept(prop.id, -1)}
                    >
                      {prop?.photo_req == -1 ? 'Rejected' : 'Reject'}
                    </button>
                  )}
                  &nbsp;
                  {prop.photo_req != -1 && (
                    <button
                      className="btn btn-green"
                      onClick={() => handleAccept(prop.id, 1)}
                    >
                      {prop.photo_req == 1 ? 'Accepted' : 'Accept'}
                    </button>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <ImageModal
        handleAccept={handleAccept}
        request={request}
        show={showImageModal}
        onHide={() => setShowImageModal(false)}
      />
    </div>
  );
};

function ImageModal(props) {
  // const images = JSON.parse(props?.request?.pro_img);
  // console.log(images);
  // console.log(props.request);
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
        {/* {images.map(image => { */}
        <div>
          <img
            src={
              process.env.REACT_APP_DEV_URL +
              '/property_images/1657558478493.jpg'
            }
            alt=""
          />
        </div>
        ;{/* })} */}
        {props.request.photo_req != 1 && (
          <button
            className="btn btn-outline-dark"
            onClick={() => props.handleAccept(props.request.id, -1)}
          >
            {props.request.photo_req == -1 ? 'Rejected' : 'Reject'}
          </button>
        )}
        {props.request.photo_req != -1 && (
          <button
            className="btn btn-green"
            onClick={() => props.handleAccept(props.request.id, 1)}
          >
            {props.request.photo_req == 1 ? 'Accepted' : 'Accept'}
          </button>
        )}
      </Modal.Body>
    </Modal>
  );
}

export default PhotoRequest;
