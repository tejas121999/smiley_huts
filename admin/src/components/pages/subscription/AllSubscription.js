import axios from 'axios'
import React, { useEffect, useState } from 'react'
import DeleteModal from '../Modal/DeleteModal'
import EditSubscriptionModal from '../Modal/EditSubscriptionModal'
import "../../layout/css/subscription_admin.css"


const AllSubscription = () => {
    const [subscription, setSubscription] = useState()
    const [sub_data, setSub_data] = useState()
    const [openModal, setOpenModal] = useState(false);
    const [openDeleteModel, setOpenDeleteModel] = useState(false)

    const handleModalOpen = (data) => {
        console.log("sub_data ===============================", sub_data)
        setSub_data(data)
        setOpenModal(true);
    };
    const handleModalClose = () => {
        setOpenModal(false)
    };

    const handleModalDeleteOpen = (data) => {
        setSub_data(data)
        setOpenDeleteModel(true);
    };
    const handleModalDeleteClose = () => {

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
            <EditSubscriptionModal
                show={openModal}
                onHide={handleModalClose}
                onModal={sub_data}
            />
            {subscription?.map(subscribe => (
                <>

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
                                onClick={() => handleModalOpen(subscribe)}
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
                </>
            ))}
        </div>
    )
}

export default AllSubscription