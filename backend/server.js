import { v2 as cloudinary } from 'cloudinary';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import path from 'path';

import authRoutes from './routes/auth.js';
import notificationRoutes from './routes/notification.js';
import postRoutes from './routes/post.js';
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
const __dirname = path.resolve()


app.use(
    cors({
        origin: 'http://localhost:3000', // Frontend URL
        credentials: true, // Allow cookies and other credentials
    })
);

// do not put high limit to prevent DoS attacks
app.use(express.json({limit:"5mb"})); // to parse req.body


app.use(express.urlencoded({ extended:true})); // to parse form data (urlencoded)

app.use(cookieParser()); // to parse

app.use('/api/auth', authRoutes)
app.use('/api/users', userRoutes)
app.use('/api/posts', postRoutes)
app.use('/api/notifications', notificationRoutes);

if(process.env.NODE_ENV === 'production'){
    app.use(express.static(path.join(__dirname, '/frontend/dist')));
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
    });

}



app.listen(PORT, ()=>{
    console.log(`Server is running on port: ${PORT}`);
    connectMongoDB();
})