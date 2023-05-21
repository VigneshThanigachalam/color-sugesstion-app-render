import express from 'express';
import { urlIndexController } from '../Controller/urlIndexController.js';

export const urlIndexRouter = express.Router();

urlIndexRouter.get('/:urlId', urlIndexController);