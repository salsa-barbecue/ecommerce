import express from "express";
import controller from '../controllers/user'

const router = express.Router();

router.post('/register', controller.createUserRoute);
router.post('/login', controller.loginUserRoute);

export = router