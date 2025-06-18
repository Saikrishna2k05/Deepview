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
        const token=jwt.sign({id: user._id}, process.env.USER_JWT_SECRET, {expiresIn:"1h" });
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
        message: "Logout Sucessful"
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