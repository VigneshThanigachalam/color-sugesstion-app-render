import express from 'express';
import { urlIndexController } from '../Controller/urlIndexController.js';

export const indexRouter = express.Router();

indexRouter.get('/:urlId', urlIndexController);