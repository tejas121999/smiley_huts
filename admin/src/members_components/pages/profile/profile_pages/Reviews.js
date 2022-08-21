import React, { useState, useEffect } from 'react';
import '../../../layout/css/Reviews.css';
import john_doe from '../../../layout/images/john-doe.jpg';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import ReactStars from 'react-rating-stars-component';
import LinearProgress from '@mui/material/LinearProgress';

const Reviews = () => {
  const [myReviews, setMyReviews] = useState([]);
  const [avgRating, setAvgRating] = useState(0);
  const [totalRating, setTotalRating] = useState(0);
  const [oneStarCount, setOneStarCount] = useState(0);
  const [oneStarAvg, setOneStarAvg] = useState(0);
  const [twoStarCount, setTwoStarCount] = useState(0);
  const [twoStarAvg, setTwoStarAvg] = useState(0);
  const [threeStarCount, setThreeStarCount] = useState(0);
  const [fourStarCount, setFourStarCount] = useState(0);
  const [fiveStarCount, setFiveStarCount] = useState(0);

  useEffect(() => {
    const id = localStorage.getItem('user-id');
    axios
      .get(
        process.env.REACT_APP_DEV_URL + '/api/review/getReviewsByUserId/' + id,
        {
          headers: {
            'x-auth-token': `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MjgsImlhdCI6MTY1NDAwMDIwNX0.SvPTaaSc2IRLVlg8OrurDPmqkaNtZnI4DXmn31SmMP8`,
          },
        }
      )
      .then(res => {
        // console.log("myReviewsLength-----------------------",res.data);
        setMyReviews(res.data.get_all_review);
        let rating = 0;
        let oneStarCountVar = 0;
        let twoStarCountVar = 0;
        let threeStarCountVar = 0;
        let fourStarCountVar = 0;
        let fiveStarCountVar = 0;

        res.data.get_all_review.map((stay, idx) => {
          rating = rating + stay.review;
          if (stay.review >= 1 && stay.review < 2) {
            oneStarCountVar = oneStarCountVar + 1;
            setOneStarCount(oneStarCountVar + 1);
          } else if (stay.review >= 2 && stay.review < 3) {
            twoStarCountVar = twoStarCountVar + 1;
            setTwoStarCount(twoStarCount + 1);
          } else if (stay.review >= 3 && stay.review < 4) {
            threeStarCountVar = threeStarCountVar + 1;
            setThreeStarCount(threeStarCountVar);
          } else if (stay.review >= 4 && stay.review < 5) {
            fourStarCountVar = fourStarCountVar + 1;
            setFourStarCount(fourStarCount + 1);
          } else if (stay.review == 5) {
            fiveStarCountVar = fiveStarCountVar + 1;
            setFourStarCount(fiveStarCount + 1);
          }
        });
        let avgRating = rating / res.data.get_all_review.length;
        setTotalRating(rating);
        setAvgRating(avgRating);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  const formatDate = dateVal => {
    let dateObj = new Date(dateVal);
    let minutes = dateObj.getMinutes();
    let hour = dateObj.getHours();
    const month = dateObj.toLocaleString('default', { month: 'short' });
    let day = dateObj.getDay();
    if (day < 10) {
      day = '0' + day;
    }
    let dateStr = hour + '.' + minutes + ' ' + day + ' ' + month;
    return dateStr;
  };

  return (
    <div className="container">
      <div className="review_Ratings mb-1">
        <div className="review_top_card_div w-100">
          <div className="review_top_card d-flex flex-column">
            <span className="avg_rating">Average Rating</span>
            <span className="avg_point">
              {Math.round(avgRating * 100) / 100}
            </span>
            <div className="review_star">
              {avgRating > 0 ? (
                <ReactStars
                  size={40}
                  value={avgRating}
                  isHalf={true}
                  edit={false}
                />
              ) : null}
            </div>
          </div>

          <div className="review_top_card d-flex flex-column">
            <span className="total_rating">Total Rating</span>
            <span className="total_rat_number">{totalRating}</span>
          </div>

          <div className="review_top_card d-flex flex-column">
            <div className="review_rating_card">
              <div className="d-flex flex-column">
                <span className="Rating_class">Rating</span>
                <span className="S_class">(S) </span>
              </div>
              <div
                className="d-flex flex-column space-around"
                style={{ padding: '0em 1em' }}
              >
                <div className="d-flex">
                  <span className="progress_point">5.0</span>
                  <div className="d-flex align-center w-100">
                    <LinearProgress
                      variant="determinate"
                      className="rating_progress_bar w-100"
                      style={{
                        width: '100px',
                        height: '10px',
                        borderRadius: '10px',
                      }}
                      value={(fiveStarCount / myReviews.length) * 100}
                    />
                  </div>
                  <span className="progress_rating">{fiveStarCount}</span>
                </div>

                <div className="d-flex">
                  <span className="progress_point">4.0</span>
                  <div className="d-flex align-center w-100">
                    <LinearProgress
                      variant="determinate"
                      className="rating_progress_bar w-100"
                      style={{
                        width: '100px',
                        height: '10px',
                        borderRadius: '10px',
                      }}
                      value={(fourStarCount / myReviews.length) * 100}
                    />
                  </div>
                  <span className="progress_rating">{fourStarCount}</span>
                </div>

                <div className="d-flex">
                  <span className="progress_point">3.0</span>
                  <div className="d-flex align-center w-100">
                    <LinearProgress
                      variant="determinate"
                      className="rating_progress_bar w-100"
                      style={{
                        width: '100px',
                        height: '10px',
                        borderRadius: '10px',
                      }}
                      value={(threeStarCount / myReviews.length) * 100}
                    />
                  </div>
                  <span className="progress_rating">{threeStarCount}</span>
                </div>

                <div className="d-flex">
                  <span className="progress_point">2.0</span>
                  <div className="d-flex align-center w-100">
                    <LinearProgress
                      variant="determinate"
                      className="rating_progress_bar w-100"
                      style={{
                        width: '100px',
                        height: '10px',
                        borderRadius: '10px',
                      }}
                      value={(twoStarCount / myReviews.length) * 100}
                    />
                  </div>
                  <span className="progress_rating">{twoStarCount}</span>
                </div>

                <div className="d-flex">
                  <span className="progress_point">1.0</span>
                  <div className="d-flex align-center w-100">
                    <LinearProgress
                      variant="determinate"
                      className="rating_progress_bar w-100"
                      style={{
                        width: '100px',
                        height: '10px',
                        borderRadius: '10px',
                      }}
                      value={(oneStarCount / myReviews.length) * 100}
                    />
                  </div>
                  <span className="progress_rating">{oneStarCount}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <span className="Review_And_Ratings">Review & Ratings</span>

      <div className="Review_And_Ratings_class mt-1">
        {myReviews.map((review, idx) => (
          <div className="review_comment_class mb-1 p-1" key={idx}>
            <div className="d-flex space-between">
              <div className="d-flex">
                <div>
                  <img src={john_doe} className="comment_img" />
                </div>

                <div className="d-flex flex-column ml-1">
                  <div>
                    <p className="comment_sample_name m-0">
                      {review.propId?.users?.first_name}{' '}
                      {review.propId?.users?.last_name}
                    </p>
                  </div>
                  <div className="d-flex">
                    <div className="comment_star">
                      <ReactStars
                        size={25}
                        value={review.review}
                        isHalf={true}
                        edit={false}
                      />
                    </div>
                    <div className="d-flex align-center">
                      <span className="review_time_date">
                        {formatDate(review.createdAt)}{' '}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <img src={john_doe} className="comment_img mr-1" />
                <img src={john_doe} className="comment_img" />
              </div>
            </div>
            <div>
              <p className="comment_text">
                is simply dummy text of the printing and typesetting industry.
                Lorem Ipsum has been the industry's standard dummy text ever
                since the 1500s, when an unknown printer took a galley of type
                and scrambled it to make a type specimen book since the 1500s,
                when an unknown since the 1500s, when an unknown printer took a
                galley of type and scrambled it to make a
              </p>
            </div>
          </div>
        ))}

        {/*<div className='review_comment_class'>
                    <div>
                        <img src={john_doe} className="comment_img" />
                        <p className='comment_sample_name'>Sample Name</p>
                        <div className='comment_star'>
                            <i className="fas fa-star" style={{ color: "yellow" }}></i>
                            <i className="fas fa-star" style={{ color: "yellow" }}></i>
                            <i className="fas fa-star" style={{ color: "yellow" }}></i>
                            <i className="fas fa-star" style={{ color: "yellow" }}></i>
                            <i className="fas fa-star" style={{ color: "gray" }}></i>
                        </div>
                        <div className='time_date'>145 pm, 2nd Feb</div>
                        <p className='comment_text'>
                            is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever
                            since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book since the 1500s, when an unknown
                            since the 1500s, when an unknown printer took a galley of type and scrambled it to make a
                        </p>
                    </div>
                </div>
                <div className='review_comment_class'>
                    <div>
                        <img src={john_doe} className="comment_img" />
                        <p className='comment_sample_name'>Sample Name</p>
                        <div className='comment_star'>
                            <i className="fas fa-star" style={{ color: "yellow" }}></i>
                            <i className="fas fa-star" style={{ color: "yellow" }}></i>
                            <i className="fas fa-star" style={{ color: "yellow" }}></i>
                            <i className="fas fa-star" style={{ color: "yellow" }}></i>
                            <i className="fas fa-star" style={{ color: "gray" }}></i>
                        </div>
                        <div className='time_date'>145 pm, 2nd Feb</div>
                        <p className='comment_text'>
                            is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever
                            since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book since the 1500s, when an unknown
                            since the 1500s, when an unknown printer took a galley of type and scrambled it to make a
                        </p>
                    </div>
                </div>*/}
      </div>
    </div>
  );
};

export default Reviews;
