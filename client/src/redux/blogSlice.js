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
  'blogs/addBlog',
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

const blogSlice=createSlice({
    name:'blogs',
    initialState:
    {
    blogs: [],
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
        state.blogs.push(action.payload); 
      })
    }
})

export default blogSlice.reducer;