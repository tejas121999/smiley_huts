import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Modal } from 'react-bootstrap';

const DeleteModal = (props) => {
    console.log('props are delete model ----- ', props.onModal)

    const id = props.onModal.id

    const handleDelete = async () => {
        const res = await axios.delete(
            process.env.REACT_APP_DEV_URL + '/api/subscription/delete_sub/' + id,
            {
                headers: {
                    'x-auth-token': localStorage.getItem('access-token'),
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

    const handleClose = async () => {
        props.onHide()
    }
    return (
        <Modal
            centered
            show={props.show}
            // onHide={props.onHide}
            keyboard={false}
            className="deleteModel"
        >
            <div className='btn-btn-delete-model'>
                <span className='delete-model-text'>Are you sure to delete this</span>
                &nbsp;
                <div className='btn-btn-delete'>
                    <button
                        className='btn btn-dark'
                        onClick={handleClose}
                    >
                        Cancel
                    </button>
                    &nbsp;&nbsp;
                    <button
                        className='btn btn-outline-dark'
                        onClick={() => handleDelete()}
                    >
                        Delete
                    </button>
                </div>
            </div>
        </Modal>

    )
}

export default DeleteModal