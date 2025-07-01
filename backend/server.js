// import express from 'express';
// import {connectDB} from "./config/config.js";
// import cors from 'cors';
// import cookieParser from 'cookie-parser';
// import routes from "./routes/router.js";
//
// const app = express();
//
// app.use(express.urlencoded({extended:true}));
// app.use(express.json());
// app.use(cors({
//     origin: "http://localhost:5173",
//     credentials: true
// }))
//
// app.use(cookieParser());
//
// // app.use('/',userRoutes)
// // app.use('/',sellerRoutes)
// // app.use('/',categoryRoutes)
// app.use('/',routes)
//
// connectDB()
//
// app.listen(5000,()=>{
//     console.log('server is running');
// })

//

import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import authRoutes from './routes/authRoutes.js';
import {connectDB} from "./config/config.js";

dotenv.config();
connectDB();

const app = express();

app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true,
}));
app.use(express.json());
app.use(cookieParser());

app.use('/api/auth', authRoutes);


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
