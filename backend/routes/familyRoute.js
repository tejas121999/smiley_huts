const express = require("express")
const router = express.Router()
const { validateToken } = require("../middlewares/JWT")
const familyController = require("../controllers/FamilyController")

router.post(
    "/getfamilybyuserid",
    validateToken,
    familyController.getFamilyDataByUserId
)

module.exports = router
