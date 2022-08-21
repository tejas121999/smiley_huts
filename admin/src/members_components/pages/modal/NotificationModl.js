import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Modal } from 'react-bootstrap';
import '../../layout/css/notification.css';
// import jhon_doe from '../../../layout/images/john-doe.jpg';
import jhon_doe from '../../layout/images/john-doe.jpg';
import ReactStars from 'react-rating-stars-component';
import Dropzone from '../../layout/DropzoneComponent';

const NotificationModl = props => {
  const [userReview, setReview] = useState([]);

  const [postReview, setPostReview] = useState({
    prop_user_id: localStorage.getItem('user-id'),
    comment: '',
    rev_property_id: props.selectedGuestData.property_id,
    review: 0,
    review_img: '',
  });
  console.log(props.selectedGuestData.property_id);
  console.log(props);

  const { comment, review } = postReview;

  const handleSubmit = async e => {
    e.preventDefault();
    const token = localStorage.getItem('access-token');
    try {
      const res = await axios.post(
        process.env.REACT_APP_DEV_URL + '/api/review/postReview',
        postReview,
        {
          headers: { 'x-auth-token': token },
        }
      );
      console.log('ressssssssssssssssssssssssssssssssss', res);
      if (res) {
        // navigate('/homepage');
        const id = res.data.post_review.id;
        const result = await axios.post(
          'http://localhost:5000/api/imgUplod/review/' + id,
          postReview.review_img,
          { headers: { 'x-auth-token': token } }
        );
        console.log(result);
      }
    } catch (err) {
      const error = err.response.data.error;
      console.log('erroris', err.response.data);
    }
  };

  const changeRating = rating => {
    setPostReview(prev => ({ ...prev, review: rating }));
  };

  const handleChange = e => {
    let { name, value } = e.target;
    setPostReview({ ...postReview, [name]: value });
    setPostReview(prev => ({
      ...prev,
      rev_property_id: props.selectedGuestData.property_id,
    }));
  };

  const handleReviewImages = async imgData => {
    const token = localStorage.getItem('access-token');
    // console.log('handleIdentityUpload data--------------', imgData[0]);
    const data = new FormData();
    data.append('review', imgData[0]);
    setPostReview(prev => ({ ...prev, review_img: data }));
    // setIdentityProofFile(e.target.files[0]);
    // setUserIdProof(e.target.files[0].name);
  };

  useEffect(() => {
    // axios
    //   .get(
    //     process.env.REACT_APP_DEV_URL +
    //       '/api/review/getReviewsByUserId/' +
    //       localStorage.getItem('user-id'),
    //     {
    //       headers: {
    //         'x-auth-token': localStorage.getItem('access-token'),
    //       },
    //     }
    //   )
    //   .then(res => {
    //     console.log(res.data);
    //     setReview(res.data.get_all_review);
    //   });
    // axios
    //   .all([
    //     axios.post(
    //       'http://localhost:5000/api/auth/getUserProfile',
    //       {
    //         userId: props.selectedGuestData.userId,
    //       },
    //       {
    //         headers: {
    //           'x-auth-token': localStorage.getItem('access-token'),
    //         },
    //       }
    //     ),
    //     axios.post(
    //       'http://localhost:5000/api/auth/getUserProfile',
    //       {
    //         userId: props.selectedGuestData.review_userid,
    //       },
    //       {
    //         headers: {
    //           'x-auth-token': localStorage.getItem('access-token'),
    //         },
    //       }
    //     ),
    //   ])
    //   .then(axios.spread((user, reviewId) => console.log(user, reviewId)));
  }, []);

  const formatDate = dateVal => {
    let dateObj = new Date(dateVal);
    const month = dateObj.toLocaleString('default', { month: 'short' });
    const time = dateObj.toTimeString('default');
    let day = dateObj.getDay();
    if (day < 10) {
      day = '0' + day;
    }
    let dateStr = day + ' ' + month;
    return dateStr;
  };

  console.log(postReview);

  // console.log(props);

  return (
    <div>
      <Modal
        centered
        show={props.show}
        onHide={props.onHide}
        keyboard={false}
        // dialogClassName= "NotificationModl"
        className="NotificationModl"
      >
        <Modal.Body className="notifi_body">
          {props.selectedGuestData.notification_type == 0 ? (
            <>
              <span className="notification_date">
                {formatDate(props.selectedGuestData.createdAt)}{' '}
              </span>
              <form>
                <div className=" flex-column justify-center ml-1">
                  <h1>{props.selectedGuestData.title}</h1>
                  <p className="post_notification_text">
                    {props.selectedGuestData.desc}
                  </p>
                  <hr style={{ width: '98%' }} />
                  <div className="get_rev_user_stars">
                    <ReactStars
                      size={30}
                      name="review"
                      value={review}
                      onChange={changeRating}
                      isHalf={true}
                      edit={true}
                    />
                  </div>
                  <textarea
                    className="form control"
                    name="comment"
                    value={comment}
                    onChange={handleChange}
                    cols={122}
                  />
                  <Dropzone onChangeImage={handleReviewImages} />
                  <button onClick={handleSubmit} className="btn btn-dark">
                    Post
                  </button>
                </div>
              </form>
            </>
          ) : props.selectedGuestData.notification_type == 1 ? (
            <>
              {userReview.map((reviews, key) => (
                <div className="get_review">
                  <div className="d-flex">
                    <img src={jhon_doe} className="get_rev_user_img" />
                    <div className="flex-column justify-center ml-1">
                      <span className="get_rev_user_name">
                        {reviews.users.first_name}&nbsp;
                        {reviews.users.last_name}
                      </span>
                      <div className="get_rev_user_stars">
                        <ReactStars
                          size={30}
                          value={reviews.review}
                          isHalf={true}
                          edit={false}
                        />
                      </div>
                    </div>
                    <span className="get_rev_user_date">
                      {formatDate(reviews.createdAt)}
                    </span>
                  </div>
                  <p className="p">{reviews.comment}</p>
                </div>
              ))}
            </>
          ) : (
            <>
              <span className="notification_date">
                {formatDate(props.selectedGuestData.date_time)}{' '}
              </span>
              <p className="notification_head">
                {props.selectedGuestData.title}
              </p>
              <p className="p">{props.selectedGuestData.desc}</p>
            </>
          )}
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default NotificationModl;
