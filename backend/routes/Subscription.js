const express = require("express")
const router = express.Router();
const subscribe = require("../controllers/SubscriptionControer")
const { validateToken } = require("../middlewares/JWT")


router.post('/create_sub', validateToken, subscribe.CreatePlane);
router.put('/update_sub/:id', validateToken, subscribe.updatePlane);
router.get('/get_sub', subscribe.viewPlane);
router.get('/payementSum', validateToken, subscribe.payementSum);
router.get('/getSubscription', validateToken, subscribe.getSubscription);
router.delete('/delete_sub/:id', validateToken, subscribe.deletePlane)
router.post('/getSubscriptionById', validateToken, subscribe.getSubscriptionById);
router.post('/onSubscriptionComplete', validateToken, subscribe.onSubscriptionComplete);
router.post('/onReSubscriptionComplete', validateToken, subscribe.onReSubscriptionComplete);
router.get('/get-sub-by-user-id/:id', validateToken, subscribe.getPlanByUserID)
router.put('/update-sub-date/:id', validateToken, subscribe.updateSubscriptionDate)
router.get('/check-user-subscribe/:user_id', validateToken, subscribe.checkUserSubscribe)
router.get('/get-sub-data-by-id/:id', validateToken, subscribe.getSubDataById)

module.exports = router
