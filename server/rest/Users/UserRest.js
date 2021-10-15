import { Router } from "express";
import User from "../../models/UserModel.js";
import assert from "../../utils/dev.js";
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
                    res.status(404).send("not found");
                }
            } catch (error) {
                res.status(500).send(error.message)
            }
        } else {
            res.status(400).send("no id found")
        }
    }
}

userRouter.get('/:id', getByIdBuilder(User));
userRouter.get('/', getAllBuilder(User))

userRouter.post('/', async (req, res) => {
    const body = req.body;
    try {
        assert(body.userName, 'user has no username');
        assert(body.EmailAddress, 'user has no emailAddress');
        assert(body.IsRegistered, 'user has no isRegistered');

    } catch (error) {
        res.status(400).logsend(error.message)
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