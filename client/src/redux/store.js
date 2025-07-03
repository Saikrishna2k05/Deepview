import {configureStore} from '@reduxjs/toolkit'
import authReducer from './authSlice.js'
import blogReducer from './blogSlice.js';
import userReducer from './userSlice.js'
import {persistStore, persistReducer} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { combineReducers } from 'redux';


const persistConfig={
    key: 'root',
    storage,
    whitelist: ['auth']
}
const rootReducer=combineReducers({
    auth: authReducer,
    blog:blogReducer,
    user: userReducer
})
const persistedReducer=persistReducer(persistConfig, rootReducer);
const store=configureStore({
    reducer: persistedReducer,
})
export const persistor = persistStore(store);
export default store