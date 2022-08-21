// const express = require("express")
// const router = express.Router()
// const booking = require("../controllers/BookingControler")
// const { validateToken } = require("../middlewares/JWT")

// router.post("/addRequest", validateToken, booking.addBookingRequest)
// router.get("/getHomeStayBookings", validateToken, booking.getHomeStayBookings)
// router.get("/getUpcomingDates", validateToken, booking.getUpcomingDates)
// router.get("/getCompleteBooking", validateToken, booking.getCompleteBooking)
// router.get(
//     "/getPendingreservation",
//     validateToken,
//     booking.getPendingreservation
// )

// router.get("/getBookingCalender", validateToken, booking.getBookingCalender)

// router.post("/update_date", validateToken, booking.update_date)

// router.post(
//     "/approveDeclineBookingRequest",
//     validateToken,
//     booking.Approve_Decline_booking
// )
// router.get("/getAllBooking", validateToken, booking.getAllBookingRequest)

// router.get("/getUpcomingCounts", validateToken, booking.getUpcomingCounts)
// router.get("/getCompleteCount", validateToken, booking.getCompleteCount)
// router.get("/getDeclineCount", validateToken, booking.getDeclineCount)

// router.get("/getAllreservation", validateToken, booking.getAllreservation)
// router.get(
//     "/getuserIdInReservation/:id",
//     validateToken,
//     booking.getReservationUserDatabyId
// )
// router.post(
//     "/cancelBookingOnTimer",
//     validateToken,
//     booking.cancelBookingOnTimer
// )
// router.post(
//     "/getGuestRequestsByUserId",
//     validateToken,
//     booking.getGuestRequestsByUserId
// )
// router.post("/checkBookings", validateToken, booking.checkExistingBookings)

// module.exports = router



const express = require("express")
const router = express.Router()
const booking = require("../controllers/BookingControler")
const { validateToken } = require("../middlewares/JWT")

router.post("/addRequest", validateToken, booking.addBookingRequest)
router.get("/getHomeStayBookings", validateToken, booking.getHomeStayBookings)
router.get("/getUpcomingDates", validateToken, booking.getUpcomingDates)
router.get("/getCompleteBooking", validateToken, booking.getCompleteBooking)
// router.get(
//     "/getPendingreservation",
//     validateToken,
//     booking.getPendingreservation
// )

router.get("/getBookingCalender", validateToken, booking.getBookingCalender)

router.post("/update_date", validateToken, booking.update_date)

router.post(
    "/approveDeclineBookingRequest",
    validateToken,
    booking.Approve_Decline_booking
)
router.get("/getAllBooking", validateToken, booking.getAllBookingRequest)

router.get("/getUpcomingCounts", validateToken, booking.getUpcomingCounts)
router.get("/getCompleteCount", validateToken, booking.getCompleteCount)
router.get("/getDeclineCount", validateToken, booking.getDeclineCount)

router.get("/getAllreservation", validateToken, booking.getAllreservation)
router.get(
    "/getuserIdInReservation/:id",
    validateToken,
    booking.getReservationUserDatabyId
)
router.post(
    "/cancelBookingOnTimer",
    validateToken,
    booking.cancelBookingOnTimer
)
router.post(
    "/getGuestRequestsByUserId",
    validateToken,
    booking.getGuestRequestsByUserId
)
router.post("/checkBookings", validateToken, booking.checkExistingBookings)

module.exports = router

