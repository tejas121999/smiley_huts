import Modal from 'react-bootstrap/Modal';
import "./paypalModal.css"
import {
  PayPalScriptProvider,
  PayPalButtons,
  usePayPalScriptReducer,
} from '@paypal/react-paypal-js';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

function PaypalModal(props) {
  const currency = 'USD';
  const location = useLocation();
  const [subscriptionDate, setSubscriptionDate] = useState('');
  const [amount, setAmount] = useState('0');
  const [plan, setPlan] = useState(1)
  const [subscription, setSubscription] = useState()
  const [startDate, setStartDate] = useState()
  const [endDate, setEndDate] = useState()
  const userData = location.state

  useEffect(() => {
    axios
      .get(process.env.REACT_APP_DEV_URL + '/api/subscription/get_sub', {
        headers: {
          'x-auth-token': localStorage.getItem("access-token"),
        },
      })
      .then(res => {
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
      console.log("sub--by id data", data.data.data)
      setAmount(data.data.data.price)
      setSubscriptionDate(data.data.data.select_sub_month)
      console.log("amount", amount)
      console.log("sub_duration", subscriptionDate)
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
    try {
      await axios.post(
        process.env.REACT_APP_DEV_URL + '/api/booking/addRequest',
        {
          booking_user_id: localStorage.getItem('user-id'),
          property_id: Object.values(location)[3].id,
          start_date: startDate,
          end_date: endDate,
          property_name: location.state.prop_address,
          owner_id: location.state.user_id,
          booked_user_name: JSON.parse(localStorage.getItem('user_data'))
            .first_name,

        },
        {
          headers: {
            'x-auth-token': localStorage.getItem('access-token'),
          },
        }
      ).then(res => {
        alert('booking complete')
      })
        .catch(err => {
          alert(err.response.data);
        })
      await axios.post(
        process.env.REACT_APP_DEV_URL +
        '/api/subscription/onSubscriptionComplete',
        data,
        { headers: { 'x-auth-token': localStorage.getItem('access-token') } }
      ).then(res => {
        var d = new Date(res.data.payment.createdAt);
        setStartDate(d.toLocaleDateString())
        d.setMonth(d.getMonth() + subscriptionDate);
        setEndDate(d.toLocaleDateString())
      })

    } catch (err) {
      alert(err.response.data);
    }
  };

  useEffect(() => {
    console.log("startDate", startDate)
    console.log("endDate", endDate)
    console.log("amount", amount)
    console.log("sub_duration", subscriptionDate)
    axios.put(
      process.env.REACT_APP_DEV_URL +
      '/api/subscription/update-sub-date/' + localStorage.getItem('user-id'),
      {
        "subscription_start_date": startDate,
        "subscription_end_date": endDate,
        "sub_amount": amount,
        "sub_duration": subscriptionDate
      },
      {
        headers: {
          'x-auth-token': localStorage.getItem('access-token')
        }
      }
    )
  }, [endDate])


  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <p className='title-text'> You have not subscribed to our membership yet please continue to
        book property via Paypal</p>
      <Modal.Body>
        <>
          <div className='paypal-modal-div'>
            {subscription?.map(sub_data => (
              <>
                {
                  sub_data.isSubscription == true ?
                    (
                      <div className='paypal-modal-inner-class' >
                        <div className='paypal-modal-class'>
                          <span className='subscription-price'>{sub_data.price}$/&nbsp;{sub_data.select_sub_month}&nbsp; Monthly</span>
                          {/* <p>{sub_data.description}</p> */}

                          <PayPalScriptProvider
                            options={{
                              'client-id':
                                'AW5pF1We8b1Orr99Ci1jNQDuIxJg_lxtszoZ-qD7MUcxWeXcWOM1Y463UI49nOj6jkDuaiUfeycEb7lj',
                            }}
                          >
                            {/* <PayPalButtons style={{ layout: "horizontal" }} /> */}
                            <PayPalButtons
                              onClick={() => { select_subscription(sub_data.id) }}
                              style={{ layout: 'horizontal' }}
                              //   ref={reSubscribeRef}
                              id="re-subscribe"
                              disabled={false}
                              forceReRender={[50, currency, { layout: 'horizontal' }]}
                              fundingSource={undefined}
                              locale={'en_ca'}
                              createOrder={(data, actions) => {
                                return actions.order
                                  .create({
                                    purchase_units: [
                                      {
                                        amount: {
                                          currency_code: currency,
                                          value: sub_data.price,
                                        },
                                      },
                                    ],
                                  })
                                  .then(orderId => {
                                    // Your code here after create the order
                                    console.log('OrderId--------------', orderId);
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
                        </div>

                      </div>
                    ) : null
                }
              </>
            ))}

          </div>

        </>
      </Modal.Body>
    </Modal>
  );
}

export default PaypalModal;
