import express from 'express'
import {login, logout, signup} from '../controllers/userController.js'
const userApp=express.Router();
userApp.route('/login').post(login);
userApp.route('/signup').post(signup);
userApp.route('/logout').post(logout);

export default userApp;