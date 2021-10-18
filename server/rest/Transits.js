import { Router } from "express";
import Transit, { TransitMethod } from "../models/Transit.js";
import User from "../models/UserModel.js";
import assert from "../utils/dev.js";
import { getAllBuilder } from "./UserRest.js";
const transitRouter = Router();

transitRouter.get("/methods", getAllBuilder(TransitMethod));
function checkValues(arr, res) {
    try {
        arr.forEach((value) => {
            assert(value, 'missing value received')
        })
        return true;
    } catch (error) {
        res.send(400).message(error.message);
        return false;
    }

}

transitRouter.post("/", (req, res) => {
    const { oid, transits } = req.body;
    if (checkValues([oid, transits], res)) {
        try{
            transits.forEach((transit) => Transit.create(transit));
            res.send(200).message("success");
        } catch (error) {
            res.send(500).message(error.message);
        }
        
    }

})

export default transitRouter;