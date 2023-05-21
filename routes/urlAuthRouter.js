import express from "express";
import fs from "fs";
import {
    createUser,
    loginUserCtrl,
    forgetPasswordtoken,
    updatepassword,
    resetPassword,
    validateToken,
    logOut,
    savedCount,
    getsavedUrl,
} from "../Controller/urlUserController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

export const urlAuthRouter = express.Router();
urlAuthRouter.post("/login", loginUserCtrl);
urlAuthRouter.post("/register", createUser);
urlAuthRouter.put("/password", authMiddleware, updatepassword);
urlAuthRouter.post("/forget-password", forgetPasswordtoken);
urlAuthRouter.put("/reset-password", resetPassword);
urlAuthRouter.post("/validateToken", authMiddleware, validateToken);
urlAuthRouter.put("/log-out", authMiddleware, logOut);
urlAuthRouter.put("/savedCount", authMiddleware, savedCount);
urlAuthRouter.get("/saved-url", authMiddleware, getsavedUrl);
