import {createSlice} from '@reduxjs/toolkit'
const initialState={
    photoUrl:''
}
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
        }
    }
)
export const {setPhoto, clearPhoto}=userSlice.actions;
export default userSlice.reducer;