const express = require("express")
const router = express.Router()
const { validateToken } = require("../middlewares/JWT")
const setting = require("../controllers/settingControler")

router.post(
    "/guest_req_notifi",
    validateToken,
    setting.GuestRequestNotification
)
router.post(
    "/review_rating_notifi",
    validateToken,
    setting.reviewRatingNotification
)
router.post(
    "/guest_review_notifi_email",
    validateToken,
    setting.guestReviewNotificationEmail
)
router.post(
    "/review_rating_notifi_email",
    validateToken,
    setting.reviewRatingNotificationEmail
)
router.post("/getAllNotification", validateToken, setting.getAllNotification)
router.post("/createSetting", validateToken, setting.createSettings)
//updatevalue

router.post("/isGuestRequest", validateToken, setting.isGuestRequest)
router.post(
    "/isreviewratingnotifi",
    validateToken,
    setting.isreviewratingnotifi
)
router.post(
    "/guestreviewnotifiemail",
    validateToken,
    setting.guestreviewnotifiemail
)
router.post(
    "/reviewratingnotificationemail",
    validateToken,
    setting.reviewratingnotificationemail
)

module.exports = router
