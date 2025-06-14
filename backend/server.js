import express from 'express';
import userRoutes from "./routes/userRoutes.js";
import sellerRoutes from "./routes/sellerRoutes.js";
import {connectDB} from "./config/config.js";
import cors from 'cors';

const app = express();

app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(cors('*'))

app.use('/',userRoutes)
app.use('/',sellerRoutes)

connectDB()

app.listen(5000,()=>{
    console.log('server is running');
})