import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import axios from 'axios'

const initialState={
    loading: false,
    Users:[],
    photoUrl:''
}
export const allUsers=createAsyncThunk('allUsers',async(_, {rejectWithValue})=>{
    try{
        const response=await axios.get('http://localhost:3000/admin/adminUsers',{withCredentials: true});
        return response.data.users;
    }
    catch(err)
    {
        return rejectWithValue(err.response?.data?.message || err.message);
    }
})

export const deleteUser=createAsyncThunk('deleteUser', async(userId,{rejectWithValue})=>{
    try{
    await axios.delete(`http://localhost:3000/admin/deleteUser/${userId}`,{withCredentials: true});
    return userId;
    }
    catch(err)
    {
        return rejectWithValue(err.response?.data?.message || err.message);
    }
})

const userSlice=createSlice(
    {
        name:'userSlice',
        initialState,
        reducers:{
            setPhoto(state, action){
                state.photoUrl=action.payload;
            },
            clearPhoto(state) {
                state.photoUrl = '';
            }
        },
        extraReducers:(builder)=>{
            builder.addCase(allUsers.pending, (state, _)=>{
                state.loading=true;
            })
            .addCase(allUsers.fulfilled, (state, action)=>{
                state.Users=action.payload;
            })
            .addCase(allUsers.rejected, (state, _) => {
                    state.loading = false;
            })
            .addCase(deleteUser.fulfilled, (state, action)=>
            {
                const userId=action.payload;
                state.Users=state.Users.filter((user)=>user._id!=userId);
            }
        )
        }
    }
)

export const {setPhoto, clearPhoto}=userSlice.actions;
export default userSlice.reducer;