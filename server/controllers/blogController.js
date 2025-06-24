import Blog from "../models/blogModel.js"; 
import User from '../models/userModel.js'
export const addBlog=async(req,res)=>{
    try{
    const {title, subtitle,description,category, thumbnail}=req.body;
    const userId=req.id;
    const user=await User.findById(userId);

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
        const allBlogs=await Blog.find({}).populate('author', 'username');
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