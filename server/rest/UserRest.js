import { Router } from "express";
import User from "../models/UserModel.js";
import assert from "../utils/dev.js";
const userRouter = Router();

function getAllBuilder(model) {
    return async (req, res) => {
        try{
            const data = model.findAll();
            res.status(200).send(data);
        } catch (error) {
            res.status(500).send(error.message);
        }
    }
}

function getByIdBuilder(model){
    return async (req, res) => {
        const id = req.params.id;
        if (id) {
            try {
                const data = await model.findByPk(id)
                if (data) {
                    res.status(200).send(data);
                } else {
                    res.sendStatus(404);
                }
            } catch (error) {
                res.status(500).send(error.message)
            }
        } else {
            res.sendStatus(400);
        }
    }
}

userRouter.get('/:id', getByIdBuilder(User));
userRouter.get('/', getAllBuilder(User))

userRouter.post('/', async (req, res) => {
    const body = req.body;
    try {
        assert(body.email_address, 'user has no emailAddress');
        assert(body.oid, 'user has no emailAddress');
    } catch (error) {
        res.status(400).send(error.message)
    }

    try {
        const newUser = body;
        const result = await User.create(body);
        res.status(200).send(result);
    } catch (error) {
        res.status(500).send(error.message)
    }
})

export default userRouter;