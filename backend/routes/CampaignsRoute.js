const express = require("express")
const router = express.Router()
const { validateToken } = require("../middlewares/JWT")
const campaigns = require("../controllers/campaigns.controler")

// create campaigns
router.post("/createCamp", validateToken, campaigns.createCampaigns)

// delete schedule campaigns
router.delete(
    "/deleteScheduleCamp/:id",
    validateToken,
    campaigns.deleteScheduleCamp
)

// get all schedule campaigns
router.get("/getScheduleCamp", validateToken, campaigns.getscheduledCamp)

// reschedule campaigns
router.put("/reScheduleCamp/:id", validateToken, campaigns.RescheduleCamp)

// get all camaigns Draft
router.get(
    "/getAllCampaignsDraft",
    validateToken,
    campaigns.getAllCampaignsDraft
)

// update campaigns draft
router.put(
    "/updateCampaignsDraft/:id",
    validateToken,
    campaigns.updateCampaignsDraft
)

// delete campaigns draft
router.delete(
    "/deleteCampaignsDraft/:id",
    validateToken,
    campaigns.deleteCampaignsDraft
)

//get all previous campaigns
router.get("/PreviousCamp", validateToken, campaigns.PreviousCamp)

// duplicate previous campaigns draft
router.post("/duplicateCampDraft", validateToken, campaigns.duplicateCampDraft)
router.post("/scheduleCampaign", validateToken, campaigns.scheduleCampaign)

module.exports = router
