import jwt from 'jsonwebtoken';
import User from '../models/userModel.js'

const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret_here';

const authMiddleware = async(req,res,next)=>{
 const authHeader = req.headers.authHeader;
 if(!authHeader || !authHeader.startsWith('Bearer')){
    return res.status(401).json({success:false,message:"Not Authorized,token missing"})
  }
  const token =authHeader.split(' ')[1];
   try {
      const decoded = jwt.verify(token,JWT_SECRET)
      const user = await User.findById(decoded.id).select('-password')
      if (!user){
      return res.status(401).json({success:false, message:"User not found"})
    }
    req.user=user;
    next();

   } catch (error) {
     console.error("JWT verification error:", error.message);

    res.status(500).json({success:false,message:"Token invalid or expired "})
  }
   }


  export default authMiddleware;