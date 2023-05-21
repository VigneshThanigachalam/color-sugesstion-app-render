import express from "express";
import { urlController } from "../Controller/urlController.js";
import { urlAuthMiddleware } from "../middlewares/urlAuthMiddleware.js";

export const urlRouter = express.Router();

// Short URL Generator
urlRouter.post('/short', urlAuthMiddleware, urlController);
