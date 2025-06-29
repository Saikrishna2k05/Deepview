import { updateBlog } from "../../client/src/redux/blogSlice.js";
import Blog from "../models/blogModel.js"; 
import User from '../models/userModel.js'
import mongoose from 'mongoose';
import {z} from 'zod'

export const addBlog=async(req,res)=>{
    try{
    const {title, subtitle,description,category, thumbnail}=req.body;
    const userId=req.id;
    const blogSchema = z.object
    ({
        title: z.string().min(1, { message: "Title is required" }),
        subtitle: z.string().min(1, { message: "Subtitle is required" }),
        description: z.string()
                    .refine((val) => 
                    {
                    const plain = val.replace(/<[^>]*>/g, '').replace(/&nbsp;/g, '').trim();
                    return plain.length > 0;
                    }, 
                    {message: "Description is required"}),
        category: z.string().min(1, { message: "Category is required" }),
        thumbnail: z.string().nullable().refine(val => val && val.trim() !== "", {message: "Thumbnail is required"}),
    });
    const result=blogSchema.safeParse({title, subtitle,description,category, thumbnail})
     if(!result.success)
    {
         const errorMessages = result.error.errors.map(err => err.message);
        return res.status(400).json
        ({
                success:false,
                message:"Validation failed",
                errorMessages
        })
    }
    const newBlog = await Blog.create({
        title,
        subtitle,
        author: userId,
        description,
        category,
        thumbnail,
    })
    const populatedBlog = await Blog.findById(newBlog._id).populate('author', 'username');
    return res.status(201).json({
        success:true,
        message:"Blog created successfully",
        blog: populatedBlog,
    })
}
catch(err)
{
    console.log("Error in blogController", err);
    return res.status(400).json({
        success:false,
        message: err
    }
    )
}

}

export const allBlogs=async(_,res)=>{
    try
    {
        const allBlogs=await Blog.find({}).populate('author', 'username').sort({createdAt: -1});
        return res.status(200).json({
            success:true,
            allBlogs
        })
    }
    catch(err)
    {
        console.log(err);
        
        return res.status(400).json({
            success:false,
            message:"Failed to fetch Blogs"
        })
    }
}

export const getBlogByID=async(req, res)=>{
    try
    {
    const blogId=req.params.id;
    if (!mongoose.Types.ObjectId.isValid(blogId)) 
    {
    return res.status(400).json({
      success: false,
      message: 'Invalid Blog ID format.',
    });
    }
    const blog=await Blog.findById(blogId).populate('author','username photoUrl');
    if(!blog) 
    {
        return res.status(404).json({
            success:false,
            message:"No Blog with this Id."
        })
    }
    res.status(200).json({
        success:true,
        blog
    })
    }
    catch(err)
    {
        console.log(err);
        return res.status(400).json({
            success:false,
            message:`Something went wrong ${err}`
        })
    }
}

export const getUserBlogs=async(req, res)=>{
    try
    {
        const userId=req.id;
        const userBlogs=await Blog.find({author:userId}).populate('author','username').sort({createdAt: -1}).lean();
        if(userBlogs.length===0) 
        {
            return res.status(200).json({
            success: true,
            message: "No blogs created yet",
            userBlogs: [],
            });
        }
        res.status(200).json({
            success: true,
            userBlogs
        })
    }
    catch(err)
    {
        res.status(400).json({
            error:err?.message || "Something went wrong"
        })
    }
}

export const editBlog=async(req, res)=>{
    try{
    const {title, subtitle,description,category, thumbnail}=req.body;
    const blogId=req.params.id;
    const userId=req.id;
    const blog=await Blog.findById(blogId);
    if(!blog)
    {
        return res.status(400).json({
            success:false,
            message:"No Blog with this Id"
        })
    }
    if(blog.author._id.toString()!==userId)
    {
        return res.status(403).json({
            success:false,
            message:"Only the owner can update this blog."
        })
    }
    const blogSchema = z.object
    ({
        title: z.string().min(1, { message: "Title is required" }),
        subtitle: z.string().min(1, { message: "Subtitle is required" }),
        description: z.string()
                    .refine((val) => 
                    {
                    const plain = val.replace(/<[^>]*>/g, '').replace(/&nbsp;/g, '').trim();
                    return plain.length > 0;
                    }, 
                    {message: "Description is required"}),
        category: z.string().min(1, { message: "Category is required" }),
        thumbnail: z.string().nullable().refine(val => val && val.trim() !== "", {message: "Thumbnail is required"}),
    });
    const result=blogSchema.safeParse({title, subtitle,description,category, thumbnail})
    if(!result.success)
    {
         const errorMessages = result.error.errors.map(err => err.message);
        return res.status(400).json
        ({
                success:false,
                message:"Validation failed",
                errorMessages
        })
    }
    const blogData=result.data;
    if (
    blog.title === blogData.title &&
    blog.subtitle === blogData.subtitle &&
    blog.description === blogData.description &&
    blog.category === blogData.category &&
    blog.thumbnail === blogData.thumbnail
    ) 
    {
    return res.status(200).json({
        success: true,
        message: "No changes made",
    });
    }

    if(blog.title!==blogData.title)
    {
        blog.title=blogData.title
    }
    if(blog.subtitle!==blogData.subtitle)
    {
        blog.subtitle=blogData.subtitle
    }
    if(blog.description!==blogData.description)
    {
        blog.description=blogData.description
    }
    if(blog.thumbnail!==blogData.thumbnail)
    {
        blog.thumbnail=blogData.thumbnail
    }
    if(blog.category!==blogData.category)
    {
        blog.category=blogData.category
    }
    await blog.save();
    return res.status(200).json({
        success:true,
        message:"Updated blog successfully",
        updatedBlog: blog
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