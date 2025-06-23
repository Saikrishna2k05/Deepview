import {configureStore} from '@reduxjs/toolkit'
import authReducer from './authSlice.js'
import blogReducer from './blogSlice.js';
const store=configureStore({
    reducer:{
        auth: authReducer,
        blog:blogReducer
    }
})
export default store