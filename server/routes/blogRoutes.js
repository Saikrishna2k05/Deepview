import express from 'express'
import { addBlog, allBlogs, getBlogByID } from '../controllers/blogController.js';
import userMiddleware from '../middlewares/userMiddleware.js'
const blogApp=express.Router();
blogApp.post("/create", userMiddleware, addBlog);
blogApp.get("/getAll",userMiddleware, allBlogs);
blogApp.get("/:id",userMiddleware, getBlogByID);
export default blogApp