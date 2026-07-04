import express from 'express';
import {registerUser, signingWithGoogle, updateProfile} from '../controllers/auth.controller.js';

const authRouter = express.Router();    

// authRouter.post('/register', registerUser);
authRouter.post('/login', signingWithGoogle);
authRouter.patch("/update/:id", updateProfile);

export default authRouter;