import mongoose from "mongoose";
const { Schema } = mongoose;
const userSchema=new Schema({
    username:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    bio: {
        type: String,
        default: ""
    },
    occupation: {
        type: String,
    },
    photoUrl: {
        type: String,
        default: ""
    },
    instagram: { 
        type: String, 
        default: "" 
    },
    linkedin: { 
        type: String, default: "" 
    },
    github: { 
        type: String, default: "" 
    },
    facebook: { 
        type: String, default: "" 
    },
    role:{
        type:String,
        enum:['user', 'admin'],
        default:'user'
    }
},{timestamps: true})

const User= mongoose.model('users',userSchema);
export default User;
