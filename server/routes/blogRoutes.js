import express from 'express'
import { addBlog, allBlogs } from '../controllers/blogController.js';
import userMiddleware from '../middlewares/userMiddleware.js'
const blogApp=express.Router();
blogApp.post("/create", userMiddleware, addBlog);
blogApp.get("/getAll",userMiddleware, allBlogs)
export default blogApp