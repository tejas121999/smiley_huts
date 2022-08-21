const express = require("express")
const router = express.Router()
const authControler = require("../controllers/auth.controler")
const { validateToken } = require("../middlewares/JWT")
const { credientialValidation } = require("../validation/credientialValidation")
const { emailExistsValidation } = require("../validation/emailExistsValidation")

router.post("/", credientialValidation, authControler.login)
router.post("/googlelogin", credientialValidation, authControler.googleLogin)
router.post("/register", credientialValidation, authControler.registration)
router.post(
    "/googleRegister",
    credientialValidation,
    authControler.googleRegister
)
router.post("/changed", authControler.changePassword)
router.get("/logout", validateToken, authControler.logout)
router.get("/getUserMonth", validateToken, authControler.getUserMonth)
router.get("/getProfile", validateToken, authControler.getProfile)
router.get("/getActive", validateToken, authControler.getActive)
router.get("/deActive", validateToken, authControler.deActive)
router.get("/getActiveCount", validateToken, authControler.getActiveCount)
router.get(
    "/getActiveCountMembers",
    validateToken,
    authControler.getActiveCountMembers
)

router.get(
    "/getDeactiveCountMembers",
    validateToken,
    authControler.getDeactiveCountMembers
)
router.post(
    "/forgotPassword",
    emailExistsValidation,
    authControler.forgotPassword
)
router.get("/resetPasswordData", authControler.resetPasswordData)
router.post("/updatePasswordViaEmail", authControler.updatePasswordViaEmail)
router.post("/removeFamily", validateToken, authControler.removeFamilyMembers)
router.get("/getTotalUsers", validateToken, authControler.getTotalUsers)
router.post("/createProfile", validateToken, authControler.createProfile)
router.get("/verifyEmail", authControler.verifyEmail)
router.post("/getUserProfile", validateToken, authControler.getUserProfile)
router.post("/getIsVerified", authControler.getIsVerified)

router.post("/sendContactMail", authControler.contactEmail)
router.post('/create-property', validateToken, authControler.CreatePropertyRequest)
router.post("/:id", validateToken, authControler.updateProfile)

module.exports = router
