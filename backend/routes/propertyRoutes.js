const express = require("express")
const router = express.Router()
const { validateToken } = require("../middlewares/JWT")
const propertyControler = require("../controllers/propertyControler")

// add property details route
router.post("/", validateToken, propertyControler.addPropertyDetails)

// get all property
router.post("/getAllProperty", validateToken, propertyControler.getAllProperty)

router.post("/getproptype", validateToken, propertyControler.getproptype)
router.post(
    "/getpropertybyuserid",
    validateToken,
    propertyControler.getPropertyByUserID
)

// get all property admin
router.get(
    "/getAllPropertyAdmin",
    validateToken,
    propertyControler.getAllPropertyAdmin
)

// get property by id
router.get("/:id", validateToken, propertyControler.getPropertyByID)

// edit property by id
router.put("/:id", validateToken, propertyControler.editPropertyByID)

router.post("/isphotoRequest", validateToken, propertyControler.isphotoRequest)

router.post(
    "/getNearByProperties",
    validateToken,
    propertyControler.getNearByProperties
)

router.post(
    "/newPropertyImages",
    validateToken,
    propertyControler.createNewPropertyImages
)

router.post(
    "/getSearchedProperties",
    validateToken,
    propertyControler.getSearchedProperties
)

router.post(
    "/filterProperties",
    validateToken,
    propertyControler.getFilteredProperties
)
router.post(
    "/getUnApprovedImages",
    validateToken,
    propertyControler.getUnapprovedImages
)

router.post("/:id", validateToken, propertyControler.isApproved)

module.exports = router
