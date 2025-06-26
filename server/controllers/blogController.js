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
        blog: populatedBlog
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
    const blog=await Blog.findById(blogId);
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