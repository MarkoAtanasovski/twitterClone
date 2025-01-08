import express from 'express';
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser';
import { v2 as cloudinary } from 'cloudinary';

import authRoutes from './routes/auth.js';
import userRoutes from './routes/user.js';

import connectMongoDB from './db/connectMongoDB.js';


dotenv.config({ path: 'C:/Users/User/Desktop/TWITTER-CLONE/.env' });
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});



console.log(process.env);

const app = express();
const PORT = process.env.PORT || 5000

app.use(express.json()); // to parse req.body

app.use(express.urlencoded({ extended:true})); // to parse form data (urlencoded)

app.use(cookieParser()); // to parse

app.use('/api/auth', authRoutes)
app.use('/api/users', userRoutes)

app.listen(PORT, ()=>{
    console.log(`Server is running on port: ${PORT}`);
    connectMongoDB();
})