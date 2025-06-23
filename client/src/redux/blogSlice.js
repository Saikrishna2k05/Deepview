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
const blogSlice=createSlice({
    name:'blogs',
    initialState:
    {
    blogs: [],
    loading: false,
    error: null,
    },
    extraReducers:(builder)=>{
        builder.addCase(fetchAllBlogs.pending,(state)=>{
             state.loading = true;
        state.error = null;
        })
        .addCase(fetchAllBlogs.fulfilled, (state, action) => {
        state.loading = false;
        state.blogs = action.payload;
      })
      .addCase(fetchAllBlogs.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
    }
})

export default blogSlice.reducer;