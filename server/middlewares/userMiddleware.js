import jwt from "jsonwebtoken"
const userMiddleware=(req,res,next)=>{
     try
     {
         const token = req.cookies.token
         if(!token)
         {
            return res.status(401).json({
                  success:false,
                  message:"Unauthorized: No Token Provided"
            })
         }
         const jwtDecoded=jwt.verify(token, process.env.USER_JWT_SECRET);
         req.id=jwtDecoded.id;
         req.role=jwtDecoded.role;
         next();
     }
     catch(err)
     {
        console.log("Error in protectRoute middleware:" ,err.message)
        return res.status(401).json
        ({
            success: false,
            message: "Unauthorized: Invalid or Expired Token"
        })
     }

}

export default userMiddleware