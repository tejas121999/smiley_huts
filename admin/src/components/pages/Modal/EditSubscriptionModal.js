import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Modal } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import "../../layout/css/subscription_admin.css"

const EditSubscriptionModal = (props) => {
    const [price, setPrice] = useState()
    const [description, setDescription] = useState()
    const id = props?.onModal?.id
    const [value, setValue] = useState();
    const [subscription, setSubscription] = useState()
    useEffect(() => {
        setPrice(props?.onModal?.price)
        setDescription(props?.onModal?.description)
        setValue(props?.onModal?.isSubscription)
        setSubscription(props?.onModal?.select_sub_month)
        console.log('props are ----- ', props.onModal)
    }, [props])



    // const { price, description } = subscription

    // const onInputChange = e => {
    //     setSubscription({ ...subscription, [e.target.name]: e.target.value });
    // }



    const onSubmit = async e => {
        e.preventDefault();
        const res = await axios.put(process.env.REACT_APP_DEV_URL + "/api/subscription/update_sub/" + id,
            {
                price: price,
                description: description,
                select_sub_month: subscription,
                isSubscription: value
            },
            {
                headers: {
                    'x-auth-token': localStorage.getItem('access-token')
                }
            }
        );
        if (res.status == 200) {
            props.onHide()
            window.location.reload();
        } else {
            alert('error')
        }
    }

    // const loadUser = async () => {
    //     const result = await axios.get("/api/subscription/get_sub");
    //     setSubscription(result.data);
    // }

    // useEffect(() => {
    //     loadUser();
    // }, [])

    return (
        <Modal
            centered
            show={props.show}
            onHide={props.onHide}
            keyboard={false}
            className="SubscriptionModal"
        >
            <div>
                <form className='subscription-form'
                    onSubmit={e => onSubmit(e)}
                    style={{ width: "100%" }}
                >

                    <input
                        className='form-control subscription-input'
                        placeholder='Price'
                        name='price'
                        value={price}
                        onChange={e => setPrice(e.target.value)}
                    />

                    <select
                        className="form-select subscription-input subscription-select-input"
                        aria-label="Default select example"
                        value={subscription}
                        onChange={e =>
                            setSubscription(prev => (
                                // ...prev,
                                // select_sub_month:
                                e.target.value
                            ))
                        }
                    >
                        <option selected>Open this select menu</option>
                        <option value="1">One</option>
                        <option value="3">Three</option>
                        <option value="6">six</option>
                    </select>

                    <textarea
                        placeholder='Description'
                        className='form-control subscription-input'
                        rows="4"
                        cols="50"
                        name='description'
                        value={description}
                        onChange={e => setDescription(e.target.value)}
                    />

                    <div>
                        <input
                            className="radio-input"
                            type="radio"
                            value="1"
                            checked={value == 1}
                            onChange={e => setValue(e.target.value)}
                            name="recipient"
                        />
                        &nbsp;
                        <label className="radio-label">Active</label>
                        <input
                            className="radio-input"
                            type="radio"
                            checked={value == 0}
                            value="0"
                            onChange={e => setValue(e.target.value)}
                            name="recipient"
                        />
                        &nbsp;
                        <label className="radio-label">Inactive</label>
                    </div>

                    <button className='btn btn-dark' >Create</button>
                </form>
            </div>
        </Modal>
    )
}

export default EditSubscriptionModal