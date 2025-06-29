import express from 'express'
import { addBlog, allBlogs, getBlogByID, getUserBlogs, editBlog, deleteBlog} from '../controllers/blogController.js';
import userMiddleware from '../middlewares/userMiddleware.js'
const blogApp=express.Router();
blogApp.post("/create", userMiddleware, addBlog);
blogApp.get("/getAll",userMiddleware, allBlogs);
blogApp.get("/userBlogs",userMiddleware,getUserBlogs);
blogApp.put("/editBlog/:id", userMiddleware, editBlog);
blogApp.delete("/deleteBlog/:blogId",userMiddleware, deleteBlog);
blogApp.get("/:id",userMiddleware, getBlogByID);
export default blogApp