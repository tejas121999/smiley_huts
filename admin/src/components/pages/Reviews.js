import React, { useEffect, useState } from 'react';
import '../layout/css/reviews.css';
import dummyImg from '../layout/images/dummy_img.png';
import homeImg from '../layout/images/homeImg.png';
import ImageModal from './Modal/ImageModal';
import axios from 'axios';
import ReactStars from 'react-rating-stars-component';
import Modal from 'react-bootstrap/Modal';

import { Avatar, Container, Grid, Paper, Typography } from '@material-ui/core';
import { makeStyles, useTheme } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  paper: {
    padding: theme.spacing(2),
    top: '30%',
    width: '110%',
    textAlign: 'center',
    color: theme.palette.text.secondary,
    position: 'relative',
    right: '50px',
    borderRadius: '15px',
    boxShadow: '0px 23px 32px rgba(5, 51, 112, 0.05)',
  },
}));

const Reviews = () => {
  const classes = useStyles();
  const [reviewModelOpen, setReviewModelOpen] = useState(false);
  const [reviewImageModelOpen, setReviewImageModelOpen] = useState(false);

  //retrive dynamic data
  const [review, setReview] = useState([]);
  const [selectedReview, setSelectedReview] = useState();

  useEffect(() => {
    axios
      .get(process.env.REACT_APP_DEV_URL + '/api/Review/getallReview', {
        headers: {
          'x-auth-token': `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MjgsImlhdCI6MTY1NDA3ODEzM30.FNfBFklZCDm39ZGicsuQuICMXarIhQh7BmUZ9m_8n7U`,
        },
      })
      .then(res => {
        console.log('response data', res.data.get_all_review);
        setReview(res.data.get_all_review);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  const handleApprove = (prop_id, Approve) => {
    console.log('prop----------id---', prop_id);
    axios
      .post(
        process.env.REACT_APP_DEV_URL + '/api/Review/isApprove',
        { id: prop_id, isApproveReview: Approve },
        {
          headers: {
            'x-auth-token': `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MjgsImlhdCI6MTY1NDA3ODEzM30.FNfBFklZCDm39ZGicsuQuICMXarIhQh7BmUZ9m_8n7U`,
          },
        }
      )
      .then(res => {
        console.log(res);
        axios
          .get(process.env.REACT_APP_DEV_URL + '/api/Review/getallReview', {
            headers: {
              'x-auth-token': `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MjgsImlhdCI6MTY1NDA3ODEzM30.FNfBFklZCDm39ZGicsuQuICMXarIhQh7BmUZ9m_8n7U`,
            },
          })
          .then(res => {
            console.log('response data', res.data.get_all_review);
            setReview(res.data.get_all_review);
          })
          .catch(error => {
            console.log(error);
          });
      })
      .catch(error => {
        console.log(error);
      });
  };

  return (
    <>
      <ReviewModal
        review={selectedReview}
        show={reviewModelOpen}
        onHide={() => setReviewModelOpen(false)}
      />
      <ReviewImageModal
        show={reviewImageModelOpen}
        onHide={() => setReviewImageModelOpen(false)}
      />
      <Grid container>
        <Grid item xs={12}>
          <Paper className="reviews_mane" style={{ marginTop: '70px' }}>
            <span className="mytext"> Reviews & Ratings</span>
            <hr
              style={{
                width: '100%',
                height: '3px',
                color: 'black',
                // left: '10px',
              }}
            />
            <table className="table table-borderless review_table ">
              {review.map((prop, key) => (
                <tbody>
                  <tr>
                    <td
                      style={{
                        color: 'gray',
                        // position: 'relative',
                        maxWidth: '340px',
                      }}
                    >
                      <div
                        style={{
                          display: 'flex',
                        }}
                      >
                        <div>
                          <img
                            src={
                              prop.users.user_img
                                ? process.env.REACT_APP_DEV_URL +
                                  '/profile_images/' +
                                  prop.users.user_img
                                : dummyImg
                            }
                            className="imgClass"
                          />
                        </div>
                        <div style={{ marginLeft: '10px' }}>
                          <span className="sample_name">
                            {prop.users.first_name} &nbsp;{' '}
                            {prop.users.last_name}
                          </span>
                          <div
                            style={{
                              width: '300px',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'space-between',
                            }}
                          >
                            <div className="">
                              <ReactStars
                                size={30}
                                value={prop.review}
                                isHalf={true}
                                edit={false}
                              />
                            </div>
                            <div className="">
                              <sapn>{new Date().toLocaleString()}</sapn>
                            </div>
                          </div>
                        </div>
                        <div>
                          <img
                            src={homeImg}
                            className="homeImg"
                            onClick={() => setReviewImageModelOpen(true)}
                          />
                          &nbsp; &nbsp;
                          <img
                            src={homeImg}
                            className="homeImg"
                            onClick={() => setReviewImageModelOpen(true)}
                          />
                        </div>
                      </div>
                      <div
                        onClick={() => {
                          setSelectedReview(prop);
                          setReviewModelOpen(true);
                        }}
                      >
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Dolorum cum autem fugit magni quia aliquid nihil
                        reiciendis vitae blanditiis quibusdam! Lorem ipsum dolor
                        sit amet, consectetur adipisicing elit. Corporis,
                        numquam labore delectus in minima facilis quas quia qui
                        incidunt beatae animi quae quidem consequatur quasi, sed
                        ipsam accusantium tempora aperiam.
                      </div>

                      {/* <br /> */}
                      {/* <div className="dummy_text">{prop.comment}</div> */}
                    </td>
                    <td
                      style={{
                        color: 'gray',
                        width: '200px',
                        // position: 'relative',
                        // left: '170px',
                      }}
                    >
                      <button
                        type="button"
                        class="btn btn-dark"
                        style={{ width: '105px', marginTop: '15px' }}
                        onClick={() => handleApprove(prop.id, 1)}
                      >
                        {prop.isApproveReview == 0 ? 'Approve' : 'Approved'}
                      </button>
                      <br />
                      <button
                        type="button"
                        class="btn btn-outline-dark"
                        style={{ width: '105px', marginTop: '20px' }}
                        onClick={() => handleApprove(prop.id, 0)}
                      >
                        Reject/hide
                      </button>
                    </td>
                  </tr>
                </tbody>
              ))}
            </table>
          </Paper>
        </Grid>
      </Grid>

      {/* <ImageModal show={modelOpen} onHide={closeModal} />
      <div className='reviews_mane'>
        <span className='review_text'>
          Reviews & Ratings (12)
        </span>
        <hr style={{
          width: "82%",
          height: "3px",
          color: "black",
          position: "absolute",
          top: "120px"
        }} /> 


        <table className="table table-borderless review_table ">
         

          { 

            review.map((prop,key)=>(
              <tbody> 
              <tr>
              <td style={{ color: "gray", position: "relative", left: "140px", maxWidth: "340px" }}>
                <img src={prop.users.user_img} className="imgClass" />
                <span className='sample_name'>{prop.users.first_name} &nbsp; {prop.users.last_name}</span>
                <div className='stars'>
        
                  <ReactStars 
                       size={30}
                      value={prop.review}
                      isHalf={true}
                      edit={false} 
                       />
                </div>
                <div className="time_date">
                  <sapn>{new Date().toLocaleString()}</sapn>
                </div>
                <img src={homeImg} className="homeImg" onClick={()=>} />
                &nbsp; &nbsp;
                <img src={homeImg} className="homeImg" onClick={()=>} />
                <br />
                <div className='dummy_text'>
                 {prop.comment}
                </div>
              </td>
              <td style={{ color: "gray", position: "relative", left: "170px" }}>
                <button type="button" class="btn btn-dark" style={{ width: "105px", marginTop: "15px" }} onClick={()=>handleApprove(prop.id,1 )}>{prop.isApproveReview == 0 ? "Approve" : "Approved"}</button>
                <br />
                <button type="button" class="btn btn-outline-dark" style={{ width: "105px", marginTop: "20px" }}>Reject/hide</button>
              </td>
            </tr>
            </tbody>
            ))}




        </table>
      </div> */}
    </>
  );
};

export default Reviews;

function ReviewModal(props) {
  console.log(props.review);
  return (
    <div>
      {props.review && (
        <Modal
          {...props}
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Header closeButton></Modal.Header>
          <Modal.Body>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <h4 style={{ margin: 0, marginRight: '5px' }}>
                {props?.review.users.first_name +
                  ' ' +
                  props.review?.users.last_name}
              </h4>
              <ReactStars
                size={30}
                value={props.review.review}
                isHalf={true}
                edit={false}
              />
            </div>
            <p>
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nulla,
              tenetur autem illum esse deleniti nostrum quae iure praesentium
              similique explicabo. Quae, nostrum ea earum non laborum aliquid
              ipsam provident necessitatibus.
            </p>
            {/* <p>{props.review.comment}</p> */}
          </Modal.Body>
        </Modal>
      )}
    </div>
  );
}
function ReviewImageModal(props) {
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton></Modal.Header>
      <Modal.Body>
        <img src={homeImg} />
      </Modal.Body>
    </Modal>
  );
}
