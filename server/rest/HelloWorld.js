import { Router } from "express";
import * as express from "express"
import path from 'path'
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const router = Router();
router.use('/', express.static(path.join(__dirname, '../static/build')))

export default router;