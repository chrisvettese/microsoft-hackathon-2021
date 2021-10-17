import { Router } from "express";
import * as express from "express"
import { getFilePath } from "../utils/utils.js";


const router = Router();
router.use('/', express.static(getFilePath(import.meta.url, '../static/build'), ))

export default router;