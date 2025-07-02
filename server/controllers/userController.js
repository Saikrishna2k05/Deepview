import express from 'express'
import User from '../models/userModel.js';
import {z} from 'zod'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
export const login=async(req,res)=>{
    try
    {
        const {email, password}=req.body;
        const userLoginSchema=z.object({
            email: z.string().email(),
            password: z.string().min(8)
        })
        const result = userLoginSchema.safeParse({ email, password });
        if(!result.success)
        {
            return res.status(400).json({
                success:false,
                message:"Validation failed"
            })
        }
        const user=await User.findOne({email});
        if(!user)
        {
            return res.status(400).json({
                success:false,
                message:"No user with this Email"
            })
        }
        const isPasswordValid=await bcrypt.compare(password, user.password);
        if(!isPasswordValid)
        {
            return res.status(400).json({
                success:false,
                message:"Incorrect password"
            })
        }
        const token=jwt.sign({id: user._id}, process.env.USER_JWT_SECRET, {expiresIn:"2h" });
        res.cookie("token", token, {
            httpOnly: true,
            path: '/'
        })
        return res.status(200).json({
            success: true,
            message:`Welcome back ${user.username}`,
            user
        })
    }
    catch(err)
    {
        console.error("Login error:", err.message);
        return res.status(500).json({
            success: false,
            message: "Failed to Login"
        })
    }
}



export const signup=async(req, res)=>{
    try
    {
        const {username, email, password}=req.body;
        const userSignupSchema=z.object({
            username: z.string(),
            email: z.string().email(),
            password: z.string().min(8)
        })
        const result=userSignupSchema.safeParse({username, email, password});
        if(!result.success)
        {
            return res.status(400).json({
                success:false,
                message:"Validation failed"
            })
        }
        const existingUserByEmail=await User.findOne({email})
        if(existingUserByEmail)
        {
            return res.status(400).json({
                success:false,
                message:"User with this email already exists"
            })
        }
        const hashedPassword=await bcrypt.hash(password, 10);
        await User.create({
            username,
            email,
            password:hashedPassword
        })
        return res.status(201).json({
                success: true,
                message: "Account Created Successfully"
        })
    }  
    catch(err)
    {
        console.log(err);
        return res.status(500).json({
            success: false,
            message: "Failed to register"
        })
    } 
}

export const logout=(_, res)=>{
    try{
        res.clearCookie("token",{
        httpOnly: true,
        path: '/'
    })
    return res.status(200).json({
        success: true,
        message: "Logout successful"
    })
    }
    catch(err)
    {
        return res.status(500).json({
            success:false,
            message: err.message || err || "Something went wrong"
        })
    }
}

export const profileDetails=async(req, res)=>{
    try{
    const userId=req.id;
    const details=await User.find({
        _id:userId
    })
    if(!details){
        return res.status(400).json({
            success:false,
            message:"Unable to get Profile details."
        })
    }
    res.status(200).json({
        success:true,
        details
    })
    }
    catch(err)
    {
        res.status(200).json({
        success:false,
        message: err
    })
    }
}

export const updateProfileDetails=async(req, res)=>{
    try{
    const {username, email, password, bio, occupation, photoUrl, instagram, linkedin, github, facebook}=req.body;
    const userId=req.id;
    const userDetails=await User.findById(userId);
    if(userDetails.username!=username)
    {
        userDetails.username=username
    }
    if(userDetails.email!=email)
    {
        userDetails.email=email
    }
    if(userDetails.password!=password)
    {
        userDetails.password=password
    }
    if(userDetails.bio!=bio)
    {
        userDetails.bio=bio
    }
    if(userDetails.occupation!=occupation)
    {
        userDetails.occupation=occupation
    }
    if(userDetails.photoUrl!=photoUrl)
    {
        userDetails.photoUrl=photoUrl
    }
    if(userDetails.instagram!=instagram)
    {
        userDetails.instagram=instagram
    }
    if(userDetails.linkedin!=linkedin)
    {
        userDetails.linkedin=linkedin
    }
    if(userDetails.github!=github)
    {
        userDetails.github=github
    }
    if(userDetails.facebook!=facebook)
    {
        userDetails.facebook=facebook
    }
    await userDetails.save();
    return res.status(200).json({
        success:true,
        message:"Updated Profile successfully",
    })
}
catch(err)
{
     res.status(400).json({
        success:false,
        message:err.message || "Something went wrong",
        })
}
}