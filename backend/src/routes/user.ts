import express from "express";
import controller from '../controllers/user'
import {verifyUserData} from '../middlewares/userData'

const router = express.Router();

//route verificate solo per valutare che i parametri non siano stringhe vuote
router.post('/register', verifyUserData, controller.createUserRoute);
router.post('/login', verifyUserData, controller.loginUserRoute);

export = router