import express from 'express';
import dotenv from 'dotenv'
import authRoutes from './routes/auth.js';
import connectMongoDB from './db/connectMongoDB.js';
import cookieParser from 'cookie-parser';

dotenv.config({ path: 'C:/Users/User/Desktop/TWITTER-CLONE/.env' });
console.log(process.env);

const app = express();
const PORT = process.env.PORT || 5000

app.use(express.json()); // to parse req.body

app.use(express.urlencoded({ extended:true})); // to parse form data (urlencoded)

app.use(cookieParser()); // to parse

app.use('/api/auth', authRoutes)
app.listen(PORT, ()=>{
    console.log(`Server is running on port: ${PORT}`);
    connectMongoDB();
})