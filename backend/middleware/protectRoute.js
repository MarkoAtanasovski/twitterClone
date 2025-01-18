import User from '../models/user.model.js'
import jwt from 'jsonwebtoken';

export const protectRoute = async (req, res, next) =>{
    try{
        const token = req.cookies.jwt;
       // console.log('JWT Cookie:', token); // Log the JWT cookie
        if(!token){
            return res.status(401).json({message: 'You are not authorized to access this route.'});
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log('JWT decoded:', decoded)
        if(!decoded){
            return res.status(401).json({message: 'Token is invalid.'});
        }
        const user = await User.findById(decoded.userId).select('-password');
        if(!user){
            return res.status(404).json({message: 'User not found.'});
        }
        req.user = user;
        next();


    }catch(error){
        console.log('Error in protectRoute middleware', error.message);
        return res.status(500).json({error:'Internal Server Error'});

}
}