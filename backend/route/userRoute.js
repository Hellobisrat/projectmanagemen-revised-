import express from 'express';
import {getCurrentUser,loginUser,registerUser,updatePassword,updateProfile} from '../controllers/userController.js'
import authMiddleware from '../middleware/auth.j'
const userRouter = express.Router()

// public links
userRouter.post('/register',registerUser)
userRouter.post('/login',loginUser)

// Private links
userRouter.get('/me',authMiddleware,getCurrentUser);
userRouter.put('/profile',authMiddleware,updatePassword);
userRouter.put('/password',authMiddleware,updatePassword)


export default userRouter