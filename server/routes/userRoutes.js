import express from 'express'
import {login, signup} from '../controllers/userController.js'
const userApp=express.Router();
userApp.route('/login').post(login);
userApp.route('/signup').post(signup);
export default userApp;