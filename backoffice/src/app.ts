import express from 'express';
import cors from "cors";
import {sequelize, initializeDatabase} from "./config/database";

import couponRoutes from './routes/coupon';
import userRoutes from './routes/user';

const app = express();
const port = process.env.PORT || 8000;

app.use(cors());
app.use(express.json());
app.use(
    express.urlencoded({
        extended: true,
    })
);

app.use('/user', userRoutes)
app.use('/coupon', couponRoutes)

app.get('/', (req, res) => {
    res.send('Back Office!');
});

app.listen(port, async () => {
    console.log(`Backoffice on port ${port}`);

    try{
        await sequelize.authenticate()
        console.log("DATABASE CONNECTED")

        await initializeDatabase()
        console.log("DATABASE INITIALIZED")
    }catch (e) {
        console.log("DATABASE ERROR")
    }
});