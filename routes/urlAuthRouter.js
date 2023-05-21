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
import { urlAuthMiddleware } from "../middlewares/urlAuthMiddleware.js";

export const urlAuthRouter = express.Router();
urlAuthRouter.post("/login", loginUserCtrl);
urlAuthRouter.post("/register", createUser);
urlAuthRouter.put("/password", urlAuthMiddleware, updatepassword);
urlAuthRouter.post("/forget-password", forgetPasswordtoken);
urlAuthRouter.put("/reset-password", resetPassword);
urlAuthRouter.post("/validateToken", urlAuthMiddleware, validateToken);
urlAuthRouter.put("/log-out", urlAuthMiddleware, logOut);
urlAuthRouter.put("/savedCount", urlAuthMiddleware, savedCount);
urlAuthRouter.get("/saved-url", urlAuthMiddleware, getsavedUrl);
