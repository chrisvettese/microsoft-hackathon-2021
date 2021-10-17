import { Router } from "express";
import { TransitMethod } from "../models/Transit.js";
import User from "../models/UserModel.js";
import assert from "../utils/dev.js";
import { getAllBuilder } from "./UserRest.js";
const transitRouter = Router();

transitRouter.get("/methods", getAllBuilder(TransitMethod));
transitRouter.post("", (req, res) => {
    const { oid, transit_id, gas_emissions, frequency, distance } = req.body
})

export default transitRouter;