import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import axios from 'axios'

export const fetchAllBlogs=createAsyncThunk('fetchBlogs',async(_, { rejectWithValue })=>{
    try{
    const response=await axios.get('http://localhost:3000/blog/getAll',{withCredentials: true} )
    return response.data.allBlogs;
    }
    catch(err)
    {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
})

export const addBlog = createAsyncThunk(
  'addBlogs',
  async (blogData, { rejectWithValue }) => 
  {
    try 
    {
      const response = await axios.post(
        'http://localhost:3000/blog/create',
        blogData,
        { withCredentials: true }
      );
      return response.data.blog;
    } 
    catch (err) 
    {
      const data = err.response?.data;
      if(data?.errorMessages && Array.isArray(data.errorMessages))
      {
        return rejectWithValue({errorMessages: data.errorMessages})
      }
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

export const updateBlog=createAsyncThunk('updateBlogs',
  async({ id, updatedData },{rejectWithValue})=>
  {
      try{
        const response=await axios.put(`http://localhost:3000/blog/editBlog/${id}` , updatedData, { headers: { "Content-Type": "application/json" }, withCredentials: true });
        return response.data.updatedBlog;
      }
      catch(err)
      {
        const data = err.response?.data;
        if(data?.errorMessages && Array.isArray(data.errorMessages))
        {
          return rejectWithValue({errorMessages: data.errorMessages})
        }
        return rejectWithValue(err.response?.data?.message || err.message);
      }
  }
)

export const deleteBlogs=createAsyncThunk('deleteBlog',async(blogId,{rejectWithValue})=>{
  try{
      await axios.delete(`http://localhost:3000/blog/deleteBlog/${blogId}`,{withCredentials:true});
      return blogId;
  }
  catch(err)
  {
    const data = err.response?.data;
    return rejectWithValue(err.response?.data?.message || err.message);
  }
})

export const fetchUserBlogs=createAsyncThunk('userBlogs',async(_,{rejectWithValue})=>{
  try{
    const response=await axios.get('http://localhost:3000/blog/userBlogs',{withCredentials:true})
    return response.data.userBlogs;
  }
  catch(err)
  {
     const data = err.response?.data;
    return rejectWithValue(err.response?.data?.message || err.message);
  }
})

const blogSlice=createSlice({
    name:'blogs',
    initialState:
    {
    blogs: [],
    userBlogs:[],
    loading: false,
    },
     reducers: {}, 
    extraReducers:(builder)=>{
        builder.addCase(fetchAllBlogs.pending,(state)=>{
        state.loading = true;
        })
        .addCase(fetchAllBlogs.fulfilled, (state, action) => {
        state.loading = false;
        state.blogs = action.payload;
      })
      .addCase(fetchAllBlogs.rejected, (state, action) => {
        state.loading = false;
      })
      .addCase(addBlog.fulfilled, (state, action) => {
        state.blogs.unshift(action.payload); 
      })
      .addCase(updateBlog.fulfilled, (state, action)=>{
          state.loading = false;
          const updatedBlog = action.payload;
          console.log("Updating blog in Redux:", updatedBlog);
          if (!updatedBlog || !updatedBlog._id) return;
          state.blogs = state.blogs.map((blog) =>
        blog._id === updatedBlog._id ? updatedBlog : blog
        );
      })
      .addCase(deleteBlogs.fulfilled,(state, action)=>{
        state.blogs=state.blogs.filter(blog=>blog._id!==action.payload);
        state.userBlogs=state.userBlogs.filter(blog=>blog._id!=action.payload);
      })
      .addCase(fetchUserBlogs.pending, (state, action)=>{
          state.loading=true;
      })
      .addCase(fetchUserBlogs.fulfilled,(state,action)=>{
        state.loading=false;
        state.userBlogs=action.payload;
      } )
      .addCase(fetchUserBlogs.rejected, (state) => {
      state.loading = false;
    });
    }
})

export default blogSlice.reducer;