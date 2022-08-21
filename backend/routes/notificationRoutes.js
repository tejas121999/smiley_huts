const express = require("express")
const router = express.Router()
const notification = require("../controllers/notificationController")
const { validateToken } = require("../middlewares/JWT")

router.get(
    "/getnotificationbyueseID/:id",
    validateToken,
    notification.getnotificationbyueseID
)
router.get(
    "/getUnreadNotificationCount/:id",
    validateToken,
    notification.getUnreadNotificationCount
)
router.post("/addNotification", validateToken, notification.addNotification)
router.post(
    "/updateNotification/:id",
    validateToken,
    notification.updateNotification
)

module.exports = router
