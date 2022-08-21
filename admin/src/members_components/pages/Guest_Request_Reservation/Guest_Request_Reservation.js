import React from 'react'
import "../../layout/css/request_reservation.css"
import Guest_Request from "./Guest_Request"
import Reservation from "./Reservation"

const Guest_Request_Reservation = () => {
    return (
        <div className="grey-background">
            <div className='Guest_Request_Reservation_tab container'>
                <nav className="guest-request-nav">
                    <div className="nav nav-tabs" id="nav-tab guest-request-nav-tab" role="tablist">
                        <button className="nav-link nav_text active" id="nav-Guest_Request-tab" data-bs-toggle="tab" data-bs-target="#nav-Guest_Request" type="button" role="tab" aria-controls="nav-Guest_Request" aria-selected="true">Guest Request</button>
                        <button className="nav-link nav_text" id="nav-Reservation-tab" data-bs-toggle="tab" data-bs-target="#nav-Reservation" type="button" role="tab" aria-controls="nav-Reservation" aria-selected="false">Reservation</button>
                    </div>
                </nav>
                <div className="tab-content mt-1" id="nav-tabContent">
                    <div className="tab-pane fade show active" id="nav-Guest_Request" role="tabpanel" aria-labelledby="nav-Guest_Request-tab">
                        <Guest_Request />
                    </div>
                    <div className="tab-pane fade" id="nav-Reservation" role="tabpanel" aria-labelledby="nav-Reservation-tab">
                        <Reservation />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Guest_Request_Reservation