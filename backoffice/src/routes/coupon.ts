import express from "express";
import controller from '../controllers/coupon'

const router = express.Router();

router.post('/generate', controller.createCouponRoute)
router.get('/list', controller.listCouponsRoute)
export = router