import React, { useEffect, useState, useRef } from "react";
import "../../../layout/css/subscription.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
// import UnregistererHeader from '../../components/UnregistererHeader';
import {
  PayPalScriptProvider,
  PayPalButtons,
  usePayPalScriptReducer,
} from "@paypal/react-paypal-js";
import UnregistererHeader from "../../../../components/UnregistererHeader";

const Subscription = () => {
  const navigate = useNavigate();
  const [subscriptionData, setSubscriptionData] = useState("");
  const [userData, setUserData] = useState("");
  const currency = "USD";
  const [amount, setAmount] = useState("");
  const reSubscribeRef = useRef(null);
  const [newStartDate, setNewStartDate] = useState("");
  const [newEndDate, setNewEndDate] = useState("");
  const [subData, setSubData] = useState();
  const [plan, setPlan] = useState(1)
  const [subscription, setSubscription] = useState()


  var minDate = new Date();
  minDate.setMonth(minDate.getMonth() - 3);
  console.log("minDate", minDate)

  useEffect(() => {
    loadSubData()
  }, [])

  const loadSubData = async () => {
    const result = await axios
      .get(process.env.REACT_APP_DEV_URL + '/api/subscription/get-sub-by-user-id/' + localStorage.getItem('user-id'), {
        headers: {
          'x-auth-token': localStorage.getItem('access-token'),
        },
      })
    setSubData(result.data)
    console.log("result ==========", result)
  }

  useEffect(() => {
    axios
      .post(
        process.env.REACT_APP_DEV_URL + "/api/subscription/getSubscriptionById",
        {
          subId: 1, userId: localStorage.getItem("user-id"),
          headers: {
            'x-auth-token': localStorage.getItem('access-token'),
          }
        },
      )
      .then((res) => {
        console.log("user_data=============", res.data.user_data);
        // console.log('user_subs=============', res.data.user_subs);

        var new_start_date = new Date(res.data.user_data.subscription_end_date); // Now
        new_start_date.setDate(new_start_date.getDate() + 30);

        var new_end_date = new Date(new_start_date);
        new_end_date.setDate(new_end_date.getDate() + 30);

        setSubscriptionData(res.data.user_subs);
        setUserData(res.data.user_data);
        setAmount(res.data.user_subs.price);
        setNewStartDate(new_start_date);
        setNewEndDate(new_end_date);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const formatDate = (dateVal) => {
    let dateObj = new Date(dateVal);

    const month = dateObj.toLocaleString("default", { month: "short" });
    let day = dateObj.getDate();
    let year = dateObj.getFullYear();
    if (day < 10) {
      day = "0" + day;
    }
    let dateStr = day + " " + month + " " + year;
    return dateStr;
  };

  // const handleReSubscribe = () => {
  //   console.log("reSubscribeRef----------------",document.getElementById('re-subscribe'));
  //   // document.getElementById('re-subscribe').click();
  //   // reSubscribeRef.current.click();
  // }

  const handleOnSubscription = async (paymentData) => {
    console.log("paymentData------------", paymentData);
    let data = {
      user_id: localStorage.getItem("user-id"),
      order_id: paymentData.orderID,
      payer_id: paymentData.payerID,
      facilitator_access_token: paymentData.facilitatorAccessToken,
      payment_source: paymentData.paymentSource,
      payment_method: "CREDIT_CARD",
      amount: amount,
      newEndDate: newEndDate,
      newStartDate: newStartDate,
    };
    const saveSubData = await axios
      .post(
        process.env.REACT_APP_DEV_URL + "/api/subscription/onReSubscriptionComplete",
        data,
        { headers: { "x-auth-token": localStorage.getItem("access-token") } }
      )
      .then((res) => {
        alert("Payment Successful");
        console.log("sub save data----------", res);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {

    axios.put(
      process.env.REACT_APP_DEV_URL +
      '/api/subscription/update-sub-date/' + localStorage.getItem('user-id'),
      {
        "subscription_start_date": newStartDate,
        "subscription_end_date": newEndDate,
        "sub_amount": amount,
        "sub_duration": subscriptionData.select_sub_month
      },
      {
        headers: {
          'x-auth-token': localStorage.getItem('access-token')
        }
      }
    )
  }, [newEndDate])

  const handleSetPlane = () => {
    setPlan(2)
  }

  const handleBackPlane = () => {
    setPlan(1)
  }

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

      setAmount(data.data.data.price)
      setSubscriptionData(data.data.data.select_sub_month)

    })
  }


  return (
    <>
      {plan == 1 ? (
        <>
          <div className="subscription-main">
            <div className="subscritions">
              <div className="subscription-one">
                {!subData ? (<>No Subscription Taken</>) :
                  (<>
                    <p className="subscription-one-title">
                      ${subData?.price.amount}$/&nbsp;{subData?.date.sub_amount}&nbsp;Monthly
                    </p>
                    <p className="dummy_text">
                      {subscriptionData?.description}
                    </p>
                  </>)
                }
                <button className='btn btn-green' onClick={handleSetPlane}>More Plans</button>
              </div>
              <div className="subscription-two">
                <p className="expiry">Expiry Date</p>
                {!subData ? (<>No Subscription Taken</>) :
                  (<>
                    <p className="Expiry_Date_class">
                      {formatDate(subData?.date.subscription_start_date)} To {formatDate(subData?.date.subscription_end_date)}
                    </p>
                  </>)}
                <p className="">Re Subscribe</p>
                {/*<button onClick={handleReSubscribe} className="resubscribe">Re-Subscribe</button>*/}
                <PayPalScriptProvider
                  options={{
                    "client-id":
                      "AW5pF1We8b1Orr99Ci1jNQDuIxJg_lxtszoZ-qD7MUcxWeXcWOM1Y463UI49nOj6jkDuaiUfeycEb7lj",
                  }}
                >
                  {/*<PayPalButtons style={{ layout: "horizontal" }} />*/}
                  <PayPalButtons
                    style={{ layout: "horizontal" }}
                    ref={reSubscribeRef}
                    id="re-subscribe"
                    disabled={false}
                    forceReRender={[amount, currency, { layout: "horizontal" }]}
                    fundingSource={undefined}
                    locale={"en_ca"}
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
                        .then((orderId) => {
                          // Your code here after create the order
                          console.log("OrderId--------------", orderId);
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
                {/*<button class="unsubscribe">un-subscribe</button>*/}
              </div>
            </div>
          </div>
        </>) :

        (
          <div className="subscription-main-class">
            <button className='btn btn-green' onClick={() => { setPlan(1) }}>Back</button>
            <div className="subscription-main-second">
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
        )}

    </>

  );
};

export default Subscription;

