const adminMiddleware=(req, res, next)=>{
    try{
        if(req.role!=='admin')
        {
            return res.status(400).json({
                success:false,
                message:"Not an admin"
            })
        }
        next();
    }
    catch(err)
    {
        res.status(400).json({
            success:false,
            message:err.message
        })
    }
}

export default adminMiddleware;