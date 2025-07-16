import express from 'express'
import { adminDelete } from '../controllers/blogController.js'
import adminMiddleware from '../middlewares/adminMiddleware.js'
import userMiddleware from '../middlewares/userMiddleware.js';
import { adminUsers, deleteUser } from '../controllers/userController.js';

const adminApp=express.Router();
adminApp.delete('/deleteBlog/:blogId', userMiddleware, adminMiddleware, adminDelete);
adminApp.get("/adminUsers", userMiddleware, adminMiddleware, adminUsers);
adminApp.delete("/deleteUser/:userId", userMiddleware, adminMiddleware, deleteUser);

export default adminApp