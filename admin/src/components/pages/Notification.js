import React from 'react'
import "../layout/css/notification.css"

const Notification = () => {
    return (
        <div className='abc'>
            <span className="notificationText">
                Notification
            </span>
            <hr style={{
                width: "98%",
                height: "3px",
                color: "black",
                position: "relative",
                bottom: "220px"
            }} />
            <table className="table table-borderless notification_table">
                <tbody>
                    <tr>
                        <td style={{ color: "gray", position: "relative", left: "10px", maxWidth: "350px" }}>
                            When setting the style for several link states, there are some order rules
                            When setting the style for several link states, there are some order rules
                            When setting the style for several link states, there are some order rules
                            When setting the style for several link states, there are some order rules
                        </td>
                        <td style={{ color: "gray", position: "relative", left: "200px" }}>
                            29 Feb | 10:45 PM
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}

export default Notification