import { Router } from "express";
import Province from "../models/Province.js";
import User from "../models/UserModel.js";
import assert from "../utils/dev.js";
const userRouter = Router();

export function getAllBuilder(model) {
    return async (req, res) => {
        try {
            const data = await model.findAll();
            res.status(200).send(data);
        } catch (error) {
            res.status(500).send(error.message);
        }
    }
}

function getByIdBuilder(model) {
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

userRouter.get("/provinces", getAllBuilder(Province));

userRouter.get('/:id', getByIdBuilder(User));
userRouter.get('/', getAllBuilder(User))

userRouter.post('/', async (req, res) => {
    const body = req.body;
    try {
        console.log(body);
        assert(body.email_address, 'user has no email_address');
        assert(body.oid, 'user has no oid');
    } catch (error) {
        res.status(400).send(error.message)
        return;
    }

    try {
        const result = await User.create(body);
        res.status(201).send(result);
        return;
    } catch (error) {
        res.status(500).send(error.message)
        return;
    }
})


userRouter.patch("", async (req,res) => {
    const {oid, username, province} = req.body;

    try {
        assert(oid, 'no oid')
        assert(username, 'user has no username');
        assert(province, 'user has no province');
    } catch (error) {
        res.status(400).send(error.message)
        return;
    }

    try{
        await User.update({username, province}, {
            where:{
                oid
            }
        });
        res.status(200).send()
        return;
    } catch (error) {
        res.status(500).send(error.message);
    }
    
})
export default userRouter;