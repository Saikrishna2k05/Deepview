import Blog from "../models/blogModel.js"; 
import User from '../models/userModel.js'
export const addBlog=async(req,res)=>{
    try{
    const {title, subtitle,description,category, thumbnail}=req.body;
    const userId=req.id;
    const user=await User.findById(userId);

    await Blog.create({
        title,
        subtitle,
        author: userId,
        description,
        category,
        thumbnail,
    })
    return res.status(201).json({
        success:true,
        message:"Blog created successfully"
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

export const allBlogs=async(req,res)=>{
    try
    {
        const allBlogs=await Blog.find({});
        return res.status(200).json({
            success:true,
            allBlogs
        })
    }
    catch(err)
    {
        return res.status(400).json({
            success:false,
            message:"Failed to fetch Blogs"
        })
    }

}