const express = require("express")
const router = express.Router()
const fileUplode = require("../controllers/fileUploade")
const { validateToken } = require("../middlewares/JWT")
const FileUpload = require("../middlewares/ProfileImg")
const propertyUpload = require("../middlewares/PropertyImg")
const famalyMemberImg = require("../middlewares/famalyImage")
const identityImg = require("../middlewares/identityImage")
const newPropImg = require("../middlewares/newPropertyImage")
const reviewImg = require("../middlewares/reviewImage")

router.post(
    `/profile/:id`,
    validateToken,
    FileUpload.upload.single("user_img"),
    fileUplode.uploadProfilImg
)

router.post(
    `/property/:id`,
    validateToken,
    propertyUpload.upload.array("property"),
    fileUplode.uploadPropertyImg
)

router.post(
    `/memberImg/:id`,
    validateToken,
    famalyMemberImg.upload.single("famaly"),
    fileUplode.uploadFamalyMemberImg
)

router.post(
    `/user/:id`,
    validateToken,
    identityImg.upload.single("identity"),
    fileUplode.uploadIdentityImg
)

router.post(
    `/review/:id`,
    validateToken,
    reviewImg.upload.single("review"),
    fileUplode.uploadReviewImage
)

router.delete("/updateProperty/:user_id",
    validateToken,
    // newPropImg.upload.array("property"),
    fileUplode.UpdateAndRemoveImage
)

router.post(
    "/newProperty/:id",
    validateToken,
    newPropImg.upload.array("property"),
    fileUplode.uploadNewPropertyImg
)



module.exports = router
