import express from 'express'
import {login, logout, signup, profileDetails, updateProfileDetails} from '../controllers/userController.js'
import userMiddleware from '../middlewares/userMiddleware.js'
const userApp=express.Router();

userApp.post('/login', login);
userApp.post('/signup', signup);
userApp.post("/logout", userMiddleware, logout);
userApp.get("/profile",userMiddleware, profileDetails);
userApp.put("/updateProfile", userMiddleware, updateProfileDetails)

export default userApp;