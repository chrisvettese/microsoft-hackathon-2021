import { Router } from "express";
import express from "express"
import { getFilePath } from "../utils/utils.js";
import fs from 'fs'

const router = Router();
const frontendPath = getFilePath(import.meta.url, '../static/build');

if (fs.existsSync(frontendPath)) {
    console.log("static frontend found")
    router.use('/', express.static(frontendPath));
} else {
    console.log("static frontend not found")
}

export default router;