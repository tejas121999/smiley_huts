import React, { useEffect, useRef, useState } from 'react';
import './subscription.css';
import AddIcon from '@mui/icons-material/Add';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import {
  PayPalScriptProvider,
  PayPalButtons,
  usePayPalScriptReducer,
} from '@paypal/react-paypal-js';
import UnregistererHeader from '../../../components/UnregistererHeader';
import { useAuth } from '../../hooks/useAuth';

const Subscribe = ({ closeModal }) => {
  const { loginFun, user } = useAuth();
  const reSubscribeRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();
  const [subscriptionData, setSubscriptionData] = useState('');
  const [amount, setAmount] = useState('0');
  const [plan, setPlan] = useState(1)
  const [subscription, setSubscription] = useState()
  const [startDate, setStartDate] = useState()
  const [endDate, setEndDate] = useState()
  const [firstPageData, setFirstPageData] = useState()


  const userData = location.state

  // loginFun({
  //   users: { email: localStorage.getItem('email') },
  // });
  // localStorage.setItem(
  //   'user_data',
  //   JSON.stringify(userData)
  // );
  useEffect(() => {
    closeModal();

  }, []);

  useEffect(() => {
    axios
      .get(process.env.REACT_APP_DEV_URL + '/api/subscription/get_sub', {
        headers: {
          'x-auth-token': localStorage.getItem("access-token"),
        },
      })
      .then(res => {
        setFirstPageData(res.data.view_plane[0])
        setSubscription(res.data.view_plane)

        // setUserData(res.data.user_data);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  const select_subscription = async (id) => {
    await axios.get(process.env.REACT_APP_DEV_URL + '/api/subscription/get-sub-data-by-id/' + id, {
      headers: {
        'x-auth-token': localStorage.getItem("access-token"),
      },
    }).then((data) => {

      setAmount(data.data.data.price)
      setSubscriptionData(data.data.data.select_sub_month)

    })
  }

  const handleOnSubscription = async paymentData => {

    let data = {
      user_id: localStorage.getItem('user-id'),
      order_id: paymentData.orderID,
      payer_id: paymentData.payerID,
      facilitator_access_token: paymentData.facilitatorAccessToken,
      payment_source: paymentData.paymentSource,
      payment_method: 'CREDIT_CARD',
      amount: amount,
      isActive: 1,
    };
    const saveSubData = await axios
      .post(
        process.env.REACT_APP_DEV_URL +
        '/api/subscription/onSubscriptionComplete',
        data,
        { headers: { 'x-auth-token': localStorage.getItem('access-token') } }
      )
      .then(res => {
        // ste start date and end date on the bases of duration 
        var d = new Date(res.data.payment.createdAt);
        console.log(d.toLocaleDateString());
        setStartDate(d.toLocaleDateString())
        d.setMonth(d.getMonth() + subscriptionData);
        console.log(d.toLocaleDateString());
        setEndDate(d.toLocaleDateString())

        // setEndDate(res.data.payment)
        console.log(endDate)
        loginFun({
          users: { email: localStorage.getItem('email') },
        });
        localStorage.setItem(
          'user_data',
          JSON.stringify(userData)
        );
        navigate('/homepage');
      })
      .catch(error => {
        alert('Payment Unsuccessful');
        console.log(error);
      });
  };

  useEffect(() => {
    console.log("startDate", startDate)
    console.log("endDate", endDate)
    console.log("sub_amount", amount)
    console.log("sub_duration", subscriptionData.select_sub_month)
    axios.put(
      process.env.REACT_APP_DEV_URL +
      '/api/subscription/update-sub-date/' + localStorage.getItem('user-id'),
      {
        "subscription_start_date": startDate,
        "subscription_end_date": endDate,
        "sub_amount": amount,
        "sub_duration": subscriptionData
      },
      {
        headers: {
          'x-auth-token': localStorage.getItem('access-token')
        }
      }
    )
  }, [endDate])

  const handleUserData = async () => {

  }

  const handleSetPlane = () => {
    setPlan(2)
  }

  const handleBackPlane = () => {
    setPlan(1)
  }

  const currency = 'USD';

  return (
    <div>
      {/* {localStorage.getItem('user_data') && */}
      < UnregistererHeader />
      {/* } */}
      {plan == 1 ? (
        <>
          <div className="credentials">
            <div className="right_side text-center">
              <p className="Register_As_Member">
                Become A <br />
                Member Now
              </p>
              <p className="Register_As_Member_text">
                Lorem Ipsum is simply dummy text of the printing and typesetting
              </p>
              <button className='btn btn-green' onClick={handleSetPlane}>More Plans</button>
            </div>
            <div className="Left_side">
              {firstPageData?.isSubscription == true ?
                (
                  <>
                    <p className="Login_text">${firstPageData?.price}$/&nbsp;{firstPageData.select_sub_month}&nbsp;Monthly</p>
                    <p className="dummy_text">
                      {firstPageData.description}
                    </p>
                  </>
                ) : (<></>)}



              <PayPalScriptProvider
                options={{
                  'client-id':
                    'AW5pF1We8b1Orr99Ci1jNQDuIxJg_lxtszoZ-qD7MUcxWeXcWOM1Y463UI49nOj6jkDuaiUfeycEb7lj',
                }}
              >
                {/*<PayPalButtons style={{ layout: "horizontal" }} />*/}
                <PayPalButtons
                  style={{ layout: 'horizontal' }}
                  disabled={false}
                  onClick={() => { select_subscription(firstPageData.id) }}
                  forceReRender={[amount, currency, { layout: 'horizontal' }]}
                  fundingSource={undefined}
                  locale={'en_ca'}
                  createOrder={(data, actions) => {
                    return actions.order
                      .create({
                        purchase_units: [
                          {
                            amount: {
                              currency_code: currency,
                              value: amount,
                            },
                          },
                        ],
                      })
                      .then(orderId => {
                        // Your code here after create the order

                        return orderId;
                      });
                  }}
                  onApprove={function (data, actions) {
                    return actions.order.capture().then(function () {
                      console.log('data--------------', data);
                      handleOnSubscription(data);
                      // Your code here after capture the order
                    });
                  }}
                />
              </PayPalScriptProvider>
              <p
                style={{ marginTop: '20px', color: 'gray' }}
                className="pointer"
                onClick={() => {
                  loginFun({
                    users: { email: localStorage.getItem('email') },
                  });
                  localStorage.setItem(
                    'user_data',
                    JSON.stringify(userData)
                  );
                  navigate('/homepage');
                }}
              >
                Skip for now
              </p>
              <button className='btn btn-green hidden-button' onClick={handleSetPlane}>More Planes</button>
            </div>
          </div>
        </>
      ) :
        (
          <>
            <div className="subscription-main-class-div">
              <button className='btn btn-green' onClick={() => { setPlan(1) }}>Back</button>
              <div className='sub-container-more-plans'>
                {subscription?.map(subscribe => (<>
                  {
                    subscribe?.isSubscription == true ?
                      (<div className='zoom'>
                        <div className="subscription-div landing-offer-1">
                          <span className='subscription-price'>
                            {subscribe.price}$/&nbsp;{subscribe.select_sub_month}&nbsp;Monthly
                          </span>
                          <p>
                            {subscribe.description}
                          </p>
                          <PayPalScriptProvider
                            options={{
                              "client-id":
                                "AW5pF1We8b1Orr99Ci1jNQDuIxJg_lxtszoZ-qD7MUcxWeXcWOM1Y463UI49nOj6jkDuaiUfeycEb7lj",
                            }}
                          >
                            {/*<PayPalButtons style={{ layout: "horizontal" }} />*/}
                            <PayPalButtons
                              onClick={() => { select_subscription(subscribe.id) }}
                              style={{ layout: "horizontal" }}
                              // ref={reSubscribeRef}
                              id="re-subscribe"
                              disabled={false}
                              forceReRender={[subscribe.price, currency, { layout: "horizontal" }]}
                              fundingSource={undefined}
                              locale={"en_ca"}
                              createOrder={(data, actions) => {
                                return actions.order
                                  .create({
                                    purchase_units: [
                                      {
                                        amount: {
                                          currency_code: currency,
                                          value: subscribe.price,
                                        },
                                      },
                                    ],
                                  })
                                  .then((orderId) => {
                                    // Your code here after create the order

                                    return orderId;
                                  });
                              }}
                              onApprove={function (data, actions) {
                                return actions.order.capture().then(function () {
                                  console.log("data--------------", data);
                                  handleOnSubscription(data);
                                  // Your code here after capture the order
                                });
                              }}
                            />
                          </PayPalScriptProvider>
                          {/* <button className='btn btn-dark subscription-button'>subscription</button> */}
                        </div>
                      </div>) :
                      null
                  }
                </>))}
              </div>
            </div>
          </>

        )}

    </div>
  );
};

export default Subscribe;
