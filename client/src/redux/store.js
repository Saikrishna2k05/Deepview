import {configureStore} from '@reduxjs/toolkit'
import authReducer from './authSlice.js'
import blogReducer from './blogSlice.js';
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
    blog:blogReducer
})
const persistedReducer=persistReducer(persistConfig, rootReducer);
const store=configureStore({
    reducer: persistedReducer,
})
export const persistor = persistStore(store);
export default store