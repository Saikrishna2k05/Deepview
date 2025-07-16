import express from 'express'
import { adminDelete } from '../controllers/blogController.js'
import adminMiddleware from '../middlewares/adminMiddleware.js'
import userMiddleware from '../middlewares/userMiddleware.js';

const adminApp=express.Router();
adminApp.delete('/deleteBlog/:blogId', userMiddleware, adminMiddleware, adminDelete);

export default adminApp