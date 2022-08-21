const express = require("express")
const router = express.Router();
const { validateToken } = require("../middlewares/JWT")
const review = require('../controllers/ReviewControler')

// post review
router.post('/postReview',validateToken, review.postReview);

// get all approve review
router.get('/getapproveReview',validateToken, review.getApproveAllReview);

// get all approve review
router.get('/getallReview',validateToken, review.getAllReview);

// delete review
router.delete('/deleteReview/:id',validateToken, review.DeleteReview);

// is approve
router.post('/isApprove',validateToken, review.isApproveReview)

// get reviews by user id
router.get('/getReviewsByUserId/:id',validateToken, review.getReviewsByUserId);

// send notifications at midnight everyday
router.get('/sendReviewNotifications',validateToken, review.sendReviewNotifications);

router.post('/sendMail',validateToken, review.sendMail);

module.exports = router;
