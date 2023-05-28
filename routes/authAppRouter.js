import express from "express";
import fs from "fs";
import {
    createUser,
    loginUserCtrl,
    forgetPasswordtoken,
    updatepassword,
    resetPassword,
    validateToken,
    logOut
} from "../Controller/authAppUserController";
import { authMiddleware } from "../middlewares/authMiddleware.js";

export const authAppRouter = express.Router();
authAppRouter.post("/login", loginUserCtrl);
authAppRouter.post("/register", createUser);
authAppRouter.put("/password", authMiddleware, updatepassword);
authAppRouter.post("/forget-password", forgetPasswordtoken);
authAppRouter.put("/reset-password", resetPassword);
authAppRouter.post("/validateToken", authMiddleware, validateToken);
authAppRouter.put("/log-out", authMiddleware, logOut);
