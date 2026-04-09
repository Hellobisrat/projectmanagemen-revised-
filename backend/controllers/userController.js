import User from '../models/userModel.js'
import validator from 'validator'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { use } from 'react';
dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET || 'supersecretkey123'
const TOKEN_EXPIRES ='24h';

const createToken = (userId)=>jwt.sign({id:userId},JWT_SECRET,{expiresIn:TOKEN_EXPIRES})

export const registerUser = async(req,res)=>{
  const {name,email,password}=req.body
  if(!name|| !email || !password){
    return res.status(400).json({success:false,message:"All fields are required "})
  }
  if(!validator.isEmail(email)){
    return res.status(400).json({success:false,message:"Invalid email"})
  }
  if(password.length <8 ){
    return res.status(400).json({success:false, message:"Password must be 8 characters"})
  }
  try {
    if(await User.findOne({email})){
      return res.status(400).json({success:false,message:'user already exist'})
    }
    const hashedPassword = await bcrypt.hash(password,10)
    const user = await User.create({name,email,password:hashedPassword})
    const token = createToken(user._id)
    res.status(201).json({success:true,token,user:{id:user._id,name:user.name,email:user.email}})
  } catch (error) {
    console.log(error);
    res.status(500).json({success:false,message:'server error'})
  }
}

// login

export const loginUser = async(req,res)=>{
  const {email,password}=req.body;
  if(!email || !password){
     return res.status(400).json({success:false,message:"All fields are required "})
  }
  if(password.length<8){
     return res.status(400).json({success:false, message:"Password must be 8 characters"})
  }
  try {
    const user = await User.findOne({email})
    if(!user){
      return res.status(400).json({success:false, message:"Invalid credential"})
    }
    const comparedPassword = await bcrypt.compare(password,user.password)
     if(!comparedPassword){
      return res.status(401).json({success:false,message:"Invalid credentials"})
    }
    const token = createToken(user._id)
    res.status(200).json({success:true,token,user:{id:user._id,name:user.name,email:user.email}})
  } catch (error) {
    res.status(500).json({success:false,message:"Server error"})
  }
  }
// Get current User

export const getCurrentUser = async(req,res)=>{
  const id = req.user.id
  try {
    const user = await User.findById(id).select('name email');
    if(!user){
      return res.status(400).json({success:false,message:"User not found"})
    }
    res.status(200).json({success:true,user})
    
  } catch (error) {
    res.status(500).json({success:false,message:"Server error"})
    }
  }

  // UPDATE USER
  export const updateProfile = async(req,res)=>{
    const {name,email}= req.body
    if(!name || !email || !validator.isEmail(email)){
      return res.status(400).json({success:false,message:"valid name and email required"})
    }
    try {
      const exists = await User.findOne({email,_id:{$ne:req.user.id}})
       if(exists){
       return res.status(400).json({success:false, message:"email is used by another user"})
      }
      const user =  await User.findByIdAndUpdate( 
        req.user.id,{name,email},
      {new:true,runValidators:true,select:"name email"})
       res.status(200).json({success:true,user})

    } catch (error) {
       res.status(500).json({success:false,message:"Server error"})
  }
    }
  
// change password
export const updatePassword = async (req,res)=>{
  const {currentPassword,newPassword}=req.body;
  if(!currentPassword || !newPassword || newPassword.length<8){
     return res.status(400).json({success:false, message:"Password invalid or too short"})
  }
  try {
    const user = await User.findById(req.user.id).select('password')
    if(!user){
      return res.status(400).json({success:false,message:"User not found"})
    }
    const comparedPassword = await bcrypt.compare(currentPassword,user.password)
     if(!comparedPassword){
      return res.status(401).json({success:false,message:"Current password incorrect"})
    }
    user.password = await bcrypt.hash(newPassword,10)
    await user.save()
    res.status(200).json({success:true,message:"Password changed"})
  } catch (error) {
     res.status(500).json({success:false,message:"Server error"})
  }
  
}