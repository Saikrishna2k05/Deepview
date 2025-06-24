import mongoose, { Schema } from 'mongoose'
const blogSchema=new Schema({
    title:{
        type:String,
        required: true
    },
    subtitle:{
        type:String,
        required: true
    },
    author:{
        type:mongoose.Schema.Types.ObjectId,
        ref: 'users',
        required: true
    },
    description:{
        type:String,
        required: true
    },
    category:{
        type:String,
        required: true
    },
    thumbnail:{
        type:String,
        required: true
    },
    likes:{
         type:mongoose.Schema.Types.ObjectId,
        ref: 'users'
    },
    comments:{
         type:mongoose.Schema.Types.ObjectId,
        ref: 'Comment'
    }
},{timestamps: true})

const Blog=mongoose.model('blogs',blogSchema);
export default Blog