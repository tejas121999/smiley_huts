import axios from 'axios'
import React, { useEffect, useState } from 'react'
import DeleteModal from '../Modal/DeleteModal'
import EditSubscriptionModal from '../Modal/EditSubscriptionModal'
import "../../layout/css/subscription_admin.css"

const DeActiveSubscription = () => {
    const [subscription, setSubscription] = useState()
    const [sub_data, setSub_data] = useState([])
    const [openModal, setOpenModal] = useState(false);
    const [openDeleteModel, setOpenDeleteModel] = useState(false)
    const handleModalOpen = () => {
        setOpenModal(true);
    };
    const handleModalClose = (sub_data) => {
        setSub_data(sub_data)
        setOpenModal(false)
    };

    const handleModalDeleteOpen = () => {
        setOpenDeleteModel(true);
    };
    const handleModalDeleteClose = (sub_data) => {
        setSub_data(sub_data)
        setOpenDeleteModel(false)
    };


    const loadSubscription = async () => {
        const res = await axios.get(process.env.REACT_APP_DEV_URL +
            '/api/subscription/get_sub', {
            headers:
                { 'x-auth-token': localStorage.getItem('access-token') }
        });
        // console.log("res==============", res)
        setSubscription(res.data.view_plane)
    }

    useEffect(() => {
        loadSubscription();
    }, []);
    return (
        <div className='AllSubscription'>
            {subscription?.map(subscribe => (
                <>
                    {subscribe.isSubscription == false ? (<>
                        <EditSubscriptionModal
                            show={openModal}
                            onHide={handleModalClose}
                            onModal={subscribe}
                        />
                        <DeleteModal
                            show={openDeleteModel}
                            onHide={handleModalDeleteClose}
                            onModal={subscribe}
                        />
                        <div className='AllSubscription-div'>
                            <div className='active-subscribe'>
                                {subscribe.isSubscription == true ?
                                    (<p className='Active-plan'>Active</p>) :
                                    (<p className='De-Active-plan'>De-Active</p>)
                                }
                            </div>
                            <span className='subscription-price-duration'>{subscribe.price}$/&nbsp;{subscribe.select_sub_month}&nbsp;Monthly</span>
                            <span className='plan-description'>{subscribe.description}</span>
                            <div className='AllSubscription-btn'>
                                <button
                                    className='btn btn-dark'
                                    onClick={() => handleModalOpen(subscribe.id)}
                                >
                                    Edit Plan
                                </button>
                                &nbsp;
                                <button
                                    className='btn btn-outline-dark'
                                    onClick={() => handleModalDeleteOpen(subscribe.id)}
                                >
                                    Delete Plan
                                </button>
                            </div>
                        </div>
                    </>) : (<></>)}

                </>
            ))}
        </div>
    )
}

export default DeActiveSubscription