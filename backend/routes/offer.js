const express = require("express")
const router = express.Router()
const offerControler = require("../controllers/offerControler")
const { validateToken } = require("../middlewares/JWT")

router.post("/create-offer", validateToken, offerControler.CreateOffer)
router.put("/edit-offer/:id", validateToken, offerControler.EditOffer)
router.delete("/delete-offer/:id", validateToken, offerControler.DeleteOffer)
router.get("/get-all-offer", validateToken, offerControler.GetAllOffer)
router.get("/get-enable-offer", validateToken, offerControler.GetAllOffer)
router.get("/get-disable-offer", validateToken, offerControler.GetAllOffer)

module.exports = router
