import express from "express";
import controller from '../controllers/coupon'
import {verifyAuthRoute} from "../middlewares/auth";

const router = express.Router();

//uniche route verificate tramite JWT token
router.post('/create', verifyAuthRoute, controller.createCouponRoute)
router.get('/list', verifyAuthRoute, controller.listCouponsRoute)
router.get('/available', verifyAuthRoute, controller.listAvailableCouponsRoute)

export = router